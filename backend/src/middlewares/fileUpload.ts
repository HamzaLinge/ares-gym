import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { GridFSBucket } from "mongodb";
import fs from "fs-extra";
import mongoose from "mongoose";

import { CustomError } from "../types/global.type";
import { HttpStatusCodes } from "../utils/error.util";
import { IMetadataFile } from "../features/file/file.type";

const maxFileSize = 2 * 10 * 1024 * 1024; // 20MB file size limit
const maxFileNumberAllowed = 6;

// Multer setup for temporary file storage with a 10MB limit and to generate a unique ID
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "tmp/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: maxFileSize },
});

// Setting up multer for single and multiple file upload
export const singleFileMiddleware = upload.single("file");
export const multipleFileMiddleware = upload.array(
  "files",
  maxFileNumberAllowed
);

// uploadToGridFS and streamToGridFS are utility functions to handle uploading buffers and streams to GridFS
async function uploadToGridFS(
  bucket: GridFSBucket,
  filename: string,
  buffer: Buffer,
  metadata: IMetadataFile
): Promise<string> {
  const uploadStream = bucket.openUploadStream(filename, { metadata });
  uploadStream.end(buffer);
  return new Promise((resolve, reject) => {
    uploadStream.on("finish", () => resolve(uploadStream.id.toString()));
    uploadStream.on("error", reject);
  });
}

export async function streamToGridFS(
  bucket: GridFSBucket,
  filename: string,
  stream: fs.ReadStream,
  metadata: IMetadataFile
): Promise<string> {
  const uploadStream = bucket.openUploadStream(filename, { metadata });
  stream.pipe(uploadStream);
  return new Promise((resolve, reject) => {
    uploadStream.on("finish", () => resolve(uploadStream.id.toString()));
    uploadStream.on("error", reject);
  });
}

// Utility function for processing and uploading a file
export async function processAndUploadFile(file: Express.Multer.File) {
  // console.log("PROCESS AND UPLOAD FILE -------------------------------------");
  const gridFSBucket = new GridFSBucket(mongoose.connection.db);
  let fileId;
  const metadata = {
    contentType: file.mimetype,
    originalName: file.originalname,
    uploadDate: new Date(),
  };
  if (file.mimetype.startsWith("image/")) {
    // const buffer = await sharp(file.path).toBuffer();
    // fileId = await uploadToGridFS(
    //   gridFSBucket,
    //   file.originalname,
    //   buffer,
    //   metadata
    // );
    // const processedFilePath = file.path + "-processed.jpg"; // Temporary path for processed file
    // await sharp(file.path).toFile(processedFilePath); // Process and save to new file
    //
    // const buffer = await fs.readFile(processedFilePath); // Read the processed file into buffer
    // fileId = await uploadToGridFS(
    //   gridFSBucket,
    //   file.originalname,
    //   buffer,
    //   metadata
    // );

    // await fs.remove(processedFilePath);

    const readStream = fs.createReadStream(file.path);
    fileId = await streamToGridFS(
      gridFSBucket,
      file.originalname,
      readStream,
      metadata
    );
  } else if (file.mimetype === "application/pdf") {
    const readStream = fs.createReadStream(file.path);
    fileId = await streamToGridFS(
      gridFSBucket,
      file.originalname,
      readStream,
      metadata
    );
  } else {
    console.error("Unsupported File Type");
    throw new CustomError(
      "Unsupported file type",
      HttpStatusCodes.UNSUPPORTED_MEDIA_TYPE
    );
  }
  return fileId;
}

// Utility function to delete temporary file that it is stored in /tmp/ folder
async function deleteTemporaryFile(
  file: Express.Multer.File,
  retries = 5,
  delay = 100
) {
  try {
    await fs.remove(file.path);
    console.log("Temporary file deleted successfully");
  } catch (err) {
    if (retries === 0) {
      console.error("Error deleting temporary file:", err);
      // throw err;
    } else {
      console.log(`Retrying file deletion, attempts remaining: ${retries}`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      await deleteTemporaryFile(file, retries - 1, delay);
    }
  }
}

// Middleware to process single file upload
export const processSingleFileUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.file) {
    try {
      req.fileId = await processAndUploadFile(req.file);
    } catch (error) {
      console.error("Error processing file:", error);
      next(error);
    } finally {
      await deleteTemporaryFile(req.file);
    }
    // When the process is completed, then pass to the next middleware
    next();
  } else {
    // Case when the file is not provided
    next();
  }
};

// Middleware for multiple file process
export const processMultipleFileUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.files && Array.isArray(req.files)) {
    // console.log(
    //   "FILES Treatment --------------------------------------------------"
    // );
    const validFiles = req.files.filter((file) => file.size > 0);
    try {
      const fileIds: Awaited<string | undefined>[] = await Promise.all(
        validFiles.map(async (file) => await processAndUploadFile(file))
      );
      const filteredFileIds = fileIds.filter(
        (id): id is string => id !== undefined
      );
      req.fileIdArr = filteredFileIds.length > 0 ? filteredFileIds : undefined;
    } catch (error) {
      console.error("Error processing files:", error);
      next(error);
    } finally {
      // Cleanup: delete temporary files
      for (const file of req.files) {
        await deleteTemporaryFile(file);
      }
    }
    // When all processes are completed, then pass to the next middleware
    next();
  } else {
    // Case where req.files object is not present for some reason
    console.error("The object 'req.files' doesn't exist");
    next();
  }
};

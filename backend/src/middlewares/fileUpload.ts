import { NextFunction, Request, Response } from "express";
import multer from "multer";
import sharp from "sharp";
import { GridFSBucket } from "mongodb";
import fs from "fs";
import mongoose from "mongoose";

import { CustomError } from "../types/global.type";

const maxFileSize = 10 * 1024 * 1024; // 10MB file size limit
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
  buffer: Buffer
): Promise<string> {
  const uploadStream = bucket.openUploadStream(filename);
  uploadStream.end(buffer);
  return new Promise((resolve, reject) => {
    uploadStream.on("finish", () => resolve(uploadStream.id.toString()));
    uploadStream.on("error", reject);
  });
}

async function streamToGridFS(
  bucket: GridFSBucket,
  filename: string,
  stream: fs.ReadStream
): Promise<string> {
  const uploadStream = bucket.openUploadStream(filename);
  stream.pipe(uploadStream);
  return new Promise((resolve, reject) => {
    uploadStream.on("finish", () => resolve(uploadStream.id.toString()));
    uploadStream.on("error", reject);
  });
}

// Middleware to process multiple files upload
export const processSingleFileUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.file) {
    const gridFSBucket = new GridFSBucket(mongoose.connection.db);
    try {
      if (req.file.mimetype.startsWith("image/")) {
        const buffer = await sharp(req.file.path).toBuffer();
        req.fileId = await uploadToGridFS(
          gridFSBucket,
          req.file.originalname,
          buffer
        );
      } else if (req.file.mimetype === "application/pdf") {
        const readStream = fs.createReadStream(req.file.path);
        req.fileId = await streamToGridFS(
          gridFSBucket,
          req.file.originalname,
          readStream
        );
      } else {
        next(
          new CustomError("Please provide an Image or PDF format file", 415)
        );
      }
    } catch (error) {
      console.error("Error processing file:", error);
      next(new CustomError("Error processing file", 500));
    } finally {
      // Cleanup: delete temporary file
      if (fs.existsSync(req.file.path)) {
        try {
          fs.unlinkSync(req.file.path);
        } catch (err) {
          // console.error("Error deleting temporary file:", err);
          console.log("Error deleting temporary file:", err);
        }
      }
    }
    next();
  } else {
    // Because file is not required, it is optional
    next();
  }
};

// Middleware for multiple file process
export const processMultipleFileUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.files && req.files.length > 0) {
    const gridFSBucket = new GridFSBucket(mongoose.connection.db);
    try {
      const fileIds: Awaited<string | undefined>[] = await Promise.all(
        req.files.map(async (file) => {
          if (file.mimetype.startsWith("image/")) {
            const buffer = await sharp(file.path).toBuffer();
            return uploadToGridFS(gridFSBucket, file.originalname, buffer);
          } else if (file.mimetype === "application/pdf") {
            const readStream = fs.createReadStream(file.path);
            return streamToGridFS(gridFSBucket, file.originalname, readStream);
          } else {
            next(
              new CustomError("Only images and PDF types file are allowed", 415)
            );
          }
        })
      );
      const filteredFileIds = fileIds.filter(
        (id): id is string => id !== undefined
      );
      req.fileIdArr = filteredFileIds.length > 0 ? filteredFileIds : undefined;
      next();
    } catch (error) {
      console.error("Error processing files:", error);
      next(new CustomError("Error processing files", 500));
    } finally {
      // Cleanup: delete temporary files
      for (const file of req.files) {
        try {
          fs.unlinkSync(file.path);
        } catch (err) {
          // console.error("Error deleting temporary file:", err);
          console.log("Error deleting temporary file:", err);
        }
      }
      // req.files.forEach((file) => {
      //   fs.unlinkSync(file.path, (err) => {
      //     if (err) console.error("Error deleting temporary file:", err);
      //   });
      // });
    }
  } else {
    next();
  }
};

import { NextFunction, Request, Response } from "express";
import multer from "multer";
import sharp from "sharp";
import { GridFSBucket } from "mongodb";
import fs from "fs";
import mongoose from "mongoose";

import { CustomError } from "../types/common.types";

const maxFileSize = 10 * 1024 * 1024; // 10MB file size limit

// Multer setup for temporary file storage with a 10MB limit
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: maxFileSize },
});

// Middleware for file upload
export const fileUploadMiddleware = upload.single("file");

export const processFileUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.file) {
    const gridFSBucket = new GridFSBucket(mongoose.connection.db);
    if (req.file.mimetype.startsWith("image/")) {
      try {
        const buffer = await sharp(req.file.path)
          // .resize(300, 300)
          .toBuffer();
        const uploadStream = gridFSBucket.openUploadStream(
          req.file.originalname
        );
        uploadStream.end(buffer);
        uploadStream.on("finish", () => {
          req.fileId = uploadStream.id.toString();
          next();
        });
      } catch (error) {
        console.error("Error in processing image:", error);
        return next(new CustomError("Error processing image", 500));
      }
    } else if (req.file.mimetype === "application/pdf") {
      try {
        const readStream = fs.createReadStream(req.file.path);
        const uploadStream = gridFSBucket.openUploadStream(
          req.file.originalname
        );
        readStream.pipe(uploadStream);

        uploadStream.on("finish", () => {
          req.fileId = uploadStream.id.toString();
          next();
        });
      } catch (error) {
        console.error("Error in processing PDF:", error);
        return next(new CustomError("Error processing PDF", 500));
      }
    } else {
      return next(
        new CustomError("Please provide an Image or PDF format file", 400)
      );
    }
    // Cleanup: delete temporary file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting temporary file:", err);
    });
  } else {
    // Because file is not required, it is optional
    next();
  }
};

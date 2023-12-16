import { ValidationError } from "express-validator";

// Define the interface for CustomError class
interface ICustomError {
  statusCode: number;
  message: string;
  error?: ValidationError[];
}

// Implement the CustomError class
export class CustomError extends Error implements ICustomError {
  statusCode: number;
  errors?: ValidationError[];

  constructor(message: string, statusCode: number, errors?: ValidationError[]) {
    super(message); // Call the constructor of the parent class (Error), because it handles the message property
    this.statusCode = statusCode;
    this.errors = errors;
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

declare module "express-serve-static-core" {
  interface Request {
    file?: Express.Multer.File;
    files?: Express.Multer.File[];
    fileId?: string | undefined; // Add fileUrl as an optional string property
    fileIdArr?: string[] | undefined; // Add fileUrl Array as an optional string[] property
  }
}

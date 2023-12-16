import { CallbackError, Document, model, Model, Schema } from "mongoose";
import { genSalt, hash, compare } from "bcryptjs";

import {
  CredentialsProviders,
  GendersUser,
  Roles,
  TCredentialsProviders,
  TGenderUser,
  TRole,
} from "../features/authentication/auth.type";

export interface IUser extends Document, IUserMethods {
  credentialsProvider: TCredentialsProviders;
  email: string;
  password?: string;

  role: TRole;

  firstName: string;
  lastName: string;

  phoneNumber?: string;
  gender?: TGenderUser;

  birthday?: Date;
  picture?: string;
}

interface IUserMethods {
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

type TUserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, TUserModel, IUserMethods>(
  {
    credentialsProvider: {
      type: {
        provider: {
          type: String,
          enum: Object.values(CredentialsProviders),
          required: true,
        },
        id: { type: String, required: false },
      },
      required: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },

    role: {
      type: String,
      required: true,
      enum: Object.values(Roles),
      default: Roles.subscriber,
    },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    phoneNumber: { type: String, required: false },
    gender: {
      type: String,
      enum: Object.values(GendersUser),
      required: false,
    },

    birthday: { type: Date, required: false },
    picture: { type: String, required: false },
  },
  { timestamps: true }
);

userSchema.pre<IUser>(
  "save",
  async function (next: (error?: CallbackError) => void) {
    if (this.isNew || this.isModified("email")) {
      this.email = this.email.toLowerCase();
    }
    if (this.password && this.isModified("password")) {
      try {
        const salt = await genSalt(12);
        this.password = await hash(this.password, salt);
      } catch (error) {
        console.log(error);
        return next(new Error(`Error hashing password`)); // I have to handle this error with an end-handler-error middleware
      }
      next();
    }
    if (this.isNew || this.isModified("firstName")) {
      this.firstName = this.firstName.toLowerCase();
    }
    if (this.isNew || this.isModified("lastName")) {
      this.lastName = this.lastName.toLowerCase();
    }
    next();
  }
);

userSchema.method(
  "matchPassword",
  async function matchPassword(enteredPassword: string): Promise<boolean> {
    if (!this.password) {
      throw new Error("Password is not set for this user");
    }
    return compare(enteredPassword, this.password);
  }
);

const UserModel = model<IUser, TUserModel>("users", userSchema);

export default UserModel;

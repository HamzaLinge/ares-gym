import { Schema, models, model } from "mongoose";

interface ICoach {
  firstName: string;
  lastName: string;
  gender: "Male" | "Female";
  birthday: Date;
  picture: string;
  email: string;
}

const coachSchema = new Schema<ICoach>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    birthday: { type: Date, required: true },
    picture: { type: String, required: false },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Coaches || model<ICoach>("Coaches", coachSchema);

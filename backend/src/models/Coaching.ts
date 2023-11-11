import { Schema, models, model, Types } from "mongoose";

interface ICoaching {
  idSubscriber: Types.ObjectId;
  idCoachingPlan: Types.ObjectId;
  idCoach: Types.ObjectId;
  monthNumber: number;
  datePayment: Date;
  discount: {
    idDiscount: Types.ObjectId;
    scan?: string;
  };
}

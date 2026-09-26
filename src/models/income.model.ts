import { model, Schema, Types } from "mongoose";

const incomeSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  date: { type: Date },
  income: { type: Number },
  information: { type: String },
  is_delete: { type: Boolean, default: false },
});

export const Income = model("Income", incomeSchema);

import { model, Schema } from "mongoose";

const incomeSchema = new Schema({
  date: { type: Date },
  income: { type: Number },
  information: { type: String },
});

export const Income = model("Income", incomeSchema);

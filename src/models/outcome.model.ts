import { model, Schema, Types } from "mongoose";

const outcomeSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  date: { type: Date },
  outcome: { type: Number },
  category: { type: String },
  information: { type: String },
  is_delete: { type: Boolean, default: false },
  amountTotal: { type: Number },
});

export const Outcome = model("Outcome", outcomeSchema);

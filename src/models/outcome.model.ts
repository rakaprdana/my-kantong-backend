import { model, Schema } from "mongoose";

const outcomeSchema = new Schema({
  date: { type: Date },
  outcome: { type: Number },
  category: { type: String },
  information: { type: String },
  is_delete: { type: Boolean, default: false },
});

export const Outcome = model("Outcome", outcomeSchema);

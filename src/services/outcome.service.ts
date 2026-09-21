import { IOutcome } from "../interfaces/outcome";
import { Outcome } from "../models/outcome.model";
import { paginate } from "../utils/generatePagination";

export class OutcomeService {
  static addOutcome = async (data: IOutcome) => {
    const newItem = new Outcome(data);
    return await newItem.save();
  };

  static getInfoOutcome = async (page: number, limit: number) => {
    return paginate(Outcome, { is_delete: false }, page, limit);
  };

  static getInfoOutcomeById = async (id: string) => {
    const item = await Outcome.findById(id);
    return item;
  };
  static deletedOutcome = async (id: string) => {
    const deleted = await Outcome.findByIdAndUpdate(
      id,
      { is_delete: true },
      { new: true },
    );
    return deleted;
  };
}

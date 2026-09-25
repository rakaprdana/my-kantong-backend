import { IOutcome } from "../interfaces/outcome";
import { Outcome } from "../models/outcome.model";
import { paginate } from "../utils/generatePagination";

export class OutcomeService {
  static addOutcome = async (data: IOutcome) => {
    const newItem = new Outcome(data);
    return await newItem.save();
  };

  static getInfoOutcome = async (
    userId: string,
    page: number,
    limit: number,
  ) => {
    return paginate(Outcome, { is_delete: false, userId }, page, limit);
  };

  static getInfoOutcomeById = async (id: string, userId: string) => {
    const item = await Outcome.findOne({ _id: id, userId, is_delete: false });
    return item;
  };
  static deletedOutcome = async (id: string, userId: string) => {
    const deleted = await Outcome.findOneAndUpdate(
      { _id: id, userId },
      { is_delete: true },
      { new: true },
    );
    return deleted;
  };
  static getTotalOutcome = async (userId: string) => {
    const resultTotal = await Outcome.aggregate([
      { $match: { is_delete: false, userId } },
      { $group: { _id: null, total: { $sum: "$outcome" } } },
    ]);

    return resultTotal[0]?.total ?? 0;
  };
  static getMonthlyOutcome = async (year: number) => {
    return Outcome.aggregate([
      {
        $match: {
          is_delete: false,
          date: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31T23:59:59.999Z`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$outcome" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  };
  static getOutcomeByCategory = async () => {
    return Outcome.aggregate([
      {
        $match: { is_delete: false },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$outcome" },
        },
      },
      { $sort: { total: -1 } },
    ]);
  };
}

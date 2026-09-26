import { IIncome } from "../interfaces/income";
import { Income } from "../models/income.model";
import { paginate } from "../utils/generatePagination";

export class IncomeServices {
  static addIncome = async (data: IIncome) => {
    const newItem = new Income(data);
    return await newItem.save();
  };

  static getInfoIncome = async (
    userId: string,
    page: number,
    limit: number,
  ) => {
    return paginate(Income, { is_delete: false, userId }, page, limit);
  };
  static getTotalIncome = async (userId: string) => {
    const resultTotal = await Income.aggregate([
      { $match: { is_delete: false, userId } },
      { $group: { _id: null, total: { $sum: "$income" } } },
    ]);
    return resultTotal[0]?.total ?? 0;
  };
  static deletedIncome = async (id: string, userId: string) => {
    const deleted = await Income.findOneAndUpdate(
      { _id: id, userId },
      { is_delete: true },
      { new: true },
    );
    return deleted;
  };
}

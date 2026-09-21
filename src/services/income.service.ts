import { IIncome } from "../interfaces/income";
import { Income } from "../models/income.model";
import { paginate } from "../utils/generatePagination";

export class IncomeServices {
  static addIncome = async (data: IIncome) => {
    const newItem = new Income(data);
    return await newItem.save();
  };

  static getInfoIncome = async (page: number, limit: number) => {
    return paginate(Income, {}, page, limit);
  };
  static getTotalIncome = async () => {
    const resultTotal = await Income.aggregate([
      { $group: { _id: null, total: { $sum: "$income" } } },
    ]);
    return resultTotal[0]?.total ?? 0;
  };
}

import { IIncome, UpdateIncomeData } from "../interfaces/income";
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
  static getIncomeById = async (id: string, userId: string) => {
    const item = await Income.findOne({ _id: id, userId, is_delete: false });
    return item;
  };
  static updateItemIncome = async (
    id: string,
    userId: string,
    data: UpdateIncomeData,
  ) => {
    const { income, information } = data;
    const payload: Record<string, unknown> = {};

    if (income !== undefined) payload.income = income;
    if (information !== undefined) payload.information = information;

    return await Income.findOneAndUpdate(
      { _id: id, userId, is_delete: false },
      { $set: payload },
      { new: true, runValidators: true },
    );
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

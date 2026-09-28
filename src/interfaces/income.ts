export interface IIncome {
  date: Date;
  income: number;
  information: string;
}
export type UpdateIncomeData = Partial<Pick<IIncome, "income" | "information">>;

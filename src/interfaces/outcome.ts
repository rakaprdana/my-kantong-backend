export interface IOutcome {
  date: Date;
  outcome: number;
  category: string;
  information: string;
}

export type UpdateOutcomeData = Partial<
  Pick<IOutcome, "outcome" | "information">
>;

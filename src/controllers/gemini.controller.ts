import { Request, Response } from "express";
import { OutcomeService } from "../services/outcome.service";
import { GeminiService } from "../services/gemini.service";
import { toAPIResponse } from "../const/responses";
import { responses } from "../const/const";

export class GeminiController {
  static getMonthlyChartInsight = async (req: Request, res: Response) => {
    try {
      const year = parseInt(
        (req.query.year as string) || `${new Date().getFullYear()}`,
        10,
      );
      const chartData = await OutcomeService.getMonthlyOutcome(year);

      let insight: string | null = null;
      let insightError: string | null = null;

      try {
        insight = await GeminiService.generaticChartInsight(
          `pengeluaran per bulan tahun ${year}`,
          chartData,
        );
      } catch (error) {
        console.error("Gemini insight error:", error);
        insightError = "Insight AI sedang tidak tersedia, coba lagi nanti.";
      }

      return res.status(200).json(
        toAPIResponse(200, true, responses.successGetItem, {
          chartData,
          insight,
          insightError,
        }),
      );
    } catch (error) {
      console.error("Chart data error:", error);
      return res
        .status(500)
        .json(toAPIResponse(500, false, responses.serverError, error));
    }
  };

  static getCategoryChartInsight = async (req: Request, res: Response) => {
    try {
      const chartData = await OutcomeService.getOutcomeByCategory();
      const insight = await GeminiService.generaticChartInsight(
        "pengeluaran per kategori",
        chartData,
      );
      return res.status(200).json(
        toAPIResponse(200, true, responses.successGetItem, {
          chartData,
          insight,
        }),
      );
    } catch (error) {
      return res
        .status(500)
        .json(toAPIResponse(500, false, responses.serverError, error));
    }
  };
}

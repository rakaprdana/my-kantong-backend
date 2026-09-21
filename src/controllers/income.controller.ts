import { Request, Response } from "express";
import { IncomeServices } from "../services/income.service";
import { toAPIResponse } from "../const/responses";
import { responses } from "../const/const";

export class IncomeController {
  static inputIncome = async (req: Request, res: Response) => {
    try {
      const newIncome = await IncomeServices.addIncome(req.body);
      if (!newIncome) {
        res
          .status(400)
          .json(toAPIResponse(400, false, responses.errorCreateItem));
      }

      return res
        .status(201)
        .json(toAPIResponse(200, true, responses.successCreateItem));
    } catch (error) {
      res.status(500).json(toAPIResponse(500, false, responses.serverError));
    }
  };

  static getAllInfoIncome = async (req: Request, res: Response) => {
    try {
      const page = parseInt((req.query.page as string) || "1");
      const limit = parseInt((req.query.page as string) || "10");
      const result = await IncomeServices.getInfoIncome(page, limit);
      if (!result) {
        res.status(400).json(toAPIResponse(400, false, responses.errorGetItem));
      }

      return res
        .status(200)
        .json(toAPIResponse(200, true, responses.successGetItem));
    } catch (error) {
      res.status(500).json(toAPIResponse(500, false, responses.serverError));
    }
  };
}

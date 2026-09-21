import { Request, Response } from "express";
import { OutcomeService } from "../services/outcome.service";
import { toAPIResponse } from "../const/responses";
import { responses } from "../const/const";

export class OutcomeController {
  static inputOutcome = async (req: Request, res: Response) => {
    try {
      const newOutcome = await OutcomeService.addOutcome(req.body);
      if (!newOutcome) {
        res
          .status(400)
          .json(toAPIResponse(400, false, responses.errorCreateItem));
      }

      return res
        .status(201)
        .json(
          toAPIResponse(201, true, responses.successCreateItem, newOutcome),
        );
    } catch (error) {
      res
        .status(500)
        .json(toAPIResponse(500, false, responses.serverError, error));
    }
  };
  static getAllInfoOutcome = async (req: Request, res: Response) => {
    try {
      const page = parseInt((req.query.page as string) || "1", 10);
      const limit = parseInt((req.query.limit as string) || "10", 10);
      const result = await OutcomeService.getInfoOutcome(page, limit);
      if (!result) {
        res.status(400).json(toAPIResponse(400, false, responses.errorGetItem));
      }
      return res
        .status(200)
        .json(toAPIResponse(200, true, responses.successGetItem, result));
    } catch (error) {
      return res
        .status(500)
        .json(toAPIResponse(500, false, responses.serverError, error));
    }
  };
  static getOutcomeById = async (req: Request, res: Response) => {
    try {
      const outcomeId = req.params.id;
      const outcome = await OutcomeService.getInfoOutcomeById(
        outcomeId as string,
      );
      if (!outcome) {
        res.status(400).json(toAPIResponse(400, false, responses.errorGetItem));
        return res
          .status(200)
          .json(toAPIResponse(200, true, responses.successGetItem, outcome));
      }
    } catch (error) {
      return res
        .status(500)
        .json(toAPIResponse(500, false, responses.serverError, error));
    }
  };
  static deleteOutcome = async (req: Request, res: Response) => {
    try {
      const outcomeId = req.params.id;
      const outcome = await OutcomeService.deletedOutcome(outcomeId as string);
      if (!outcome) {
        res
          .status(400)
          .json(toAPIResponse(400, false, responses.errorDeleteItem));
        return res
          .status(200)
          .json(toAPIResponse(200, true, responses.successDeleteItem, outcome));
      }
    } catch (error) {
      return res
        .status(500)
        .json(toAPIResponse(500, false, responses.serverError, error));
    }
  };
}

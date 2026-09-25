import { Router } from "express";
import { OutcomeController } from "../controllers/outcome.controller";
import { authMiddleware } from "../middlewares/auth-middleware";

export const OutcomeRoute = Router();

OutcomeRoute.post("/outcome", authMiddleware, OutcomeController.inputOutcome);
OutcomeRoute.get(
  "/outcome/total",
  authMiddleware,
  OutcomeController.getTotalOutcome,
);
OutcomeRoute.get(
  "/outcome",
  authMiddleware,
  OutcomeController.getAllInfoOutcome,
);
OutcomeRoute.get(
  "/outcome/:id",
  authMiddleware,
  OutcomeController.getOutcomeById,
);
OutcomeRoute.get(
  "/chart/monthly",
  authMiddleware,
  OutcomeController.getMonthlyChart,
);
OutcomeRoute.get(
  "/chart/category",
  authMiddleware,
  OutcomeController.getCategoryChart,
);
OutcomeRoute.delete(
  "/outcome/:id",
  authMiddleware,
  OutcomeController.deleteOutcome,
);

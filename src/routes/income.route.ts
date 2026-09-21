import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { IncomeController } from "../controllers/income.controller";

export const IncomeRoute = Router();

IncomeRoute.use(authMiddleware);
IncomeRoute.post("/income", authMiddleware, IncomeController.inputIncome);
IncomeRoute.get("/income", authMiddleware, IncomeController.getAllInfoIncome);
IncomeRoute.get(
  "/income/total",
  authMiddleware,
  IncomeController.getTotalIncom,
);

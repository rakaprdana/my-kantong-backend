import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { GeminiController } from "../controllers/gemini.controller";

export const GeminiRoute = Router();

GeminiRoute.use(authMiddleware);
GeminiRoute.get(
  "/insight/monthly",
  authMiddleware,
  GeminiController.getMonthlyChartInsight,
);
GeminiRoute.get(
  "/insight/category",
  authMiddleware,
  GeminiController.getCategoryChartInsight,
);

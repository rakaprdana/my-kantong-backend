import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { UserRoute } from "./routes/user.route";
import corsOptions from "./config/cors";
import { OutcomeRoute } from "./routes/outcome.route";
import { IncomeRoute } from "./routes/income.route";
import { GeminiRoute } from "./routes/gemini.route";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/auth", UserRoute);
app.use("/api", OutcomeRoute);
app.use("/api", IncomeRoute);
app.use("/api/gemini", GeminiRoute);
export default app;

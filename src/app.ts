import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { UserRoute } from "./routes/user.route";
import corsOptions from "./config/cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/auth", UserRoute);

export default app;

import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export const UserRoute = Router();

UserRoute.post("/register", AuthController.register);
UserRoute.post("/login", AuthController.login);

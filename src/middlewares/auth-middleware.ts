import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { getEnv } from "../utils/getEnv";
import { CustomRequest } from "../interfaces/custom-req";
import { IUser } from "../interfaces/user";
import { CustomErrors } from "../interfaces/custom-error";
export const authMiddleware = (
  req: CustomRequest,
  _: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new CustomErrors(
        401,
        "Unauthorized",
        "Token not provided or invalid format",
      ),
    );
  }

  const token = authHeader.split(" ")[1];
  if (token) {
    jwt.verify(token, getEnv("JWT_SECRET"), (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return next(new CustomErrors(403, "Forbidden", "Token expired"));
        } else if (err.name === "JsonWebTokenError") {
          return next(new CustomErrors(403, "Forbidden", "Invalid token"));
        }
        return next(
          new CustomErrors(403, "Forbidden", "Token verification failed"),
        );
      }
      req.user = decoded as unknown as IUser;
      next();
    });
  }
};

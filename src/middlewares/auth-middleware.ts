import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/user";
import { AuthRequest } from "../interfaces/auth-request";
import { responses } from "../const/const";
import { toAPIResponse } from "../const/responses";
import { User } from "../models/user.model";
export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  let token: string;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
      };

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res
          .status(404)
          .json(toAPIResponse(404, false, responses.errorNotFound));
      }

      req.user = user as unknown as IUser;
      next();
    } catch (error) {
      return res.status(400).json(toAPIResponse(400, false, "Invalid token"));
    }
  } else {
    return res
      .status(401)
      .json(
        toAPIResponse(401, false, "Access denied, please check your token"),
      );
  }
};

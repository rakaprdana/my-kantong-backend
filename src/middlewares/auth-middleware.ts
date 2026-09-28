import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/user";
import { responses } from "../const/const";
import { toAPIResponse } from "../const/responses";
import { User } from "../models/user.model";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token = req.cookies?.token;

  if (
    !token &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (token) {
    try {
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
      return res
        .status(401)
        .json(toAPIResponse(401, false, "Invalid or expired token"));
    }
  } else {
    return res
      .status(401)
      .json(
        toAPIResponse(401, false, "Access denied, please check your token"),
      );
  }
};

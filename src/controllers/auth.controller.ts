import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { toAPIResponse } from "../const/responses";
import { responses } from "../const/const";

export class AuthController {
  static register = async (req: Request, res: Response) => {
    try {
      const regis = await AuthService.register(req.body);
      if ("error" in regis) {
        switch (regis.error) {
          case "USER_ISEXIST":
            res
              .status(400)
              .json(toAPIResponse(400, false, responses.userIsExist));
          case "INVALID_PASSWORD":
            res
              .status(400)
              .json(toAPIResponse(400, false, responses.errorSignUp));
        }
      }

      return res
        .status(201)
        .json(toAPIResponse(201, true, responses.successSignUp, regis));
    } catch (error) {
      return res
        .status(500)
        .json(toAPIResponse(500, false, responses.serverError, error));
    }
  };

  static login = async (req: Request, res: Response) => {
    try {
      const login = await AuthService.login(req.body);
      if ("error" in login) {
        if (login.error === "INVALID_LOGIN")
          return res
            .status(400)
            .json(toAPIResponse(400, false, responses.errorField));
        if (login.error === "INVALID_PASSWORD")
          return res
            .status(400)
            .json(toAPIResponse(400, false, responses.errorSignIn));
      }

      // Set token ke HttpOnly Cookie
      res.cookie("token", login.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Gunakan true (HTTPS) saat production
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // Umur cookie (contoh: 1 hari)
      });

      const { token, ...userData } = login;

      return res
        .status(200)
        .json(toAPIResponse(200, true, responses.successSignIn, userData));
    } catch (error) {
      res
        .status(500)
        .json(toAPIResponse(500, false, responses.serverError, error));
    }
  };

  static logout = async (req: Request, res: Response) => {
    try {
      await AuthService.logout();

      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res
        .status(200)
        .json(toAPIResponse(200, true, responses.successLogOut));
    } catch (error) {
      return res
        .status(500)
        .json(toAPIResponse(500, false, responses.serverError, error));
    }
  };
}

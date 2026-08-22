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
        switch (login.error) {
          case "INVALID_LOGIN":
            res
              .status(400)
              .json(toAPIResponse(400, false, responses.errorField));
          case "INVALID_PASSWORD":
            res
              .status(400)
              .json(toAPIResponse(400, false, responses.errorSignIn));
        }
      }

      res
        .status(200)
        .json(toAPIResponse(200, true, responses.successSignIn, login));
    } catch (error) {
      res
        .status(500)
        .json(toAPIResponse(500, false, responses.serverError, error));
    }
  };
}

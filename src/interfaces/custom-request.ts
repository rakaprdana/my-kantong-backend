import { Request } from "express";
import session from "express-session";

interface SessionData extends session.Session {
  user?: any;
}

export interface CustomRequest extends Request {
  session: SessionData;
}

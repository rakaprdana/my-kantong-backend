import { CorsOptions } from "cors";

const allowedOrigin = [
  "http://localhost:5173",
  "http://localhost:3000",
  "URL_DEPLOYMENT",
];

export const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin || allowedOrigin.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(
        new Error(`CORS error: Origin ${origin} is not allowed by CORS Policy`),
      );
    }
  },

  methods: ["GET", "PUT", "DELETE", "POST"],
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;

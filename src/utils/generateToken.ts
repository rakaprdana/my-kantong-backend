import jwt from "jsonwebtoken";

export function generateToken(id: string) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret)
    throw new Error("JWT_SECRET is missing, please check your JWT_SECRET");

  return jwt.sign({ id }, jwtSecret, { expiresIn: "5hr" });
}

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function createToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })
}

export function verifyToken(toekn: string) {
  return jwt.verify(toekn, JWT_SECRET)
}

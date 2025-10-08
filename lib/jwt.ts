import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET!;


export function createToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" })
}

export function verifyToken(token: string) {
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    if (typeof payload === "string") return null;
    return payload as jwt.JwtPayload & { type: string };
  } catch {
    return null;
  }
}




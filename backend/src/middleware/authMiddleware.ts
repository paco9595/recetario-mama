import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = "tu_clave_secreta";

// Extendemos Request para incluir `user`
export interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

// Middleware con firma estándar de Express
export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  console.log(token)
  if (!token) {
    res.status(401).json({ error: "Token no proporcionado" });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    (req as AuthRequest).user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Token inválido" });
    return;
  }
};  
import { ZodError } from "zod";
import { Response, NextFunction, Request } from "express";

export default function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error("[ERROR]", err);
  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      data: null,
      error: err.errors.map(e => ({
        error: "Datos inválidos",
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  res.status(status).json({
    success: false,
    error: message,
    data: null,
  });
}
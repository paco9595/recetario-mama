import { ZodError, ZodIssue } from "zod";
import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error("[ERROR]", err); 
  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";
  if (err instanceof ZodError) {
    return res.status(400).json({
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
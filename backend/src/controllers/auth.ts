import { NextFunction, Request, Response } from "express";
import { createUserService } from "../services/authService";

export async function callback(req: Request, res: Response, next: NextFunction) {
  const event = req.body;
  if (event.type === 'email.created') {
    const { id, to_email_address: email, first_name, last_name  } = event.data;

    try {
      await createUserService(id, email, `${first_name} ${last_name}`)
      res.status(200).send('User inserted');
    } catch (error) {
      next(error);
    }
  } else {
    res.status(204).send(); // Evento no manejado
  }
}
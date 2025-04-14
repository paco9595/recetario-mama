import { NextFunction, Request, Response } from "express";
import { createUserService } from "../services/authService";

export async function callback(req: Request, res: Response, next: NextFunction) {
  const event = req.body;
  console.log(req.body)
  if (event.type === 'user.created') {
    const { id, email_addresses, first_name, last_name } = event.data;
    const email = email_addresses?.[0]?.email_address || null;

    try {
      // await createUserService(id, email_addresses, `${first_name} ${last_name}`)
      res.status(200).send('User inserted');
    } catch (error) {
      next(error);
    }
  } else {
    res.status(204).send(); // Evento no manejado
  }
}
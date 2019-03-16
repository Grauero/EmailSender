import { IUser } from '../models/User';
import { Response, Request } from 'express';

export interface UserRequest extends Request {
  user?: IUser;
}

export default function requireLogin(
  req: UserRequest,
  res: Response,
  next: Function
) {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in' });
  }

  next();
}

import { IUser } from '../models/User';
import { Response, Request } from 'express';

export interface UserRequest extends Request {
  user?: IUser;
}

export default function requireCredits(
  req: UserRequest,
  res: Response,
  next: Function
) {
  if (req.user && req.user.credits < 1) {
    return res.status(403).send({ error: 'Not enough credits' });
  }

  next();
}

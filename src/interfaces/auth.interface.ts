import { Request } from 'express';
import { Author } from '@interfaces/authors.interface';

export interface DataStoredInToken {
  _id: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: Author;
}

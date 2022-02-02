import { NextFunction, Request, Response } from 'express';
import { CreateAuthorDto, LoginAuthorDto } from '@dtos/author.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { Author } from '@interfaces/authors.interface';
import AuthService from '@services/auth.service';
import { removePasswordFromUser } from '@/utils/util';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateAuthorDto = req.body;
      const signUpUserData: Author = await this.authService.signup(userData);
      res.status(201).json({ data: removePasswordFromUser(signUpUserData), message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginAuthorDto = req.body;
      const { cookie, findUser, token } = await this.authService.login(userData);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: removePasswordFromUser(findUser), message: 'login', token });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: Author = req.user;
      const logOutUserData: Author = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: removePasswordFromUser(logOutUserData), message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;

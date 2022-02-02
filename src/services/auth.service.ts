import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { CreateAuthorDto, LoginAuthorDto } from '@dtos/author.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { Author } from '@interfaces/authors.interface';
import authorModel from '@models/authors.model';
import { isEmpty } from '@utils/util';

class AuthService {
  public authors = authorModel;

  public async signup(authorData: CreateAuthorDto): Promise<Author> {
    if (isEmpty(authorData)) throw new HttpException(400, "You're not userData");

    const findAuthor: Author = await this.authors.findOne({ email: authorData.email });
    if (findAuthor) throw new HttpException(409, `You're email ${authorData.email} already exists`);

    const hashedPassword = await bcrypt.hash(authorData.password, 10);
    const createAuthorData: Author = await this.authors.create({ ...authorData, password: hashedPassword });

    return createAuthorData;
  }

  public async login(userData: LoginAuthorDto): Promise<{ cookie: string; findUser: Author; token: string }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: Author = await this.authors.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser, token: tokenData.token };
  }

  public async logout(userData: Author): Promise<Author> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: Author = await this.authors.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    return findUser;
  }

  public createToken(user: Author): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;

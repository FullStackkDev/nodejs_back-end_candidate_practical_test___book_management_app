import bcrypt from 'bcrypt';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';
import authorModel from '@/models/authors.model';
import { Author } from '@/interfaces/authors.interface';
import { CreateAuthorDto } from '@/dtos/author.dto';

class UserService {
  public users = authorModel;

  public async findAllUser(): Promise<Author[]> {
    const users: Author[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<Author> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    const findUser: Author = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateAuthorDto): Promise<Author> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: Author = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: Author = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async updateUser(userId: string, userData: CreateAuthorDto): Promise<Author> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    if (userData.email) {
      const findUser: Author = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: Author = await this.users.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) throw new HttpException(409, "You're not user");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<Author> {
    const deleteUserById: Author = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");

    return deleteUserById;
  }
}

export default UserService;

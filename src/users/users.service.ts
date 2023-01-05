import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import keys from '../config/keys';

@Injectable()
export class UsersService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async registerUser(createUserDto: CreateUserDto) {
    const { firstName, lastName, email, password, role } = createUserDto;

    if (!firstName || !lastName || !email || !password || !role) {
      throw new HttpException('err', HttpStatus.BAD_REQUEST);
    }

    const user = await this.passwordHasher(createUserDto);

    const [{ id }] = await this.knex
      .table('users')
      .insert({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: user.role,
      })
      .returning('id');
    const token = this.createJwt({ ...user, id });
    return { firstName, lastName, email, id, role, token };
  }

  async loginUser(data: LoginUserDto) {
    const { password, email } = data;

    if (!password || !email) {
      throw new HttpException('err', HttpStatus.BAD_REQUEST);
    }

    const [user] = await this.knex.table('users').where('email', email);

    if (!user) {
      throw new NotFoundException(
        `User with the email: ${email} does not exist`,
      );
    }

    const isPasswordCorrect = await this.comparePasword(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'email or password is incorrect ',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = this.createJwt(user);

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token,
    };
  }

  async findAllUsers() {
    const users = await this.knex.table('users');
    return users;
  }

  async passwordHasher(user: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return { ...user, password: hash };
  }

  async comparePasword(password: string, hash: string) {
    const isCorrect = await bcrypt.compare(password, hash);
    return isCorrect;
  }
  createJwt(user: CreateUserDto) {
    const token = jwt.sign(user, keys.JWT_SECRETE, {
      expiresIn: keys.JWT_LIFETIME,
    });
    return token;
  }
  verifyToken(token: string) {
    const payLoad = jwt.verify(token, keys.JWT_SECRETE);
    return payLoad;
  }
}

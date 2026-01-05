import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import type { Request, Response } from 'express';

@Injectable()
export class AuthService {
  private readonly ACCESS_TOKEN_SECRET: string;
  private readonly REFRESH_TOKEN_SECRET: string;

  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.ACCESS_TOKEN_SECRET = configService.getOrThrow<string>(
      'ACCESS_TOKEN_SECRET',
    );
    this.REFRESH_TOKEN_SECRET = configService.getOrThrow<string>(
      'REFRESH_TOKEN_SECRET',
    );
  }

  async register(res: Response, dto: CreateUserDto) {
    const user = await this.userService.createUser(dto);

    return this.auth(res, user._id.toString());
  }

  async login(res: Response, dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await compare(dto.password, user.password);
    if (!isValidPassword) {
      throw new NotFoundException('Invalid password');
    }

    return this.auth(res, user._id.toString());
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'];
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token found');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        refreshToken,
        {
          secret: this.REFRESH_TOKEN_SECRET,
        },
      );

      const user = await this.userService.findById(payload.id);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      return this.auth(res, user._id.toString());
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(res: Response) {
    this.setCookie(res, 'refreshToken', new Date(0));
  }

  async validate(id: string) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  private auth(res: Response, id: string) {
    const { accessToken, refreshToken } = this.generateTokens(id);

    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    );

    return { accessToken };
  }

  private generateTokens(id: string) {
    const payload: JwtPayload = { id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '2h',
      secret: this.ACCESS_TOKEN_SECRET,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: this.REFRESH_TOKEN_SECRET,
    });

    return { accessToken, refreshToken };
  }

  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      domain: 'localhost',
      expires,
      secure: false,
      sameSite: 'lax',
    });
  }
}

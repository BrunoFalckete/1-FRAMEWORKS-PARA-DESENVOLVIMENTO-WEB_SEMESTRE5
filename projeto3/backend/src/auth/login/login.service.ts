import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { UserService } from 'src/models/user/user.service';

@Injectable()
export class LoginService {
  constructor(private readonly userService: UserService) {}

  async login(loginDto: LoginDto): Promise<LoginDto> {
    const { email, password } = loginDto;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.password !== password) {
      throw new Error("Password doesn't match");
    }

    console.log(user);
    return loginDto;
  }

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}

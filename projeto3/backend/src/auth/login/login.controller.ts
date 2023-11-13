import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Res,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { UpdateLoginDto } from './dto/update-login.dto';

type LoginResponse = {
  statusCode?: number;
  message: string;
  success: boolean;
  data: {
    email: string;
  };
};

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async check_login(@Body() createLoginDto): Promise<LoginResponse> {
    try {
      const user = await this.loginService.login(createLoginDto);
      console.log(user);
    } catch (error: any) {
      return {
        statusCode: 400,
        message: error.message,
        success: false,
        data: null,
      };
    }

    return {
      statusCode: 200,
      message: 'Login successful',
      success: true,
      data: {
        email: 'user.email',
      },
    };
  }

  @Get()
  findAll() {
    return this.loginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.update(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }
}

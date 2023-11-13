import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { UserModule } from 'src/models/user/user.module';
import { UserService } from 'src/models/user/user.service';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [LoginController],
  providers: [LoginService, UserService],
})
export class LoginModule {}

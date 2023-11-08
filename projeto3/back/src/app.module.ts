import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './model/user/user.module';
import { PurchaseModule } from './model/purchase/purchase.module';
import { ProductModule } from './model/product/product.module';
import { CategoryModule } from './model/category/category.module';

@Module({
  imports: [
    UserModule,
    PurchaseModule,
    ProductModule,
    CategoryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

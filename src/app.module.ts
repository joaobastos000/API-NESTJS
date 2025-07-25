import { Module } from '@nestjs/common';
import { ProductsModule } from './products/controller/products.module';

@Module({
  imports: [ProductsModule],
})
export class AppModule {}
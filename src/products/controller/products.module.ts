import { Logger, Module } from '@nestjs/common';
import { ProductsController } from './products.controller';

@Module({
  controllers: [ProductsController],
  providers: [Logger],
})
export class ProductsModule {}
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from 'src/dto/create-product.dto';

@Injectable()
export class ProductsService {
  private products: (CreateProductDto & { id: number })[] = [];
  private idCounter = 1;

  createMany(dtoList: CreateProductDto[]) {
    const created = dtoList.map(dto => ({
      ...dto,
      id: this.idCounter++,
    }));
    this.products.push(...created);
    return created;
  }

  findAll() {
    return this.products;
  }

  deleteById(id: number) {
    const index = this.products.findIndex(prod => prod.id === id);
    if (index === -1) return false;

    this.products.splice(index, 1);
    return true;
  }
}
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateProductDto } from '../../dto/create-product.dto';
import { UpdateProductDto } from '../../dto/update-product.dto';

// Interface local com id (baseada no DTO de criação)
interface Product extends CreateProductDto {
  id: number;
}

// Array que simula um "banco de dados" em memória
let products: Product[] = [];
let idCounter = 1; // Contador de ID incremental

@ApiTags('Products') // Agrupa os endpoints no Swagger
@Controller('products') // Define a rota base /products
export class ProductsController {
  
  @Get()
  @ApiOperation({ summary: 'List all products' }) // Descrição no Swagger
  @ApiResponse({
    status: 200,
    description: 'List of products',
    schema: {
      example: {
        data: [
          {
            id: 1,
            name: 'Relógio',
            price: 99,
            description: 'Relógio bonito',
          },
        ],
      },
    },
  })
  getAll() {
    // Retorna todos os produtos
    return { data: products };
  }

  @Post()
  @ApiOperation({ summary: 'Create products (batch)' })
  @ApiBody({ type: [CreateProductDto] }) // Espera array de produtos
  @ApiResponse({
    status: 201,
    description: 'Products created successfully',
  })
  create(@Body() body: CreateProductDto[]) {
    // Cria produtos com IDs únicos e adiciona no array
    const created = body.map(product => ({
      id: idCounter++,
      ...product,
    }));
    products.push(...created);
    return {
      message: 'Product(s) created',
      data: created,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', type: Number }) // Define o parâmetro de rota
  @ApiBody({ type: UpdateProductDto }) // Corpo esperado para atualização
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
  })
  update(
    @Param('id', ParseIntPipe) id: number, // Converte id para número
    @Body() body: UpdateProductDto,
  ) {
    // Procura o produto e atualiza, se existir
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new NotFoundException('Product not found');
    products[index] = { ...products[index], ...body };
    return {
      message: 'Product updated',
      data: products[index],
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully',
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    // Remove o produto, se existir
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new NotFoundException('Product not found');
    const deleted = products.splice(index, 1);
    return {
      message: 'Product deleted',
      data: deleted[0],
    };
  }
}

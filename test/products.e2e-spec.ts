import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';


describe('Products Controller (e2e)', () => {
      let app: INestApplication;

      beforeEach(async () => {
          const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
          }).compile();
          app = moduleFixture.createNestApplication();
          await app.init()
      });
      
      afterEach(async () => {
          await app.close(); 
        });

        it('/products POST', async () => {
          const payload = [
            {
               id: 1,
               name: 'Watch',
               price: 99,
               description: 'Fancy watch'
            },
            {
               id: 2,
               name: 'Watch',
               price: 99,
            }
          ]     
          const res = await request(app.getHttpServer())
          .post('/products')
          .send(payload)
          .expect(201)   
          
          
          
        expect(res.body).toHaveProperty('data');
        expect(res.body.data[0]).toMatchObject(payload[0]);

       expect(res.body).toEqual({
        message: 'Product(s) created',
        data: payload,
      });
        })
        
})

describe('Products controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close(); 
  });

  it('/products GET', async () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect(res => {
       expect(Array.isArray(res.body.data)).toBe(true);
         expect(res.body.data.length).toBeGreaterThan(0);
});

  });
});

describe('Products controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close(); 
  });

it('/products/:id DELETE - Delete Product', async () => {
  const res = await request(app.getHttpServer())
    .post('/products')
    .send([{ name: 'Glasses', price: 10 }])
    .expect(201);

  const id = res.body.data[0].id;

  // Exclui o produto criado
  const deleteRes = await request(app.getHttpServer())
    .delete(`/products/${id}`)
    .expect(200);

  expect(deleteRes.body).toEqual({
    message: 'Product deleted',
    data: expect.objectContaining({
      id,
    }),
  });
});

});

describe('Products controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close(); 
  });

it('/products/:id PATCH - Edit Product', async () => {
  const createRes = await request(app.getHttpServer())
    .post('/products')
    .send([{ name: 'Book', price: 50 }])
    .expect(201);

  const id = createRes.body.data[0].id;
  const updateRes = await request(app.getHttpServer())
    .patch(`/products/${id}`)
    .send({ name: 'Glasses', price: 10, description: "High-Quality Glasses" })
    .expect(200);

    
  expect(updateRes.body).toHaveProperty('data');
  expect(updateRes.body.data).toMatchObject({
    id,
    name: 'Glasses',
    price: 10,
    description: "High-Quality Glasses"
  });
});


});
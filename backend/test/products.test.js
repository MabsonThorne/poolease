const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('../routes/products');
const { initializeDatabase } = require('../config');
const { expect } = require('chai');

const app = express();
app.use(bodyParser.json());
app.use('/api/products', productsRouter);

before(async () => {
  await initializeDatabase();
});

describe('Products API', () => {
  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({
        image: 'image.png',
        name: 'Product 1',
        price: 10.5,
        quantity: 100,
        cost_price: 8.0,
        category: 'Category 1'
      });
    expect(res.statusCode).to.equal(201);
    expect(res.body).to.have.property('id');
  });

  it('should get all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});

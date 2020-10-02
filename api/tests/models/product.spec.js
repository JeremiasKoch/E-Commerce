const { Product, conn } = require('../../src/db.js');
const { expect } = require('chai').expect;

describe('User model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
}));
describe('Models Product', () => {
    beforeEach(() => Product.sync({ force: true }));
    describe('Product properties', () => {
      it('Debería pasarle las propiedades pedidas', (done) => {
    Product.create({
})
        .then(() => done(new Error('Necesita propiedades')))
        .catch(() => done());
});
  it('Debería tener un nombre', (done) => {
    Product.create({
      description: 'Tenemos el mejor producto',
      price: '160',
      stock: '10',
      categories: 'pepitos',
      images: 'medium',
      model: 'modelo del producto',
      brand: 'marca del producto',
      provider: 'Nancy'
})
        .then(() => done(new Error('Necesita un nombre válido')))
        .catch(() => done());
});
  it('Debería tener una descripción', (done) => {
    Product.create({
      name: 'Galletitas',
      price: '160',
      stock: '10',
      categories: 'pepitos',
      images: 'medium',
      model: 'modelo del producto',
      brand: 'marca del producto',
      provider: 'Nancy'
})
        .then(() => done(new Error('Necesita una descripción válida')))
        .catch(() => done());
})

  it('Debería tener un precio', (done) => {
    Product.create({
      name: 'Galletitas',
      description: 'Tenemos el mejor producto',
      stock: '10',
      categories: 'pepitos',
      images: 'medium',
      model: 'modelo del producto',
      brand: 'marca del producto',
      provider: 'Nancy'
})
        .then(() => done(new Error('Necesita un precio en números.')))
        .catch(() => done());
});
  it('Debería tener un stock', (done) => {
    Product.create({
      name: 'Galletitas',
      description: 'Tenemos el mejor producto',
      price: '169,99',
      categories: 'pepitos',
      images: 'medium',
      model: 'modelo del producto',
      brand: 'marca del producto',
      provider: 'Nancy'
})
        .then(() => done(new Error('Necesita tener un stock con números enteros.')))
        .catch(() => done());
});
  it('Debería tener una o varias categoría/s', (done) => {
    Product.create({
      name: 'Galletitas',
      description: 'Tenemos el mejor producto',
      price: '169,99',
      stock: '10',
      images: 'medium',
      model: 'modelo del producto',
      brand: 'marca del producto',
      provider: 'Nancy'
})
        .then(() => done(new Error('Necesita pertenecer al menos a una categoría.')))
        .catch(() => done());
});
  it('Debería tener un modelo', (done) => {
    Product.create({
      name: 'Galletitas',
      description: 'Tenemos el mejor producto',
      price: '169,99',
      stock: '10',
      categories: 'pepitos',
      brand: 'marca del producto',
      images: 'imagenes del producto',
      provider: 'Nancy'
})
        .then(() => done(new Error('Necesita tener al menos un modelo.')))
        .catch(() => done());
});
  it('Debería tener un proveedor', (done) => {
    Product.create({
      name: 'Galletitas',
      description: 'Tenemos el mejor producto',
      price: '169,99',
      stock: '10',
      categories: 'pepitos',
      brand: 'marca del producto',
      model: 'modelo del producto',
      images: 'imagenes del producto'
})
        .then(() => done(new Error('Necesita tener al menos un proveedor.')))
        .catch(() => done());
});
  it('Debería tener una marca', (done) => {
    Product.create({
      name: 'Galletitas',
      description: 'Tenemos el mejor producto',
      price: '169,99',
      stock: '10',
      categories: 'pepitos',
      images: 'sarasasasa',
      model: 'modelo del producto',
      provider: 'Nancy'
})
        .then(() => done(new Error('Necesita tener al menos, una marca.')))
        .catch(() => done());
});
    });
  });
});


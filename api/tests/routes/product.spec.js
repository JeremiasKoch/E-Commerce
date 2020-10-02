/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Product, conn } = require('../../src/db.js');
// import chaiProperties from 'chai-properties';
// import chaiThings from 'chai-things';
// chai.use(chaiProperties);
// chai.use(chaiThings);
// import supertest from 'supertest';
// import sinon from 'sinon';

const agent = session(app);
const product = {
  name: 'producto',
  description: 'bla bla bla',
  price: '169.99',
  stock: '10',
  categories: 'pepitos',
  images: 'https://www.google.com/images/gatitos',
  model: 'mecánico',
  brand: 'Marca del producto',
  provider: 'Hugo'
};

describe('PRODUCT routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Product.sync({ force: true })
    .then(() => Product.create(product)));
  describe('GET /products Debe devolver un array con cada producto y sus propiedades', () => {
    it('Debe devolver el nombre', () => {
      return agent
      .get('/product/')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
        
        for(let i = 0; i < res.body.length; i++){
        expect(res.body[i]).that.has.all.property( 'name' )
        }
      }) 
    }
    );
    it('Debe devolver la descripción', () => {
      return agent
      .get('/product/')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
        for(let i = 0; i < res.body.length; i++){
        expect(res.body[i]).that.has.all.property( 'description' )
        }
      }) 
    }
    );
    it('Debe devolver el precio', () => {
      return agent
      .get('/product/')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an( 'array' )
        for(let i = 0; i < res.body.length; i++){
        expect(res.body[i]).that.has.all.property( 'price' )
        }
      }) 
    }
    );
    it('Debe devolver el stock', () => {
      return agent
      .get('/product/')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
        for(let i = 0; i < res.body.length; i++){
        expect(res.body[i]).that.has.all.property( 'stock' )
        }
      }) 
    }
    );
    // it('Debe devolver la categoría', () => {
    //   return agent
    //   .get('/product/')
    //   .expect(200)
    //   .then(res => {
    //     expect(res.body).to.be.an('array')
    //     for(let i = 0; i < res.body.length; i++){
    //     expect(res.body[i]).that.has.all.property( 'categories' )
    //     }
    //   }) 
    // }
    // );
    it('Debe devolver la imagen', () => {
      return agent
      .get('/product/')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
        for(let i = 0; i < res.body.length; i++){
        expect(res.body[i]).that.has.all.property( 'images' )
        }
      }) 
    }
    );
     it('Debe devolver el model', () => {
      return agent
      .get('/product/')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
        for(let i = 0; i < res.body.length; i++){
        expect(res.body[i]).that.has.all.property( 'model' )
        }
      }) 
    }
    );
     it('Debe devolver el proveedor', () => {
      return agent
      .get('/product/')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
        for(let i = 0; i < res.body.length; i++){
        expect(res.body[i]).that.has.all.property( 'provider' )
        }
      }) 
    }
    );     
     it('Debe devolver la marca', () => {
      return agent
      .get('/product/')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
        for(let i = 0; i < res.body.length; i++){
        expect(res.body[i]).that.has.all.property( 'brand' )
        }
      }) 
    }
    );
  });
  const testProduct = {
        name: 'Teclado',
        description: 'teclado mecánico nuevo, sin usar',
        price: '25000',
        stock: '5',
        categories: 'teclado',
        images: 'tiny',
        model: 'teclado mecánico',
        brand: 'hyperx',
        provider: 'Hugo'
  }
  describe('POST /product/ Debe crear un posteo dentro de products', () => {
    beforeEach(() => Product.sync({ force: true })
    .then(() => Product.create(testProduct)));
    it('Debe contener un nombre', () => {
      return agent.post('/product/')
      .send({
        name: 'Teclado',
        description: 'Tecladomecánico',
        price: '2500',
        stock: '2',
        categories: 'teclado',
        images: 'tiny',
        model: 'teclado mecánico',
        brand: 'hyperx',
        provider: 'Hugo'
      })
      .then(page => {
        Product.findOne({})
        .then( page => {
        expect(page).to.exist;
      })
      })
      .catch(err => console.log(err));
    })
  })
  describe('PUT /product/:id Debe retornar el producto modificado', () => {
    it('Debe cambiar el nombre', () => {
      beforeEach(() => Product.sync({ force: true })
      .then(() => Product.create(testProduct)));
      return agent
      .put('/product/1')
      .expect(201)
      .send({
        name: 'gatito mimoso'
      })
      .then(page => {
        Product.findOne({})
        .then( page => {
          console.log("Así quedó editado :) ",page)
        expect(page).to.exist;
      })
      })
      .catch(err => console.log(err));
    })
  })
  describe('DELETE /product/:id Debe eliminar el producto por ID', () => {
    it('Debe destruir el producto por id, y removerlo de la faz de la galaxia', () => {
      beforeEach(() => Product.sync({ force: true })
      .then(() => Product.create(testProduct)));
      return agent
      .delete('/product/1')
      .expect(302)
      .then(page => {
        Product.findAll({})
        .then( page => {
          console.log("Así quedó todo eliminado ", page);
      })
      })
      .catch(err => console.log(err));
    })
  }) 

  describe('GET /product/:id Debe mostrar el producto pasado por params', () => {
      it('Debe mostrar las propiedades del producto', () => {
    beforeEach(() => Product.sync({ force: true }))
    return agent
    .get(`/product/1`)
    .expect(200)
    .then(() => Product.create(testProduct))
      .then( res => Product.findOne({
        where: {
          id: 1
        }
      })
      .then(resp => console.log("Esto es lo que muestra :) ", resp))
      .catch(err => console.log(err))
      )
  })
});
})

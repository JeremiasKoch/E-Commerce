/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Category, conn } = require('../../src/db.js');
// import chaiProperties from 'chai-properties';
// import chaiThings from 'chai-things';
// chai.use(chaiProperties);
// chai.use(chaiThings);
// import supertest from 'supertest';
// import sinon from 'sinon';

const agent = session(app);
const categorie = {
     // mouse // keyboard // microphone // headset // padmouse // graphic_card // processador // 
  name: 'mouse',
  description: 'Mouse gaming, ergonómico, de oficina.'
};

describe('CATEGORY routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Category.sync({ force: true })
    .then(() => Category.create(categorie)));
  describe('GET /products Debe devolver un array con cada producto y sus propiedades', () => {
    it('Debe devolver el nombre', () => {
      return agent
      .get('/category/')
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
      .get('/category/')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
        for(let i = 0; i < res.body.length; i++){
        expect(res.body[i]).that.has.all.property( 'description' )
        }
      }) 
    }
    );
  });
  const testCategory = {
        name: 'Teclado',
        description: 'teclado de membrana, teclado simil-mecánico, teclado mecánico'
  }
  describe('POST /product/ Debe crear un posteo dentro de products', () => {
    beforeEach(() => Category.sync({ force: true }));
    it('Debe contener un nombre', () => {
      return agent
      .post('/category/')
      .send({
        name: 'Teclado',
        description: 'Tecladomecánico',
      })
      .then(page => {
        Category.findOne({})
        .then( page => {
        expect(page).to.exist;
      })
      })
      .catch(err => console.log(err));
    })
  })
  describe('PUT /category/:id Debe retornar la categoría', () => {
    it('Debe cambiar la descripción', () => {
      beforeEach(() => Category.sync({ force: true })
      .then(() => Category.create(testCategory)));
      return agent
      .put('/category/1')
      .expect(201)
      .send({
        description: 'gatito mimoso'
      })
      .then(page => {
        Category.findOne({})
        .then( page => {
          console.log("Así quedó la categoría editada :) ",page)
        expect(page).to.exist;
      })
      })
      .catch(err => console.log(err));
    })
  })
  describe('DELETE /category/:id Debe eliminar la categoría por ID', () => {
    it('Debe destruir la categoría por id, y removerlo de la faz de la galaxia', () => {
      beforeEach(() => Category.sync({ force: true })
      .then(() => Category.create(testCategory)));
      return agent
      .delete('/category/1')
      .expect(302)
      .then(page => {
        Category.findAll({})
        .then( page => {
          console.log("Así quedaron las categorías, eliminadas ", page);
      })
      })
      .catch(err => console.log(err));
    })
  }) 

  describe('GET /category/:idProduct Debe mostar todos los productos por categoría', () => {
      it('Debe mostrar los productos por categoría', () => {
    beforeEach(() => Category.sync({ force: true }))
    return agent
    .get(`/category/1`)
    .expect(200)
    .then(() => Category.create(testCategory))
      .then( res => Category.findOne({
        where: {
          id: 1
        }
      })
      .then(resp => console.log("Esto es lo que muestra la categoría ", resp))
      .catch(err => console.log(err))
      )
  })
});
})

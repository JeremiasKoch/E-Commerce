import React from 'react';
import { Link } from 'react-router-dom';
// import Categorias from '../../icons/categories.png';
// import Productos from '../../icons/products.png';
import './adminPageCss.css'
import Navbar from '../barraNav/Nav'

const Admin = () => {
  return (
    <div>
      <Navbar />
    
    <div>
      <div className="fatherCards"> 
      <Link to='/admin/orders' >
        <div className="cardSarasa">
          <div className=''>
            <i class="fas fa-file-invoice-dollar fa-9x"></i>
          </div>  
          <div className='correctPosition'>
            <p class="card-text btn btn-light addColor">ORDERS</p>
          </div>
        </div>
      </Link>
      <Link to='/admin/product'>
        <div className="cardSarasa">
          <div className="">
            <i class="fas fa-cart-arrow-down fa-9x"></i>
            <div className='correctPositionProduct'>
              <p class="card-text btn btn-light addColor">PRODUCTS</p>
            </div> 
          </div>
        </div>
      </Link>
      <Link to='/admin/category'>
        <div className="cardSarasa">
          <div className="">
            <i class="far fa-list-alt fa-9x"></i>
            <div className='correctPositionProduct'>
              <p class="card-text btn btn-light addColor">CATEGORIES</p>
            </div> 
          </div>
        </div>
      </Link>
      <Link to='/admin/clients'>
        <div className="cardSarasa">
          <div className="">
            <i class="fas fa-users fa-9x"></i>
            <div className='correctPositionProduct'>
              <p class="card-text btn btn-light addColor">CLIENTS</p>
            </div> 
          </div>
        </div>
      </Link>
        {/* <div className="cardCategories">
        <Link to='/admin/usuarios'>
        <img src={HomeImage} class="card-img-top" alt="..."/>
        <div class="card-body">
        <p class="card-text">USUARIOS</p>
        </div>
        </Link>
        </div> */}
      </div>
    </div>
    </div>
  )
}

export default Admin;
import React from "react";
import { Link } from "react-router-dom";
import ShopPng from '../../icons/shop.png'
import './botonCarritoCss.css'

function Shop() {

    return (
      <div>
         <Link
          to='/order/products'
        >
        <div className='imgBox'>
          <button className='btn btn-primary'>
            <img src={ShopPng} className='buttomCarrito'  alt="..."/>
          </button>
        </div>
        
        </Link>
      </div>
    );
  }
  export default Shop;
  

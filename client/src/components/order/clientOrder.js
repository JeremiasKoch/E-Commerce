import React, { useEffect } from 'react';
import "./clientOrder.css";
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions/actionsCart';
import * as actionsOrd from '../../redux/actions/actionsOrder';
import CartProduct from './cartProduct';
import Navbar from '../barraNav/Nav'

const ClientOrder = () => {
  const dispatch = useDispatch();
  const cartSelector = useSelector(state => state.cartReducer.cart);
  const data = [];

  // useEffect(() => {
  //   if(sessionStorage.length){
  //     debugger;
  //     // Acá hay que cambiar el '3' por el id del usuario loggueado
  //     dispatch(actions.getCart())
  //   }
  //   // else 
  //   else if(localStorage.length){
  //     for (const ls in localStorage) {
  //       if(ls.includes('prodId')){
  //        data.push(localStorage.getItem(ls));
  //       }
  //     }
  //   }
  // }, []);

  return(
    <div>
      <Navbar />
    {
            <CartProduct />
    }
    </div>
  )
}

export default ClientOrder;
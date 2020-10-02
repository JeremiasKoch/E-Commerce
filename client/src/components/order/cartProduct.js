import React, { useEffect, useState  } from 'react';
import "./clientOrder.css";
import { useDispatch, useSelector } from 'react-redux';
import * as actionsOrd from '../../redux/actions/actionsOrder';
import * as actionsCart from '../../redux/actions/actionsCart';
import './cartProduct.css';
import UniqueProduct from './uniqueProductCart';
import { Link } from 'react-router-dom';
import Review from '../reviews/Reviews';



// Cuando el usuario no esta registrado, esta función va a afectar
// el estado de la quantity del localStorage
// Esto es para los botones de + && - de quantity
// localStorage.setItem(`prodId: ${productoId}`, JSON.stringify({id: productoId, quantity: newQuantity}))
// ================================================================
// Cuando el usuario no esta registrado, puede eliminar productos 
// de su carrito
// Esto es para el tachito
// localStorage.removeItem(`prodId: ${productoId}`)
// ================================================================
// Cuando el usuario no esta registrado, puede eliminar todos los 
// productos de su carrito
// Esto es para vaciar el carrito
// localStorage.clear()
// ================================================================

const CartProduct = () => {
  const currentCartSelector = useSelector(state => state.cartReducer.cart);
  const dispatch = useDispatch();
  const [dataLS, setDataLS] = useState([]);
  const [cart, setCart] = useState([]);
  let data = [];
  let sumaTotal = 0;

  useEffect(() => {
    if(sessionStorage.length){
      dispatch(actionsCart.getCart());
    }
    else if(localStorage.length){
      for (const ls in localStorage) {
        if(ls.includes('prodId')){
         data.push(JSON.parse(localStorage.getItem(ls)));
        }
      }
      setDataLS(data);
    }
  }, []);

  const handleQuantityChangeData = (productoId, newQuantity) => {
    setDataLS(
      dataLS.map(item => {
        if (item.id === productoId){
          item.quantity = newQuantity;
      
          localStorage.removeItem(`prodId${productoId}`);
          localStorage.setItem(`prodId${productoId}`, JSON.stringify({id: item.id, name: item.name, model: item.model, price: item.price, quantity: newQuantity, stock: item.stock}));
            return item;
        }
          return  item;
      })
    );
  }

  const handleQuantityChange = (productoId, newQuantity) => {
    setCart(
      currentCartSelector[0].products.map(item => {
        console.log(item)
        if (item.id === productoId){
          item.Cart_Product.quantity = newQuantity
      
          dispatch(actionsCart.updateCartProductQuantity({id: item.id, quantity: newQuantity}))
            return item
        }
          return  item  
      })
    )
  };

  const handleBuy = () => {
    dispatch(actionsCart.updateProductStock(currentCartSelector[0].products)).then(() => window.location.reload(false));

  }

  if(currentCartSelector.length > 0){
    for (let prod of currentCartSelector[0].products){
      sumaTotal += prod.price * prod.Cart_Product.quantity;  
    }
  }
  else if(dataLS.length > 0){
    for (let prod of dataLS){
      sumaTotal += prod.price * prod.quantity;
    }
  }

  return (
    <div className="ingresa setBoxCart">
      <div className='pb-4'>
        <h1>Shopping Cart</h1>
      </div>
        <div className="boxCard">
        {
          currentCartSelector.length === 0 && dataLS.length === 0 ?
          <div className='alert alert-danger'>SU CARRITO ESTA VACIO</div>
          :
          <div>
            {
              currentCartSelector.length > 0 ? 
                <div>
                  <div>
                    <div className='row pt-2 border-top pr-0 pl-0 pb-2'>
                      <div className='col-3 font-weight-bold'>PRODUCT</div>
                      <div className='col-3 font-weight-bold'>MODEL</div>
                      <div className='col-3 font-weight-bold'>QUANTITY</div>
                      <div className='col font-weight-bold'>PRICE</div>
                      <div className='col'></div>
                    </div>
                    {
                      (currentCartSelector.length && currentCartSelector[0].products.map(item => {
                        return (
                        <UniqueProduct prod={item} quantity={item.Cart_Product.quantity} handleQuantityChange={handleQuantityChange} />
                      )
                      }))}
                  </div>
                  <div className='font-weight-bold border-top text-center'>
                    <h2>TOTAL: ${sumaTotal} </h2>
                  </div>
                  <div className='pt-3'>
                    {/* Cambiar el '3' de deleteProductFromOrder por el id de la orden a cancelar */}
                    <button 
                      className="btn btn-success w-100 mt-3"
                      onClick={handleBuy} 
                    >BUY</button>
                    <button className="btn btn-danger w-100 mt-3" onClick={() => dispatch(actionsOrd.cancelOrder(currentCartSelector[0].id))}>
                      Empty Cart
                    </button>
                  </div>
                </div>  
              :
                <div>
                  <div>
                    <div className='row pt-2 border-top pr-0 pl-0 pb-2'>
                      <div className='col-3 font-weight-bold'>PRODUCT</div>
                      <div className='col-3 font-weight-bold'>MODEL</div>
                      <div className='col-3 font-weight-bold'>QUANTITY</div>
                      <div className='col font-weight-bold'>PRICE</div>
                      <div className='col'></div>
                    </div>
                    {
                      (
                        dataLS && dataLS.map(item => {
                          return (
                            <UniqueProduct prod={item} quantity={item.quantity} handleQuantityChange={handleQuantityChangeData} />
                          )
                        })
                      )
                    }
                  </div>
                  <div className='font-weight-bold border-top text-center'>
                    <h2>TOTAL: ${sumaTotal} </h2>
                  </div>
                  <div className='pt-3'>
                    {/* Cambiar el '3' de deleteProductFromOrder por el id de la orden a cancelar */}
                    <button 
                      className="btn btn-success w-100 mt-3"
                      disabled="true"
                    >Register for buy</button>
                    <button className="btn btn-danger w-100 mt-3" onClick={() => (localStorage.clear(),window.location.reload())}>
                      Empty Cart
                    </button>
                  </div>
                </div>
            }
          </div>
        } 
      </div>
    </div>
  )
};

export default CartProduct;
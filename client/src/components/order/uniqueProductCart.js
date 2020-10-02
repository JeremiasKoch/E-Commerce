import React from 'react';
import "./clientOrder.css";
import { useDispatch } from 'react-redux';
import * as actionsOrd from '../../redux/actions/actionsOrder';
import './cartProduct.css';

const UniqueProdCart = (prod) => {
  const dispatch = useDispatch();
  let estadoButtonRestar = true;
  let estadoButtonSum = true;
  
  if ((prod.prod.Cart_Product && prod.prod.Cart_Product.quantity === 1) 
      || prod.quantity === 1){
    estadoButtonRestar = false;
  }
  if ((prod.prod.Cart_Product && prod.prod.Cart_Product.quantity === prod.prod.stock) 
      || prod.quantity === prod.prod.stock){
    estadoButtonSum = false;
  }

  const handlerClick = () => {
    if (sessionStorage.length){
      dispatch(actionsOrd.deleteProductFromOrder(prod.prod))
    }
    else {
      localStorage.removeItem(`prodId${prod.prod.id}`);
    }
    window.location.reload(false);
  }
  
  return (
      <div>
        <div className='row pt-2 border-top pr-0 pl-0 pb-2'>
          <div className='col-3'>
            <span className='align-middle'>{prod.prod.name}</span>
          </div>
          <div className='col-3'>
            <span className='align-middle'>{prod.prod.model}</span>
          </div>
          <div className='col-3'>
            <div class="input-group-prepend" id="button-addon3">
              {
                estadoButtonRestar ?
                <button 
                class="btn btn-secondary" 
                type="button"
                onClick={() => prod.handleQuantityChange(prod.prod.id, prod.prod.Cart_Product ? prod.prod.Cart_Product.quantity - 1 : prod.quantity - 1)}
              >
                -
              </button>
              :
              <button 
                class="btn btn-secondary" 
                type="button"
                disabled={true}
              >
                -
              </button>
              }
              <input 
                type="number" 
                class="col inputModel text-center" 
                min="1" 
                max={prod.prod.stock} 
                value={prod.prod.Cart_Product ? prod.prod.Cart_Product.quantity : prod.quantity}
              />
              {
                estadoButtonSum ?
                  <button 
                    class="btn btn-secondary" 
                    type="button"
                    value='+'
                    onClick={() => prod.handleQuantityChange(prod.prod.id, (prod.prod.Cart_Product ? prod.prod.Cart_Product.quantity + 1 : prod.quantity + 1))}
                  >
                    +
                  </button>
                  :
                  <button 
                    class="btn btn-secondary" 
                    type="button"
                    disabled={true}
                  >
                    +
                  </button>
              }
              
            </div>
          </div>
          <div className='col'>
            <span className='align-middle'>${prod.prod.price * prod.quantity}</span>
          </div>
          <div className='col'>
            <button 
              className='btn btn-danger' 
              onClick={handlerClick}
            >
              <i className='fa fa-trash'/>
            </button>
          </div>
        </div>
      </div>
  )
};

export default UniqueProdCart;

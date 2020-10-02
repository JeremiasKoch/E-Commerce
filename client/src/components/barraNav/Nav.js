import React, { useState, useEffect } from 'react';
import './Nav.css';
import { Link, Redirect, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions/actionsUsers';
import * as actionsCart from '../../redux/actions/actionsCart';
import CartProduct from '../order/cartProduct';


function Nav() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  const currentCartSelector = useSelector(state => state.cartReducer.cart);
  const [dataLS, setDataLS] = useState([]);
  let data = [];
  let sumaTotal = 0;

  useEffect(() => {
    if(sessionStorage.length){
      setUser(JSON.parse(sessionStorage.getItem('user')));
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

  // LOS SIGUIENTES 2 IF SUMAN LA CANTIDAD QUE PRODUCTOS
  // QUE ESTAN EN CART, ESTE LOGEADO O NO EL USER
  if (dataLS.length){
    dataLS.forEach( position => {
      sumaTotal++;
    })
  }
  if ( user != null){
    currentCartSelector.map( e => {
      sumaTotal = e.products.length;
    })
  }
  const handlerLogout = () => {
    sessionStorage.clear();
    dispatch(actions.logoutUser());
  }

  if(user && user.role === 'client'){
    return (
      <nav className="navbar navbar-dark bg-dark">
        <Link to="/"> 
          <button type="button" className="btn btn-light">
            <span className="mr-2 btnHome">
              <i className="fas fa-home"/>
            </span>
          </button> 
        </Link>
        <div className='d-flex align-items-baseline ml-5'>
          <span className='buttonDisableStyle'><i class="far fa-user" disabled='true'></i></span>
          <p className='text-light m-0 m-2'>{user.firstname}</p>
          <button 
            className='buttonLogoutStyle'
            onClick={() => handlerLogout()}
          >
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </div>
          <Link to="/users/cart" className="ml-auto"> 
          <button type="button" className="btn btn-warning" >
            <span className="mr-2">
              <i className="fas fa-shopping-cart"/>
            </span>
            {sumaTotal === 0 
            ?
              <span>Cart</span>
            :
              <span>Cart {sumaTotal}</span>
            }
          </button>
        </Link>
      </nav>
    );
  }

  if( user && (user.role === 'admin' || user.role === 'moderator')){
    return (
      <nav className="navbar navbar-dark bg-dark">
        <Link to="/"> 
          <button type="button" className="btn btn-light">
            <span className="mr-2 btnHome">
              <i className="fas fa-home"/>
            </span>
          </button> 
        </Link>
        <ul className="navbar-nav align-items-left">
          <li className="nav-item ml-5">
            <Link to="/admin" className="nav-link">
              <button type="button" class="btn btn-secondary">
                <span className="mr-2 btnHome">
                  <i class="fas fa-cog"/>
                </span>            
              </button>
            </Link>
          </li>
        </ul>
        <div className='d-flex align-items-baseline ml-5'>
          <span className='buttonDisableStyle'><i class="far fa-user" disabled='true'></i></span>
          {user.role === 'admin'?
            <p className='text-light m-0 m-2'><span className='mr-2'>You are admin</span>{user.firstname}</p>
            :
            <p className='text-light m-0 m-2'><span className='mr-2'>You are moderator</span>{user.firstname}</p>
          }
          <button 
            className='buttonLogoutStyle'
            onClick={() => handlerLogout()}
          >
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </div>
          <Link to="/users/cart" className="ml-auto"> 
          <button type="button" className="btn btn-warning" >
            <span className="mr-2">
              <i className="fas fa-shopping-cart"/>
            </span>
            {sumaTotal === 0 ?
          <span>Cart</span>
          :
          <span>Cart {sumaTotal}</span>
          }
          </button>
        </Link>
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link to="/"> 
        <button type="button" className="btn btn-light">
          <span className="mr-2 btnHome">
            <i className="fas fa-home"/>
          </span>
        </button> 
      </Link>
      <ul className="navbar-nav align-items-left">
        <li className="nav-item ml-5">
          <Link to="/login" className="nav-link">
            <button type="button" className="btn btn-success">
              <span className="mr-2">
                <i className="fas fa-user"/>
              </span>            
              Login
            </button>
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav align-items-left">
        <li className="nav-item ml-5">
          <Link to="/register" className="nav-link"> 
            <button type="button" className="btn btn-primary">
              <span className="mr-2">
                <i className="fas fa-user-plus"/>
              </span>
              Register
            </button>
          </Link>
        </li>
      </ul>
      <Link to="/users/cart" className="ml-auto"> 
        <button type="button" className="btn btn-warning" >
          <span className="mr-2">
            <i className="fas fa-shopping-cart"/>
          </span>
          {sumaTotal === 0 ?
          <span>Cart</span>
          :
          <span>Cart {sumaTotal}</span>
          }
          
        </button>
      </Link>
    </nav>
  );
};
export default Nav;
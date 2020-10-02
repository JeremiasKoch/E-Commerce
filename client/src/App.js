import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import AdminPage from '../src/components/admin/adminPage'
import ClientPageForAdmin from '../src/components/order/adminOrder'
import Home from '../src/components/home'
import ProductTable from '../src/components/product/FormProduct';
import CategoryTable from '../src/components/category/FormCategory'
import ClientOrder from '../src/components/order/clientOrder';
import ProductCard from './components/product/ProductCard';
import Navbar from './components/barraNav/Nav';
import Usuario from './components/Usuario/Usuario';
import Ingresa from './components/Usuario/Ingresa';
import ClientList from './components/order/clientTableOrder';
import orderDetail from './components/order/clientTableOrder';
import AdminUser from './components/users/adminUser';
import Reviews from "./components/reviews/Reviews";
import Password from './components/Usuario/Password';


function App() {
  return (
    <div>
      <Switch>
        <Route
          path='/home'
          component={Home}
        />
        <Route
          path='/login'
          component={Ingresa}
        />
         <Route
          path='/password'
          component={Password}
        />
        <Route
          path='/register'
          component={Usuario}
        />
        <Route
          exact path='/product/:id'
          render={({match}) => <ProductCard id={match.params.id} />}
        />
        <Route 
          exact path="/reviews" 
          render={Reviews}
        />
            
        <Route
          path='/users/cart'
          component={ClientOrder}
          // component={ClientOrder}
        />
        <Route
          path='/order/number'
          component={orderDetail}
        />
         <Route
          path='/admin/clients'
          component={ClientList}
        />
        <Route
          path='/admin/orders'
          component={ClientPageForAdmin}
        />
        <Route
          path='/admin/product'
          component={ProductTable}
        />
        <Route
          path='/admin/usuarios'
          component={AdminUser}
        />
        <Route
          path='/admin/category'
          component={CategoryTable}
        />
        <Route
          exact path='/product/:id'
          render={({match}) => <ProductCard id={match.params.id} />}
        />
        <Route
          path='/admin'
          component={AdminPage}
        />
        <Route>
          <Redirect to='/home'/>
        </Route>
      </Switch>
    </div>
 
  );
}

export default App;

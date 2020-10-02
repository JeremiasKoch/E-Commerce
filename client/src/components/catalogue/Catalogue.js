import React, { useEffect, Fragment } from 'react';
import Product from '../product/Product';
import "./catalogue.css";
import * as actionsProd from '../../redux/actions/actionsProducts';
import * as actionsCat from '../../redux/actions/actionsCategories';
import { useSelector, useDispatch } from 'react-redux';

const Catalogue = () => {
    const dispatch = useDispatch();
    const productsSelector = useSelector(state =>  state.productReducer.products);
    const categoriesSelector = useSelector(state =>  state.categoriesReducer.categories);
    const showAllProductsSelector = useSelector(state =>  state.productReducer.showAllProducts);
    const showProductsRealTime =  useSelector(state =>  state.productReducer.productsRealTime);

    useEffect(() => {
      dispatch(actionsProd.getProducts())
      dispatch(actionsCat.getCategories())
    }, []);
    //alert(actionsProd)
  return (
    <div className='container-fluid'>
      <div className="searchList">
        <form className ='list-group filter'>
          <div className='row'>
          <input
            // name="name" 
            onChange={e => dispatch(actionsProd.getRealTime(e.target.value))} 
            type="text" placeholder='Search Product...'
            className="form-control col-8" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" 
          />
          <select onChange={e => dispatch(actionsProd.getByCatMenu(e.target.value))} className='custom-select col-4'>
            <option selected="selected" disabled="disabled">--Select Category--</option>
            {
              categoriesSelector.map((c) => {
                return(
                    <option value={c.name}>
                      {c.name}
                    </option>
                  )
                })
              }
            </select>
          </div>
        </form>
      </div>
      <div className="card-group">
        {  
          showAllProductsSelector ? 
            productsSelector && productsSelector.map ?
                productsSelector.map((prod, index) =>{
                  const x = (index % 6) === 0;
                  if (prod.stock > 0){
                    if (x){
                      return <Fragment>
                      <div className='w-100'></div>
                      <div className='col-2 pb-4'>
                        <Product product={prod}/>
                      </div>
                    </Fragment>
                  }
                  return <div className='col-2 pb-4'><Product product={prod}/></div>
                  } 
                })
              :
              <button class="btn btn-primary" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Loading...
              </button>
          :   
            showProductsRealTime.map((prod, index) =>{
              const x = (index % 6) === 0;
              if (x){
                return <Fragment>
                  <div className='w-100'></div>
                  <div className='col-2'>
                    <Product product={prod}/>
                  </div>
                </Fragment>
              }
              return <div className='col-2'><Product product={prod}/></div>
            })
        }
      </div>
    </div>
  )
}
export default Catalogue;

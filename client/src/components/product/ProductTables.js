import React, { useEffect } from 'react';
import * as actionsProd from '../../redux/actions/actionsProducts';
import { useSelector, useDispatch } from 'react-redux';
import './ProductTable.css';

const UserTable = () => {
  const dispatch = useDispatch();
  const productsSelector = useSelector(state =>  state.productReducer.products);

  useEffect(() => {
    dispatch(actionsProd.getProducts());
  }, []);

  return (
    <div className="producTable">
      <h2>View Products</h2>
      <table className="table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Price</th>
            {/* <th>Description</th> */}
            {/* <th>Category</th> */}
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {
            productsSelector && productsSelector.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.name}<a href={"products/" + prod.id}></a></td>
                <td>{prod.brand}</td>
                <td>{prod.model}</td>
                <td>{prod.price}</td>
                <td>{prod.description && prod.description.split("*").map(desc => <li>{desc}</li>)}</td>
                <td>{prod.categories && prod.categories.map(prodcats => <li>{prodcats.name}</li>)}</td>
                <td><img src={`http://localhost:3001/uploads/${prod.images}`} alt="" className="img-thumbnail card-img-top"/></td>
                <td>
                  <div class="btn-group" role="group" aria-label="Basic example">
                  {/* //<button type="button" class="btn btn-warning btn btn-secondary" */}
                  {/* //onClick={() => dispatch(actionsProd.editRow(prod.id, prod))} */}
                    <button 
                      className="button-edit"
                      onClick={() => {return (dispatch(actionsProd.editRow(prod.id, prod)), dispatch(actionsProd.getCatsByProd(prod.id)))}}
                    >
                      <i class="far fa-edit"></i>
                    </button>
                      <button type="button" class="btn btn-danger btn btn-secondary"
                        onClick={() => dispatch(actionsProd.deleteProduct(prod.id),window.location.reload())}
                      >
                        <i class="far fa-trash-alt"></i>
                      </button>
                    
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default UserTable;
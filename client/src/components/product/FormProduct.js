import React from 'react';
import ProductTable from './ProductTables';
import AddProductForm from './AddProductForm';
import EditProductForm from './EditProductForm';
import { useSelector } from 'react-redux';
import Navbar from '../barraNav/Nav'
// import { Link } from 'react-router-dom';

const FormProduct = () => {
  //Estado editing de redux
  const editingSelector = useSelector(state => state.productReducer.editing);

  return (
    <div>
      <Navbar />
      
      <div className="flex-large">
        {editingSelector ? (
          <div>
            
            <EditProductForm />
          </div>
        ) : (
          <div>
            
            <AddProductForm />
          </div>
        )}
        </div>
        <div>
            
            <ProductTable />
        </div>
    </div>
  )
}

export default FormProduct;
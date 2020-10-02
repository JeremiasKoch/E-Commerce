import React from 'react';
import CategoriesTable from './CategoriesTable';
import AddCategoryForm from './AddCategoryForm';
import EditCategoryForm from './EditCategoryForm';
import { useSelector } from 'react-redux';
import Navbar from '../barraNav/Nav'
// import { Link } from 'react-router-dom';

const FormCategory = () => {
  // Declaro variables
  const editingSelector = useSelector(state => state.categoriesReducer.editing);

  return (
    <div>
      <Navbar />
      <div className="flex-large">
        {editingSelector ? (
          <div>
            
            <EditCategoryForm />
          </div>
        ) : (
          <div style={{textAlign:'center'}}>
            {/* <h2>Add Category</h2> */}
            <AddCategoryForm />
          </div>
        )}
        </div>
        <br/>
        <div style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
            <h2>View Categories</h2>
            <CategoriesTable />
        </div>
    </div>
  )
}

export default FormCategory;
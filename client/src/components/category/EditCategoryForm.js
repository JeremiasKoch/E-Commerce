import React from 'react';
import { useForm } from "react-hook-form";
import * as actions from '../../redux/actions/actionsCategories';
import { useSelector, useDispatch } from 'react-redux';
import './EditCategoryForm.css'
const EditCategoryForm = () => {
  const { register, handleSubmit } = useForm();
  const currentCategorySelector = useSelector(state => state.categoriesReducer.currentCategory);
  const dispatch = useDispatch();

  const nuevosDatosCategoria = data => {
    dispatch(actions.updateCategories(currentCategorySelector.id, data));
  };

  return (
    <div className='addCat'>
      <h2 className='addColorTitle'>Edit Category</h2>
      <div class="col-md-12 boxDivComponent">
      <form
        onSubmit={handleSubmit(nuevosDatosCategoria)}
      >
          <div className='form-group'>
            <label>Name</label>
            <input
              className='form-control'
              type="text"
              name="name"
              defaultValue={currentCategorySelector.name}
              ref={register({ required: true})}
            />
          </div>
          <div className='form-group'>
            <label>Description</label>
            <textarea
              className='form-control'
              type="text"
              name="description"
              defaultValue={currentCategorySelector.description}
              ref={register({ required: true})}
            ></textarea>
          </div>
          <div className='box-button'>
            <button className='btn btn-primary '>Update Category</button>
            <button
              onClick={() => dispatch(actions.cancelUpdateCategory(false))}
              className='btn btn-danger'
            >
              Cancel
            </button>
          </div>
        
      </form>
      </div>
    </div>
  )
}

export default EditCategoryForm;
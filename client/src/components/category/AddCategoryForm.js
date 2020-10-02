import React from 'react';
import * as actions from '../../redux/actions/actionsCategories';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import './addCategoryForm.css'

const AddCategoryForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const addCategory = data => {
    dispatch(actions.addCategories(data));
  }

  return (
    <div className='addCat'>
      <h2 className='addColorTitle'>Add Category</h2>
      <div class="col-md-12 boxDivComponent">
        <form
          onSubmit={handleSubmit(addCategory)}
        >
            <div className='form-group'>
              <label>Name</label>
              <input 
                className='form-control'
                type="text" 
                name="name"
                ref={register}
                required
              />
            </div>
            <div className='form-group'>
            <label>Description</label>
              <input 
                className='form-control'
                type="text" 
                name="description"
                ref={register}
                required
              />
            </div>
            <button className='btn btn-primary box-button'>Add</button>
        </form>
      </div>
    </div>
  )
}

export default AddCategoryForm;
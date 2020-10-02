import React, { useState, useEffect } from 'react';
import * as actionsProd from '../../redux/actions/actionsProducts';
import * as actionsCat from '../../redux/actions/actionsCategories';
import { useSelector, useDispatch } from 'react-redux';
import './EditProductForm.css';
import $ from 'jquery';

const EditProductForm = () => {
  const currentProductSelector = useSelector(state => state.productReducer.currentProduct);
  const currentCategoriesSelector = useSelector(state => state.productReducer.currentProductCategories);
  const categoriesSelector = useSelector(state => state.categoriesReducer.categories);
  const [product, setProduct] = useState(new FormData());
  const [checked, setChecked] = useState(true)
  const dispatch = useDispatch();
  let categorias = '';

  useEffect(() => {
    dispatch(actionsCat.getCategories())
  }, []);

  const handleInputChange = (event) => {
    const field = event.target;
    if (field.name === 'categoryId') {
      categorias += field.value + ' ';
      product.set(field.name, categorias);
      setProduct(product)
    } else {
    product.set(field.name, field.value);
    setProduct(product);
    }
  }

  const onFileChange = (event) => {
    const field = event.target;
    product.set(field.name, field.files[0]);
    setProduct(product);
  }

//   const FormCategory = (props) => {
//     const dispatch = useDispatch()
//     const [category, setCategory] = useState({
//         name: "",
//         description: ""
//     });
//     const [getId, setGetId] = useState(0);
    

  return (         
    <div className="formAddProduct">
      <h2 className='addColorTitle'>Edit Product Form</h2>
      <div class="col-md-12 boxDivComponent">
        <form
          onSubmit={event => {
              if ($('input[type=checkbox]:checked').length === 0) {
                event.preventDefault();
                alert('Debe seleccionar al menos un valor');
              } 
              else {
              dispatch(actionsProd.updateProduct(currentProductSelector.id, product));
              }
            }
          }
        >
        <div className='form-group'>
          <label>Name</label>
          <input
            className='form-control'
            type="text"
            name="name"
            defaultValue={currentProductSelector.name}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label>Brand</label>
          <input
            className='form-control'
            type="text"
            name="brand"
            defaultValue={currentProductSelector.brand}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label>Model</label>
          <input
            className='form-control'
            type="text"
            name="model"
            defaultValue={currentProductSelector.model}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label>Price</label>
            <input
              className='form-control'
              type="number"
              name="price"
              defaultValue={currentProductSelector.price}
              onChange={handleInputChange}
            />
        </div>
        <div className='form-group'>
          <label>Provider</label>
          <input
            className='form-control'
            type="text"
            name="provider"
            defaultValue={currentProductSelector.provider}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label>Stock</label>
          <input
            className='form-control'
            type="number"
            name="stock"
            defaultValue={currentProductSelector.stock}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label>Description</label>
          <textarea
            className='form-control'
            type="text"
            name="description"
            defaultValue={currentProductSelector.description}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label>Image</label>
          <input
            className='form-control'
            type="file"
            name="images"
            // defaultValue={currentProductSelector.images}
            onChange={onFileChange}
          />
        </div>
        <div className='form-group'>
          <div>
            <label>Category</label>
            {
              categoriesSelector.map((cat) => 
              {
                 for (let catPrevia of currentCategoriesSelector) {
                  if (cat.id === catPrevia) {
                    return (
                    <div className="form-check">
                      <input className="form-check-input" name='categoryId' checked="checked" type="checkbox" key={cat.id} defaultValue={cat.id} 
                      onChange={handleInputChange} onRemove={handleInputChange}/>
                      <label className="form-check-label">
                        {cat.name}
                      </label>
                  </div>)
                }} 
                return (
                  <div className="form-check">
                    <input className="form-check-input" name='categoryId' type="checkbox" key={cat.id} value={cat.id} onChange={handleInputChange}/>
                    <label className="form-check-label">
                      {cat.name}
                    </label>
                  </div>
                )
              })
            }
          </div>
        </div>
        <button className='btn btn-info'>
          Update Product
        </button>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(actionsProd.cancelUpdateProduct(false))}
        >
          Cancel
        </button>
        </form>
      </div>
    </div>
  )
}

export default EditProductForm;
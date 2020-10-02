import React, { useState, useEffect } from 'react';
import './AddProductFormCss.css'
import * as actionsProd from '../../redux/actions/actionsProducts';
import * as actionsCat from '../../redux/actions/actionsCategories';
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';


const AddProductForm = (props) => {

  const categoriesSelector = useSelector(state =>  state.categoriesReducer.categories);
  const dispatch = useDispatch();
  const [product, setProduct] = useState(new FormData());
  let categorias = [];

  useEffect(() => {
    dispatch(actionsCat.getCategories())
  }, [])

  const handleInputChange = (event) => {
    const field = event.target;
    if (field.name === 'name') {
      const nameCapitalized = field.value.charAt(0).toUpperCase() + field.value.slice(1).toLowerCase();
      product.set(field.name, nameCapitalized);
      setProduct(product)
    }
    else if (field.name === 'categoryId') {
      categorias += field.value + ' ';
       product.set(field.name, categorias);
       setProduct(product)
    }
       
    else {
      product.set(field.name, field.value);
      setProduct(product);
    }
  }

  // function handlerOnChangeCategoria(evento) {
  //   const idArray = evento.map(e => {
  //     return e.id
  //   })
  //   setProduct({
  //     ...product,
  //     categorias: idArray
  //   })
  // }

  const onFileChange = (event) => {
    const field = event.target;
    product.set(field.name, field.files[0]);
    setProduct(product);
  }

  return (
    <div className="formAddProduct">
      <h2 className='addColorTitle'>Add Product</h2>
      <div class="col-md-12 boxDivComponent">
    <form
     
      onSubmit={event => {
        if ($('input[type=checkbox]:checked').length === 0) {
          event.preventDefault();
          alert('Debe seleccionar al menos un valor');
      } else {
        dispatch(actionsProd.addProducts(product));
      }
      }}
      > 
      <div className='form-group'>
        <label>Name:</label>
        <input 
          className='form-control'
          type="text" 
          name="name" 
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='form-group'>
        <label>Brand:</label>
        <input
          className='form-control'
          type="text"
          name="brand"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='form-group'>
        <label>Model:</label>
        <input 
          className='form-control'
          type="text" 
          name="model" 
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='form-group'>
        <label>Price:</label>
        <input 
          className='form-control'
          type="number" 
          name="price" 
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='form-group'>
      <label>Provider:</label>
        <input 
          className='form-control'
          type="text" 
          name="provider" 
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='form-group'>
        <label>Stock:</label>
        <input 
          className='form-control'
          type="number" 
          name="stock" 
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='form-group'>
        <label>Description:</label>
        <textarea
          className='form-control'
          type="text"
          name="description"
          onChange={handleInputChange}
          required
        >
      </textarea>
      </div>
      {/* ###########################-> CATEGORÍA <-########################### */}
      {/* <div className="form-group col-md-6">
            <label>Category</label>
        
            
          {
            categoriesSelector.map(c => (<div> <input type="checkbox"/> {c.name} </div>)
            )} */}

        {/* <select>
            {/* {Array.isArray(props.categorias) && <Multiselect options={props.categorias} displayValue='name'
              onSelect={handlerOnChangeCategoria} onRemove={handlerOnChangeCategoria} />} 
              {
              categoriesSelector.map((c) => {
                return(
                    <option value={c.name}>
                       <input type="checkb"></input> {c.name}
                    </option>
                )
              })
            }
        </select> */}
      {/* </div> */}
       <div>
       <label>Category</label>
        {categoriesSelector.map((cat) => {
        return (<div className="form-check">
          <input className="form-check-input" name='categoryId' type="checkbox" key={cat.id} value={cat.id} 
          onChange={handleInputChange} onRemove={handleInputChange} />
          <label className="form-check-label">
            {cat.name}
          </label>
        </div>)})}
      
      {/* <label>Category</label>
          multiple={true} 
          value={categorias}
          categoriesSelector.map((cat) => {
          return (
          <option
                  value={cat.id}
                  key={cat.id}
              />
               );
            }
           
         {/* </div> 
           )  
          })}   */} 
          
      </div>  
      <div className='form-group'>
      <label>select image</label>
      
      <div class="input-group">
        <div class="custom-file">
          <input type="file" class="custom-file-input" id="inputGroupFile01"
           name='images' onChange={onFileChange}/>
          <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
        </div>
      </div>
      </div>
      
      <button className='btn btn-info box-button'>Add new Product</button>
    </form>
    </div>
    </div>
  )
}

export default AddProductForm;
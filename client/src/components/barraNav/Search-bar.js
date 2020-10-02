import React, { useState } from 'react';
import Product from '../product/Product';
import { axiosGet } from '../../Axios';




export default function SearchBar({onSearch}) {
	//tiene un estado inicial
	const [input, setInput] = useState('');
	const [oneProduct, setOneProduct] = useState([]);
	const [prod, setProd] = useState("")

	const handleInputChange = (event) => {
        const { value } = event.target
        axiosGet(`product/category`, value)
        .then (res => {
			setOneProduct(res.data)
			console.log(res.data)
        })
        .catch(error => (console.log('esta rompiendo post')))
        setProd(value );
      }


	return (
		<form onSubmit={(e) => {
		  e.preventDefault();
		//   onSearch(Product);
		}}>
		  <input
			onChange={(e)=>handleInputChange(e)} 
			value={prod} type="text" placeholder='Buscar...'
		  />
		  <input type="submit" value=" 🔍"/>
		  
		</form>
	  );
	}
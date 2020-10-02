import React, { Fragment } from 'react';
import "./Product.css";
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Link } from 'react-router-dom';
import '../../icons/agotado.png';
import * as actionsCart from '../../redux/actions/actionsCart';
import { useDispatch } from 'react-redux';
import CardReview from "../reviews/CardReview";
import Review from '../reviews/Reviews';


const Product = ({product}) => {
  const dispatch = useDispatch();
  const handlerOnClick = () => {
    if(sessionStorage.length){
      dispatch(actionsCart.postCreateCart(product))
    }
    else{
      localStorage.setItem(`prodId${product.id}`, JSON.stringify({id: product.id, name: product.name, model: product.model, price: product.price, stock: product.stock, quantity: 1}));
    }
    window.location.reload(false);
  }
 
  const popover = (
    <Popover id="popover-description">
      <Popover.Content>
        <ul>
          {product.description && product.description.split("*").map(desc => <li><small>{desc}</small></li>)}
        </ul> 
      </Popover.Content>
    </Popover>
  );

  let tieneStock = true;

  if(product.stock === 0){
    tieneStock = false;
  }

  let ratingTotal = 0; 
  let cantidadDeComentarios = 0;
  let ratingPromedio = 0;

  let hardCodeo = [{
    qualification: 2,
    opinion: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.',
    userName: 'SALAMANDRA'
  },
  {
    qualification: 2,
    opinion: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.',
    userName: 'SALAMANDRA 2'
  },
  {
    qualification: 2,
    opinion: 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.',
    userName: 'SALAMANDRA 3'
  }
  ]

  for (let i of hardCodeo){
    cantidadDeComentarios ++;
    ratingTotal += i.qualification;
  }
  ratingPromedio = Math.ceil(ratingTotal / cantidadDeComentarios);

  const starQualification = (num) =>{
    var stars = ''
    for(var i = 0; i < num; i++){
        stars +=  '★'   
    }
    return stars
}

  return (
    <div class="card-deck boxCardFather mr-0 ml-0 styleFroceI">
      {
        tieneStock ?
        (
            <div>
              <div className="card boxCard ">
                <Link to={`/product/${product.id}`}>
                  <a href={"products/" + product.id}>
                    <img src={`http://localhost:3001/uploads/${product.images}`} alt="" className="img-thumbnail card-img-top" style={{width: "250px", height: "250px"}}/>
                  </a>
                  <div className="card-body styleForce">
                    <a href={"products/" + product.id}>
                      <h5 className="card-title" style={{width:'250px', whiteSpace:'nowrap', overflow:'hidden', display:'inline-block', textOverflow:'ellipsis'}}><b>{product.name.replace(' ', '\u00a0')}</b></h5>
                    </a>
                    {/* harcodeo del stars */}
                      <h6>Rating:</h6>
                      
                      {/* <label className="radio2">★★★</label></h6> */}
                     <h6>{starQualification(ratingPromedio)}</h6> 
                    
                    <p className="card-text">{product.model}</p>
                    <p className="card-text">{product.brand}</p>
                    <h5 className="card-title">${product.price}</h5>
                    <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popover}>
                      <p className="card-text">Descripción</p>
                    </OverlayTrigger>
                    {product.categories && product.categories.map(prodcats => <span> {prodcats.name}</span>)}
                  </div>
                </Link>
                <button
                  className='btn btn-success w-100 mt-3'
                  onClick={handlerOnClick}
                >
                  Send to cart
                </button>
              </div>
            </div>
        ) : 
        (
          <div>
            <div className="card boxCard">
              {/* <img src='agotado.png' alt="" className="img-thumbnail card-img-top" style={{width: "250px", height: "250px"}}/> */}
              <img src={product.images} alt="" className="img-thumbnail card-img-top" style={{width: "250px", height: "250px"}}/>
              <div className="card-body">
                <h1>SIN STOCK</h1>
                <h5 className="card-title"><b>{product.name}</b></h5>
                <p className="card-text">{product.model}</p>
                <p className="card-text">{product.brand}</p>
                <h5 className="card-title">${product.price}</h5>
                <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popover}>
                  <p className="card-text">Descripción</p>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
};

export default Product;



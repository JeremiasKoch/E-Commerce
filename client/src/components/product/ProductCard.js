import React, { useEffect } from 'react';
import * as actionsProd from '../../redux/actions/actionsProducts';
import * as actionsCart from '../../redux/actions/actionsCart';
import * as actionsReviews from '../../redux/actions/actionsReviews';
import * as actionsOrder from '../../redux/actions/actionsOrder';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './productCard.css'
import agotado from '../../icons/agotado.png'
import CardReview from "../reviews/CardReview";
import Review from '../reviews/Reviews';
import Navbar from '../barraNav/Nav'

const ProductCard = ({id}) => {
    const dispatch = useDispatch();
    let ratingTotal = 0; 
    let cantidadDeComentarios = 0;
    let ratingPromedio = 0;
    const currentCartSelector = useSelector(state => state.cartReducer.cart);
    const allReviews = useSelector(state=> state.reviewReducer.reviews);
    const productsSelector = useSelector(state =>  state.productReducer.products);
    const allOrderSelector = useSelector(state =>  state.orderReducer.ordersByUser);
    const selectOrder = useSelector(state =>  state.orderReducer.currentOrder);
    let ordersQueTienenElProducto = [];
  //  NO ME ESTA TRAYENDO LAS ORDENES
  let orderFinalizada = false;
  console.log('asegurate', id)
    
    useEffect(() => {
      dispatch(actionsProd.getProducts(id));
      dispatch(actionsReviews.getReviews(id));
      dispatch(actionsOrder.getOrderByUser());
    }, []);
    console.log('allOrders', orderFinalizada, 'todasLas', ordersQueTienenElProducto)
    // SELECCIONA LAS ORDENES QUE TENGAN EL PRODUCTO
    if(allOrderSelector){
      allOrderSelector.map(order => {
        order.products.forEach(element => {
          if(productsSelector.name === element.name){
            ordersQueTienenElProducto.push(order)
          }
        });
      })
    }
    
    if(ordersQueTienenElProducto){
      ordersQueTienenElProducto.map( pos => {
        pos.products.forEach( producto => {
          if (producto.Cart_Product.state === 'complete'){
            orderFinalizada = true;
          }
        })
      })
    }
    
    for (let i of allReviews){
      cantidadDeComentarios ++;
      ratingTotal += parseInt(i.rating);
    }
    ratingPromedio = Math.ceil(ratingTotal / cantidadDeComentarios);
    const muestraRating = (rating) => {
      let iconStar = [];
      for (let i = 0; i < rating; i++){
        iconStar.push(<i class="fas fa-star"></i>);
      }
     return iconStar
    }

    const handlerOnClick = () => {
      if(sessionStorage.length){
        dispatch(actionsCart.postCreateCart(productsSelector))
      }
      else{
        localStorage.setItem(`prodId${productsSelector.id}`, JSON.stringify({id: productsSelector.id, name: productsSelector.name, model: productsSelector.model, price: productsSelector.price, stock: productsSelector.stock, quantity: 1}));
      }
      window.location.reload(false);
    }
    if (productsSelector == null){
      return (
        <div>
          <Navbar />
          <div className="ingresa">
            <h1 className='text-center'>
              THE PRODUCT YOU ARE LOOKING FOR DOES NOT EXIST
            </h1>
          </div>
        </div>
        )
    }

    if (productsSelector.stock === 0) {
      return  (
      <div>
      <Navbar />
      <div className='d-flex'>
        <div className="container pt-5 backgroud">
          <div className='row'>
            <div className='col-md-6'>
              <img src={agotado} alt="" className="img-thumbnail card-img-top" />
              <div className='row pt-4'>
                <h4>Description</h4>
                <p>
                  {productsSelector.description && productsSelector.description.split("*").map(desc => <li>{desc}</li>)}
                </p>
              </div>
            </div>
           
  
            <div className='col-md-4 '>
                <div className='row'>
                  <h1 className="">{productsSelector.name}</h1>
                </div>
                <div className='row pt-2'>
                  <h4>Model: {productsSelector.model}</h4>
                </div>
                <div className='row'>
                  <h4>Brand: {productsSelector.brand}</h4>
                </div>
                <div className='row pt-4'>
                  <h2>Stock: NO STOCK</h2>
                </div>
                <div className='row pt-4'>
                  <h2>Price: {productsSelector.price}</h2>
                </div>
                <div className='row pt-4 d-flex justify-content-center'>
                  <h3>Rating</h3>
                </div>
                <div className='row pt-1 d-flex justify-content-center'>
                {muestraRating(ratingPromedio)}
                  
                </div>
                <div className='row pt-2'>
                { sessionStorage.length === 0
                ?
                <button
                 data-toggle="modal" 
                 data-target="#staticBackdrop"
                 className='btn btn-success w-100 mt-3'
                 disabled='false'
                >
                  Connect to leave a review
                </button>
                :
                orderFinalizada
                ?
                <button
                 data-toggle="modal" 
                 data-target="#staticBackdrop"
                 className='btn btn-success w-100 mt-3'
                >
                  
                  Add to comment
                </button>
                :
                <button
                 data-toggle="modal" 
                 data-target="#staticBackdrop"
                 className='btn btn-success w-100 mt-3'
                 disabled='false'
                >
                  make a purchase to leave a comment
                </button>
              
                
              }
                  {/* Modal de boton buy        */}
                  <div class="modal" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1">
                    <div class="modal-dialog ">
                      <div class="modal-content ">
                        <div class="modal-header">
                          <h5 class="modal-title text-secondary" id="staticBackdropLabel">Review</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body d-flex flex-wrap justify-content-center">
                                <Review id={id}/>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <div className='row pt-2 mr-4 border-top'>
              {/* INICIAN LAS REVIEW */}
              <div>
                <div className='row pt-2'>
                  <div className= "container review">
                    <h4 className= "review-title">Product review</h4>
                    {allReviews.map( pos =>{
                      return (
                        <CardReview revPost={pos}/>
                      )
                    })}
                  </div>
                </div>
              </div>
         </div>
          </div>
  
        </div>
        </div>
      </div>
      )
    }

    if (productsSelector.stock > 0){
      return  (
        <div>
          <Navbar />
        
      <div className='d-flex'>
        <div className="container pt-5 backgroud">
          <div className='row'>
            <div className='col-md-6'>
              <img src={`http://localhost:3001/uploads/${productsSelector.images}`} alt="" className="img-thumbnail card-img-top" />
              <div className='row pt-4'>
                <h4>Description</h4>
                <p>
                  {productsSelector.description && productsSelector.description.split("*").map(desc => <li>{desc}</li>)}
                </p>
              </div>
          </div>

          <div className='col-md-4 '>
              <div className='row'>
                <h1 className="">{productsSelector.name}</h1>
              </div>
              <div className='row pt-2'>
                <h4>Model: {productsSelector.model}</h4>
              </div>
              <div className='row'>
                <h4>Brand: {productsSelector.brand}</h4>
              </div>
              <div className='row pt-4'>
                <h2>Stock: {productsSelector.stock}</h2>
              </div>
              <div className='row pt-4'>
                <h2>Price: {productsSelector.price}</h2>
              </div>
              <div className='row pt-4 d-flex justify-content-center'>
                <h3>Rating</h3>
              </div>
              <div className='row pt-1 d-flex justify-content-center'>
              {muestraRating(ratingPromedio)}
                
              </div>
              <div className='row pt-2'>
                <button 
                  className='btn btn-success w-100'
                  onClick={handlerOnClick} 
                >
                  Send to cart
                </button>
              </div>
              <div className='row pt-2'>
                { sessionStorage.length === 0
                ?
                <button
                 data-toggle="modal" 
                 data-target="#staticBackdrop"
                 className='btn btn-success w-100 mt-3'
                 disabled='false'
                >
                  Connect to leave a review
                </button>
                :
                orderFinalizada
                ?
                <button
                 data-toggle="modal" 
                 data-target="#staticBackdrop"
                 className='btn btn-success w-100 mt-3'
                >
                  
                  Add to comment
                </button>
                :
                <button
                 data-toggle="modal" 
                 data-target="#staticBackdrop"
                 className='btn btn-success w-100 mt-3'
                 disabled='false'
                >
                  make a purchase to leave a comment
                </button>
              }
                
                {/* Modal de boton buy        */}
                <div class="modal" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1">
                    <div class="modal-dialog ">
                      <div class="modal-content ">
                        <div class="modal-header">
                          <h5 class="modal-title text-secondary" id="staticBackdropLabel">Review</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body d-flex flex-wrap justify-content-center">
                                <Review id={id}/>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <div className='row pt-2 mr-4 border-top'>
            {/* INICIAN LAS REVIEW */}
            <div>
              <div className='row pt-2'>
                <div className= "container review">
                  <h4 className= "review-title">Product review</h4>
                  {allReviews.map( pos =>{
                    return (
                      <CardReview revPost={pos}/>
                    )
                  })}
                </div>
              </div>
            </div>
       </div>
        </div>

      </div>
      </div>
      </div>
      )
    }

    return (
      <div>
        <Navbar />
        <div className="ingresa">

        <h1 className='text-center'>
          THE PRODUCT YOU ARE LOOKING FOR DOES NOT EXIST
        </h1>
      </div>
    </div>
  )
  
};

export default ProductCard;
import React, { useEffect, useState } from "react";
import "./adminOrder.css";
import { Link } from "react-router-dom";
import * as actionsOrder from "../../redux/actions/actionsOrder";
import { useSelector, useDispatch } from "react-redux";
import Product from "../product/Product";
import Navbar from '../barraNav/Nav'
const AdminOrder = () => {
  const dispatch = useDispatch();
  const orderSelector = useSelector((state) => state.orderReducer.orders);
  const [orderId, setOrderId] = useState(null);
  const [searchByState, setSearchByState] = useState([])
  let state = "";
  let b = false;
  let result = 0;
  useEffect(() => {
    dispatch(actionsOrder.getOrders());
  }, []);


  function convertDateFormat(string) {
    var separaFecha = string.split('T');
    var info = separaFecha[0].split('-').reverse().join('/');
    return info;
}

// VARIABLES
let statEs = [{state: "pending"}, {state: "cancelled"}, {state: "complete"}]
let changeStateByOptions = [{state: "pending"}, {state: "cancelled"}, {state: "complete"}]
let searchBy = false;
let conditionalSearch = []
  return (
    <div>
      <Navbar />
      <div className="boxContentAll">
        <div className="nav">
          <h1 className="nav-link">Orders List</h1>
        </div>
        <div className="searchList">
          <div className="row d-flex justify-content-center align-items-baseline">
            <input
              // name="name"

              type="text"
              placeholder="Search Order by number..."
              value={orderId}
              className="form-control col-8"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
              onChange={(e) => {
                return setOrderId(e.target.value);
              }}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={(e) => {
                e.preventDefault();
              }}
              data-toggle="modal"
              data-target="#modal2"
            >
              Search
            </button>
          </div>
          <select onChange={e => {
              searchBy = true;
              orderSelector.map( (productGroup) => {
                console.log('adentro', productGroup)
                productGroup.products.forEach( (element, index) => {
                  if(index === 0 && element.Cart_Product.state === e.target.value){
                    return(
                  conditionalSearch.push(productGroup))
                  }
                })
              })
              setSearchByState(conditionalSearch)
              }} 
              className='custom-select col-4'>

            <option selected="selected" disabled="disabled">--Select Order--</option>
            {statEs.map( obj => {
                return(
                  <option value={obj.state}>
                      {obj.state}
                  </option>
                  )
                })
            }
          </select>
        </div>
        <div className='row list-group'>
        <div className = 'd-flex align-items-center alert-light pt-3 pb-2 border border-primary'>
        <div className="col-2">
            <h5>      
           <span className="col">N° ORDER</span>
            </h5>
          </div>
          <div className="col-2">
            <h5>      
           <span className="col">N° USER</span>
            </h5>
          </div>
          <div className="col-2">
            <h5>      
           <span className="col">DATE</span>
            </h5>
          </div>
          <div className="col-2">
            <h5>      
           <span className="col">STATE</span>
            </h5>
          </div>
          <div className="col-2">
            <h5>      
           <span className="col">PRICE</span>
            </h5>
          </div>
          <div className="col-2">
            <h5>      
           <span className="col">MORE DETAILS</span>
            </h5>
          </div>
          </div>
          </div>
          <br />
        {searchByState.length  ? searchByState.map( ordersByState => {
            let responsePrice = 0;
            let changeStateBySelect = [];
            return (
              <div className='row list-group'>
              <div className = 'd-flex align-items-center alert-light pt-3 pb-3 border border-primary'>
              <div className="col-2">
                      <h5>
                        <span className="col">{ordersByState.id}</span>
                      </h5>
                    </div>
                    <div className="col-2">
                      <h5>
                        <span className="col">{ordersByState.userId}</span>
                      </h5>
                    </div>
                    <div className="col-2">
                      <h5>
                        <span className="col">{convertDateFormat(ordersByState.createdAt)}</span>
                      </h5>
                    </div>
                    <div className="col-2">
                      {ordersByState.products &&
                        ordersByState.products.map((ord) => {
                          state = ord.Cart_Product.state;
                        })}
                      <h5>
                        <span className="col">{state}</span>
                      </h5>
                    </div>
                    
                    {/* RECORRE LOS PRODUCTOS PARA VER EL PRECIO DE CADA ORDEN, MULTIPLICARLO Y ADEMÁS, SUMARLO */}
                    <div className="col-2">
                      {ordersByState.products &&
                        ordersByState.products.forEach(ordenn => {
                          responsePrice = responsePrice + ordenn.Cart_Product.quantity * ordenn.Cart_Product.price;
                        })}
                      <h5>
                        <span className="col">${responsePrice}</span>
                      </h5>
                    </div>
                    {/* BOTÓN PARA VER EL DETALLE DEL PRODUCTO */}
                    <div className="col-2">
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => {
                          setOrderId(ordersByState.id);
                        }}
                        data-toggle="modal"
                        data-target="#modal1"
                      >
                        View
                      </button>
                      <select onChange={e => {
                      dispatch(actionsOrder.updateOrder(ordersByState.id, {state: e.target.value}));
                      window.location.reload()
                      }} 
                        className='custom-select col-4'
                      >
                        <option selected="selected" disabled="disabled">--Select Order--</option>
                        {changeStateByOptions.map( objectState => {
                            return(
                              <option value={objectState.state}>
                                  {objectState.state}
                              </option>
                              )
                            })
                        }
                      </select>
                    </div>
                </div>
                </div>
            )
          })
          : 
          orderSelector && orderSelector.map( order => {
          let res = 0;
            return (
              <div className='row list-group'>
              <div className = 'd-flex align-items-center alert-light pt-3 pb-3 border border-primary'>
                    <div className="col-2">
                      <h5>
                        <span className="col">{order.id}</span>
                      </h5>
                    </div>
                    <div className="col-2">
                      <h5>
                        <span className="col">{order.userId}</span>
                      </h5>
                    </div>
                    <div className="col-2">
                      <h5>
                        <span className="col">{convertDateFormat(order.createdAt)}</span>
                      </h5>
                    </div>
                    <div className="col-2">
                      {order.products &&
                        order.products.map((ord) => {
                          state = ord.Cart_Product.state;
                        })}
                      <h5>
                        <span className="col">{state}</span>
                      </h5>
                    </div>
                    <div className="col-2">
                      {order.products &&
                        order.products.forEach((ord) => {
                          res =
                            res +
                            ord.Cart_Product.quantity * ord.Cart_Product.price;
                        })}
                      <h5>
                        <span className="col">${res}</span>
                      </h5>
                    </div>
                    <div className="col-2">
                    <div className="displayNone">
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => {
                          setOrderId(order.id);
                        }}
                        data-toggle="modal"
                        data-target="#modal1"
                      >
                        View
                      </button>
              <select onChange={e => {
              dispatch(actionsOrder.updateOrder(order.id, {state: e.target.value}));
              window.location.reload()
             
              }} 
              className='custom-select col-4'>

            <option selected="selected" disabled="disabled">Change state</option>
            {changeStateByOptions.map( objectState => {
                return(
                  <option value={objectState.state}>
                      {objectState.state}
                  </option>
                  )
                })
            }
          </select>
          </div>
                    </div>
                </div>
              </div>
            
            );
          }) 
         
          // <h1>Nel</h1>
        }
      </div>

      <div className="modal fade" tabIndex="-1" id="modal1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Products </h3>
              <button className="close" data-dismiss="modal" aria-hidden="true">
                &times;
              </button>
            </div>
            <div className="modal-body">
              {orderSelector &&
                orderSelector.map((order) => {
                  return order.id === orderId ? (
                    order.products.map((ord) => {
                      return (
                        <di>
                          <span>Product: </span>
                          {`${ord.name} ${ord.model}`}
                          <br></br>
                          <span>Quantity: </span>
                          {ord.Cart_Product.quantity}
                          <br></br>
                          <span>Unit Price: {ord.Cart_Product.price}</span>
                          <br></br>
                          <hr></hr>
                        </di>
                      );
                    })
                  ) : (
                    <span></span>
                  );
                })}
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" tabIndex="-1" id="modal2">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Products </h3>
              <button className="close" data-dismiss="modal" aria-hidden="true">
                &times;
              </button>
            </div>
            <div className="modal-body">
              {orderSelector.map((o) => {
                if (o.id === Number(orderId)) {
                  b = true;
                }
              })}
              {!orderId ? (
                <p>'Enter an order number to search'</p>
              ) : !b ? (
                <p>No orders associated with the entered number were found</p>
              ) : (
                orderSelector.map((o, i) => {
                  if (o.id === Number(orderId)) {
                    return (
                      <div>
                        <span>N° Id: {o.id}</span>
                        <br></br>
                        <span>N° User: {o.userId}</span>
                        <br></br>
                        <span>Date: {o.createdAt}</span>
                        <br></br>
                        {o.products &&
                          o.products.map((ord) => {
                            state = ord.Cart_Product.state;
                          })}
                        <span>State: {state}</span>
                        <br></br>
                        {o.products &&
                          o.products.forEach((ord) => {
                            result =
                              result +
                              ord.Cart_Product.quantity *
                                ord.Cart_Product.price;
                          })}
                        <span>Price: ${result}</span>
                        <br></br>
                        <span>Location row: {i + 1}</span>
                      </div>
                    );
                  }
                })
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;

import React, { useEffect, useState, Fragment } from 'react';
import './clientTableOrder.css';
import * as actions from '../../redux/actions/actionsUsers';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import ModalComp from '../modal/modalUsersList';
import Navbar from '../barraNav/Nav'


const ClienTableOrder = () => {
  const [userId,setUserId] = useState(null)
  const dispatch = useDispatch();
  const userSelector = useSelector(state => state.userReducer.users);
  let b = false;
  const roleState = [{role:'client'}, {role:'admin'}, {role:'moderator'}];
  let searchBy = false;
  let conditionalSearch = [];
  const [userRole, setUserRole] = useState([]);

  useEffect(() => {
    dispatch(actions.getUsers());
  }, []);

return (
  <div id='clientId'>
    <Navbar />
    <div className='boxContentAll'>
      <div className="nav">
        <h1 className="nav-link">Users List</h1>
      </div>
      <div className="searchList">
        <div className='row d-flex justify-content-center align-items-baseline'>
          <input
            type="text" placeholder='Search User by Number...'
            value={userId}
            className="form-control col-8" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" 
            onChange={(e)=>{
              return setUserId(e.target.value)
            }
            }
          />
          <button className='btn btn-primary' type='button' 
            onClick={(e)=>{
            e.preventDefault()
            }}
            data-toggle='modal'
            data-target='#modal1' 
          >
            Search
          </button>
        </div>
          <select 
            onChange={e => {
              searchBy = true;
              userSelector.map( userGroup => {
                if(userGroup.role === e.target.value){
                  conditionalSearch.push(userGroup)
                  
                }
              })
              setUserRole(conditionalSearch)
              
            }}
            className='custom-select col-4'
          >
            <option selected="selected" disabled="disabled">--Select Role--</option>
            {roleState.map( role => {
              return(
                <option value={role.role}>
                    {role.role}
                </option>
                )
              })
            }
          </select>
      </div>
      <div className='row'>
        <div class=" p-3"><span>INFO:</span></div>
        <div class="alert-info p-3"><span>Clients</span></div>
        <div class="alert-warning p-3"><span>Admin</span></div>
        <div class="alert-danger p-3"><span>Moderator</span></div>
      </div>
      <div>
        <div className='row list-group'>
          <div class="d-flex align-items-center alert-light border border-primary">
            <div class="row alert alert-dark m-0 w-100">
              <div className='col-2'>
                <h5 className='pl-3'>
                  First Name:
                </h5>
              </div>
              <div className='col-2'>
                <h5 className='pl-3'>
                  Last Name
                </h5>
              </div>
              <div className='col-2'>
                <h5 className='pl-3'>
                  User Name
                </h5>
              </div>
              <div className='col-3'>
                <h5 className='pl-3'>
                  Email
                </h5>
              </div> 
              <div className='col-2'>
                <h5 className='pl-3'>
                  Phone
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      { 
      // arranca
        userRole.length >= 1 ?
        userRole && userRole.map((user, index) => {
          let buttonIdDelete = '#a' + user.phone;
          let buttonIdDeletePla = 'a' + user.phone;
          let buttonIdUpdate = '#a' + user.id;
          let buttonIdUpdatePla = 'a' + user.id;
        
          {/* SEGUN TIPO DE USUARIO RENDERIZA LA LISTA */}
          if (user.role === 'client'){
            return (
              <div className='row list-group'>
              <div class="d-flex align-items-center alert-light border border-primary">
                <div class="row alert alert-info m-0 w-100">
                  <div className='col-2'>
                      <span className='col'>{user.firstname}</span>
                  </div>
                  <div className='col-2'>
                      <span className='col'>{user.lastname}</span>
                  </div>
                  <div className='col-2'>
                      <span className='col'>{user.username}</span>
                  </div>
                  <div className='col-3'>
                      <span className='col'>{user.email}</span>
                  </div>
                  <div className='col-2'>
                      <span className='col'>{user.phone}</span>
                  </div>
                  <div>
                    <button 
                      type='button' 
                      className='btn btn-outline-danger m-0'
                      data-toggle="modal" 
                      data-target={buttonIdDelete}
                    >
                      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                      </svg>
                    </button>
                    {/* INICIA MODEL */}
                    <div class="modal fade" id={buttonIdDeletePla} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                      aria-hidden="true">
                      <div class="modal-dialog modal-sm modal-notify " role="document">
                        {/* <!--Content--> */}
                        <div class="modal-content text-center">
                          {/* <!--Header--> */}
                          <div class="modal-header d-flex justify-content-center bg-danger">
                            <p class="heading text-white display-4">Are you sure delete user: {user.firstname}</p>
                          </div>

                          {/* <!--Body--> */}
                          <div class="modal-body">

                            <i class="fas fa-times fa-4x animated rotateIn text-danger "></i>

                          </div>

                          {/* <!--Footer--> */}
                          <div class="modal-footer flex-center">
                            <a href="" class="btn  btn-outline-danger">Yes</a>
                            <a type="button" class="btn  btn-danger waves-effect" data-dismiss="modal">No</a>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  
                  <div className='col'>
                    <button 
                    type='button' 
                    className='btn btn-outline-success m-0'
                    data-toggle="modal" 
                    data-target={buttonIdUpdate}
                    >
                    <i class="fas fa-user-cog"></i>
                    </button>
                    {/* <!--Modal: modalPush--> */}
                    <div class="modal fade" id={buttonIdUpdatePla} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                      aria-hidden="true">
                      <div class="modal-dialog modal-sm modal-success" role="document">
                        {/* <!--Content--> */}
                        <div class="modal-content text-center">
                          {/* <!--Header--> */}
                          <div class="modal-header d-flex justify-content-center bg-success">
                            <p class="heading display-4 text-light">You sure update to admin {user.firstname}</p>
                          </div>
                          {/* <!--Body--> */}
                          <div class="modal-body">
                            <i class="fas fa-bell fa-4x animated rotateIn text-success "></i>
                          </div>
                          {/* <!--Footer--> */}
                          <div class="modal-footer flex-center">
                            <a href="" class="btn btn-outline-success">Yes</a>
                            <a type="button" class="btn btn-success  waves-effect" data-dismiss="modal">No</a>
                          </div>
                        </div>
                        {/* <!--/.Content--> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )
          }
          if (user.role === 'admin'){
            return (
              <div className='row list-group'>
              <div class="d-flex align-items-center alert-light border border-primary">
                <div class="row alert alert-warning m-0 w-100">
                  <div className='col-2'>
                      <span className='col'>{user.firstname}</span>
                  </div>
                  <div className='col-2'>
                      <span className='col'>{user.lastname}</span>
                  </div>
                  <div className='col-2'>
                      <span className='col'>{user.username}</span>
                  </div>
                  <div className='col-3'>
                      <span className='col'>{user.email}</span>
                  </div>
                  <div className='col-2'>
                      <span className='col'>{user.phone}</span>
                  </div>
                  <div>
                    <button 
                      type='button' 
                      className='btn btn-outline-danger m-0'
                      data-toggle="modal" 
                      data-target={buttonIdDelete}
                    >
                      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                      </svg>
                    </button>
                    {/* INICIA MODEL */}
                    <div class="modal fade" id={buttonIdDeletePla} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                      aria-hidden="true">
                      <div class="modal-dialog modal-sm modal-notify " role="document">
                        {/* <!--Content--> */}
                        <div class="modal-content text-center">
                          {/* <!--Header--> */}
                          <div class="modal-header d-flex justify-content-center bg-danger">
                            <p class="heading text-white display-4">Are you sure delete user: {user.firstname}</p>
                          </div>

                          {/* <!--Body--> */}
                          <div class="modal-body">

                            <i class="fas fa-times fa-4x animated rotateIn text-danger "></i>

                          </div>

                          {/* <!--Footer--> */}
                          <div class="modal-footer flex-center">
                            <a href="" class="btn  btn-outline-danger">Yes</a>
                            <a type="button" class="btn  btn-danger waves-effect" data-dismiss="modal">No</a>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  <div className='col'>
                    <button 
                    type='button' 
                    className='btn btn-outline-success m-0'
                    data-toggle="modal" 
                    data-target={buttonIdUpdate}
                    >
                    <i class="fas fa-user-cog"></i>
                    </button>
                    {/* <!--Modal: modalPush--> */}
                    <div class="modal fade" id={buttonIdUpdatePla} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                      aria-hidden="true">
                      <div class="modal-dialog modal-sm modal-success" role="document">
                        {/* <!--Content--> */}
                        <div class="modal-content text-center">
                          {/* <!--Header--> */}
                          <div class="modal-header d-flex justify-content-center bg-success">
                            <p class="heading display-4 text-light">You sure transform into user {user.firstname}</p>
                          </div>
                          {/* <!--Body--> */}
                          <div class="modal-body">
                            <i class="fas fa-bell fa-4x animated rotateIn text-success "></i>
                          </div>
                          {/* <!--Footer--> */}
                          <div class="modal-footer flex-center">
                            <a href="" class="btn btn-outline-success">Yes</a>
                            <a type="button" class="btn btn-success  waves-effect" data-dismiss="modal">No</a>
                          </div>
                        </div>
                        {/* <!--/.Content--> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )
          }
          if (user.role === 'moderator'){
            return (
              <div className='row list-group'>
              <div class="d-flex align-items-center alert-light border border-primary">
                <div class="row alert alert-danger m-0 w-100">
                  <div className='col-2'>
                      <span className='col'>{user.firstname}</span>
                  </div>
                  <div className='col-2'>
                      <span className='col'>{user.lastname}</span>
                  </div>
                  <div className='col-2'>
                      <span className='col'>{user.username}</span>
                  </div>
                  <div className='col-3'>
                      <span className='col'>{user.email}</span>
                  </div>
                  <div className='col-2'>
                      <span className='col'>{user.phone}</span>
                  </div>
                </div>
              </div>
            </div>
            )
          }
          return (
            <div><h1>Error 404 back to home.</h1></div>
          )
        })
        :
        userSelector.map((user, index) => {
          let buttonIdDelete = '#a' + user.phone;
          let buttonIdDeletePla = 'a' + user.phone;
          let buttonIdUpdate = '#a' + user.id;
          let buttonIdUpdatePla = 'a' + user.id;
        
          // HARCODEO PARA AGREGAR TYPE A LOS USER Y TESTEAR
         
          {/* SEGUN TIPO DE USUARIO RENDERIZA LA LISTA */}
          if (user.role === 'client'){
            return (
              <div className='row list-group'>
              <div class="d-flex align-items-center alert-light border border-primary">
                <div class="row alert alert-info m-0 w-100">
                  <div className='col-2'>
                      <span className='col'>{user.firstname}</span>
                  </div>
                  <div className='col-2'>
                      <span className='col'>{user.lastname}</span>
                  </div>
                  <div className='col-2'>
                      <span className='col'>{user.username}</span>
                  </div>
                  <div className='col-3'>
                      <span className='col'>{user.email}</span>
                  </div>
                  <div className='col-2'>
                      <span className='col'>{user.phone}</span>
                  </div>
                  <div>
                    <button 
                      type='button' 
                      className='btn btn-outline-danger m-0'
                      data-toggle="modal" 
                      data-target={buttonIdDelete}
                    >
                      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                      </svg>
                    </button>
                    {/* INICIA MODEL */}
                    <div class="modal fade" id={buttonIdDeletePla} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                      aria-hidden="true">
                      <div class="modal-dialog modal-sm modal-notify " role="document">
                        {/* <!--Content--> */}
                        <div class="modal-content text-center">
                          {/* <!--Header--> */}
                          <div class="modal-header d-flex justify-content-center bg-danger">
                            <p class="heading text-white display-4">Are you sure delete user: {user.firstname}</p>
                          </div>

                          {/* <!--Body--> */}
                          <div class="modal-body">

                            <i class="fas fa-times fa-4x animated rotateIn text-danger "></i>

                          </div>

                          {/* <!--Footer--> */}
                          <div class="modal-footer flex-center">
                            <a href="" class="btn  btn-outline-danger">Yes</a>
                            <a type="button" class="btn  btn-danger waves-effect" data-dismiss="modal">No</a>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  
                  <div className='col'>
                    <button 
                    type='button' 
                    className='btn btn-outline-success m-0'
                    data-toggle="modal" 
                    data-target={buttonIdUpdate}
                    >
                    <i class="fas fa-user-cog"></i>
                    </button>
                    {/* <!--Modal: modalPush--> */}
                    <div class="modal fade" id={buttonIdUpdatePla} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                      aria-hidden="true">
                      <div class="modal-dialog modal-sm modal-success" role="document">
                        {/* <!--Content--> */}
                        <div class="modal-content text-center">
                          {/* <!--Header--> */}
                          <div class="modal-header d-flex justify-content-center bg-success">
                            <p class="heading display-4 text-light">You sure update to admin {user.firstname}</p>
                          </div>
                          {/* <!--Body--> */}
                          <div class="modal-body">
                            <i class="fas fa-bell fa-4x animated rotateIn text-success "></i>
                          </div>
                          {/* <!--Footer--> */}
                          <div class="modal-footer flex-center">
                            <a href="" class="btn btn-outline-success">Yes</a>
                            <a type="button" class="btn btn-success  waves-effect" data-dismiss="modal">No</a>
                          </div>
                        </div>
                        {/* <!--/.Content--> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )
          }
          if (user.role === 'admin'){
            return (
              <div className='row list-group'>
              <div class="d-flex align-items-center alert-light border border-primary">
                <div class="row alert alert-warning m-0 w-100">
                  <div className='col-2'>
                      <span className='col'>{user.firstname}</span>
                  </div>
                  <div className='col-2'>
                      <span className='col'>{user.lastname}</span>
                  </div>
                  <div className='col-2'>
                      <span className='col'>{user.username}</span>
                  </div>
                  <div className='col-3'>
                      <span className='col'>{user.email}</span>
                  </div>
                  <div className='col-2'>
                      <span className='col'>{user.phone}</span>
                  </div>
                  <div>
                    <button 
                      type='button' 
                      className='btn btn-outline-danger m-0'
                      data-toggle="modal" 
                      data-target={buttonIdDelete}
                    >
                      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
                      </svg>
                    </button>
                    {/* INICIA MODEL */}
                    <div class="modal fade" id={buttonIdDeletePla} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                      aria-hidden="true">
                      <div class="modal-dialog modal-sm modal-notify " role="document">
                        {/* <!--Content--> */}
                        <div class="modal-content text-center">
                          {/* <!--Header--> */}
                          <div class="modal-header d-flex justify-content-center bg-danger">
                            <p class="heading text-white display-4">Are you sure delete user: {user.firstname}</p>
                          </div>

                          {/* <!--Body--> */}
                          <div class="modal-body">

                            <i class="fas fa-times fa-4x animated rotateIn text-danger "></i>

                          </div>

                          {/* <!--Footer--> */}
                          <div class="modal-footer flex-center">
                            <a href="" class="btn  btn-outline-danger">Yes</a>
                            <a type="button" class="btn  btn-danger waves-effect" data-dismiss="modal">No</a>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  <div className='col'>
                    <button 
                    type='button' 
                    className='btn btn-outline-success m-0'
                    data-toggle="modal" 
                    data-target={buttonIdUpdate}
                    >
                    <i class="fas fa-user-cog"></i>
                    </button>
                    {/* <!--Modal: modalPush--> */}
                    <div class="modal fade" id={buttonIdUpdatePla} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                      aria-hidden="true">
                      <div class="modal-dialog modal-sm modal-success" role="document">
                        {/* <!--Content--> */}
                        <div class="modal-content text-center">
                          {/* <!--Header--> */}
                          <div class="modal-header d-flex justify-content-center bg-success">
                            <p class="heading display-4 text-light">You sure transform into user {user.firstname}</p>
                          </div>
                          {/* <!--Body--> */}
                          <div class="modal-body">
                            <i class="fas fa-bell fa-4x animated rotateIn text-success "></i>
                          </div>
                          {/* <!--Footer--> */}
                          <div class="modal-footer flex-center">
                            <a href="" class="btn btn-outline-success">Yes</a>
                            <a type="button" class="btn btn-success  waves-effect" data-dismiss="modal">No</a>
                          </div>
                        </div>
                        {/* <!--/.Content--> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )
          }
          if (user.role === 'moderator'){
            return (
              <div className='row list-group'>
              <div class="d-flex align-items-center alert-light border border-primary">
                <div class="row alert alert-danger m-0 w-100">
                  <div className='col-2'>
                      <span className='col'>{user.firstname}</span>
                  </div>
                  <div className='col-2'>
                      <span className='col'>{user.lastname}</span>
                  </div>
                  <div className='col-2'>
                      <span className='col'>{user.username}</span>
                  </div>
                  <div className='col-3'>
                      <span className='col'>{user.email}</span>
                  </div>
                  <div className='col-2'>
                      <span className='col'>{user.phone}</span>
                  </div>
                </div>
              </div>
            </div>
            )
          }
          return (
            <div><h1>Error 404 back to home.</h1></div>
          )
        })
          // finaliza 
      }
     
    </div>
    <div className='modal fade' tabIndex='-1' id='modal1' >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header bg-info' >
            <h3 className='modal-title' color='primary'>Products </h3>
            <button className='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
          </div>
          <div className='modal-body'>
            {
              userSelector.map(u=>{
                if(u.id === Number(userId)){
                  b = true
                }
              })
            }
            {
            !userId ?
            <p>'Enter an User number to search'</p>
            : 
            !b ?
            <p>No users associated with the entered id were found</p>
            :
            userSelector.map(u=>{
              if(u.id === Number(userId)){
                return(
                  <div>
                    <span>First Name: {u.firstName}</span><br></br>
                    <span>last Name: {u.lastName}</span><br></br>
                    <span>Userame: {u.userName}</span><br></br>
                    <span>Email: {u.email}</span><br></br>
                    <span>Phone: {u.phone}</span><br></br>
                  </div>
                )
              }
              
            }) 
            }
          </div>
          <div className='modal-footer bg-dark'>
            <button className='btn btn-danger' data-dismiss='modal'>Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}

export default ClienTableOrder;
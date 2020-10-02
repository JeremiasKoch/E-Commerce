import React, { Fragment, useState, useRef } from 'react';
import * as actionUser from '../../redux/actions/actionsUsers';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import './Usuario.css'
import Navbar from '../barraNav/Nav'

function Login () {
    const dispatch = useDispatch();
    const { register, errors, handleSubmit, watch } = useForm();

    const enviarDatos = (data) => {
        console.log(data);
        dispatch(actionUser.createUser(data));
    }

    const password = useRef({});
    password.current = watch("password");


    return(
      <div>
        <Navbar />
      
        <div className="formRegister">
        <Fragment>
        <form className="row" onSubmit={handleSubmit(enviarDatos)} >

          <div class="col-md-5">
          <h1>
            Sign Up
          </h1>
          <input 
              type="text" 
              placeholder="Enter name" 
              className="form-control"
              name="firstname"
              ref={register({ required: true})}
              required 
          />
                    
              <input type="text" placeholder="Enter last name" 
              className="form-control"
              name="lastname"
              ref={register({ required: true})}
              required />
          
              <input type="text" placeholder="Enter Username"  
              className="form-control"
              name="username"
              ref={register({ required: true})}
              required />
                    
              <input type="email" placeholder="Enter Email" 
              className="form-control"
              name="email"
              ref={register({ required: true})}
              required/>

              <input
                name="password"
                type="password"
                placeholder="Insert Password" 
                className="form-control"
                ref={register({
                  required: "You must specify a password",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters"
                  }
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}

              <input
                name="password_repeat"
                type="password"
                placeholder="Repeat Password" 
                className="form-control"
                ref={register({
                  validate: value =>
                    value === password.current || "The passwords do not match"
                })}
              />
              {errors.password_repeat && <p>{errors.password_repeat.message}</p>}




              <input type="phone" placeholder="Enter phone number" 
              className="form-control"
              name="phone"
              ref={register({ required: true})}
              required/>
              <button type="buttonn" class="btn btn-primary">
                Sign Up
              </button>
              {/* <button class="btn" type="submit">Registrate</button>
              <button class="btn" type="submit">Inicio</button> */}
              </div>
          </form>  
          </Fragment>
          </div>
          </div>
    );
};

export default Login;
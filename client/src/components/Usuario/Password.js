import React, { useRef } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import Navbar from '../barraNav/Nav';
import * as actionsUser from '../../redux/actions/actionsUsers';
import './Password.css';
import { useHistory } from 'react-router-dom';

function Password () {
  const dispatch = useDispatch();
  const { register, errors, handleSubmit, watch } = useForm();
  const password = useRef({});
  password.current = watch("password");
  const history = useHistory();

  const enviarDatos = data => {
    dispatch(actionsUser.updatePasswordUser(data, history));
  }

  return(
    <div>
      <Navbar />
      <div className="formPassword">
        <form className="row" 
        onSubmit={handleSubmit(enviarDatos)} 
        >
          <div class="col-md-7">
            <h3>
              Entry new Password
            </h3>
          </div>
          <input
            name="username"
            type="text"
            placeholder="Insert Username" 
            className="form-control"
            ref={register({require: true})}
            required
          />
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
              validate: value => value === password.current || "The passwords do not match"
            })}
          />
          {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
          <button type="buttonn" class="btn btn-primary">
          <span className="mr-2 btnReg">
          </span>
          Reset Password
          </button>
        </form>   
      </div>
    </div>
  );
};

export default Password;
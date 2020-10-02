import React from "react";
import * as actionUser from "../../redux/actions/actionsUsers";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./Ingresa.css";
import Navbar from "../barraNav/Nav";

export default function Form() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const resetSelector = useSelector((state) => state.userReducer.resetPass);

  const enviarDatos = (data) => {
    dispatch(actionUser.loginUser(data, history));
  };

  if (resetSelector) {
    alert("Success");
  }

  return (
    <div>
      <Navbar />
      <div className="ingresa">
        <form className="fomIngreso" onSubmit={handleSubmit(enviarDatos)}>
          <div class="col-md-3">
            <h1>Welcome</h1>
            <div>
              <label>Username:</label>
              <input
                className="form-control"
                type="text"
                name="username"
                ref={register}
                required
              />
              <label>Password:</label>
              <input
                className="form-control"
                type="password"
                name="password"
                ref={register}
                required
              />
            </div>
            <div>
              {" "}
              <a href="./Password" className="message text-white">
                Forgot your Password?
              </a>
            </div>
            <button className="btn btn-primary">Login</button>
            {/* {
            userSelector.length ?
            (<div>
              {alert('Usuario loggeado correctamente')}
              <Redirect
                from='/'
                to='/Home'
              />
            </div>)
            :
            <h3 style={{color: 'red'}}>Password o contraseña invalidos</h3>
          } */}
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as actions from '../../redux/actions/actionsReviews';
import { useDispatch } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from 'react-router-dom';
import './Review.css';
import CardReview from "../reviews/CardReview";


const Reviews = (prop) => {
    const dispatch = useDispatch();
    console.log('desde Reviews', prop)
    const {register, handleSubmit} = useForm();
    let agregarData = data => {
        console.log(data)
        dispatch(actions.createReview(prop.id, data))
    }
    
    
    return(
      
        <div className="container pt-2 background m-1 ">
          
          <div className= "cont-p">
              <div className="d-flex justify-content-center">
                <p>Rating: </p>
                <input id="radio1" type="radio" name="rating" value="1" ref={register}/>
                <label for="radio1"><i class="fas fa-star"></i></label>
                <input id="radio2" type="radio" name="rating" value="2" ref={register}/>
                <label for="radio2"><i class="fas fa-star"></i></label>
                <input id="radio3" type="radio" name="rating" value="3" ref={register}/>
                <label for="radio3"><i class="fas fa-star"></i></label>
                <input id="radio4" type="radio" name="rating" value="4" ref={register}/>
                <label for="radio4"><i class="fas fa-star"></i></label>
                <input id="radio5" type="radio" name="rating" value="5" ref={register}/>
                <label for="radio5"><i class="fas fa-star"></i></label>
              </div>
              <div className= "d-flex justify-content-center">
                  <textarea cols= "50" rows= "5" name= "description" placeholder='Comment!!!' ref={register}/>
              </div>
              
                <div class="modal-footer">
                  <input type="button" class="btn btn-primary" value='send'
                   onClick={handleSubmit(agregarData)}/>
                </div>
             
          </div>
    </div>
    
    )
}

export default Reviews;
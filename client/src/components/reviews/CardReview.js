import React, { useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import * as actionsUsers from '../../redux/actions/actionsUsers';
import { useSelector, useDispatch } from 'react-redux';


const CardReview= ({ revPost }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state=> state.userReducer.currentUser);
  
  useEffect(() => {
    dispatch(actionsUsers.getOneUser(revPost.userId));
   
  }, []);
  console.log('rick', currentUser)
    const muestraRating = (rating) => {
      let iconStar = [];
      for (let i = 0; i < rating; i++){
        iconStar.push(<i class="fas fa-star"></i>);
      }
      return iconStar
    }
  
    return (
        <div className= "each-review">
            <div className='d-flex'>
              <h6 className='pr-2 pl-4'>User: {currentUser.username}</h6>
              <p className= "review-p-name">{revPost.userName}</p>
              <h6 className='pr-2 pl-4'>Date:</h6>
              <p className= "review-p-date">{revPost.createdAt}</p>     
              <h2 className='pr-2 pl-4'>Rating</h2>
              {muestraRating(revPost.rating)}
            </div>
            <div>
              <h2>Review</h2>
              <p className= "review-p-opinion">{revPost.description}</p>
            </div>
            <hr className='my-4'/>
        </div>    
    )
}

export default CardReview;
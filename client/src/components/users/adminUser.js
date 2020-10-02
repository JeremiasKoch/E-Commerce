import React, { useEffect } from 'react';
import "./adminUser.css";
import { Link } from 'react-router-dom';
import * as actionUser from '../../redux/actions/actionsUsers';
import { useDispatch, useSelector } from 'react-redux';

const AdminUser = () => {
  const dispatch = useDispatch();
  const userSelector = useSelector(state => state.userReducer.users);

  useEffect(() => {
    dispatch(actionUser.getUsers())
  }, []);

  return (
    <div >
      <div className='boxButtons'>
        <div className='boxAdminButton'>
        <Link
          to='/admin'
        >
          <button className="btn btn-warning extra">ADMIN</button>
        </Link>
        </div>
        <div className="boxHomeButton">
          <Link
            to='/home'
          >
          <button className="btn btn-warning extra bbt">HOME</button>
          </Link>
        </div>
      </div>
      <div className="nav">
        <h1 className="nav-link">Users List</h1>
      </div>
      <div className='sa'>
        <ul className="list-group list-group-flush">
          {userSelector && userSelector.map(user => {
            return (
              <div className=''>
                <div>
                  <div>
                    {/* <Link
                      to='/user/number'
                    > */}
                    <li className="list-group-item itemSett">
                        {user.firstname} 
                      <div>
                      <span>{user.lastNçname}</span> 
                      </div>
                      <div>
                        <span>{user.userNçname}</span>
                      </div>
                      <div>
                        <span>{user.email}</span>
                      </div>
                      <div>
                        <span>{user.phone}</span>
                      </div>
                    </li> 
                    {/* </Link>  */}
                  </div>
                  <div>
                    <button 
                      className='btn-danger'
                      onClick={() => dispatch(actionUser.deleteUser(user.id))}
                    >
                      X
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </ul>
      </div>
    </div>
  )
};

export default AdminUser;
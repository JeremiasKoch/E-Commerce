import React, { useEffect } from 'react';
import * as actions from '../../redux/actions/actionsCategories';
import { useSelector, useDispatch } from 'react-redux';
import './categoriesTable.css'
const UserTable = () => {
  const dispatch = useDispatch();
  const categoriesSelector = useSelector(state =>  state.categoriesReducer.categories);

  useEffect(() => {
    dispatch(actions.getCategories());
  }, []);
  
  return (
    <div className='categoryTable'>
      <table className="table-bordered">
        <thead>
          <tr style={{fontSize:'22px'}}>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {
            categoriesSelector.map((categ) => (
              <tr key={categ.id} >
                <td>{categ.name}</td>
                <td>{categ.description}</td>
                <td>
                  <button 
                    onClick={() => dispatch(actions.editRow(categ.id, categ))}
                    className="btn btn-warning btn btn-secondary"
                  >
                    <i class="far fa-edit"></i>
                  </button>
                  <button 
                    onClick={() => dispatch(actions.deleteCategories(categ.id))}
                    className="btn btn-danger btn btn-secondary"
                  >
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
  </div>
  )
}

export default UserTable;
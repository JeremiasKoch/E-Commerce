import React, { useEffect, useState, Fragment } from 'react';
import ReactDOM from 'react-dom'

const ModalComp = (props,handleClose, idRender) => {
  const modalRoot = document.getElementById('modal-root');
console.log(props)
  let prueba = document.createElement('div')
  useEffect (() => {
    modalRoot.appendChild(prueba);
    return () => {
      modalRoot.removeChild(prueba);
    }
  }, [])
 

  return ReactDOM.createPortal(
    <div>
      <div
      >
        {props.children}
        <button onClick={()=>props.handleClose()}>Close</button>
      </div>
    </div>,
    prueba
)
}


export default ModalComp;



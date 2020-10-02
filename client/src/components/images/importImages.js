import React, { useState, useEffect } from 'react';
import { axiosGet, axiosPost } from '../../Axios';


const ImportImages = (props) => {

 
  const [fileUpload, setFileUpload] = useState([])

 
  const handleInputChangeUploadImage = (e) => {
    setFileUpload(e.target.files)
  }
  
  return( 
    <div>
      <label>select image</label>
        <input
          type="file"
          onChange={handleInputChangeUploadImage}
        />
    </div>
  )
}

export default ImportImages;
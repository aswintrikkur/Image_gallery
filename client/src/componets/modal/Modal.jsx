import React from 'react'
import './Modal.css'
import { LoadingBar } from '../loadingBar/LoadingBar'

export const Modal = ({children}) => {
  
    return (
    <div className='modal-container' >
        <div className="add-img">
            <div className='icon'>+</div>
            <div className="img-name">{}</div>
        </div>
        <LoadingBar/>
        

        {children}
      
    </div>
  )
}

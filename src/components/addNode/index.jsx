import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import './style.css'
import { ModalContext } from '@/context/AppProvider'

const AddNode = () => {
    const {handleVisible} = useContext(ModalContext)
  return (
    <>
        <div className='add-node' onClick={handleVisible}>
            <FontAwesomeIcon icon={faAdd}/>
        </div>
    </>
  )
}

export default AddNode
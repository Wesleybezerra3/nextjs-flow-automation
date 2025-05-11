import { faAdd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import './style.css'
import { useFlow } from '@/context/AppProvider'

const AddNode = () => {
    const {handleVisibleModalNodes} = useFlow()
  return (
    <>
        <div className='add-button' onClick={handleVisibleModalNodes}>
            <FontAwesomeIcon icon={faAdd}/>
        </div>
    </>
  )
}

export default AddNode
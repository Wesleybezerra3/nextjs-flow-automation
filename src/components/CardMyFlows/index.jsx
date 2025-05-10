import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './style.css'

const CardMyFlows = ({name, id}) => {
  return (
    <div className='card-flow'>
        <div>
            <p>{name || 'Sem nome'}</p>
        </div>
        <div>
            <FontAwesomeIcon icon={faTrash}/>
        </div>
    </div>
  )
}

export default CardMyFlows
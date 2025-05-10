import { useFlow } from '@/context/AppProvider';
import React from 'react'
import CardMyFlows from '../CardMyFlows';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';
const SelectFlow = () => {
    const { myFlows } = useFlow();
  return (
    <>
    <div className='select-flow'>
        {/* <CardMyFlows/> */}
        <div className='select-flow-card' onClick={()=> alert('Cliquei')}>
            <p>Selecione um fluxo</p>
            <FontAwesomeIcon icon={faArrowCircleDown}/>
        </div>
    </div>
    </>
  )
}

export default SelectFlow
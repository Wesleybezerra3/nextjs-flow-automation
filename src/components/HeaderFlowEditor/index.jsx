import React from 'react'
import AddNode from '../ui/AddNode'
import LastUpdate from '../LastUpdate'
import SelectFlow from '../SelectFlow'
import './style.css'
import { useFlow } from '@/context/AppProvider'

const HeaderFlowEditor = () => {
    const {lastUpdate} = useFlow()
  return (
    <div className='header-flow-editor'>
        {/* <div>
            <AddNode/>
        </div> */}
        <div>
            <LastUpdate timestamp={lastUpdate}/>
        </div>
        <div>
            <SelectFlow/>
        </div>
        
    </div>
  )
}

export default HeaderFlowEditor
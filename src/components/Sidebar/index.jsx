'use client';
import React from 'react';
import Button from '../ui/Button/Button';
import { faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import NewFlow from '../NewFlow';


export default function Sidebar({ onAddNode }) {
  return (
    <div className="w-1/6 p-4" style={{borderRight: "1px solid #ccc", backgroundColor: "#f8f8f8"}}>
      <NewFlow/>
      <div className='mb-4 flex flex-col gap-2 w-full'>
        <p className='text-2xl font-bold mb-2'>Apps</p>
        <Button onClick={() => onAddNode('whatsapp', 'WhatsApp','#20c707',faWhatsapp)} icon={faWhatsapp} color={'#20c707'} content={'WhatsApp'}/>
      </div>
     
        <div className='mb-4 flex flex-col gap-4 w-full'>
          <p className='text-2xl font-bold mb-2'>Internal</p>
        </div>
      <Button onClick={() => onAddNode('trigger', 'Trigger','#FF9914',faBolt)} color={'#FF9914'} icon={faBolt} content={'Gatilho'} />

      <Button onClick={() => onAddNode('action', 'Action','#08BDBD',faGear)} icon={faGear} color={'#08BDBD'} content={'Ação'}/>

      <Button onClick={() => onAddNode('delay', 'Delay','#636363',faClock)} icon={faClock} color={'#636363'} content={'Atraso'}/>

      <Button onClick={() => onAddNode('condition', 'Condition','#F0A202',faQuestion)} icon={faQuestion} color={'#F0A202'} content={'Condição'}/>
    </div>
  );
}
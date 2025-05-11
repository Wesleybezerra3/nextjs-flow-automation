"use client";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import ModalNewFlow from "../ModalNewFlow";
import { useFlow } from "@/context/AppProvider";



export default function NewFlow() {
  const{myFlows}=useFlow();
  useEffect(()=>{
    if(myFlows.length === 0){
      setIsVisible(true)
    }
    else{
      setIsVisible(false)
    }
  },[])
  const [isVisible, setIsVisible] = useState(false);
  const handleCreateFlow = () => {
    setIsVisible(prev => !prev);
  };
  return (
    <div
      className=" new-flow"
    >
      <button className="add-flow-button" onClick={handleCreateFlow}>
        <FontAwesomeIcon icon={faAdd} />
        <p>Adicionar novo Fluxo</p>
      </button>
      <ModalNewFlow visible={isVisible} onClose={()=> setIsVisible(false)}/>
    </div>
  );
}

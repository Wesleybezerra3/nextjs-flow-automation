"use client";
import React, { useState } from "react";
import { useFlow } from "@/context/AppProvider";
import CardMyFlows from "../CardMyFlows";

import "./style.css";
import JsonEditor from "../JsonEditor";

const FlowDetails = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { selectedFlow } = useFlow();
   const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div
      className="container-flows"
      onClick={toggleVisibility}
    >
      <h2>Projetos</h2>

      {selectedFlow ? (
        <div>
          <CardMyFlows
            key={selectedFlow.id}
            name={selectedFlow.attributes.name}
            id={selectedFlow.id}
          />
        </div>
      ) : (
        <p>Nenhum flow selecionado.</p>
      )}
      <JsonEditor visible={isVisible} onClose={()=> setIsVisible (false)} />
    </div>
  );
};

export default FlowDetails;

"use client";
import React, { useState } from "react";
import { useFlow } from "@/context/AppProvider";
import CardMyFlows from "../CardMyFlows";
import "./style.css";

const FlowDetails = ({ display }) => {
  const { myFlows } = useFlow();
  return (
    <div 
    className="container-flows"
      style={{
        display: display ? "block" : "none",
      }}
    >
      {myFlows ? (
        <div>
          {myFlows.map((flow) => (
            <CardMyFlows
              key={flow.id}
              name={flow.attributes.name}
              id={flow.id}
            />
          ))}
        </div>
      ) : (
        <p>Nenhum fluxo criado ainda.</p>
      )}
    </div>
  );
};

export default FlowDetails;

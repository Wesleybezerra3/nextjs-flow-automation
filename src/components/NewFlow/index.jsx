"use client";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { useFlow } from "@/context/AppProvider";


export default function NewFlow({ display }) {
  const { createFlow } = useFlow();


  const handleCreateFlow = () => {
    createFlow(); // Passa a instância do `api` para a função do contexto
  };

  return (
    <div
      className=" new-flow"
      style={{
        display: display ? "block" : "none",
        transition: "display 2s ease-in-out",
      }}
  
    >
      {/* <h1 className="text-2xl font-bold mb-4">Criar Novo Fluxo</h1> */}

      <button className="add-flow-button" onClick={handleCreateFlow}>
        <FontAwesomeIcon icon={faAdd} />
        <p>Add new project</p>
      </button>
    </div>
  );
}

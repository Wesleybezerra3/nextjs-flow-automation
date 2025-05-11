import React from "react";
import { Handle } from "react-flow-renderer";
import "./style.css"; // Importando o CSS para o componente
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomNode = ({ data }) => {
  return (
    <div className="custom-node" style={{ backgroundColor: data.color }}
    >
      {/* Handle no lado esquerdo */}
      {data.label !== "Init" && (
        <Handle
          type="target"
          position="left"
          style={{
            background: data.color,
            width: "40px",
            height: "40px",
            cursor: "pointer",
            transform: "translate(-60%,-50%)",
            border: "6px solid #f8f8f8",
          }}
        />
      )}
    
      {/* Handles exclusivos para o tipo "Virtual Assistant" */}
      {/* Ícone do nó */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px", // Altura fixa para centralizar o ícone
        }}
      >
        <FontAwesomeIcon
          icon={data.icon}
          style={{ color: "#fff", fontSize: "60px" }}
        />
      </div>

      {/* Handle no lado direito (padrão) */}
      {data.label !== "Condition" && data.label !== "End" && (
        <Handle
          type="source"
          position="right"
          style={{
            background: data.color,
            width: "40px",
            height: "40px",
            cursor: "pointer",
            transform: "translate(60%,-50%)",
            border: "6px solid #f8f8f8",
          }}
        />
      )}

      {/* Handles exclusivos para o tipo "Condition" */}
      {data.label === "Condition" && (
        <>
          {/* Handle superior */}
          <Handle
            type="source"
            position="right"
            id="condition-output-top"
            style={{
              background: data.color,
              width: "40px",
              height: "40px",
              cursor: "pointer",
              transform: "translate(50%, -130%)", // Alinha o handle superior
              border: "6px solid #f8f8f8",
            }}
          />
          {/* Handle inferior */}
          <Handle
            type="source"
            position="right"
            id="condition-output-bottom"
            style={{
              background: data.color,
              width: "40px",
              height: "40px",
              cursor: "pointer",
              transform: "translate(50%, 30%)", // Alinha o handle inferior
              border: "6px solid #f8f8f8",
            }}
          />
        </>
      )}

      {/* Conteúdo do nó */}
      <div className="content">
        <div className="label-container">
          <p>{data.label}</p>
        </div>
        <div>
          <p className="description">{data.actions?.label}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomNode;
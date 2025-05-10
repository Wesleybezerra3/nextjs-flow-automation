import React from "react";
import { Handle } from "react-flow-renderer";
import "./style.css"; // Importando o CSS para o componente
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomNode = ({ data }) => {
  return (
    <div className="custom-node" style={{ backgroundColor: data.color }}>
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
      {data.label === "Virtual Assistant" && (
        <>
          {/* Handles superiores (Tools e Memory) */}
          <div
            style={{
              position: "absolute",
              top: "10px", // Ajuste a posição vertical conforme necessário
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "70px", // Espaçamento entre os handles
              marginBottom: "20px", // Espaço entre os handles e o conteúdo do nó
            }}
          >
            <div style={{ position: "relative" }}>
              <Handle
                type="source"
                position="top"
                id="tools-output"
                style={{
                  background: data.color,
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                  transform: "translate(-50%, -50%)",
                  border: "6px solid #f8f8f8",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "-40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "#1f1f1f",
                  fontSize: "12px",
                  opacity: 0.8,
                  fontWeight: "bold",
                }}
              >
                Tools
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <Handle
                type="source"
                position="top"
                id="memory-output"
                style={{
                  background: data.color,
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                  transform: "translate(-50%, -50%)",
                  border: "6px solid #f8f8f8",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "-40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "#1f1f1f",
                  opacity: 0.8,
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Memory
              </div>
            </div>
          </div>
        </>
      )}

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
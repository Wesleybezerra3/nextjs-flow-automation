import React from "react";
import { Handle } from "react-flow-renderer";
import "./style.css"; // Importando o CSS para o componente
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

const CustomNode = ({ data }) => {
  return (
    <div className="custom-node" style={{ backgroundColor: data.color}}>
      {data.type !== "trigger" && (
        <Handle
          type="target"
          position="left" // Handle no lado esquerdo
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
      <div>
        <FontAwesomeIcon
          icon={data.icon}
          style={{ color: "#fff", fontSize: "80px" }} // Cor e tamanho do ícone
        />
      </div>
      <Handle
        type="source"
        position="right" // Handle no lado direito
        style={{
          background: data.color,
          width: "40px",
          height: "40px",
          cursor: "pointer",
          transform: "translate(60%,-50%)",
          border: "6px solid #f8f8f8",
        }}
      />
      <div className="content">
        <div className="label-container">
          <p>{data.label}</p>
        </div>
        <div>
          <p className="description">{data.action}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomNode;

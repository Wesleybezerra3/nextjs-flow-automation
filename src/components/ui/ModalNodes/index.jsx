import React, { useState, useEffect } from "react";
import { useFlow } from "@/context/AppProvider";
import ButtonModal from "../ButtonModal";
import { nodeTypes } from "@/utils/types"; // Importa os tipos de nós
import "./style.css";

const ModalNodes = ({ onAddNode }) => {
  const { isVisible } = useFlow(); // Obtém o estado do contexto
  const [selectedNodeType, setSelectedNodeType] = useState(null);

  useEffect(() => {
    console.log("ModalNodes renderizado. Visibilidade:", isVisible); // Log para depuração
  }, [isVisible]);

  const handleBack = () => {
    setSelectedNodeType(null); // Volta ao modal principal
  };

  if (!isVisible) return null; // Não renderiza o modal se ele não estiver visível

  return (
    <div className="modal-nodes">
      {/* Modal Principal */}
      {!selectedNodeType && (
        <div>
          <p className="modal-title">Apps</p>
          {Object.keys(nodeTypes).map((type) => (
            <ButtonModal
              key={type}
              onClick={() => setSelectedNodeType(type)}
              icon={nodeTypes[type].icon}
              color={nodeTypes[type].color}
              content={nodeTypes[type].label}
            />
          ))}
        </div>
      )}

      {/* Modal de Ações Dinâmicas */}
      {selectedNodeType && (
        <div>
          <button onClick={handleBack} className="back-button">
            Voltar
          </button>
          <h3>Ações para {nodeTypes[selectedNodeType]?.label}</h3>
          {nodeTypes[selectedNodeType]?.actions.map((action) => (
            <ButtonModal
              key={action.id}
              onClick={() =>
                onAddNode(
                  nodeTypes[selectedNodeType].type,
                  nodeTypes[selectedNodeType].label,
                  nodeTypes[selectedNodeType].color,
                  nodeTypes[selectedNodeType].icon,
                  action
                )
              }
              icon={nodeTypes[selectedNodeType].icon}
              color={nodeTypes[selectedNodeType].color}
              content={action.label}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ModalNodes;
import React, { useEffect, useState } from "react";
import "./style.css";
import { useFlow } from "@/context/AppProvider";

const ModalNewFlow = ({ visible, onClose }) => {
  const {createFlow,myFlows} = useFlow(); // Obtém a função para criar fluxos do contexto
  const [flowName, setFlowName] = useState(""); // Estado local para o nome do fluxo


  // Função para criar um novo fluxo
  const handleCreateFlow = () => {
    if (!flowName.trim()) {
      alert("Por favor, insira um nome para o fluxo."); // Validação do nome
      return;
    }

    createFlow(flowName); // Passa o nome do fluxo para a função createFlow
    setFlowName(""); // Limpa o campo de entrada
    onClose(); // Fecha o modal
  };

  return (
    <>
      {/* Fundo do modal */}
      <div
        className="background"
        style={{ display: visible ? "block" : "none",backgroundColor: myFlows.length === 0 ? '#7035D6' : "rgba(0, 0, 0, 0.5)" }} // Altera a cor de fundo se não houver fluxos
        onClick={myFlows.length === 0 ? undefined : onClose} // Fecha o modal ao clicar no fundo
      ></div>

      {/* Conteúdo do modal */}
      <div
        className="modal-new-flow"
        style={{ display: visible ? "block" : "none" }}
        onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar dentro do modal
      >
        <h3>Criar Novo Fluxo</h3>
        <div className="modal-new-flow-input">
          <input
            type="text"
            id="flow-name"
            placeholder="Digite o nome do fluxo"
            className="modal-new-flow-input"
            value={flowName} // Vincula o valor ao estado local
            onChange={(e) => setFlowName(e.target.value)} // Atualiza o estado ao digitar
          />
        </div>
        <div className="modal-new-flow-buttons">
          <button onClick={handleCreateFlow} className="modal-new-flow-button">
            Criar
          </button>
          <button onClick={onClose} className="modal-new-flow-button cancel">
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalNewFlow;

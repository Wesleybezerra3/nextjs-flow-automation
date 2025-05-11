import React, { useState, useEffect } from "react";
import "./style.css";
import { useFlow } from "@/context/AppProvider";

const NodePanel = () => {
  const { selectedFlow, nodes } = useFlow(); // Obtém o fluxo selecionado e os nós do contexto
  const [selectedNode, setSelectedNode] = useState(null); // Estado para o nó selecionado

  // Atualiza o nó selecionado ao clicar em um nó no fluxo
  useEffect(() => {
    if (selectedFlow && nodes) {
      const node = nodes.find((n) => n.selected); // Verifica se algum nó está selecionado
      setSelectedNode(node || null); // Define o nó selecionado ou null
    }
  }, [selectedFlow, nodes]);

  useEffect(() => {
    if (selectedNode) {
      console.log("Dados do nó selecionado:", selectedNode);
    }
  }, [selectedNode]);
  if (!selectedNode) {
    return (
      <section className="node-editor-panel">
        <h3>Painel de nó</h3>
        <p>Nenhum nó selecionado.</p>
        <p>Selecione um nó no fluxo para ver os detalhes e parâmetros.</p>
      </section>
    );
  }

  return (
    <>
      <div> </div>
      <section className="node-editor-panel">
        <h3>Painel de nó</h3>

        <article className="node-details">
          <p>
            <strong>ID:</strong> {selectedNode.id}
          </p>
          <p>
            <strong>Label:</strong> {selectedNode.data.label}
          </p>
          <p>
            <strong>Tipo:</strong> {selectedNode.data.type}
          </p>
          <p>
            <strong>Cor:</strong>{" "}
            <span style={{ color: selectedNode.data.color }}>
              {selectedNode.data.color}
            </span>
          </p>
        </article>
        <article className="node-parameters">
          <h3>Parâmetros</h3>
          {selectedNode.data.actions ? (
            <ul>
              <li>
                <p>
                  <strong>Id:</strong> {selectedNode.data.actions.id}
                </p>
              </li>
              <li>
                <p>
                  <strong>Label:</strong> {selectedNode.data.actions.label}
                </p>
              </li>
            </ul>
          ) : (
            <p>Nenhum parâmetro disponível.</p>
          )}
        </article>

        <article className="node-io">
          <h4>Entradas e Saídas</h4>
          <p>
            <strong>Entradas:</strong> {selectedNode.data.inputs || "Nenhuma"}
          </p>
          <p>
            <strong>Saídas:</strong> {selectedNode.data.outputs || "Nenhuma"}
          </p>
        </article>
      </section>
    </>
  );
};

export default NodePanel;

import React, { useEffect, useState } from "react";
import "./style.css";
import { useFlow } from "@/context/AppProvider";

const JsonEditor = ({ visible, onClose }) => {
  const { selectedFlow, onUpdateFlow, nodes, edges } = useFlow();
  const [json, setJson] = useState(JSON.stringify(selectedFlow, null, 2));

  // Atualiza o JSON quando o fluxo selecionado, nós ou arestas mudam
  useEffect(() => {
    if (selectedFlow) {
      const updatedFlow = {
        ...selectedFlow,
        data: {
          nodes,
          edges,
        },
      };
      setJson(JSON.stringify(updatedFlow, null, 2));
    }
  }, [selectedFlow, nodes, edges]);

  // Atualiza o estado ao editar o JSON
  const handleChange = (e) => {
    setJson(e.target.value);
  };

  // Copia o JSON para a área de transferência
  const handleCopy = () => {
    navigator.clipboard.writeText(json);
    alert("JSON copiado para a área de transferência!");
  };

  // Cola o JSON da área de transferência
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJson(text);
    } catch (error) {
      alert("Erro ao colar o conteúdo da área de transferência.");
    }
  };

  // Salva as alterações no JSON
  const handleSave = () => {
    try {
      const parsedJson = JSON.parse(json); // Valida o JSON
      onUpdateFlow(parsedJson); // Atualiza o fluxo com o JSON editado
      alert("Fluxo atualizado com sucesso!");
    } catch (error) {
      alert("JSON inválido. Por favor, corrija os erros.");
    }
  };

  return (
    <>
      <div
        className="background"
        style={{ display: visible ? "block" : "none" }}
        onClick={onClose}
      ></div>
      <div
        className="json-editor"
        style={{ display: visible ? "block" : "none" }}
        onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar dentro do modal
      >
        <h3>Editor de Fluxo (JSON)</h3>
        <textarea
          value={json}
          onChange={handleChange}
          className="json-editor-textarea"
        />
        <div className="json-editor-buttons">
          <button onClick={handleCopy} className="json-editor-button">
            Copiar
          </button>
          <button onClick={handlePaste} className="json-editor-button">
            Colar
          </button>
          <button onClick={handleSave} className="json-editor-button save">
            Salvar
          </button>
        </div>
      </div>
    </>
  );
};

export default JsonEditor;

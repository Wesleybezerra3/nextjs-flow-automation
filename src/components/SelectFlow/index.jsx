import { useFlow } from "@/context/AppProvider";
import React, { useState, useEffect } from "react";
import "./style.css";

const SelectFlow = () => {
  const { myFlows, handleSelectFlow, listFlows, selectedFlow } = useFlow(); // Inclui o fluxo selecionado do contexto
  const [selectedId, setSelectedId] = useState("");

  // Atualiza os fluxos ao montar o componente
  useEffect(() => {
    listFlows(); // Garante que os fluxos sejam carregados ao montar o componente
  }, [listFlows]);

  // Atualiza o estado `selectedId` sempre que o fluxo selecionado mudar
  useEffect(() => {
    if (selectedFlow) {
      setSelectedId(selectedFlow.id); // Define o fluxo recém-criado como selecionado
    }
  }, [selectedFlow]);

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    setSelectedId(selectedId);
    handleSelectFlow(selectedId); // Chama a função para selecionar o fluxo
  };

  return (
    <div className="select-flow">
      <select
        className="select-flow-card"
        value={selectedId}
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          Selecione um fluxo
        </option>
        {myFlows.length === 0 && (
          <option value="" disabled>
            Nenhum fluxo criado ainda
          </option>
        )}
        {myFlows.map((flow) => (
          <option key={flow.id} value={flow.id}>
            {flow.attributes?.name || "Sem Nome"}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFlow;
import { useFlow } from '@/context/AppProvider';
import React, { useState } from 'react';
import './style.css';

const SelectFlow = () => {
  const { myFlows,handleSelectFlow } = useFlow(); // Obtém os fluxos do contexto
   const [selectedId, setSelectedId] = useState('');

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
        <option value='' disabled>Selecione um fluxo</option>
        {myFlows.length === 0 && (
          <option value="" disabled>
            Nenhum fluxo criado ainda
          </option>
        )}
        {myFlows.map((flow) => (
          <option key={flow.id} value={flow.id}>
            {flow.attributes?.name || 'Sem Nome'}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFlow;
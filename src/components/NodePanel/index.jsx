'use client';
import React, { useState } from 'react';
import Button from '../ui/Button/Button';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

export default function NodePanel({ selectedNode, onUpdateNode }) {
  const [copied, setCopied] = useState(false);

  if (!selectedNode) return <div>Selecione um nó para editar</div>;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(selectedNode, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reseta o estado após 2 segundos
  };

  return (
    <div style={{ padding: '16px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Editar Nó</h3>
      <label>
        Nome:
        <input
          type="text"
          value={selectedNode.data.action}
          onChange={(e) =>
            onUpdateNode({ ...selectedNode, data: { ...selectedNode.data, action: e.target.value } })
          }
          style={{ display: 'block', margin: '8px 0', padding: '8px', width: '100%' }}
        />
      </label>
      <h4>JSON do Nó</h4>
      <pre
        style={{
          background: '#f8f8f8',
          padding: '8px',
          borderRadius: '4px',
          overflowX: 'auto',
          maxHeight: '200px',
        }}
      >
        {JSON.stringify(selectedNode, null, 2)}
      </pre>
      <Button
        onClick={handleCopyJson}
        content={copied ? 'Copiado!' : 'Copiar JSON'}
        icon={faCopy}
        color={'#f8f8f8'}
      />
    </div>
  );
}
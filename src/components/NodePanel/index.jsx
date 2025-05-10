'use client';
import React, { useState } from 'react';
import Button from '../ui/Button/Button';
import { faCopy, faPaste } from '@fortawesome/free-solid-svg-icons';

export default function NodePanel({ selectedNode, onUpdateNode }) {
  const [copied, setCopied] = useState(false);
  const [jsonInput, setJsonInput] = useState('');

  if (!selectedNode) return <div>Selecione um nó para editar</div>;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(selectedNode, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reseta o estado após 2 segundos
  };

  const handlePasteJson = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const parsedJson = JSON.parse(text);
      onUpdateNode(parsedJson); // Atualiza o nó com o JSON colado
    } catch (error) {
      alert('Erro ao colar JSON. Certifique-se de que o conteúdo é válido.');
    }
  };

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleUpdateJson = () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      onUpdateNode(parsedJson); // Atualiza o nó com o JSON editado
    } catch (error) {
      alert('JSON inválido. Certifique-se de que o conteúdo é válido.');
    }
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
      <textarea
        value={JSON.stringify(selectedNode, null, 2)}
        readOnly
        style={{
          background: '#f8f8f8',
          padding: '8px',
          borderRadius: '4px',
          overflowX: 'auto',
          maxHeight: '200px',
          width: '100%',
          height: '150px',
        }}
      />
      <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        <Button
          onClick={handleCopyJson}
          content={copied ? 'Copiado!' : 'Copiar JSON'}
          icon={faCopy}
          color={'#f8f8f8'}
        />
        <Button
          onClick={handlePasteJson}
          content={'Colar JSON'}
          icon={faPaste}
          color={'#f8f8f8'}
        />
      </div>
      <h4>Editar JSON</h4>
      <textarea
        value={jsonInput}
        onChange={handleJsonChange}
        placeholder="Cole ou edite o JSON aqui"
        style={{
          background: '#fff',
          padding: '8px',
          borderRadius: '4px',
          overflowX: 'auto',
          maxHeight: '200px',
          width: '100%',
          height: '150px',
          marginTop: '8px',
        }}
      />
      <Button
        onClick={handleUpdateJson}
        content={'Atualizar JSON'}
        color={'#007bff'}
        style={{
          marginTop: '8px',
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      />
    </div>
  );
}
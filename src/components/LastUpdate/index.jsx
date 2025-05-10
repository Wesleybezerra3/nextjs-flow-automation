import React from 'react';

const LastUpdate = ({ timestamp }) => {
  const formatDate = (date) => {
    if (!date) return 'Nenhuma atualização';
    return new Date(date).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div
      style={{
        padding: '8px',
        backgroundColor: '#7035D6',
        borderRadius: '4px',
        textAlign: 'center',
        width: '200px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <p style={{ margin: 0, fontSize: '14px', color: '#f8f8f8' }}>Última Atualização:</p>
      <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#f8f8f8' }}>
        {formatDate(timestamp)}
      </p>
    </div>
  );
};

export default LastUpdate;
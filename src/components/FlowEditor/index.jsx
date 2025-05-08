"use client";
import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  
} from 'react-flow-renderer';
import CustomNode from '../Nodes/CustomNode';
import DottedEdge from '../EdgeCustom';
import AddNode from '../addNode';
import ModalNodes from "@/components/ModalNodes";

const edgeTypes={
  dotted: DottedEdge
}
const nodeTypes = {
  custom: CustomNode,
};

export default function FlowEditor({ nodes, edges, onNodesChange, onEdgesChange, onConnect,onNodeClick }) {

  return (
    <div style={{ height: '100vh',position:'relative' }}>
      <ReactFlow
        nodes={nodes}// Define os nós
        edges={edges}// Define os nós e arestas
        onNodesChange={onNodesChange} // Atualiza os nós
        onEdgesChange={onEdgesChange} // Atualiza as arestas
        onConnect={onConnect} // Conecta os nós
        onNodeClick={onNodeClick} // Atualiza o nó selecionado
        fitView // Ajusta a visualização para caber na tela
        nodeTypes={nodeTypes} // Define os tipos de nós
        edgeTypes={edgeTypes}
        nodesDraggable={true} // Garante que os nós podem ser movidos
        nodesConnectable={true} // Permite conectar os nós
        elementsSelectable={true} // Permite selecionar os nós
      >
        <ModalNodes/>
        <AddNode/>
        <Background />
      </ReactFlow>
    </div>
  );
}
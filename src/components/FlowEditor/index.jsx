"use client";
import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  
}from 'react-flow-renderer';
import { useFlow } from '@/context/AppProvider';
import CustomNode from '../Nodes/CustomNode';
import DottedEdge from '../EdgeCustom';
import ModalNodes from "@/components/ui/ModalNodes";

const edgeTypes={
  dotted: DottedEdge
}
const nodeTypes = {
  custom: CustomNode,
};
import './style.css';

import HeaderFlowEditor from '../HeaderFlowEditor';
import AddNode from '../ui/AddNode';

export default function FlowEditor() {
    const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onAddNode,
  } = useFlow();

  return (
    <div className='flow-editor'>
      <ReactFlow
        nodes={nodes}// Define os nós
        edges={edges}// Define os nós e arestas
        onNodesChange={onNodesChange} // Atualiza os nós
        onEdgesChange={onEdgesChange} // Atualiza as arestas
        onConnect={onConnect} // Conecta os nós
        fitView // Ajusta a visualização para caber na tela
        nodeTypes={nodeTypes} // Define os tipos de nós
        edgeTypes={edgeTypes}
        nodesDraggable={true} // Garante que os nós podem ser movidos
        nodesConnectable={true} // Permite conectar os nós
        elementsSelectable={true} // Permite selecionar os nós
      >
        <HeaderFlowEditor/>
        <AddNode/>
        <ModalNodes onAddNode={onAddNode}/>
        <Controls className='flex'/>
        <Background />
      </ReactFlow>
    </div>
  );
}
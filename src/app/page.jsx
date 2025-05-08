// import {Button} from '@/components/ui/button';
"use client";
import FlowEditor from "../components/FlowEditor";
import NodePanel from "../components/NodePanel";
import Sidebar from "../components/Sidebar";
import { applyNodeChanges, addEdge } from "react-flow-renderer";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import React, { useState,useCallback } from "react";
import Header from "@/components/Header";


export default function Home() {
  const [selectedNode, setSelectedNode] = useState(null);

  const [nodes, setNodes] = useState([
    {
      id: "1",
      type: "custom",
      data: { label: "Trigger", color: "#FF9914", icon:faBolt, type:'trigger', action: "Gatilho" },
      position: { x: 250, y: 0 },
      draggable: true,
    },
  ]);
  const [edges, setEdges] = useState([
    {
      id: "e1-2",
      source: "1",
      target: "2",
      type: "dotted", 
    },
  ]);

  const onNodeClick = (_, node) => {
    console.log('onNodeClick:', onNodeClick)
    setSelectedNode(node);
  }

  const onUpdateNode = (updatedNode) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === updatedNode.id ? updatedNode : node))
    );
    console.log('Selected Node:', selectedNode);
    setSelectedNode(updatedNode); // Atualiza o nó selecionado
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((eds) => eds.map((edge) => ({ ...edge, ...changes }))),
    []
  );

  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find((node) => node.id === params.source);
      const sourceColor = sourceNode?.data?.color || "#ccc"; // Cor padrão se não encontrar
  
      setEdges((eds) =>
        addEdge({ ...params, type: "dotted", color: sourceColor }, eds)
      );
    },
    [nodes, setEdges]
  );

  const onAddNode = (type, label, color,icon, action) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type:'custom',
      data: { label, color, icon, type, action },
      position: { x: Math.random() * 200, y: Math.random() * 200 },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  return (
    <>
  <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f8f8f8" }}>
      {/* Sidebar */}
      
        <Sidebar onAddNode={onAddNode} /> 
      

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
      <Header/>
    
        {/* Flow Editor */}
        <div className="flex-1 overflow-hidden">
          <FlowEditor
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
          />
        </div>
      </div>

      {/* Node Panel */}
      <div className="w-1/6 p-4" style={{borderLeft: "1px solid #ccc"}}>
        <NodePanel selectedNode={selectedNode} onUpdateNode={onUpdateNode}/>
      </div>
    </div>
    </>
  );
}

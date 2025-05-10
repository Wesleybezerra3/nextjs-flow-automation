"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { applyNodeChanges, addEdge } from "react-flow-renderer";
import api from "../services/api"; // Importa a API para fazer requisições
import { faBolt } from "@fortawesome/free-solid-svg-icons"; // Importa o ícone do FontAwesome

// Cria os contextos
export const ModalContext = createContext();
export const FlowContext = createContext();

// Provedor do contexto
export const AppProvider = ({ children }) => {
  // Estado e funções para o ModalContext
  const [isVisible, setIsVisible] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null); // Estado para armazenar a última atualização
  const [myFlows, setMyFlows] = useState([]); // Estado para armazenar os fluxos
  const handleVisible = () => {
    setIsVisible(!isVisible);
  };

  // Estado e funções para o FlowContext
  const [name, setName] = useState("");

  const [nodes, setNodes] = useState([
    {
      id: "1",
      type: "custom",
      data: {
        label: "Trigger",
        color: "#FF9914",
        icon: faBolt,
        type: "trigger",
        action: "Gatilho",
      },
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

  // Atualiza os nós
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Atualiza as arestas
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((eds) => eds.map((edge) => ({ ...edge, ...changes }))),
    []
  );

  // Conecta os nós
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

  // Adiciona um novo nó
  const onAddNode = (type, label, color, icon, action) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: "custom",
      data: { label, color, icon, type, action },
      position: { x: Math.random() * 200, y: Math.random() * 200 },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  // Cria um fluxo
  const createFlow = useCallback(async () => {
    try {
      const response = await api.post(`/flows`, {
        data: {
          name: name || "Novo Fluxo",
          data: {
            nodes: nodes,
            edges: edges,
          },
        },
      });
      console.log("Fluxo criado com sucesso:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar fluxo:", error);
    }
  }, []);

// Função para listar fluxos
  const listFlows = useCallback(async () => {
    try {
      const response = await api.get(`/flows`);
      const flows = response.data?.data || [];

     const filteredFlows = flows.filter((flow) =>
      flow.attributes?.name?.startsWith("Wesley")
    );
      setMyFlows(filteredFlows); // Atualiza o estado com os fluxos filtrados
      console.log("Fluxos listados com sucesso:", filteredFlows);
    } catch (error) {
      console.error("Erro ao listar fluxos:", error);
      return [];
    }
  }, []);

  // Função para salvar o fluxo automaticamente
  const autoSaveFlow = useCallback(async () => {
    try {
      const response = await api.post(`/flows`, {
        data: {
        name: name,
        data: {
          nodes: nodes.map((node) => ({
            id: node.id,
            data: node.data,
            type: node.type,
            position: node.position,
            draggable: node.draggable,
          })),
          edges: edges.map((edge) => ({
            id: edge.id,
            type: edge.type,
            source: edge.source,
            target: edge.target,
            color: edge.color,
          })),
        },
      },
      });
      console.log("Fluxo salvo automaticamente:", response.data);
      setLastUpdate(new Date()); // Atualiza a última atualização
    } catch (error) {
      console.error("Erro ao salvar fluxo automaticamente:", error);
    }
  }, [name, nodes, edges]);

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      autoSaveFlow();
    }, 2000); // Salva automaticamente após 2 segundos de inatividade

    return () => clearTimeout(saveTimeout); // Limpa o timeout anterior para evitar múltiplas chamadas
  }, [nodes, edges, autoSaveFlow]);

  // const saveFlow = useCallback(async () => {
  //   setIsSaving(true);
  //   try {
  //     await createFlow({ name: flowName || "Novo Fluxo", nodes, edges });
  //     // if (flowId) {
  //     //   await updateFlow(flowId, { name: flowName, nodes, edges });
  //     // } else {

  //     // }
  //     setLastSaved(new Date());
  //   } catch (error) {
  //     console.error("Erro ao salvar o fluxo:", error);
  //   } finally {
  //     setIsSaving(false);
  //   }
  // }, [flowName, nodes, edges, createFlow, updateFlow]);

  return (
    <ModalContext.Provider value={{ isVisible, handleVisible }}>
      <FlowContext.Provider
        value={{
          name,
          setName,
          nodes,
          setNodes,
          edges,
          setEdges,
          createFlow,
          listFlows,
          onNodesChange,
          onEdgesChange,
          onConnect,
          onAddNode,
          lastUpdate,
          myFlows
        }}
      >
        {children}
      </FlowContext.Provider>
    </ModalContext.Provider>
  );
};

export const useFlow = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error("useFlow deve ser usado dentro de um FlowProvider");
  }
  return context;
};

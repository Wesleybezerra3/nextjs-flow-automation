"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { applyNodeChanges, addEdge } from "react-flow-renderer";
import api from "../services/api"; // Importa a API para fazer requisições
import { faBolt } from "@fortawesome/free-solid-svg-icons"; // Importa o ícone do FontAwesome

// Cria o contexto para o fluxo
export const FlowContext = createContext();

// Provedor do contexto
export const AppProvider = ({ children }) => {
  // ============================
  // ESTADOS GERAIS
  // ============================
  const [isVisible, setIsVisible] = useState(false); // Controle de visibilidade do modal
  const [lastUpdate, setLastUpdate] = useState(null); // Última atualização do fluxo
  const [myFlows, setMyFlows] = useState([]); // Lista de fluxos
  const [selectedFlow, setSelectedFlow] = useState(null); // Fluxo atualmente selecionado
  const [nodes, setNodes] = useState([
    {
      id: "1",
      type: "custom",
      data: {
        label: "Init",
        color: "#FF9914",
        icon: faBolt,
        type: "init",
        actions: { id: "init", label: "Start Flow" },
      },
      position: { x: 250, y: 0 },
      draggable: true,
    },
  ]); // Nós do fluxo
  const [edges, setEdges] = useState([
    {
      id: "e1-2",
      source: "1",
      target: "2",
      type: "dotted",
    },
  ]); // Arestas do fluxo

  // ============================
  // FUNÇÕES DE ESTADO
  // ============================

    

  // Alterna a visibilidade do modal
   const handleVisibleModalNodes = () => {
    setIsVisible((prev) => {
      console.log("Modal de nós visível:", !prev); // Log para depuração
      return !prev;
    });
  };

  // Atualiza os nós
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Atualiza as arestas
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyNodeChanges(changes, eds)),
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

  // ============================
  // FUNÇÕES DE FLUXO
  // ============================

  // Seleciona um fluxo
  const handleSelectFlow = (flowId) => {
    const selectedFlow = myFlows.find(
      (flow) => String(flow.id) === String(flowId)
    );
    if (selectedFlow) {
      setSelectedFlow(selectedFlow);

      // Atualiza os nodes e edges com os dados do fluxo selecionado
      const { nodes: selectedNodes, edges: selectedEdges } =
        selectedFlow.attributes.data || {};
      setNodes(selectedNodes || []); // Define os nodes do fluxo selecionado
      setEdges(selectedEdges || []); // Define as edges do fluxo selecionado
    } else {
      console.error("Fluxo não encontrado:", flowId);
    }
  };

  // Adiciona um novo nó
  const onAddNode = (type, label, color, icon, actions) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: "custom",
      data: { label, color, icon, type, actions },
      position: { x: Math.random() * 200, y: Math.random() * 200 },
    };
    console.log("Novo nó adicionado:", newNode);
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  // Cria um novo fluxo
  const createFlow = useCallback(
    async (flowName) => {
      try {
        // const existingFlows = myFlows.filter((flow) =>
        //   flow.attributes.name.startsWith("W")
        // );
        const nextFlowNumber = myFlows.length + 1;
        const defaultName = `W_New Flow${nextFlowNumber}`;

        const response = await api.post(`/flows`, {
          data: {
            name: flowName || defaultName,
            data: {
              nodes: nodes,
              edges: edges,
            },
          },
        });

        setMyFlows((prevFlows) => [...prevFlows, response.data.data]);
        setSelectedFlow(response.data.data);
        alert("Fluxo criado com sucesso!");
        console.log("Fluxo criado com sucesso:", response.data.data);
        return response.data;
      } catch (error) {
        console.error("Erro ao criar fluxo:", error);
      }
    },
    [nodes, edges, myFlows]
  );

  // Lista fluxos
  const listFlows = useCallback(async () => {
    try {
      const response = await api.get(`/flows`);
      const flows = response.data?.data || [];

      const filteredFlows = flows
        .filter((flow) => flow.attributes.name.startsWith("W"))
        .map((flow) => ({
          ...flow,
          lastUpdate: flow.lastUpdate || null,
        }));

      setMyFlows(filteredFlows);
      console.log("Fluxos listados com sucesso:", filteredFlows);
    } catch (error) {
      console.error("Erro ao listar fluxos:", error);
      return [];
    }
  }, []);

  // Deleta um fluxo
  const deleteFlow = useCallback(async (flowId) => {
    try {
      await api.delete(`/flows/${flowId}`);
      setMyFlows((prevFlows) => prevFlows.filter((flow) => flow.id !== flowId));
      console.log("Fluxo deletado com sucesso:", flowId);
    } catch (error) {
      console.error("Erro ao deletar fluxo:", error);
    }
  }, []);

  // Atualiza um fluxo com o JSON editado
  const onUpdateFlow = (updatedFlow) => {
    try {
      const { nodes: updatedNodes, edges: updatedEdges } =
        updatedFlow.data || {};

      if (!updatedNodes || !updatedEdges) {
        throw new Error("O JSON deve conter os campos 'nodes' e 'edges'.");
      }

      setNodes(updatedNodes);
      setEdges(updatedEdges);

      setSelectedFlow((prevFlow) => ({
        ...prevFlow,
        attributes: {
          ...prevFlow.attributes,
          data: {
            nodes: updatedNodes,
            edges: updatedEdges,
          },
        },
      }));

      console.log("Fluxo atualizado com sucesso:", updatedFlow);
    } catch (error) {
      console.error("Erro ao atualizar o fluxo:", error);
      alert("Erro ao atualizar o fluxo. Verifique o JSON.");
    }
  };

  // Salva o fluxo automaticamente
  const autoSaveFlow = useCallback(async () => {
    try {
      if (!selectedFlow) {
        console.warn("Nenhum fluxo selecionado. Salvando como novo fluxo.");
        return;
      }

      const flowData = {
        data: {
          name: selectedFlow.attributes.name || "Wesley novo fluxo",
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
      };

      const response = await api.put(`/flows/${selectedFlow.id}`, flowData);
      console.log("Fluxo atualizado automaticamente:", response.data);

      setMyFlows((prevFlows) =>
        prevFlows.map((flow) =>
          flow.id === selectedFlow.id
            ? { ...response.data.data, lastUpdate: new Date() }
            : flow
        )
      );

      setLastUpdate(new Date());
    } catch (error) {
      console.error("Erro ao salvar fluxo automaticamente:", error);
    }
  }, [selectedFlow, nodes, edges]);

  // ============================
  // EFEITOS
  // ============================

  // Cria um fluxo padrão se nenhum existir
  // useEffect(() => {
  //   const createFlowDefault = async () => {
  //     try {
  //       if (myFlows.length === 0 && !selectedFlow) {
  //         console.log("Nenhum fluxo encontrado. Criando fluxo padrão...");
  //         await createFlow();
  //       }
  //     } catch (error) {
  //       console.error("Erro ao criar fluxo padrão:", error);
  //     }
  //   };

  //   createFlowDefault();
  // }, [myFlows, createFlow]);

  // Salva automaticamente após 2 segundos de inatividade
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      autoSaveFlow();
    }, 2000);
    return () => clearTimeout(saveTimeout);
  }, [nodes, edges, autoSaveFlow]);

  // ============================
  // CONTEXTO
  // ============================

  return (
    <FlowContext.Provider
      value={{
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
        myFlows,
        handleSelectFlow,
        selectedFlow,
        deleteFlow,
        onUpdateFlow,
        handleVisibleModalNodes,
        isVisible,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
};

// Hook para usar o contexto
export const useFlow = () => {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error("useFlow deve ser usado dentro de um FlowProvider");
  }
  return context;
};

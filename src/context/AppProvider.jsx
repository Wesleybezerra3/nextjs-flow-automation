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
import { data } from "autoprefixer";

// Cria os contextos
export const ModalContext = createContext();
export const FlowContext = createContext();

// Provedor do contexto
export const AppProvider = ({ children }) => {
  // Estado e funções para o ModalContext
  const [isVisible, setIsVisible] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null); // Estado para armazenar a última atualização
  const [myFlows, setMyFlows] = useState([]); // Estado para armazenar os fluxos
  const [selectedFlow, setSelectedFlow] = useState(null); // Estado para armazenar o fluxo selecionado
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
        label: "Init",
        color: "#FF9914",
        icon: faBolt,
        type: "init",
        actions:{id:'init', label:'Iniciar fluxo'},
        
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
  // Função para selecionar um fluxo
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

  // Cria um fluxo
 const createFlow = useCallback(async () => {
  try {
    // Obtém o próximo número disponível para o nome do fluxo
    const existingFlows = myFlows.filter((flow) =>
      flow.attributes.name.startsWith("Wesley novo fluxo")
    );
    const nextFlowNumber = existingFlows.length + 1;
    const defaultName = `Wesley novo fluxo${nextFlowNumber}`;

    const response = await api.post(`/flows`, {
      data: {
        name: name || defaultName, // Usa o nome fornecido ou o nome padrão com contador
        data: {
          nodes: nodes,
          edges: edges,
        },
      },
    });

    setMyFlows((prevFlows) => [...prevFlows, response.data.data]); // Atualiza o estado com o novo fluxo
    setSelectedFlow(response.data.data); // Define o fluxo selecionado como o recém-criado
    console.log("Fluxo criado com sucesso:", response.data.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar fluxo:", error);
  }
}, [name, nodes, edges, myFlows]);

  // Cria um novo fluxo se não existir nenhum
useEffect(() => {
  const createFlowDefalt = async () => {
    try {
      if (myFlows.length === 0 && !selectedFlow) {
        console.log("Nenhum fluxo encontrado. Criando fluxo padrão...");
        await createFlow();
      }
    } catch (error) {
      console.error("Erro ao criar fluxo padrão:", error);
    }
  };

  createFlowDefalt();
}, [myFlows,createFlow]); // Adiciona `selectedFlow` como dependência

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
  // Função para deletar um fluxo
  const deleteFlow = useCallback(async (flowId) => {
    try {
      await api.delete(`/flows/${flowId}`);
      setMyFlows((prevFlows) => prevFlows.filter((flow) => flow.id !== flowId));
      console.log("Fluxo deletado com sucesso:", flowId);
    } catch (error) {
      console.error("Erro ao deletar fluxo:", error);
    }
  }, []);

  // Função para salvar o fluxo automaticamente
 const autoSaveFlow = useCallback(async () => {
  try {
    if (!selectedFlow) {
      console.warn("Nenhum fluxo selecionado. Salvando como novo fluxo.");
      return; // Evita criar novos fluxos desnecessariamente
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
          ? { ...response.data.data, lastUpdate: new Date() } // Atualiza o fluxo com a última atualização
          : flow
      )
    );
  } catch (error) {
    console.error("Erro ao salvar fluxo automaticamente:", error);
  }
}, [selectedFlow, nodes, edges]);

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
          myFlows,
          handleSelectFlow,
          selectedFlow,
          deleteFlow,
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

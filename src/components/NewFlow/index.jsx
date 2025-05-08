"use client";
import React, { useState } from "react";
import api from "../../services/api";
import { useRouter } from "next/navigation";

export default function NewFlow() {
  const [name, setName] = useState();

 
  const createFlow = async () => {
    if (!name){
      alert("Por favor, insira um nome para o fluxo.");
      return;
    }
    console.log(name);
    const payload = {
      name: name,
      data: {
        nodes: [
          {
            id: "trigger-1",
            data: {
              label: "Trigger Node",
              config: {},
            },
            type: "trigger",
            position: { x: 100, y: 100 },
          },
        ],
        edges: [],
      },
    };
    try {
      const response = await api.post("/flows", payload);

      console.log(response.data);
      if (response.status === 200) {
        alert("Fluxo criado com sucesso!");
        setName("");
      } else {
        alert("Erro ao criar o fluxo. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao criar o fluxo:", err);
      alert("Erro ao criar o fluxo. Tente novamente.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Novo Fluxo</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do Fluxo"
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={createFlow}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Criar
      </button>
    </div>
  );
}

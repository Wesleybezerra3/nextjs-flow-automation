import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./style.css";
import { useFlow } from "@/context/AppProvider";

const CardMyFlows = ({ name, id }) => {
  const { deleteFlow } = useFlow();
  return (
    <div className="card-flow">
       <div>
        <p>{name || "Sem nome"}</p>
      </div>
      <div className="card-flow-button">
        <button onClick={()=>deleteFlow(id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
     
    </div>
  );
};

export default CardMyFlows;

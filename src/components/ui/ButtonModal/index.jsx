import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './style.css'



export default function ButtonModal({ icon, color, content, ...props }) {
  return (
    <button
      {...props}
      className="button-modal" 
    >
      <p style={{ background: color }}>
        <FontAwesomeIcon icon={icon} style={{ color: '#f1f1f1', fontSize: "1.2em" }} />
        </p>
      <p>{content}</p>
    </button>
  );
};



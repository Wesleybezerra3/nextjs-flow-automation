import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './style.css'


export default function Button({ icon, color, content, ...props }) {
  return (
    <button
      {...props}
      className="text-black-100 font-medium py-4 px-8 rounded cursor-pointer font-medium flex items-center justify-center flex gap-2 item-center justify-center mb-5" 
      style={{fontSize:'1.3em',width:'90%', fontFamily:"Roboto"}}
    >
      <FontAwesomeIcon icon={icon} style={{ color: color, fontSize: "24px" }} />
      {content}
    </button>
  );
};



import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";


const Header = () => {
  return (
    <>
      <header className=" p-4 text-center flex items-center justify-between shadow-sm" style={{borderBottom: "1px solid #ccc"}}>
        <FontAwesomeIcon icon={faSave} style={{color:'1f1f1f', fontSize: '1.3em', cursor:'pointer'}} onClick={''}/>
      </header>
    </>
  );
};

export default Header;

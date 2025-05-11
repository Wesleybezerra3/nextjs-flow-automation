"use client";
import React, { useContext, useEffect, useState } from "react";
import NewFlow from "../NewFlow";
import { FlowContext } from "@/context/AppProvider";
import "./style.css";
import FlowDetails from "../Flows";
import NodePanel from "../NodePanel";

export default function Sidebar() {
  const { listFlows } = useContext(FlowContext);
  // const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    listFlows();
  }, []);

  return (
    <div
      className=" p-4 sidebar"
      // onMouseEnter={() => setIsOpen(true)}
      // onMouseLeave={() => setIsOpen(false)}
      // style={{
      //   width: isOpen ? "350px" : "100px",
      //   transition: "width 0.3s ease-in-out",
      // }}
    >
      <div className="logo">
        <p>XBASE</p>
      </div>
      <NewFlow />

      <FlowDetails />

      <NodePanel />
    </div>
  );
}

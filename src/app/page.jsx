// import {Button} from '@/components/ui/button';
"use client";
import FlowEditor from "../components/FlowEditor";
import NodePanel from "../components/NodePanel";
import Sidebar from "../components/Sidebar";
import React, { useState,useCallback } from "react";


export default function Home() {
  return (
    <>
  <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#f8f8f8" }}>
      {/* Sidebar */}
        <Sidebar /> 
      {/* Main Content */}
      <div className="flex flex-col flex-1">    
        {/* Flow Editor */}
        <div className="flex-1 overflow-hidden p-4">
          <FlowEditor/>
        </div>
      </div>

      {/* Node Panel */}
    </div>
    </>
  );
}

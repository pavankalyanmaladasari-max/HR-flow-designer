/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useRef } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  ReactFlowProvider,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useWorkflowStore } from '../../store/useWorkflowStore';
import CustomNode from './CustomNode';
import { NodeType, WorkflowNodeData } from '../../types/workflow';

const nodeTypes = {
  custom: CustomNode,
};

export const WorkflowCanvas = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect, 
    addNode, 
    selectNode 
  } = useWorkflowStore();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;

      if (!type || !reactFlowWrapper.current) return;

      const position = {
        x: event.clientX - reactFlowWrapper.current.getBoundingClientRect().left,
        y: event.clientY - reactFlowWrapper.current.getBoundingClientRect().top,
      };

      const newNode = {
        id: `${type}-${Date.now()}`,
        type: 'custom',
        position,
        data: { 
          label: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`, 
          type 
        } as WorkflowNodeData,
      };

      addNode(newNode);
    },
    [addNode]
  );

  return (
    <div className="flex-1 h-full relative" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={(instance) => instance.fitView()}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => selectNode(node.id)}
        onPaneClick={() => selectNode(null)}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
        
        <Panel position="top-right" className="bg-white/80 backdrop-blur-sm p-2 rounded-lg border border-gray-200 shadow-sm">
          <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
            Canvas Version 1.0
          </p>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;

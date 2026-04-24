/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { create } from 'zustand';
import { 
  Connection, 
  Edge, 
  EdgeChange, 
  NodeChange, 
  addEdge, 
  applyEdgeChanges, 
  applyNodeChanges,
  OnNodesChange,
  OnEdgesChange,
  OnConnect
} from 'reactflow';
import { WorkflowNode, WorkflowNodeData } from '../types/workflow';

interface WorkflowState {
  nodes: WorkflowNode[];
  edges: Edge[];
  selectedNodeId: string | null;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: WorkflowNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  selectNode: (nodeId: string | null) => void;
  updateNodeData: (nodeId: string, data: Partial<WorkflowNodeData>) => void;
  addNode: (node: WorkflowNode) => void;
  deleteNode: (nodeId: string) => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [
    {
      id: 'start-1',
      type: 'custom',
      position: { x: 250, y: 50 },
      data: { label: 'Start Onboarding', type: 'start' },
    }
  ],
  edges: [],
  selectedNodeId: null,

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  setNodes: (nodes: WorkflowNode[]) => set({ nodes }),
  setEdges: (edges: Edge[]) => set({ edges }),

  selectNode: (nodeId: string | null) => set({ selectedNodeId: nodeId }),

  updateNodeData: (nodeId: string, data: Partial<WorkflowNodeData>) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, ...data },
          };
        }
        return node;
      }),
    });
  },

  addNode: (node: WorkflowNode) => set({ nodes: [...get().nodes, node] }),

  deleteNode: (nodeId: string) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
      edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
      selectedNodeId: get().selectedNodeId === nodeId ? null : get().selectedNodeId,
    });
  },
}));

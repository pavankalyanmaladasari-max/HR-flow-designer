/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Node, Edge } from 'reactflow';

export type { Node, Edge };

export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export interface BaseNodeData {
  label: string;
  description?: string;
  type: NodeType;
}

export interface TaskNodeData extends BaseNodeData {
  type: 'task';
  assignee?: string;
  dueDate?: string;
}

export interface ApprovalNodeData extends BaseNodeData {
  type: 'approval';
  approverRole?: 'HR_MANAGER' | 'DEPT_HEAD' | 'CEO';
  threshold?: number;
}

export interface AutomatedNodeData extends BaseNodeData {
  type: 'automated';
  actionId?: string;
  parameters?: Record<string, any>;
}

export type WorkflowNodeData = BaseNodeData | TaskNodeData | ApprovalNodeData | AutomatedNodeData;

export type WorkflowNode = Node<WorkflowNodeData>;

export interface AutomationAction {
  id: string;
  name: string;
  description: string;
  params: {
    key: string;
    label: string;
    type: 'string' | 'number' | 'boolean' | 'date';
    required: boolean;
  }[];
}

export interface SimulationStep {
  nodeId: string;
  nodeLabel: string;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  message: string;
  timestamp: string;
}

export interface WorkflowSimulation {
  steps: SimulationStep[];
  isValid: boolean;
  errors: string[];
}

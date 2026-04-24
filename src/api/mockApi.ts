/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AutomationAction, SimulationStep, WorkflowSimulation, WorkflowNode, Edge } from '../types/workflow';

const MOCK_ACTIONS: AutomationAction[] = [
  {
    id: 'send-email',
    name: 'Send Welcome Email',
    description: 'Sends an automated welcome email to the new hire.',
    params: [
      { key: 'template', label: 'Email Template', type: 'string', required: true },
      { key: 'ccAdmin', label: 'CC Admin', type: 'boolean', required: false },
    ]
  },
  {
    id: 'create-slack-channel',
    name: 'Create Slack Channel',
    description: 'Creates a private Slack channel for the onboarding team.',
    params: [
      { key: 'prefix', label: 'Channel Prefix', type: 'string', required: true },
    ]
  },
  {
    id: 'provision-zoom',
    name: 'Provision Zoom Account',
    description: 'Auto-creates a Zoom account for the employee.',
    params: [
      { key: 'plan', label: 'Plan Type', type: 'string', required: true },
    ]
  }
];

export const mockApi = {
  getAutomations: async (): Promise<AutomationAction[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_ACTIONS;
  },

  simulateWorkflow: async (nodes: WorkflowNode[], edges: Edge[]): Promise<WorkflowSimulation> => {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const errors: string[] = [];
    const steps: SimulationStep[] = [];

    // Validation
    const startNodes = nodes.filter(n => n.data.type === 'start');
    const endNodes = nodes.filter(n => n.data.type === 'end');

    if (startNodes.length === 0) errors.push('Workflow must have a Start node.');
    if (startNodes.length > 1) errors.push('Workflow can only have one Start node.');
    if (endNodes.length === 0) errors.push('Workflow must have at least one End node.');

    // Check for disconnected nodes (simple check)
    nodes.forEach(node => {
      const hasConnection = edges.some(e => e.source === node.id || e.target === node.id);
      if (!hasConnection) errors.push(`Node "${node.data.label}" is disconnected.`);
    });

    if (errors.length > 0) {
      return { steps, isValid: false, errors };
    }

    // Simple simulation logic (traversing)
    let currentId = startNodes[0].id;
    const visited = new Set<string>();

    while (currentId) {
      if (visited.has(currentId)) {
        errors.push('Cycle detected in workflow.');
        break;
      }
      visited.add(currentId);

      const node = nodes.find(n => n.id === currentId);
      if (!node) break;

      steps.push({
        nodeId: node.id,
        nodeLabel: node.data.label,
        status: 'completed',
        message: `Executed ${node.data.type} node successfully.`,
        timestamp: new Date().toISOString()
      });

      const nextEdge = edges.find(e => e.source === currentId);
      currentId = nextEdge ? nextEdge.target : '';

      if (node.data.type === 'end') break;
    }

    return { steps, isValid: errors.length === 0, errors };
  }
};

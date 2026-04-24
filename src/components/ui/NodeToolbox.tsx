/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Play, User, CheckCircle2, Cpu, Flag } from 'lucide-react';
import { NodeType } from '../../types/workflow';

const tools = [
  { type: 'start', label: 'Start', icon: Play, color: 'bg-emerald-500' },
  { type: 'task', label: 'Task', icon: User, color: 'bg-blue-500' },
  { type: 'approval', label: 'Approval', icon: CheckCircle2, color: 'bg-purple-500' },
  { type: 'automated', label: 'Automated', icon: Cpu, color: 'bg-orange-500' },
  { type: 'end', label: 'End', icon: Flag, color: 'bg-red-500' },
];

export const NodeToolbox = () => {
  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-60 bg-white border-r border-slate-200 flex flex-col shrink-0 select-none">
      <div className="p-4 border-b border-slate-100">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Node Library
        </h2>
      </div>
      
      <div className="p-3 space-y-2 overflow-y-auto">
        {tools.map((tool) => (
          <div
            key={tool.type}
            className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg cursor-grab hover:border-indigo-300 flex items-center group transition-all"
            draggable
            onDragStart={(e) => onDragStart(e, tool.type as NodeType)}
          >
            <div className={`w-2 h-2 rounded-full ${tool.color} mr-3`} />
            <span className="text-sm font-medium text-slate-700">
              {tool.label === 'Automated' ? 'Automation API' : tool.label === 'Task' ? 'Standard Task' : tool.label === 'Approval' ? 'Approval Step' : tool.label === 'End' ? 'End Flow' : 'Start Trigger'}
            </span>
            <svg className="w-4 h-4 ml-auto text-slate-300 group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </div>
        ))}
      </div>
      
      <div className="mt-auto p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-lg p-3 text-xs leading-relaxed text-slate-500">
          <span className="font-semibold text-slate-700 block mb-1">Pro Tip:</span>
          Drag and drop nodes to add them to the canvas. Use the connectors to define logic.
        </div>
      </div>
    </aside>
  );
};

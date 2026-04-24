/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Play, CheckCircle2, User, Cpu, Flag } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { WorkflowNodeData } from '../../types/workflow';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NodeWrapper = ({ children, type, selected }: { children: React.ReactNode, type: string, selected?: boolean }) => {
  const colors = {
    start: 'border-green-500 ring-green-50',
    task: 'border-blue-500 ring-blue-50',
    approval: 'border-amber-500 ring-amber-50',
    automated: 'border-purple-500 ring-purple-50',
    end: 'border-rose-500 ring-rose-50',
  };

  return (
    <div className={cn(
      "p-4 bg-white rounded-xl border shadow-sm min-w-[180px] transition-all duration-200",
      colors[type as keyof typeof colors] || 'border-slate-200',
      selected ? "border-2 border-indigo-600 ring-4 ring-indigo-50 shadow-xl" : "hover:shadow-md"
    )}>
      {children}
    </div>
  );
};

const CustomNode = ({ data, selected }: NodeProps<WorkflowNodeData>) => {
  const Icon = {
    start: Play,
    task: User,
    approval: CheckCircle2,
    automated: Cpu,
    end: Flag,
  }[data.type];

  return (
    <NodeWrapper type={data.type} selected={selected}>
      {data.type !== 'start' && <Handle type="target" position={Position.Top} className="!bg-slate-300" />}
      
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-3 h-3 rounded-full",
            {
              'bg-green-500': data.type === 'start',
              'bg-blue-500': data.type === 'task',
              'bg-amber-500': data.type === 'approval',
              'bg-purple-500': data.type === 'automated',
              'bg-rose-500': data.type === 'end',
            }
          )} />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            {data.type === 'automated' ? 'Automation' : data.type}
          </span>
        </div>
        
        <p className="text-sm font-semibold text-slate-800">
          {data.label}
        </p>
      </div>

      {data.type !== 'end' && <Handle type="source" position={Position.Bottom} className="!bg-slate-300" />}
    </NodeWrapper>
  );
};

export default memo(CustomNode);

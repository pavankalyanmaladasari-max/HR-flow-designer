/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Trash2, X, Settings2 } from 'lucide-react';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { mockApi } from '../../api/mockApi';
import { AutomationAction } from '../../types/workflow';

const baseSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  description: z.string().optional(),
  assignee: z.string().optional(),
  dueDate: z.string().optional(),
  approverRole: z.enum(['HR_MANAGER', 'DEPT_HEAD', 'CEO']).optional(),
  threshold: z.number().optional(),
  actionId: z.string().optional(),
});

export const PropertyPanel = () => {
  const { selectedNodeId, nodes, updateNodeData, deleteNode, selectNode } = useWorkflowStore();
  const [automations, setAutomations] = useState<AutomationAction[]>([]);
  
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(baseSchema),
  });

  useEffect(() => {
    mockApi.getAutomations().then(setAutomations);
  }, []);

  useEffect(() => {
    if (selectedNode) {
      reset({
        label: selectedNode.data.label,
        description: selectedNode.data.description || '',
        ...(selectedNode.data.type === 'task' ? {
          assignee: (selectedNode.data as any).assignee || '',
          dueDate: (selectedNode.data as any).dueDate || '',
        } : {}),
        ...(selectedNode.data.type === 'approval' ? {
          approverRole: (selectedNode.data as any).approverRole || 'HR_MANAGER',
          threshold: (selectedNode.data as any).threshold || 1,
        } : {}),
        ...(selectedNode.data.type === 'automated' ? {
          actionId: (selectedNode.data as any).actionId || '',
        } : {}),
      });
    }
  }, [selectedNodeId, reset]);

  const onSubmit = (data: any) => {
    if (selectedNodeId) {
      updateNodeData(selectedNodeId, data);
    }
  };

  if (!selectedNode) {
    return (
      <aside className="w-80 border-l border-slate-200 bg-slate-50 flex items-center justify-center p-8 text-center">
        <div className="flex flex-col items-center gap-4 opacity-30">
          <Settings2 className="w-12 h-12" />
          <p className="text-sm font-medium">Select a node to configure its properties</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 border-l border-slate-200 bg-white flex flex-col shadow-xl z-20 transition-all">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-indigo-600 rounded-sm flex items-center justify-center">
            <Settings2 className="w-3.5 h-3.5 text-white" />
          </div>
          <h2 className="text-sm font-semibold text-slate-800">
            Node Configuration
          </h2>
        </div>
        <button 
          onClick={() => selectNode(null)}
          className="p-1 hover:bg-slate-200 rounded-md transition-colors"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      <form 
        onChange={handleSubmit(onSubmit)}
        className="p-5 flex flex-col gap-6 overflow-y-auto flex-1"
      >
        <div className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Node Title</label>
            <input
              {...register('label')}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow"
            />
            {errors.label && <p className="text-[10px] text-red-500">{errors.label.message as string}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-400 uppercase">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition-shadow resize-none"
            />
          </div>

          {/* Type Specific Fields */}
          {selectedNode.data.type === 'task' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Assignee</label>
                <input
                  {...register('assignee')}
                  placeholder="e.g. Hiring Manager"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Due Date</label>
                <input
                  {...register('dueDate')}
                  type="date"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md"
                />
              </div>
            </div>
          )}

          {selectedNode.data.type === 'approval' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Approver Role</label>
                <select
                  {...register('approverRole')}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="HR_MANAGER">HR Manager</option>
                  <option value="DEPT_HEAD">Department Head</option>
                  <option value="CEO">CEO</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Threshold</label>
                  <span className="text-xs font-semibold text-indigo-600">{watch('threshold') || 1} Vote(s)</span>
                </div>
                <input
                  {...register('threshold', { valueAsNumber: true })}
                  type="range"
                  min="1"
                  max="5"
                  className="w-full accent-indigo-600"
                />
                <p className="text-[10px] text-slate-400 italic">Number of approvals required to proceed.</p>
              </div>
            </div>
          )}

          {selectedNode.data.type === 'automated' && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase">API Action</label>
              <select
                {...register('actionId')}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md bg-white"
              >
                <option value="">Select an action...</option>
                {automations.map(action => (
                  <option key={action.id} value={action.id}>{action.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="mt-auto p-4 border-t border-slate-100 bg-slate-50 -mx-5 -mb-5 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => deleteNode(selectedNodeId!)}
            className="w-full py-2 bg-rose-50 text-rose-600 text-sm font-semibold rounded-md border border-rose-100 hover:bg-rose-100 transition-colors"
          >
            Remove Node
          </button>
        </div>
      </form>
    </aside>
  );
};

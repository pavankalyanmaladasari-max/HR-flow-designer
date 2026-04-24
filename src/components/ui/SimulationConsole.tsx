/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle, Terminal, Loader2 } from 'lucide-react';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { mockApi } from '../../api/mockApi';
import { WorkflowSimulation } from '../../types/workflow';
import { motion, AnimatePresence } from 'motion/react';

export const SimulationConsole = () => {
  const { nodes, edges } = useWorkflowStore();
  const [simulation, setSimulation] = useState<WorkflowSimulation | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = async () => {
    setIsSimulating(true);
    setSimulation(null);
    try {
      const result = await mockApi.simulateWorkflow(nodes, edges);
      setSimulation(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="h-14 border-t border-slate-800 bg-slate-900 flex flex-col shrink-0 overflow-hidden">
      <div className="flex-1 flex items-center px-4 space-x-6 text-slate-300">
        <div className="flex items-center text-xs">
          <div className={`w-2 h-2 rounded-full mr-2 ${isSimulating ? 'bg-amber-400 animate-pulse' : 'bg-green-500'}`}></div>
          {isSimulating ? 'Running Simulation' : 'System Ready'}
        </div>
        
        <div className="h-4 w-px bg-slate-700"></div>
        
        <div className="flex-1 text-[11px] font-mono flex items-center overflow-hidden">
          {simulation ? (
            <div className="truncate">
              <span className={simulation.isValid ? "text-green-400" : "text-rose-400"}>[SIM]</span>
              <span className="ml-2">
                {simulation.isValid 
                  ? `Validating workflow... found ${nodes.length} nodes, ${edges.length} edges. Structure: VALID`
                  : `Validation Failed: ${simulation.errors[0]}`
                }
              </span>
            </div>
          ) : (
            <span className="text-slate-500 italic">Waiting for simulation trigger...</span>
          )}
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">REV: 1.0.4</div>
          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all"
          >
            {isSimulating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 fill-current" />}
            Simulate
          </button>
        </div>
      </div>
    </div>
  );
};

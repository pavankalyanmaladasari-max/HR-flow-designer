/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { WorkflowCanvas } from './components/canvas/WorkflowCanvas';
import { NodeToolbox } from './components/ui/NodeToolbox';
import { PropertyPanel } from './components/ui/PropertyPanel';
import { SimulationConsole } from './components/ui/SimulationConsole';
import { ExportActions } from './components/ui/ExportActions';
import { Workflow, LogOut } from 'lucide-react';
import { ReactFlowProvider } from 'reactflow';
import { useAuth } from './components/auth/FirebaseProvider';
import { LoginPage } from './components/auth/LoginPage';

export default function App() {
  const { user, logout } = useAuth();

  if (!user) {
    return <LoginPage />;
  }

  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-screen bg-slate-50 text-slate-900 font-sans">
        {/* Header */}
        <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 z-20">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-indigo-600 rounded shadow-md">
              <Workflow className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-baseline gap-2">
              <h1 className="text-lg font-semibold tracking-tight">
                HR FlowDesigner
              </h1>
              <span className="text-slate-400 font-normal text-sm">/ onboarding_v2.json</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ExportActions />
            
            <button className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm">
              Publish Workflow
            </button>

            <button 
              onClick={logout}
              title="Sign Out"
              className="p-1 px-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-md transition-all ml-2"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          <NodeToolbox />
          
          <div className="flex-1 flex flex-col min-w-0 bg-slate-100 relative">
            {/* Grid Overlay Pattern */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 0.8px, transparent 0.8px)', backgroundSize: '20px 20px' }}></div>
            <WorkflowCanvas />
            <SimulationConsole />
          </div>

          <PropertyPanel />
        </div>
      </div>
    </ReactFlowProvider>
  );
}


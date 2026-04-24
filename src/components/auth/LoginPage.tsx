/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAuth } from './FirebaseProvider';
import { Workflow, ShieldCheck, Zap, BarChart3 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 font-sans">
      <div className="max-w-md w-full px-8 py-12 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 text-center animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-8">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
            <Workflow className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
          HR FlowDesigner
        </h1>
        <p className="text-slate-500 text-sm font-medium mb-10">
          Design, automate, and simulate your HR workflows with precision.
        </p>

        <button
          onClick={login}
          className="w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-[0.98]"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>

        <div className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-50 pt-8">
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Secure</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Fast</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Scalable</span>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-[11px] text-slate-400 font-medium">
        &copy; 2026 Enterprise Flow Systems. All rights reserved.
      </p>
    </div>
  );
};

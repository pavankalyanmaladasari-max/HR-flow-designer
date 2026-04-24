/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useReactFlow, getNodesBounds, getViewportForBounds } from 'reactflow';
import { toPng } from 'html-to-image';
import { Download, Image as ImageIcon } from 'lucide-react';
import { useWorkflowStore } from '../../store/useWorkflowStore';

export const ExportActions = () => {
  const { getNodes } = useReactFlow();
  const { nodes, edges } = useWorkflowStore();

  const downloadImage = () => {
    const nodesBounds = getNodesBounds(getNodes());
    const width = nodesBounds.width + 100;
    const height = nodesBounds.height + 100;
    
    // Default viewport if no nodes
    const viewport = getViewportForBounds(
      nodesBounds,
      width,
      height,
      0.5,
      2,
      0.2
    );

    const element = document.querySelector('.react-flow__viewport') as HTMLElement;
    if (!element) return;

    toPng(element, {
      backgroundColor: '#f1f5f9', // slate-100
      width: width,
      height: height,
      style: {
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then((dataUrl) => {
      const a = document.createElement('a');
      a.setAttribute('download', `hr-workflow-${Date.now()}.png`);
      a.setAttribute('href', dataUrl);
      a.click();
    });
  };

  const exportJson = () => {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      nodes,
      edges
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hr-workflow-${new Date().getTime()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={exportJson}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
      >
        <Download className="w-4 h-4" />
        JSON
      </button>

      <button 
        onClick={downloadImage}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
      >
        <ImageIcon className="w-4 h-4" />
        Image
      </button>
    </div>
  );
};

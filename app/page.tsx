'use client';

import { useState, useEffect } from 'react';
import { Clock, GitBranch, Terminal as TerminalIcon } from 'lucide-react';
import { BootScreen } from '@/components/BootScreen';
import { HomeTerminal } from '@/components/HomeTerminal';
import { ScrollableContent } from '@/components/ScrollableContent';
import { fileSystem } from '@/data/portfolio-data';
import { FileNode } from '@/components/FileTree';

export default function Portfolio() {
  const [time, setTime] = useState(new Date());
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!bootComplete) {
    return <BootScreen onComplete={() => setBootComplete(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0e14] text-gray-200 font-mono flex flex-col">
      {/* Top Bar - Mac Style */}
      <div className="h-7 bg-[#1c1c1e]/95 backdrop-blur-sm border-b border-gray-800/50 flex items-center justify-between px-4 flex-shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/90" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/90" />
            <div className="w-3 h-3 rounded-full bg-green-500/90" />
          </div>
          <span className="text-xs text-gray-400 font-medium">felix-portfolio</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <TerminalIcon size={12} className="text-emerald-400" />
            <span className="text-xs text-gray-500">Terminal Mode</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Clock size={11} />
            <span className="hidden sm:inline">{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>

      {/* Terminal Section - Fixed Height */}
      <div className="bg-[#0a0e14] border-b border-gray-800/50">
        <div className="max-w-[1400px] mx-auto">
          <div className="h-10 bg-[#1c1c1e] border-b border-gray-800/30 flex items-center px-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-emerald-400">●</span>
              <span className="text-gray-300 font-medium">Terminal</span>
            </div>
          </div>

          <div className="h-[400px] overflow-hidden">
            <HomeTerminal fileSystem={fileSystem} onFileSelect={() => {}} />
          </div>
        </div>
      </div>

      {/* Scrollable Content Below Terminal */}
      <div className="flex-1">
        <ScrollableContent />
      </div>

      {/* Status Bar */}
      <div className="h-6 bg-[#1c1c1e] border-t border-gray-800/30 flex items-center justify-between px-4 text-[11px] text-gray-500 flex-shrink-0 sticky bottom-0">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <GitBranch size={10} />
            <span className="text-gray-400">main</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-medium">Ready</span>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Clock, GitBranch, File, Layout, Terminal as TerminalIcon, Menu, X } from 'lucide-react';
import { FileNode } from '@/components/FileTree';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { BootScreen } from '@/components/BootScreen';
import { HomeTerminal } from '@/components/HomeTerminal';
import { OverviewPage } from '@/components/OverviewPage';
import { Sidebar } from '@/components/Sidebar';
import { fileSystem, fileContents } from '@/data/portfolio-data';

export default function Portfolio() {
  const [time, setTime] = useState(new Date());
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [loading, setLoading] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);
  const [viewMode, setViewMode] = useState<'terminal' | 'overview'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFileSelect = (file: FileNode) => {
    setLoading(true);
    setSelectedFile(file);
    setMobileMenuOpen(false);
    setViewMode('terminal');
  };

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  if (!bootComplete) {
    return <BootScreen onComplete={() => setBootComplete(true)} />;
  }

  return (
    <div className="h-screen bg-[#0a0e14] text-gray-200 font-mono flex flex-col overflow-hidden">
      {/* Top Bar - Mac Style */}
      <div className="h-12 md:h-7 bg-[#1c1c1e]/95 backdrop-blur-sm border-b border-gray-800/50 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/90 hover:bg-red-500 cursor-pointer transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/90 hover:bg-yellow-500 cursor-pointer transition-colors" />
            <div className="w-3 h-3 rounded-full bg-green-500/90 hover:bg-green-500 cursor-pointer transition-colors" />
          </div>

          {/* Mobile Menu Button - Only show in terminal mode */}
          {viewMode === 'terminal' && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-800/30 rounded transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}

          <span className="text-xs md:text-xs text-gray-400 font-medium">felix-portfolio</span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 bg-gray-800/30 rounded-lg p-1">
            <button
              onClick={() => setViewMode('overview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors text-xs ${
                viewMode === 'overview'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Layout size={14} />
              <span className="hidden sm:inline">Overview</span>
            </button>
            <button
              onClick={() => setViewMode('terminal')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors text-xs ${
                viewMode === 'terminal'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <TerminalIcon size={14} />
              <span className="hidden sm:inline">Terminal</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Clock size={11} />
            <span className="hidden sm:inline">{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Only in terminal mode */}
      {viewMode === 'terminal' && mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="w-64 h-full bg-[#1c1c1e] shadow-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <Sidebar
              fileSystem={fileSystem}
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar - Only show in terminal mode and on md+ screens */}
        {viewMode === 'terminal' && (
          <div className="hidden md:block">
            <Sidebar
              fileSystem={fileSystem}
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
            />
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab Bar */}
          {viewMode === 'terminal' && (
            <div className="h-10 bg-[#1c1c1e] border-b border-gray-800/30 flex items-center px-2 flex-shrink-0">
              {selectedFile ? (
                <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-[#0a0e14] rounded-t-lg text-xs border-t border-l border-r border-gray-800/30">
                  <File size={12} className="text-emerald-400" />
                  <span className="text-gray-300 font-medium truncate max-w-[150px] md:max-w-none">
                    {selectedFile.name}
                  </span>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="ml-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700/30 rounded px-1.5 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-3 md:px-4 py-2 bg-[#0a0e14] rounded-t-lg text-xs border-t border-l border-r border-gray-800/30">
                  <span className="text-emerald-400">●</span>
                  <span className="text-gray-300 font-medium">Terminal</span>
                </div>
              )}
            </div>
          )}

          {/* Content Area - Scrollable */}
          <div className="flex-1 overflow-hidden bg-[#0a0e14]">
            {viewMode === 'overview' ? (
              <OverviewPage />
            ) : loading ? (
              <div className="p-4 md:p-6">
                <LoadingAnimation filename={selectedFile?.name || ''} onComplete={handleLoadingComplete} />
              </div>
            ) : selectedFile && selectedFile.content ? (
              <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent p-4 md:p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="flex items-center gap-3 text-emerald-400 border-b border-gray-800/50 pb-4">
                    <File size={16} />
                    <span className="font-mono text-sm font-semibold">{fileContents[selectedFile.content]?.title}</span>
                  </div>
                  <pre className="text-gray-300 text-xs md:text-sm whitespace-pre-wrap leading-relaxed font-mono">
                    {fileContents[selectedFile.content]?.content}
                  </pre>
                </div>
              </div>
            ) : (
              <HomeTerminal fileSystem={fileSystem} onFileSelect={handleFileSelect} />
            )}
          </div>

          {/* Status Bar */}
          <div className="h-6 bg-[#1c1c1e] border-t border-gray-800/30 flex items-center justify-between px-3 md:px-4 text-[10px] md:text-[11px] text-gray-500 flex-shrink-0">
            <div className="flex items-center gap-2 md:gap-4">
              <span className="flex items-center gap-1.5">
                <GitBranch size={10} />
                <span className="text-gray-400">main</span>
              </span>
              {selectedFile && (
                <span className="text-gray-600 truncate max-w-[100px] md:max-w-none">
                  {selectedFile.name}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-medium">Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

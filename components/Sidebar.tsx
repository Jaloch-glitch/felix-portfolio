'use client';

import { Terminal, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { FileTree, FileNode } from './FileTree';

interface SidebarProps {
  fileSystem: FileNode[];
  onFileSelect: (file: FileNode) => void;
  selectedFile: FileNode | null;
}

export function Sidebar({ fileSystem, onFileSelect, selectedFile }: SidebarProps) {
  return (
    <div className="w-56 bg-[#1c1c1e] border-r border-gray-800/30 flex flex-col flex-shrink-0 shadow-xl hidden md:flex">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-800/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Terminal size={18} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-100">felix-portfolio</p>
            <p className="text-xs text-gray-500">~/home/felix</p>
          </div>
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <div className="mb-3">
          <p className="text-[10px] text-gray-500 px-2 py-2 uppercase tracking-wider font-semibold">
            Explorer
          </p>
        </div>
        <FileTree items={fileSystem} onSelect={onFileSelect} selected={selectedFile} />
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-gray-800/30 space-y-2 bg-[#1a1a1c]">
        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-3">
          Connect
        </p>
        <a
          href="https://github.com/Jaloch-glitch"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-2 text-xs text-gray-400 hover:text-emerald-400 py-2 px-3 rounded-lg hover:bg-gray-800/30 transition-all group"
        >
          <div className="flex items-center gap-2">
            <Github size={14} />
            <span>GitHub</span>
          </div>
          <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
        <a
          href="https://linkedin.com/in/felix-onyango-jaloch"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-2 text-xs text-gray-400 hover:text-blue-400 py-2 px-3 rounded-lg hover:bg-gray-800/30 transition-all group"
        >
          <div className="flex items-center gap-2">
            <Linkedin size={14} />
            <span>LinkedIn</span>
          </div>
          <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
        <a
          href="mailto:jalochglitch@gmail.com"
          className="flex items-center justify-between gap-2 text-xs text-gray-400 hover:text-amber-400 py-2 px-3 rounded-lg hover:bg-gray-800/30 transition-all group"
        >
          <div className="flex items-center gap-2">
            <Mail size={14} />
            <span>Email</span>
          </div>
        </a>
      </div>
    </div>
  );
}

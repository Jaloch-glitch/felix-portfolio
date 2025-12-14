'use client';

import { useState, useEffect } from 'react';
import { Terminal, Github, Linkedin, Mail, Clock, GitBranch, File } from 'lucide-react';
import { FileTree, FileNode } from '@/components/FileTree';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { fileSystem, fileContents } from '@/data/portfolio-data';

export default function Portfolio() {
  const [time, setTime] = useState(new Date());
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [loading, setLoading] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Boot sequence
    setTimeout(() => setBootComplete(true), 3000);
  }, []);

  const handleFileSelect = (file: FileNode) => {
    setLoading(true);
    setSelectedFile(file);
  };

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  if (!bootComplete) {
    return (
      <div className="min-h-screen bg-[#0a0e14] flex items-center justify-center">
        <div className="font-mono text-sm space-y-2 text-gray-400">
          <p>BIOS v2.4.1 - Felix Systems Inc.</p>
          <p>Loading kernel...</p>
          <p className="text-emerald-400">System ready.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0a0e14] text-gray-200 font-mono flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="h-7 bg-[#1a1f29] border-b border-gray-800 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-gray-400">felix-portfolio</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Clock size={11} />
          <span>{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-[#0e1419] border-r border-gray-800 flex flex-col flex-shrink-0">
          {/* Sidebar Header */}
          <div className="p-3 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <Terminal size={14} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-medium">felix-portfolio</p>
                <p className="text-[10px] text-gray-500">~/home/felix</p>
              </div>
            </div>
          </div>

          {/* File Tree */}
          <div className="flex-1 overflow-y-auto p-2">
            <p className="text-[10px] text-gray-500 px-2 py-2 uppercase tracking-wider">Explorer</p>
            <FileTree items={fileSystem} onSelect={handleFileSelect} selected={selectedFile} />
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-gray-800 space-y-1.5">
            <a
              href="https://github.com/Jaloch-glitch"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-emerald-400 py-1 px-2 rounded hover:bg-gray-800/30"
            >
              <Github size={13} />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/felix-onyango-jaloch"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-blue-400 py-1 px-2 rounded hover:bg-gray-800/30"
            >
              <Linkedin size={13} />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:jalochglitch@gmail.com"
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-amber-400 py-1 px-2 rounded hover:bg-gray-800/30"
            >
              <Mail size={13} />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab Bar */}
          <div className="h-9 bg-[#0e1419] border-b border-gray-800 flex items-center px-2 flex-shrink-0">
            {selectedFile ? (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0a0e14] rounded-t text-xs">
                <File size={12} className="text-emerald-400" />
                <span className="text-gray-300">{selectedFile.name}</span>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="ml-2 text-gray-500 hover:text-gray-300"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0a0e14] rounded-t text-xs">
                <Terminal size={12} className="text-emerald-400" />
                <span className="text-gray-300">Terminal</span>
              </div>
            )}
          </div>

          {/* Content Area - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <LoadingAnimation filename={selectedFile?.name || ''} onComplete={handleLoadingComplete} />
            ) : selectedFile && selectedFile.content ? (
              <div className="max-w-4xl mx-auto space-y-4">
                <div className="flex items-center gap-3 text-emerald-400 border-b border-gray-800 pb-4">
                  <File size={16} />
                  <span className="font-mono text-sm">{fileContents[selectedFile.content]?.title}</span>
                </div>
                <pre className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
                  {fileContents[selectedFile.content]?.content}
                </pre>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="text-sm text-gray-500 border-b border-gray-800 pb-3">
                  Welcome to Felix's Portfolio Terminal. Select a file from the explorer to view content.
                </div>
                <div className="space-y-2 text-xs text-gray-400">
                  <p>Available sections:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>about/ - Professional summary and experience</li>
                    <li>journey/ - Career story from Nairobi to Germany</li>
                    <li>projects/ - Technical projects and implementations</li>
                    <li>education/ - Certifications and coursework</li>
                    <li>contact.md - Get in touch</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Status Bar */}
          <div className="h-6 bg-[#0e1419] border-t border-gray-800 flex items-center justify-between px-4 text-[11px] text-gray-500 flex-shrink-0">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <GitBranch size={11} />
                main
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Ready
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

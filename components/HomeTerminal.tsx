'use client';

import { useState, useRef, useEffect } from 'react';
import { FileNode } from './FileTree';

interface HomeTerminalProps {
  fileSystem: FileNode[];
  onFileSelect: (file: FileNode) => void;
}

export function HomeTerminal({ fileSystem, onFileSelect }: HomeTerminalProps) {
  const [commandHistory, setCommandHistory] = useState<Array<{ cmd: string; output: string }>>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus input
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Scroll to bottom when history updates
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const findFile = (path: string): FileNode | null => {
    const parts = path.split('/').filter(Boolean);
    let current: FileNode[] = fileSystem;
    let found: FileNode | null = null;

    for (const part of parts) {
      const item = current.find(f => f.name === part);
      if (!item) return null;
      if (item.type === 'file') {
        found = item;
        break;
      }
      if (item.children) {
        current = item.children;
      }
    }
    return found;
  };

  const listDirectory = (path?: string): string => {
    let items = fileSystem;
    if (path) {
      const parts = path.split('/').filter(Boolean);
      for (const part of parts) {
        const item = items.find(f => f.name === part);
        if (item?.type === 'folder' && item.children) {
          items = item.children;
        }
      }
    }

    return items.map(item => {
      const icon = item.type === 'folder' ? '📁' : '📄';
      const badge = item.badge ? ` [${item.badge}]` : '';
      return `${icon} ${item.name}${badge}`;
    }).join('\n');
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    let output = '';

    if (!trimmed) {
      setCurrentCommand('');
      return;
    }

    const [command, ...args] = trimmed.split(' ');

    switch (command.toLowerCase()) {
      case 'help':
        output = `Available commands:

  ls [path]    - List directory contents
  cat <file>   - View file contents
  tree         - Show file tree
  about        - About Felix
  projects     - List all projects
  contact      - Contact information
  clear        - Clear terminal
  help         - Show this message`;
        break;

      case 'ls':
        output = listDirectory(args[0]);
        break;

      case 'tree':
        output = `.
├── 📁 about/
│   ├── 📄 README.md
│   ├── 📄 experience.json
│   └── 📄 skills.json
├── 📁 journey/
│   ├── 📄 2019_origin.md
│   ├── 📄 2020-2022_foundation.md
│   ├── 📄 2022-2024_leap.md
│   ├── 📄 2024_craft.md
│   └── 📄 frontier.md
├── 📁 projects/
│   ├── 📁 collibra-mcp-server/ [26 tools]
│   ├── 📁 micrograd/ [ML]
│   └── 📁 makemore/ [NLP]
├── 📁 education/
│   ├── 📄 certifications.md
│   └── 📄 coursework.md
└── 📄 contact.md`;
        break;

      case 'cat':
        if (!args[0]) {
          output = 'Usage: cat <file>\nExample: cat about/README.md';
        } else {
          const file = findFile(args[0]);
          if (file && file.type === 'file') {
            onFileSelect(file);
            output = `Opening ${args[0]}...`;
          } else {
            output = `cat: ${args[0]}: No such file`;
          }
        }
        break;

      case 'about':
        const aboutFile = findFile('about/README.md');
        if (aboutFile) {
          onFileSelect(aboutFile);
          output = 'Opening about/README.md...';
        }
        break;

      case 'projects':
        output = `Available projects:

📦 collibra-mcp-server
   26 specialized tools for AI-powered data governance
   Status: Production ✓

🧠 micrograd
   Neural network engine from first principles
   Built to understand, not just use

📝 makemore
   Character-level language models
   Bigrams → MLP → Embeddings

Try: cat projects/collibra-mcp-server/README.md`;
        break;

      case 'contact':
        const contactFile = findFile('contact.md');
        if (contactFile) {
          onFileSelect(contactFile);
          output = 'Opening contact.md...';
        }
        break;

      case 'clear':
        setCommandHistory([]);
        setCurrentCommand('');
        return;

      case 'whoami':
        output = `felix
Software Developer | Data Architect | ML Engineer
Location: Germany 🇩🇪 (via Kenya 🇰🇪, via Prague 🇨🇿)
Status: Building systems that matter`;
        break;

      default:
        output = `Command not found: ${command}
Type 'help' for available commands.`;
    }

    setCommandHistory(prev => [...prev, { cmd: trimmed, output }]);
    setCurrentCommand('');
  };

  return (
    <div
      ref={terminalRef}
      className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent p-6"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Welcome Message */}
        <div className="text-sm text-gray-500 pb-4 border-b border-gray-800/50">
          <p className="mb-2">Welcome to Felix's Portfolio Terminal.</p>
          <p className="text-xs">
            Type <span className="text-emerald-400">help</span> for commands, or click any file in the explorer →
          </p>
        </div>

        {/* Command History */}
        <div className="space-y-4">
          {commandHistory.map((entry, i) => (
            <div key={i} className="space-y-3 font-mono">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-emerald-400">felix@portfolio</span>
                <span className="text-gray-600">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-gray-600">{'>'}</span>
                <span className="text-gray-200 ml-2">{entry.cmd}</span>
              </div>
              {entry.output && (
                <pre className="text-gray-400 text-sm whitespace-pre-wrap pl-6 leading-relaxed">
                  {entry.output}
                </pre>
              )}
            </div>
          ))}
        </div>

        {/* Current Input */}
        <div className="flex items-center gap-2 text-sm font-mono sticky bottom-0 bg-[#0a0e14] py-4">
          <span className="text-emerald-400">felix@portfolio</span>
          <span className="text-gray-600">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-gray-600">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && currentCommand.trim()) {
                handleCommand(currentCommand);
              }
            }}
            className="flex-1 bg-transparent outline-none text-gray-200 ml-2 placeholder-gray-600"
            placeholder="Type a command..."
            autoComplete="off"
            spellCheck={false}
          />
          <span className="w-2 h-3.5 bg-gray-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { FileIcon } from './FileIcon';

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  badge?: string;
  children?: FileNode[];
}

interface FileTreeProps {
  items: FileNode[];
  onSelect: (item: FileNode) => void;
  selected: FileNode | null;
  depth?: number;
}

export function FileTree({ items, onSelect, selected, depth = 0 }: FileTreeProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (name: string) => {
    setExpanded(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="font-mono text-xs">
      {items.map((item, i) => {
        const isExpanded = expanded[item.name];
        const isSelected = selected?.name === item.name;

        return (
          <div key={i}>
            <div
              onClick={() => {
                if (item.type === 'folder') {
                  toggle(item.name);
                } else {
                  onSelect(item);
                }
              }}
              className={`flex items-center gap-2 py-1.5 px-2 cursor-pointer transition-all ${
                isSelected
                  ? 'bg-blue-500/10 text-blue-400 border-l-2 border-blue-400'
                  : 'hover:bg-gray-800/30 text-gray-400 hover:text-gray-200'
              }`}
              style={{ paddingLeft: `${depth * 16 + 8}px` }}
            >
              {item.type === 'folder' && (
                <ChevronRight
                  size={12}
                  className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                />
              )}
              {item.type === 'file' && <span className="w-3" />}

              <FileIcon name={item.name} type={item.type} isOpen={isExpanded} />

              <span className="flex-1 truncate">{item.name}</span>

              {item.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {item.badge}
                </span>
              )}
            </div>

            {item.type === 'folder' && isExpanded && item.children && (
              <FileTree
                items={item.children}
                onSelect={onSelect}
                selected={selected}
                depth={depth + 1}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

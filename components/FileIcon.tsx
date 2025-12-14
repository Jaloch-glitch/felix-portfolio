import { File, FileText, FileCode, FileJson, Folder, FolderOpen } from 'lucide-react';

interface FileIconProps {
  name: string;
  type: 'file' | 'folder';
  isOpen?: boolean;
}

export function FileIcon({ name, type, isOpen = false }: FileIconProps) {
  if (type === 'folder') {
    return isOpen ? (
      <FolderOpen size={14} className="text-amber-400" />
    ) : (
      <Folder size={14} className="text-amber-400" />
    );
  }

  // File extensions
  if (name.endsWith('.md')) {
    return <FileText size={14} className="text-blue-400" />;
  }
  if (name.endsWith('.json')) {
    return <FileJson size={14} className="text-green-400" />;
  }
  if (name.endsWith('.js') || name.endsWith('.ts') || name.endsWith('.tsx')) {
    return <FileCode size={14} className="text-amber-400" />;
  }
  if (name.endsWith('.py')) {
    return <FileCode size={14} className="text-yellow-400" />;
  }

  return <File size={14} className="text-gray-400" />;
}

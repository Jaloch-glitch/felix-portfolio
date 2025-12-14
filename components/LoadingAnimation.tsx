'use client';

import { useState, useEffect } from 'react';

interface LoadingAnimationProps {
  filename: string;
  onComplete: () => void;
}

export function LoadingAnimation({ filename, onComplete }: LoadingAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [packages, setPackages] = useState<string[]>([]);

  const packageNames = [
    'content-parser',
    'markdown-renderer',
    'syntax-highlighter',
    'file-reader',
    'data-formatter'
  ];

  useEffect(() => {
    // Simulate package installation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }

        // Add packages as we progress
        const packageIndex = Math.floor((prev / 100) * packageNames.length);
        if (packageIndex < packageNames.length && !packages.includes(packageNames[packageIndex])) {
          setPackages(prev => [...prev, packageNames[packageIndex]]);
        }

        return prev + 20;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-xs space-y-2">
      <div className="text-gray-400">
        📦 Loading {filename}...
      </div>

      <div className="space-y-1">
        {packages.map((pkg, i) => (
          <div key={pkg} className="text-gray-500 flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span>{pkg}</span>
          </div>
        ))}
      </div>

      {progress < 100 && (
        <div className="flex items-center gap-2 text-gray-500">
          <span className="animate-spin">⠋</span>
          <span>installing dependencies...</span>
        </div>
      )}

      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

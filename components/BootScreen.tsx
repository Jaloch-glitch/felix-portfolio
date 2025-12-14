'use client';

import { useState, useEffect } from 'react';

interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [stage, setStage] = useState(0);

  const messages = [
    { text: 'BIOS v2.4.1 - Felix Systems Inc.', delay: 0 },
    { text: 'Checking memory... 32GB OK', delay: 400 },
    { text: 'Loading kernel... done', delay: 700 },
    { text: 'Mounting /home/felix... done', delay: 1000 },
    { text: '', delay: 1300 },
    { text: '  ███████╗███████╗██╗     ██╗██╗  ██╗', delay: 1400 },
    { text: '  ██╔════╝██╔════╝██║     ██║╚██╗██╔╝', delay: 1450 },
    { text: '  █████╗  █████╗  ██║     ██║ ╚███╔╝ ', delay: 1500 },
    { text: '  ██╔══╝  ██╔══╝  ██║     ██║ ██╔██╗ ', delay: 1550 },
    { text: '  ██║     ███████╗███████╗██║██╔╝ ██╗', delay: 1600 },
    { text: '  ╚═╝     ╚══════╝╚══════╝╚═╝╚═╝  ╚═╝', delay: 1650 },
    { text: '', delay: 1800 },
    { text: '  Software Developer | Data Architect | ML Engineer', delay: 1900 },
    { text: '  SAP Integration Specialist | Full-Stack Developer', delay: 2000 },
    { text: '  Nairobi, Kenya → Prague → Germany', delay: 2100 },
    { text: '', delay: 2300 },
    { text: 'System ready. Welcome!', delay: 2500 },
  ];

  useEffect(() => {
    messages.forEach((msg, i) => {
      setTimeout(() => {
        setStage(i + 1);
        if (i === messages.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, msg.delay);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0e14] flex items-center justify-center p-8">
      <div className="max-w-2xl w-full space-y-1 font-mono text-sm">
        {messages.slice(0, stage).map((msg, i) => (
          <p
            key={i}
            className={`${
              msg.text.includes('███') ? 'text-emerald-400 font-bold' :
              msg.text.includes('ready') ? 'text-emerald-400' :
              msg.text.includes('Software Developer') || msg.text.includes('SAP') ? 'text-gray-400' :
              msg.text.includes('Nairobi') ? 'text-gray-500' :
              'text-gray-600'
            }`}
          >
            {msg.text}
          </p>
        ))}
        {stage < messages.length && (
          <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse ml-1" />
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Folder, File, ChevronRight, Terminal, Github, Linkedin, Mail,
  Clock, Wifi, Volume2, Battery, GitBranch, Server, Code2, Sparkles,
  MapPin, Briefcase, GraduationCap, Award, ExternalLink, Brain,
  Database, Cpu, Globe, Box
} from 'lucide-react';

// Terminal typing animation
const TerminalTyping = ({ command, output, delay = 0, onComplete }: any) => {
  const [typedCommand, setTypedCommand] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (typedCommand.length < command.length) {
      const timer = setTimeout(() => {
        setTypedCommand(command.slice(0, typedCommand.length + 1));
      }, 30 + Math.random() * 50);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowOutput(true);
        onComplete?.();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [typedCommand, command, started, onComplete]);

  return (
    <div className="font-mono text-sm">
      <div className="flex items-center gap-2">
        <span className="text-emerald-400">felix@portfolio</span>
        <span className="text-gray-600">:</span>
        <span className="text-blue-400">~</span>
        <span className="text-gray-600">$</span>
        <span className="text-gray-200 ml-2">{typedCommand}</span>
        {typedCommand.length < command.length && (
          <span className="w-2 h-4 bg-gray-200 animate-pulse" />
        )}
      </div>
      {showOutput && output && (
        <div className="mt-2 text-gray-400 whitespace-pre-wrap">{output}</div>
      )}
    </div>
  );
};

// File tree component
const FileTree = ({ items, onSelect, selected, depth = 0 }: any) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (name: string) => {
    setExpanded(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="font-mono text-xs">
      {items.map((item: any, i: number) => (
        <div key={i}>
          <div
            onClick={() => item.type === 'folder' ? toggle(item.name) : onSelect?.(item)}
            className={`flex items-center gap-2 py-1.5 px-2 cursor-pointer rounded transition-colors ${
              selected?.name === item.name
                ? 'bg-blue-500/10 text-blue-400 border-l-2 border-blue-400'
                : 'hover:bg-gray-800/30 text-gray-400 hover:text-gray-200'
            }`}
            style={{ paddingLeft: `${depth * 16 + 8}px` }}
          >
            {item.type === 'folder' ? (
              <>
                <ChevronRight
                  size={12}
                  className={`transition-transform ${expanded[item.name] ? 'rotate-90' : ''}`}
                />
                <Folder size={12} className="text-amber-400" />
              </>
            ) : (
              <>
                <span className="w-3" />
                <File size={12} className={
                  item.name.endsWith('.md') ? 'text-blue-400' :
                  item.name.endsWith('.py') ? 'text-yellow-400' :
                  item.name.endsWith('.js') || item.name.endsWith('.ts') ? 'text-amber-400' :
                  item.name.endsWith('.json') ? 'text-green-400' :
                  'text-gray-400'
                } />
              </>
            )}
            <span className="truncate">{item.name}</span>
            {item.badge && (
              <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {item.badge}
              </span>
            )}
          </div>
          {item.type === 'folder' && expanded[item.name] && item.children && (
            <FileTree
              items={item.children}
              onSelect={onSelect}
              selected={selected}
              depth={depth + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
};

// Progress bar component
const ProgressBar = ({ value, label, color = 'emerald' }: any) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const colors: Record<string, string> = {
    emerald: 'from-emerald-500/80 to-emerald-400/80',
    blue: 'from-blue-500/80 to-cyan-400/80',
    purple: 'from-purple-500/80 to-pink-400/80',
    amber: 'from-amber-500/80 to-yellow-400/80',
  };

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-gray-300">{label}</span>
        <span className="text-gray-500">{value}%</span>
      </div>
      <div className="h-1.5 bg-gray-800/50 rounded-full overflow-hidden border border-gray-700/30">
        <div
          className={`h-full bg-gradient-to-r ${colors[color]} transition-all duration-1000 ease-out rounded-full shadow-sm`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export default function FelixTerminal() {
  const [bootComplete, setBootComplete] = useState(false);
  const [bootStage, setBootStage] = useState(0);
  const [time, setTime] = useState(new Date());
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [commandHistory, setCommandHistory] = useState<any[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);

  // Boot sequence
  const bootMessages = [
    { text: 'BIOS v2.4.1 - Felix Systems Inc.', delay: 0 },
    { text: 'Checking memory... 32GB OK', delay: 400 },
    { text: 'Loading kernel... done', delay: 800 },
    { text: 'Mounting /home/felix... done', delay: 1200 },
    { text: 'Starting portfolio.service... done', delay: 1600 },
    { text: 'Initializing neural networks... done', delay: 2000 },
    { text: '', delay: 2400 },
    { text: '  ███████╗███████╗██╗     ██╗██╗  ██╗', delay: 2500 },
    { text: '  ██╔════╝██╔════╝██║     ██║╚██╗██╔╝', delay: 2550 },
    { text: '  █████╗  █████╗  ██║     ██║ ╚███╔╝ ', delay: 2600 },
    { text: '  ██╔══╝  ██╔══╝  ██║     ██║ ██╔██╗ ', delay: 2650 },
    { text: '  ██║     ███████╗███████╗██║██╔╝ ██╗', delay: 2700 },
    { text: '  ╚═╝     ╚══════╝╚══════╝╚═╝╚═╝  ╚═╝', delay: 2750 },
    { text: '', delay: 2850 },
    { text: '  Software Developer | Data Architect | ML Engineer', delay: 2900 },
    { text: '  SAP Integration Specialist | Full-Stack Developer', delay: 3000 },
    { text: '  Nairobi, Kenya → Prague → Germany', delay: 3100 },
    { text: '', delay: 3200 },
    { text: 'System ready. Type "help" for commands or explore the file tree →', delay: 3300 },
  ];

  useEffect(() => {
    bootMessages.forEach((msg, i) => {
      setTimeout(() => {
        setBootStage(i + 1);
        if (i === bootMessages.length - 1) {
          setTimeout(() => setBootComplete(true), 500);
        }
      }, msg.delay);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // File system structure
  const fileSystem = [
    {
      name: 'about',
      type: 'folder',
      children: [
        { name: 'README.md', type: 'file', content: 'about' },
        { name: 'experience.json', type: 'file', content: 'experience' },
        { name: 'skills.json', type: 'file', content: 'skills' },
      ]
    },
    {
      name: 'journey',
      type: 'folder',
      children: [
        { name: '2019_origin.md', type: 'file', content: 'origin' },
        { name: '2020-2022_foundation.md', type: 'file', content: 'foundation' },
        { name: '2022-2024_leap.md', type: 'file', content: 'leap' },
        { name: '2024_craft.md', type: 'file', content: 'craft' },
        { name: 'frontier.md', type: 'file', content: 'frontier' },
      ]
    },
    {
      name: 'projects',
      type: 'folder',
      children: [
        { name: 'collibra-mcp-server', type: 'folder', badge: '26 tools', children: [
          { name: 'README.md', type: 'file', content: 'collibra' },
        ]},
        { name: 'micrograd', type: 'folder', badge: 'ML', children: [
          { name: 'README.md', type: 'file', content: 'micrograd' },
        ]},
        { name: 'makemore', type: 'folder', badge: 'NLP', children: [
          { name: 'README.md', type: 'file', content: 'makemore' },
        ]},
        { name: 'double-slit-experiment', type: 'folder', badge: 'Physics', children: [
          { name: 'README.md', type: 'file', content: 'doubleslit' },
        ]},
        { name: 'claude-proxy', type: 'folder', badge: 'Enterprise', children: [
          { name: 'README.md', type: 'file', content: 'proxy' },
        ]},
        { name: 'risk-management-cap', type: 'folder', badge: 'SAP', children: [
          { name: 'README.md', type: 'file', content: 'riskcap' },
        ]},
      ]
    },
    {
      name: 'education',
      type: 'folder',
      children: [
        { name: 'certifications.md', type: 'file', content: 'certifications' },
        { name: 'coursework.md', type: 'file', content: 'coursework' },
      ]
    },
    { name: 'contact.md', type: 'file', content: 'contact' },
  ];

  // Content for different files
  const fileContents: Record<string, any> = {
    about: {
      title: 'README.md',
      content: `# Felix Onyango

## whoami

Software Developer | SAP Integration Specialist | ML Engineer
Data Governance Expert | Full-Stack Developer

Transforming complex enterprise systems into intelligent, user-friendly
solutions. From Nairobi to Prague to Germany — building systems that
thousands use and trust.

## Background

Self-taught developer with a unique path: graduated from Karatina
University (HR Management), but found my calling in code. The Odin
Project sparked the journey. Now architecting enterprise solutions
at SAP and building ML models from first principles.

## Philosophy

> "Derive the gradient. Build the autograd.
>  Then you truly know what you're working with."

Understanding before using. First principles aren't just for physics
— they're for everything. Every neural network I build, I build from
scratch. Every system I design, I understand deeply.

## Professional Focus

├── Enterprise Integration (SAP, Collibra, Cloud Foundry)
├── Data Governance & Workflow Automation
├── Machine Learning from Scratch (PyTorch, Neural Networks)
├── Full-Stack Development (React, Node.js, Next.js)
└── Big Data Analytics (Databricks, Spark)

## Current Status

Location: Germany 🇩🇪 (via Prague 🇨🇿, via Nairobi 🇰🇪)
Role: Data Governance Architect @ SAP
Focus: AI-powered data governance, ML from scratch
Status: ● Available for remote consulting

---

"Building enterprise solutions that transform complex
 technology into accessible business value."`
    },
    experience: {
      title: 'experience.json',
      isTimeline: true,
      data: [
        {
          company: 'SAP',
          role: 'Data Product Experience',
          location: 'Germany',
          period: '2024 - Present',
          icon: 'briefcase',
          color: 'emerald',
          highlights: [
            'Architecting AI-powered data governance solutions',
            'Built Collibra MCP Server (26 specialized tools)',
            'Enterprise integration with LLMs and knowledge graphs',
            'Workflow automation for data catalog management',
          ]
        },
        {
          company: 'SAP',
          role: 'Data Governance Developer',
          location: 'Prague, Czech Republic',
          period: '2023 - 2024',
          icon: 'code',
          color: 'blue',
          highlights: [
            'Collibra workflow development and automation',
            'Groovy scripting for data governance processes',
            'Integration with SAP systems and APIs',
            'Data catalog implementation and optimization',
          ]
        },
        {
          company: 'KPMG East Africa',
          role: 'Digital Transformation Consultant',
          location: 'Nairobi, Kenya',
          period: '2022 - 2023',
          icon: 'globe',
          color: 'purple',
          highlights: [
            'Guided clients through digital transformation',
            'Solution mapping and process automation',
            'Technology strategy and implementation',
            'Enterprise system integration consulting',
          ]
        },
        {
          company: 'Kenafric Industries',
          role: 'Data Analyst',
          location: 'Nairobi, Kenya',
          period: '2021 - 2022',
          icon: 'database',
          color: 'amber',
          highlights: [
            'Power BI dashboard development',
            'Python automation for data pipelines',
            'Data-driven decision support systems',
            'Business intelligence reporting',
          ]
        },
        {
          company: 'SAP Young Professional Program',
          role: 'Program Participant',
          location: 'Kenya',
          period: '2020',
          icon: 'award',
          color: 'pink',
          highlights: [
            'Foundation in enterprise systems',
            'SAP technology training',
            'Professional development',
            'Network building',
          ]
        },
      ]
    },
    skills: {
      title: 'skills.json',
      isJson: true,
      data: {
        languages: [
          { name: 'Python', level: 95, detail: 'ML, automation, data engineering' },
          { name: 'JavaScript/TypeScript', level: 92, detail: 'Full-stack, Node.js, React, Next.js' },
          { name: 'Groovy', level: 88, detail: 'Collibra workflows, scripting' },
          { name: 'SQL', level: 85, detail: 'Data analysis, complex queries' },
        ],
        frameworks: [
          { name: 'PyTorch', level: 85, detail: 'Neural networks from scratch' },
          { name: 'React/Next.js', level: 90, detail: 'Frontend, SSR, modern web' },
          { name: 'Node.js', level: 92, detail: 'APIs, microservices, servers' },
          { name: 'SAP CAP', level: 88, detail: 'Enterprise applications' },
        ],
        tools: [
          { name: 'Collibra', level: 95, detail: 'Data governance, workflows' },
          { name: 'Databricks', level: 82, detail: 'Big data, Spark, ML' },
          { name: 'Cloud Foundry', level: 80, detail: 'Deployment, scaling' },
          { name: 'Docker', level: 78, detail: 'Containerization, orchestration' },
        ],
        cloud: [
          { name: 'SAP BTP', level: 88, detail: 'Business Technology Platform' },
          { name: 'AWS', level: 75, detail: 'EC2, S3, Lambda' },
          { name: 'Vercel', level: 85, detail: 'Next.js deployment' },
        ]
      }
    },
    origin: {
      title: '2019_origin.md',
      content: `# Chapter 01: Origin
## Nairobi, Kenya | 2019

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THE SPARK

Graduated from Karatina University.
Degree: Human Resource Management.
But the real education was happening after hours.

Teaching myself to code. Discovering The Odin Project.
HTML → CSS → JavaScript → The possibilities were endless.

Every line of code was a question answered.
Every bug was a lesson learned.
Every project was a step forward.

Late nights turning into early mornings.
Documentation as my teacher.
Stack Overflow as my mentor.
The terminal as my canvas.

This is where it began.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tags: #self-taught #the-odin-project #first-code #kenya
Location: Nairobi, Kenya
Year: 2019`
    },
    foundation: {
      title: '2020-2022_foundation.md',
      content: `# Chapter 02: Foundation
## Kenya | 2020-2022

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BUILDING THE BASE

2020: SAP Young Professional Program
      └── Door to enterprise systems opened
      └── Foundation laid for what would come

2021: Kenafric Industries - Data Analyst
      ├── Power BI dashboards that told stories
      ├── Python automation that saved hours
      └── Data → Insights → Decisions

2022: KPMG East Africa - Digital Transformation Consultant
      ├── Walking with clients through digitization
      ├── Mapping complex business processes to tech solutions
      ├── Process automation that transformed workflows
      └── Learning to speak both business and tech

Each role taught something the previous couldn't.
Each challenge built on the last.
The foundation was being laid. Brick by brick.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tags: #sap-ypp #kenafric #kpmg #data-analysis #consulting
Location: Nairobi, Kenya
Period: 2020-2022`
    },
    leap: {
      title: '2022-2024_leap.md',
      content: `# Chapter 03: The Leap
## Kenya → Germany → Prague | 2022-2024

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AFRIKA KOMMT! CHANGED EVERYTHING

The fellowship that showed me what was possible.
Germany. New systems. New scale. New challenges.

When it ended, uncertainty hit hard:
  ├── Job applications sent... rejected
  ├── More applications... more rejections
  ├── The wait... endless
  └── Self-doubt... real

Then SAP Prague called.

Not what I would have chosen. But I jumped in
like it was exactly what I wanted.

Plot twist: Had to return to Kenya first.
Seven months of visa processing. Seven months
of uncertainty. Seven months of waiting.

But those seven months? I used every single day:
  ├── Books consumed (ML, data engineering, systems design)
  ├── Skills sharpened (PyTorch, advanced Python, cloud)
  ├── Projects built (personal ML implementations)
  └── Self reinvented (negative → positive)

The visa came through. Prague welcomed me.
The leap was complete.

Sometimes the detour is the path.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tags: #afrika-kommt #sap-prague #resilience #growth #visa-journey
Location: Kenya → Germany → Prague
Period: 2022-2024`
    },
    craft: {
      title: '2024_craft.md',
      content: `# Chapter 04: Craft
## SAP Germany | 2024-Present

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DATA GOVERNANCE AT SCALE

Data Product Experience Team.
Where enterprise meets intelligence.

Built: Collibra MCP Server
├── 26 specialized tools for data governance
├── AI-powered conversational metadata management
├── LLMs meet enterprise knowledge graphs
├── Natural language queries for data catalogs
├── Workflow automation at scale
└── Production-ready, battle-tested

Technologies:
├── Node.js + TypeScript (core server)
├── Groovy (Collibra workflows)
├── MCP Protocol (AI integration)
├── REST APIs (system integration)
└── OAuth2 (enterprise security)

The intersection of:
  ├── Enterprise data systems (Collibra, SAP)
  ├── Artificial intelligence (LLMs, Claude)
  ├── Data governance (metadata, lineage)
  └── Developer experience (tools, APIs)

Systems that thousands use.
Tools that make data meaningful.
Solutions that scale.

This is the craft.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tags: #collibra #mcp-server #data-governance #llm #enterprise
Location: Germany
Year: 2024-Present`
    },
    frontier: {
      title: 'frontier.md',
      content: `# Chapter 05: Frontier
## The Journey | Ongoing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ML FROM FIRST PRINCIPLES

Not just using neural networks.
Understanding them. Building them.
From scratch. Every time.

Micrograd:
├── Built autograd engine from zero
├── Derived backpropagation by hand (chain rule, baby!)
├── Used limit definition of derivatives
├── Implemented computational graphs
├── Validated against PyTorch & TensorFlow
└── Understood what happens when you call .backward()

Makemore:
├── Character-level language models
├── Part 1: Bigram probability distributions
├── Part 2: Multi-layer perceptrons (MLP)
├── Part 3: Embeddings and learned representations
├── Gradient descent (really understood it)
└── The building blocks of modern NLP

Philosophy:
"Precept upon precept. Line upon line.
 Deep understanding over speed.
 Build to learn. Learn to build."

Why build from scratch?
→ Because anyone can import torch.nn
→ Few understand what .backward() actually does
→ The mystery disappears when you derive it yourself
→ The magic becomes mathematics
→ The black box becomes crystal clear

Next frontiers:
├── Transformers from scratch
├── Attention mechanisms (self, cross, multi-head)
├── Advanced architectures
└── Always from first principles

The frontier keeps expanding.
The learning never stops.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Tags: #micrograd #makemore #neural-networks #pytorch #first-principles
Status: Ongoing | Always learning`
    },
    collibra: {
      title: 'README.md',
      content: `# Collibra MCP Server

Enterprise Data Governance meets AI
Production-grade. Battle-tested. Real impact.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## What is this?

26 specialized tools enabling AI-powered data governance.
Bridging Large Language Models with enterprise data catalogs.
Making metadata management conversational.

## The Problem

Data governance is complex. Collibra is powerful but has a
learning curve. Teams need to:
├── Search through massive data catalogs
├── Understand complex relationships and lineage
├── Create and update assets programmatically
├── Automate workflows and governance processes
└── Make data discovery accessible

## The Solution

Natural language interface to Collibra through Claude.
AI-powered data governance. Conversational metadata.

## Features

├── Search & Discovery
│   ├── Natural language asset search
│   ├── Intelligent relationship mapping
│   ├── Automated lineage tracking
│   └── Context-aware suggestions
│
├── Asset Management
│   ├── Create/Update/Delete operations
│   ├── Bulk operations support
│   ├── Workflow automation
│   └── Attribute management
│
└── AI Integration
    ├── LLM-powered queries ("Find all PII data")
    ├── Conversational metadata ("Describe this asset")
    ├── Smart suggestions and recommendations
    └── Natural language to Collibra API

## Tech Stack

Node.js + TypeScript    → Core server implementation
MCP Protocol            → AI tool integration standard
Groovy                  → Collibra workflow scripting
REST APIs               → System integration
OAuth2                  → Enterprise security
Jest                    → Testing framework

## Impact

Users: Hundreds of data stewards and engineers
Assets managed: Thousands in production
Queries processed: Growing daily
Status: Production-ready ✓

## Why It Matters

Before: Complex UI, steep learning curve, manual processes
After: "Find all customer data with PII" → Done.

Making data governance accessible.
Making metadata management intelligent.
Making enterprise systems conversational.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GitHub: github.com/Jaloch-glitch/collibra-mcp-server
Status: ● Production | Actively maintained`
    },
    micrograd: {
      title: 'README.md',
      content: `# Micrograd

Neural Network Engine from First Principles
Understanding through building.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## What is this?

A tiny autograd engine that implements backpropagation.
Built from scratch to truly understand how neural networks learn.
No magic. Just mathematics.

## The Journey

1. Started with the limit definition of derivatives
   → lim(h→0) [f(x+h) - f(x)] / h

2. Derived the chain rule by hand
   → d/dx[f(g(x))] = f'(g(x)) * g'(x)

3. Implemented computational graph
   → Track operations, build backward pass

4. Built automatic differentiation
   → Forward pass computes values
   → Backward pass computes gradients

5. Validated against TensorFlow & PyTorch
   → Results matched. Understanding achieved.

## Why?

> "Understanding > Using"

Anyone can import torch.nn and call .backward()
Few understand what actually happens when you do.

When you derive backprop yourself:
├── The mystery disappears
├── The magic becomes mathematics
├── The black box becomes crystal clear
└── You can debug anything

## What I Learned

├── Automatic differentiation is elegant
├── Backpropagation is just chain rule applied recursively
├── Computational graphs are powerful abstractions
├── Gradients flow backward through the graph
└── Everything PyTorch does, demystified

## Key Insight

Backpropagation isn't magic. It's just:
1. Forward pass: compute output
2. Backward pass: compute gradients using chain rule
3. Update: adjust weights

That's it. That's the whole thing.
Everything else is optimization.

## Code Sample

\`\`\`python
# Build a simple neural net
from micrograd.engine import Value

# Forward pass
x = Value(2.0)
w = Value(-3.0)
b = Value(10.0)
xw = x * w
xwb = xw + b
y = xwb.tanh()

# Backward pass (automatic!)
y.backward()

# Gradients computed
print(x.grad)  # Derivative of y wrt x
print(w.grad)  # Derivative of y wrt w
\`\`\`

## Tech Stack

├── Python (pure, no dependencies for core)
├── NumPy (for validation)
├── Mathematical foundations
└── First principles thinking

## Validation

Implemented same networks in:
├── Micrograd (custom)
├── PyTorch (standard)
└── TensorFlow (comparison)

Results: Identical gradients. ✓
Understanding: Complete. ✓

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GitHub: github.com/Jaloch-glitch/micrograd
Inspiration: Andrej Karpathy's neural networks series
Status: ● Complete | Deep understanding achieved`
    },
    makemore: {
      title: 'README.md',
      content: `# Makemore

Character-Level Language Models
Building NLP from the ground up.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## What is this?

A series of increasingly sophisticated character-level language
models. Each one teaches something the previous couldn't.
Built to understand, not just to use.

## The Series

### Part 1: Bigram Model
├── Probability distributions from data
├── Character co-occurrence patterns
├── Simple but surprisingly effective
└── Foundation for everything else

How it works:
→ Count character pairs in training data
→ Build probability table (what follows what?)
→ Sample from distribution to generate new text
→ Pure statistics, no neural networks yet

### Part 2: Multi-Layer Perceptron (MLP)
├── Neural network approach to bigrams
├── Character embeddings (learned representations)
├── Hidden layers with tanh activation
├── Mini-batch gradient descent
└── Backpropagation through the network

Architecture:
Input: One-hot encoded characters
↓
Embedding layer (learned)
↓
Hidden layer (tanh activation)
↓
Output layer (softmax)
↓
Character probabilities

### Part 3: Advanced Context
├── 3-character context windows
├── Richer embeddings
├── Deeper architecture
├── Better training dynamics
└── More sophisticated generation

## What I Learned

├── Gradient descent (really, truly learned it)
├── How learning rate affects training
├── Batch normalization and why it helps
├── Initialization strategies matter
├── Embeddings capture semantic meaning
├── Neural networks are differentiable probability models
└── The beauty of emergent behavior

## Key Insights

1. **Embeddings are powerful**
   Characters aren't just indices
   They're points in learned semantic space
   Similar characters cluster together

2. **Architecture matters**
   Deeper isn't always better
   Width vs depth tradeoffs
   Activations control expressiveness

3. **Training is an art**
   Learning rate scheduling
   Batch size effects
   Early stopping strategies

4. **Generation is fascinating**
   Temperature controls creativity
   Sampling strategies matter
   Context window affects coherence

## Sample Output

After training on names dataset:
├── Aria
├── Zen
├── Kael
├── Luna
└── Xander

Realistic? Yes. The model learned patterns.
Creative? Yes. The model generates new combinations.
Understanding? Complete. I built it from scratch.

## Philosophy

Build to learn. Each model taught something:
├── Bigrams → Probability theory applied
├── MLP → Neural network fundamentals
├── Context → Sequence modeling basics
└── Together → Foundation for transformers

## Tech Stack

├── Python + PyTorch
├── NumPy for data processing
├── Matplotlib for visualization
├── Mathematical foundations
└── First principles thinking

## Next Steps

This is the foundation for:
├── RNNs (recurrent networks)
├── LSTMs (long short-term memory)
├── Transformers (attention is all you need)
└── Modern language models

Each built from scratch.
Each understood deeply.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GitHub: github.com/Jaloch-glitch/makemore
Inspiration: Andrej Karpathy's course
Status: ● Complete | Building blocks understood`
    },
    doubleslit: {
      title: 'README.md',
      content: `# AK!13 Double Slit Experiment

Interactive Quantum Physics Visualization
Science meets web development.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## What is this?

Interactive visualization of the famous double-slit experiment
from quantum mechanics. Real-time wave interference simulation
with dynamic controls and responsive design.

## The Physics

The double-slit experiment demonstrates wave-particle duality:
├── Particles (photons, electrons) act as waves
├── Waves interfere constructively and destructively
├── Creates interference pattern on detection screen
└── Observation changes the behavior (quantum weirdness!)

## Features

├── Real-time wave simulation
├── Adjustable slit separation and width
├── Dynamic wavelength control
├── Interactive phase adjustment
├── Interference pattern visualization
├── Responsive design (desktop & mobile)
└── Dark/Light theme support

## Tech Stack

├── JavaScript (simulation engine)
├── HTML5 Canvas (wave rendering)
├── CSS3 (animations & theming)
├── Mathematical wave equations
└── Fourier analysis for interference

## The Math Behind It

Wave equation: ψ(x,t) = A sin(kx - ωt + φ)
Interference: I = I₁ + I₂ + 2√(I₁I₂) cos(Δφ)

Where:
├── k = wave number (2π/λ)
├── ω = angular frequency
├── φ = phase
└── Δφ = phase difference

## Why Build This?

1. **Understanding**: Best way to learn physics is to simulate it
2. **Visualization**: Making abstract concepts tangible
3. **Education**: Interactive beats static diagrams
4. **Challenge**: Real-time physics simulation isn't trivial

## What I Learned

├── Canvas performance optimization
├── Wave mathematics and interference
├── Real-time rendering techniques
├── Responsive animation patterns
└── Making science accessible and interactive

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GitHub: github.com/Jaloch-glitch/double-slit-experiment
Live Demo: [coming soon]
Status: ● Complete | Science is fun`
    },
    proxy: {
      title: 'README.md',
      content: `# Claude Proxy

Enterprise API Proxy with SAP Integration
Bringing AI to enterprise systems.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## What is this?

API proxy server that bridges Claude AI with SAP systems.
Handles authentication, routing, and enterprise integration.
Built for production environments.

## The Problem

Enterprise systems need:
├── Secure AI integration
├── OAuth2 authentication flow
├── SAP BTP compatibility
├── Cloud Foundry deployment
└── Scalable architecture

## The Solution

Proxy server that:
├── Manages auth tokens (OAuth2, SAP IAS)
├── Routes requests between systems
├── Handles errors gracefully
├── Scales horizontally
└── Deploys to Cloud Foundry

## Features

├── Multiple backend support (SAP AI Core, Databricks, Anthropic)
├── OAuth2 authentication handling
├── Token refresh automation
├── Request/response transformation
├── Health check endpoints
├── Logging and monitoring
└── Production-ready error handling

## Architecture

Client Application
↓
Proxy Server (Node.js + Express)
├── Auth layer (OAuth2)
├── Routing layer (intelligent)
└── Integration layer (SAP, Databricks, Anthropic)
↓
AI Backend (Claude)

## Tech Stack

├── Node.js + Express (server)
├── OAuth2 client libraries
├── Cloud Foundry (deployment)
├── SAP BTP (platform)
├── Databricks integration
└── Docker (containerization)

## Configuration

Supports multiple deployment profiles:
├── Local development (localhost:8000)
├── SAP AI Core (SAP BTP)
├── Databricks (workspace integration)
└── Direct Anthropic API

Switch between them with simple commands:
\`\`\`bash
claude-sap        # Use SAP AI Core
claude-dbx        # Use Databricks
claude-anthropic  # Use direct API
\`\`\`

## What I Learned

├── OAuth2 flow implementation
├── Enterprise authentication patterns
├── Cloud Foundry deployment
├── Proxy server architecture
├── SAP BTP integration
└── Production ops (logging, monitoring, scaling)

## Impact

Used daily for:
├── Development workflows
├── CI/CD pipelines
├── Enterprise integrations
└── Production applications

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GitHub: github.com/Jaloch-glitch/claude_proxy
Status: ● Production | Daily use`
    },
    riskcap: {
      title: 'README.md',
      content: `# Risk Management CAP

SAP Cloud Application Programming Model
Enterprise risk management system.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## What is this?

Full-stack risk management application built with SAP CAP.
Demonstrates enterprise application development patterns
using modern SAP technologies.

## Features

├── Risk assessment workflows
├── Mitigation strategy tracking
├── Impact analysis
├── Priority management
├── Audit trail and compliance
└── Multi-user collaboration

## Architecture

Frontend (SAP Fiori Elements)
├── Entity-based UI generation
├── Responsive design
└── SAP Fiori design language

Backend (CAP Node.js)
├── CDS data modeling
├── Service definitions
├── Business logic layer
└── Authorization rules

Database
├── SQLite (development)
├── PostgreSQL (production)
└── SAP HANA (enterprise)

## Tech Stack

├── SAP CAP (framework)
├── CDS (data modeling)
├── Node.js (runtime)
├── Express (server)
├── SQLite/PostgreSQL/HANA (database)
└── SAP Fiori Elements (UI)

## CDS Model

\`\`\`cds
entity Risks {
  key ID          : UUID;
  title           : String(100);
  description     : String(500);
  impact          : Integer;
  probability     : Integer;
  status          : String(20);
  mitigation      : Association to Mitigations;
}

entity Mitigations {
  key ID          : UUID;
  description     : String(500);
  owner           : String(100);
  timeline        : String(100);
  risks           : Association to many Risks;
}
\`\`\`

## What I Learned

├── SAP CAP framework
├── CDS modeling language
├── OData service implementation
├── SAP Fiori Elements patterns
├── Enterprise authorization
├── Multi-database support
└── Cloud Foundry deployment

## Deployment

\`\`\`bash
cds build --production
cf push
\`\`\`

Deploys to SAP BTP Cloud Foundry with:
├── App router (authentication)
├── Service layer (business logic)
├── Database (persistence)
└── Destination service (connectivity)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GitHub: github.com/Jaloch-glitch/risk-management-cap
Status: ● Learning project | SAP patterns`
    },
    certifications: {
      title: 'certifications.md',
      content: `# Certifications & Awards

Professional Development & Recognition

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Professional Certifications

### SAP
├── SAP Cloud Application Programming Model
├── SAP Business Technology Platform
└── SAP Integration Suite

### Microsoft
├── Azure Fundamentals (AZ-900)
├── Data Science Professional Certificate
└── AI & Machine Learning Fundamentals

### Data Governance
├── Collibra Data Governance Fundamentals
├── Collibra Workflow Development
└── Data Catalog Best Practices

## Fellowship & Awards

### Afrika Kommt! Fellowship
Duration: 2022-2023
Location: Germany
Focus: Enterprise technology & leadership development
Impact: Career transformation & international opportunity

### SAP Young Professional Program
Year: 2020
Location: Kenya
Focus: SAP technology foundation
Impact: Gateway to enterprise systems

## GitHub Recognition

├── YOLO badge (early adopter)
├── Pull Shark badge (contributions)
└── Active open source contributor

## Academic

### Karatina University
Degree: Bachelor of Commerce (Human Resource Management)
Year: 2019
Location: Nyeri, Kenya

Self-taught technical education:
├── The Odin Project (full curriculum)
├── Andrej Karpathy's neural networks course
├── Fast.ai deep learning
├── Databricks Academy
└── Countless books, papers, and documentation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Philosophy:
"Formal education opens doors.
 Self-education builds the house."`
    },
    coursework: {
      title: 'coursework.md',
      content: `# Coursework & Learning

Continuous Learning Journey

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Machine Learning

### Neural Networks from Scratch (Andrej Karpathy)
├── Micrograd: Autograd engine implementation
├── Makemore Part 1: Bigram language models
├── Makemore Part 2: MLP architectures
├── Makemore Part 3: Embeddings & context
└── Transformer architecture (in progress)

### Fast.ai Practical Deep Learning
├── Image classification
├── NLP and text generation
├── Tabular data modeling
└── Collaborative filtering

### PyTorch Fundamentals
├── Tensor operations
├── Automatic differentiation
├── Neural network modules
└── Training loops and optimization

## Data Science

### Microsoft Data Science Certificate
├── Python for data science
├── Statistical modeling
├── Machine learning algorithms
├── Data visualization
└── Real-world projects

### Databricks Academy
├── Spark fundamentals
├── Delta Lake architecture
├── ML on Databricks
└── Data engineering patterns

## Web Development

### The Odin Project (Complete)
├── HTML, CSS, JavaScript fundamentals
├── React and modern frontend
├── Node.js and backend development
├── Databases and APIs
├── Full-stack projects
└── Career-changing curriculum

### Additional
├── Next.js and React Server Components
├── TypeScript advanced patterns
├── Tailwind CSS and modern styling
└── Web performance optimization

## Enterprise Systems

### SAP Learning
├── CAP framework deep dive
├── Cloud Foundry architecture
├── BTP services and integration
└── Enterprise patterns

### Collibra
├── Data governance fundamentals
├── Workflow development (Groovy)
├── API integration patterns
└── Enterprise data catalog

## Currently Learning

├── Transformer architecture from scratch
├── Advanced NLP techniques
├── Distributed systems patterns
├── Rust programming language
└── Systems programming

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Approach:
"Learn by building. Understand from first principles.
 Never stop asking why."`
    },
    contact: {
      title: 'contact.md',
      content: `# Contact

Let's Build Something Together

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Open To

├── Remote consulting opportunities
├── Enterprise integration projects
├── Data governance & Collibra work
├── Machine learning collaborations
├── Full-stack development
├── Technical discussions
└── Just saying hello

## Expertise Available

### Enterprise Systems
├── SAP BTP & Cloud Foundry
├── Collibra data governance
├── Workflow automation
└── System integration

### Machine Learning
├── Neural networks from scratch
├── PyTorch implementations
├── NLP and language models
└── ML system design

### Full-Stack Development
├── React / Next.js / Node.js
├── TypeScript & modern JavaScript
├── API design & implementation
└── Cloud deployment

## Contact Methods

Email:    jalochglitch@gmail.com
GitHub:   github.com/Jaloch-glitch
LinkedIn: linkedin.com/in/felix-onyango-jaloch

## Location & Availability

Currently: Germany 🇩🇪
From:      Nairobi, Kenya 🇰🇪
Via:       Prague, Czech Republic 🇨🇿

Status:    ● Available for remote work
Timezone:  CET (Central European Time)
Languages: English (fluent), Swahili (native)

## Response Time

Usually within 24-48 hours.
Faster for interesting technical discussions
or ML-related topics.

## What I'm Looking For

Projects that involve:
├── Complex technical challenges
├── Real-world impact
├── Learning opportunities
├── Great teams
└── Meaningful work

## What You Can Expect

├── Deep technical understanding
├── First principles thinking
├── Clean, maintainable code
├── Strong communication
├── Ownership and responsibility
└── Continuous learning mindset

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

> "Let's build something that matters."

Looking forward to hearing from you!`
    },
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response = '';

    switch(trimmed) {
      case 'help':
        response = `Available commands:
  help      - Show this message
  about     - About Felix
  skills    - Technical skills & expertise
  projects  - View all projects
  journey   - Career journey & story
  education - Certifications & coursework
  contact   - Get in touch
  clear     - Clear terminal
  ls        - List files
  tree      - Show file tree`;
        break;
      case 'ls':
        response = `about/  journey/  projects/  education/  contact.md`;
        break;
      case 'tree':
        response = `.
├── about/
│   ├── README.md
│   ├── experience.json
│   └── skills.json
├── journey/
│   ├── 2019_origin.md
│   ├── 2020-2022_foundation.md
│   ├── 2022-2024_leap.md
│   ├── 2024_craft.md
│   └── frontier.md
├── projects/
│   ├── collibra-mcp-server/
│   ├── micrograd/
│   ├── makemore/
│   ├── double-slit-experiment/
│   ├── claude-proxy/
│   └── risk-management-cap/
├── education/
│   ├── certifications.md
│   └── coursework.md
└── contact.md`;
        break;
      case 'about':
        setSelectedFile({ content: 'about' });
        response = 'Opening about/README.md...';
        break;
      case 'skills':
        setSelectedFile({ content: 'skills' });
        response = 'Loading skills.json...';
        break;
      case 'experience':
        setSelectedFile({ content: 'experience' });
        response = 'Loading experience.json...';
        break;
      case 'projects':
        response = 'Available projects:\n  • collibra-mcp-server (26 tools, production)\n  • micrograd (ML engine from scratch)\n  • makemore (NLP from first principles)\n  • double-slit-experiment (quantum physics viz)\n  • claude-proxy (enterprise integration)\n  • risk-management-cap (SAP CAP application)\n\nClick any project folder to explore →';
        break;
      case 'journey':
        setSelectedFile({ content: 'origin' });
        response = 'Opening journey/2019_origin.md...\n(Explore other chapters in the journey/ folder)';
        break;
      case 'education':
        setSelectedFile({ content: 'certifications' });
        response = 'Opening education/certifications.md...';
        break;
      case 'contact':
        setSelectedFile({ content: 'contact' });
        response = 'Opening contact.md...';
        break;
      case 'clear':
        setCommandHistory([]);
        return;
      case 'whoami':
        response = `felix
Software Developer | Data Architect | ML Engineer
Location: Germany (via Kenya, via Prague)
Status: Building things that matter`;
        break;
      default:
        response = `Command not found: ${cmd}
Type "help" for available commands.`;
    }

    setCommandHistory(prev => [...prev, { cmd, response }]);
    setCurrentCommand('');
  };

  // Render selected file content
  const renderFileContent = () => {
    if (!selectedFile?.content) return null;
    const file = fileContents[selectedFile.content];
    if (!file) return null;

    if (file.isTimeline) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-emerald-400 border-b border-gray-800 pb-4">
            <Briefcase size={16} />
            <span className="font-mono text-sm">{file.title}</span>
          </div>

          <div className="space-y-8 pl-4 border-l-2 border-gray-800">
            {file.data.map((exp: any, i: number) => (
              <div key={i} className="relative pl-8">
                <div className={`absolute -left-[21px] w-8 h-8 rounded-full bg-gradient-to-br ${
                  exp.color === 'emerald' ? 'from-emerald-500/20 to-emerald-400/20 border-emerald-500/50' :
                  exp.color === 'blue' ? 'from-blue-500/20 to-cyan-400/20 border-blue-500/50' :
                  exp.color === 'purple' ? 'from-purple-500/20 to-pink-400/20 border-purple-500/50' :
                  exp.color === 'amber' ? 'from-amber-500/20 to-yellow-400/20 border-amber-500/50' :
                  'from-pink-500/20 to-rose-400/20 border-pink-500/50'
                } border-2 flex items-center justify-center`}>
                  {exp.icon === 'briefcase' && <Briefcase size={14} className="text-emerald-400" />}
                  {exp.icon === 'code' && <Code2 size={14} className="text-blue-400" />}
                  {exp.icon === 'globe' && <Globe size={14} className="text-purple-400" />}
                  {exp.icon === 'database' && <Database size={14} className="text-amber-400" />}
                  {exp.icon === 'award' && <Award size={14} className="text-pink-400" />}
                </div>

                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-gray-200 font-medium">{exp.role}</h3>
                      <p className="text-sm text-gray-400">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{exp.period}</span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin size={12} />
                    {exp.location}
                  </p>
                  <ul className="space-y-1 mt-3">
                    {exp.highlights.map((highlight: string, j: number) => (
                      <li key={j} className="text-sm text-gray-400 flex items-start gap-2">
                        <span className="text-gray-600 mt-1">→</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (file.isJson) {
      return (
        <div className="space-y-8">
          <div className="flex items-center gap-3 text-emerald-400 border-b border-gray-800 pb-4">
            <File size={16} />
            <span className="font-mono text-sm">{file.title}</span>
          </div>

          {Object.entries(file.data).map(([category, skills]: [string, any]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-gray-300 font-mono text-sm flex items-center gap-2">
                <span className="text-purple-400">"</span>
                {category}
                <span className="text-purple-400">"</span>
                <span className="text-gray-600">: [</span>
              </h3>
              <div className="pl-4 space-y-4">
                {skills.map((skill: any, i: number) => (
                  <div key={i}>
                    <ProgressBar
                      value={skill.level}
                      label={`${skill.name} — ${skill.detail}`}
                      color={
                        category === 'languages' ? 'emerald' :
                        category === 'frameworks' ? 'blue' :
                        category === 'tools' ? 'purple' :
                        'amber'
                      }
                    />
                  </div>
                ))}
              </div>
              <p className="text-gray-600 font-mono text-sm">]</p>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-emerald-400 border-b border-gray-800 pb-4">
          <File size={16} />
          <span className="font-mono text-sm">{file.title}</span>
        </div>
        <pre className="text-gray-300 font-mono text-[13px] whitespace-pre-wrap leading-relaxed">
          {file.content}
        </pre>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0e14] text-gray-200 font-mono overflow-hidden">

      {/* Top Bar - macOS style */}
      <div className="fixed top-0 left-0 right-0 h-7 bg-[#1a1f29]/95 backdrop-blur-sm border-b border-gray-800/50 flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 cursor-pointer" />
          </div>
          <span className="text-xs text-gray-400 ml-2">felix-portfolio</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400">
          <Clock size={11} />
          <span>{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
          <span className="text-gray-600">|</span>
          <Wifi size={11} />
          <Volume2 size={11} />
          <Battery size={11} />
        </div>
      </div>

      {/* Boot Screen */}
      {!bootComplete && (
        <div className="fixed inset-0 bg-[#0a0e14] z-40 flex items-center justify-center p-8">
          <div className="max-w-3xl w-full">
            <div className="space-y-1 font-mono text-sm">
              {bootMessages.slice(0, bootStage).map((msg, i) => (
                <p
                  key={i}
                  className={`${
                    msg.text.includes('███') ? 'text-emerald-400 font-bold' :
                    msg.text.includes('ready') ? 'text-emerald-400' :
                    msg.text.includes('Software Developer') || msg.text.includes('SAP Integration') ? 'text-gray-400' :
                    msg.text.includes('Nairobi') ? 'text-gray-500' :
                    'text-gray-600'
                  }`}
                >
                  {msg.text}
                </p>
              ))}
              {bootStage < bootMessages.length && (
                <span className="inline-block w-2 h-4 bg-gray-400 animate-pulse" />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Layout */}
      {bootComplete && (
        <div className="pt-7 min-h-screen flex">

          {/* Sidebar - File Explorer */}
          <div className="w-64 bg-[#0e1419] border-r border-gray-800/50 flex flex-col fixed left-0 top-7 bottom-0 z-30 overflow-hidden">
            {/* Sidebar Header */}
            <div className="p-3 border-b border-gray-800/50 bg-[#0a0e14]/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-500/80 to-cyan-500/80 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Terminal size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-200">felix-portfolio</p>
                  <p className="text-[10px] text-gray-500">~/home/felix</p>
                </div>
              </div>
            </div>

            {/* File Tree */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              <p className="text-[10px] text-gray-500 px-2 py-2 uppercase tracking-wider font-semibold">Explorer</p>
              <FileTree
                items={fileSystem}
                onSelect={setSelectedFile}
                selected={selectedFile}
              />
            </div>

            {/* Sidebar Footer */}
            <div className="p-3 border-t border-gray-800/50 space-y-1.5 bg-[#0a0e14]/50">
              <a
                href="https://github.com/Jaloch-glitch"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-gray-400 hover:text-emerald-400 transition-colors py-1 px-2 rounded hover:bg-gray-800/30"
              >
                <Github size={13} />
                <span>GitHub</span>
                <ExternalLink size={10} className="ml-auto" />
              </a>
              <a
                href="https://linkedin.com/in/felix-onyango-jaloch"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-gray-400 hover:text-blue-400 transition-colors py-1 px-2 rounded hover:bg-gray-800/30"
              >
                <Linkedin size={13} />
                <span>LinkedIn</span>
                <ExternalLink size={10} className="ml-auto" />
              </a>
              <a
                href="mailto:jalochglitch@gmail.com"
                className="flex items-center gap-2 text-xs text-gray-400 hover:text-amber-400 transition-colors py-1 px-2 rounded hover:bg-gray-800/30"
              >
                <Mail size={13} />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 ml-64 flex flex-col h-screen">

            {/* Tab Bar */}
            <div className="h-9 bg-[#0e1419] border-b border-gray-800/50 flex items-center px-2 sticky top-7 z-20">
              <div className="flex items-center gap-1">
                {selectedFile ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0a0e14] rounded-t border-t border-l border-r border-gray-700/30 text-xs">
                    <File size={12} className="text-emerald-400" />
                    <span className="text-gray-300">{fileContents[selectedFile.content]?.title || 'Untitled'}</span>
                    <button
                      onClick={() => setSelectedFile(null)}
                      className="ml-2 text-gray-500 hover:text-gray-300 hover:bg-gray-700/30 rounded px-1"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0a0e14] rounded-t border-t border-l border-r border-gray-700/30 text-xs">
                    <Terminal size={12} className="text-emerald-400" />
                    <span className="text-gray-300">Terminal</span>
                  </div>
                )}
              </div>
            </div>

            {/* Content Area - Scrollable */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {selectedFile ? (
                <div className="p-6 max-w-4xl mx-auto">
                  {renderFileContent()}
                </div>
              ) : (
                /* Terminal View */
                <div className="p-5 space-y-3 max-w-5xl mx-auto">
                  {/* Welcome */}
                  <div className="text-xs text-gray-500 border-b border-gray-800/50 pb-3 mb-3">
                    Welcome to Felix's Portfolio Terminal. Type <span className="text-emerald-400">help</span> for commands, or explore the file tree on the left.
                  </div>

                  {/* Command History */}
                  <div className="space-y-3">
                    {commandHistory.map((entry, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-emerald-400">felix@portfolio</span>
                          <span className="text-gray-600">:</span>
                          <span className="text-blue-400">~</span>
                          <span className="text-gray-600">$</span>
                          <span className="text-gray-200 ml-2">{entry.cmd}</span>
                        </div>
                        <pre className="text-gray-400 text-xs whitespace-pre-wrap pl-4">{entry.response}</pre>
                      </div>
                    ))}
                  </div>

                  {/* Current Input */}
                  <div className="flex items-center gap-2 text-xs sticky bottom-0 bg-[#0a0e14] py-2">
                    <span className="text-emerald-400">felix@portfolio</span>
                    <span className="text-gray-600">:</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-gray-600">$</span>
                    <input
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
                      autoFocus
                    />
                    <span className="w-2 h-3.5 bg-gray-400 animate-pulse" />
                  </div>
                </div>
              )}
            </div>

            {/* Status Bar */}
            <div className="h-6 bg-[#0e1419] border-t border-gray-800/50 flex items-center justify-between px-4 text-[11px] text-gray-500 sticky bottom-0 z-20">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <GitBranch size={11} />
                  main
                </span>
                <span className="flex items-center gap-1.5">
                  <Server size={11} />
                  {selectedFile ? fileContents[selectedFile.content]?.title : 'Terminal'}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <MapPin size={11} />
                  Kenya → Germany
                </span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

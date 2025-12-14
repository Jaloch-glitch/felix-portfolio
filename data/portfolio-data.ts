import { FileNode } from '@/components/FileTree';

export const fileSystem: FileNode[] = [
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
      {
        name: 'collibra-mcp-server',
        type: 'folder',
        badge: '26 tools',
        children: [{ name: 'README.md', type: 'file', content: 'collibra' }]
      },
      {
        name: 'micrograd',
        type: 'folder',
        badge: 'ML',
        children: [{ name: 'README.md', type: 'file', content: 'micrograd' }]
      },
      {
        name: 'makemore',
        type: 'folder',
        badge: 'NLP',
        children: [{ name: 'README.md', type: 'file', content: 'makemore' }]
      },
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

export const fileContents: Record<string, { title: string; content: string }> = {
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
    content: `{
  "timeline": [
    {
      "company": "SAP",
      "role": "Data Product Experience",
      "location": "Germany",
      "period": "2024 - Present",
      "highlights": [
        "Architecting AI-powered data governance solutions",
        "Built Collibra MCP Server (26 specialized tools)",
        "Enterprise integration with LLMs and knowledge graphs",
        "Workflow automation for data catalog management"
      ]
    },
    {
      "company": "SAP",
      "role": "Data Governance Developer",
      "location": "Prague, Czech Republic",
      "period": "2023 - 2024",
      "highlights": [
        "Collibra workflow development and automation",
        "Groovy scripting for data governance processes",
        "Integration with SAP systems and APIs",
        "Data catalog implementation and optimization"
      ]
    },
    {
      "company": "KPMG East Africa",
      "role": "Digital Transformation Consultant",
      "location": "Nairobi, Kenya",
      "period": "2022 - 2023",
      "highlights": [
        "Guided clients through digital transformation",
        "Solution mapping and process automation",
        "Technology strategy and implementation",
        "Enterprise system integration consulting"
      ]
    },
    {
      "company": "Kenafric Industries",
      "role": "Data Analyst",
      "location": "Nairobi, Kenya",
      "period": "2021 - 2022",
      "highlights": [
        "Power BI dashboard development",
        "Python automation for data pipelines",
        "Data-driven decision support systems",
        "Business intelligence reporting"
      ]
    }
  ]
}`
  },
  skills: {
    title: 'skills.json',
    content: `{
  "languages": [
    {
      "name": "Python",
      "level": 95,
      "experience": "5+ years",
      "uses": ["ML", "Data Engineering", "Automation", "Scripting"]
    },
    {
      "name": "JavaScript/TypeScript",
      "level": 92,
      "experience": "4+ years",
      "uses": ["Full-stack", "Node.js", "React", "Next.js"]
    },
    {
      "name": "Groovy",
      "level": 88,
      "experience": "2+ years",
      "uses": ["Collibra Workflows", "Scripting", "Automation"]
    },
    {
      "name": "SQL",
      "level": 85,
      "experience": "4+ years",
      "uses": ["Data Analysis", "Complex Queries", "Optimization"]
    }
  ],
  "frameworks": [
    {
      "name": "PyTorch",
      "level": 85,
      "specialty": "Neural networks from scratch"
    },
    {
      "name": "React/Next.js",
      "level": 90,
      "specialty": "Modern web applications"
    },
    {
      "name": "Node.js",
      "level": 92,
      "specialty": "APIs and microservices"
    },
    {
      "name": "SAP CAP",
      "level": 88,
      "specialty": "Enterprise applications"
    }
  ],
  "tools": [
    {
      "name": "Collibra",
      "level": 95,
      "specialty": "Data governance expert"
    },
    {
      "name": "Databricks",
      "level": 82,
      "specialty": "Big data analytics"
    },
    {
      "name": "Cloud Foundry",
      "level": 80,
      "specialty": "Cloud deployment"
    },
    {
      "name": "Docker",
      "level": 78,
      "specialty": "Containerization"
    }
  ]
}`
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

Tags: #afrika-kommt #sap-prague #resilience #growth
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

Tags: #collibra #mcp-server #data-governance #llm
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
├── Derived backpropagation by hand (chain rule!)
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

Tags: #micrograd #makemore #neural-networks #pytorch
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
    ├── LLM-powered queries
    ├── Conversational metadata
    ├── Smart suggestions
    └── Natural language to Collibra API

## Tech Stack

Node.js + TypeScript    → Core server
MCP Protocol            → AI tool integration
Groovy                  → Collibra workflows
REST APIs               → System integration
OAuth2                  → Enterprise security

## Impact

Users: Hundreds of data stewards
Assets: Thousands in production
Status: Production-ready ✓

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GitHub: github.com/Jaloch-glitch/collibra-mcp-server`
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

1. Started with limit definition of derivatives
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

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GitHub: github.com/Jaloch-glitch/micrograd`
  },
  makemore: {
    title: 'README.md',
    content: `# Makemore

Character-Level Language Models
Building NLP from the ground up.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## The Series

### Part 1: Bigram Model
├── Probability distributions from data
├── Character co-occurrence patterns
├── Simple but surprisingly effective
└── Foundation for everything else

### Part 2: Multi-Layer Perceptron
├── Neural network approach to bigrams
├── Character embeddings (learned)
├── Hidden layers with tanh activation
└── Backpropagation through the network

### Part 3: Advanced Context
├── 3-character context windows
├── Richer embeddings
├── Deeper architecture
└── More sophisticated generation

## What I Learned

├── Gradient descent (really learned it)
├── How learning rate affects training
├── Batch normalization and why it helps
├── Initialization strategies matter
├── Embeddings capture semantic meaning
└── The beauty of emergent behavior

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

GitHub: github.com/Jaloch-glitch/makemore`
  },
  certifications: {
    title: 'certifications.md',
    content: `# Certifications & Awards

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
Impact: Career transformation

### SAP Young Professional Program
Year: 2020
Location: Kenya
Impact: Gateway to enterprise systems

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Philosophy:
"Formal education opens doors.
 Self-education builds the house."`
  },
  coursework: {
    title: 'coursework.md',
    content: `# Coursework & Learning

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Machine Learning

### Neural Networks from Scratch
├── Micrograd: Autograd engine
├── Makemore Part 1: Bigram models
├── Makemore Part 2: MLP architectures
├── Makemore Part 3: Embeddings
└── Transformers (in progress)

### Fast.ai Deep Learning
├── Image classification
├── NLP and text generation
├── Tabular data modeling
└── Collaborative filtering

## Web Development

### The Odin Project (Complete)
├── HTML, CSS, JavaScript
├── React and modern frontend
├── Node.js backend
├── Databases and APIs
└── Full-stack projects

## Enterprise Systems

### SAP Learning
├── CAP framework deep dive
├── Cloud Foundry architecture
├── BTP services
└── Enterprise patterns

### Collibra
├── Data governance fundamentals
├── Workflow development (Groovy)
├── API integration patterns
└── Enterprise data catalog

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
└── Just saying hello

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

## What I'm Looking For

Projects that involve:
├── Complex technical challenges
├── Real-world impact
├── Learning opportunities
├── Great teams
└── Meaningful work

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

> "Let's build something that matters."

Looking forward to hearing from you!`
  },
};

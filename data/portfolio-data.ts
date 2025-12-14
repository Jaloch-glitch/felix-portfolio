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

## Current Status

Location: Germany 🇩🇪 (via Prague 🇨🇿, via Nairobi 🇰🇪)
Role: Data Governance Architect @ SAP
Focus: AI-powered data governance, ML from scratch
Status: ● Available for remote consulting`
  },
  contact: {
    title: 'contact.md',
    content: `# Contact

Email:    jalochglitch@gmail.com
GitHub:   github.com/Jaloch-glitch
LinkedIn: linkedin.com/in/felix-onyango-jaloch

Location: Germany 🇩🇪
Status:   ● Available for remote work`
  },
  // Add more content as needed
};

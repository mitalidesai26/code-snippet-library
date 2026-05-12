import { FileCode2, Coffee, Globe, Paintbrush, Wind, Database, Server, Terminal } from 'lucide-react';

export const languages = [
  { name: 'C', icon: FileCode2, color: '#60a5fa', slug: 'c' },
  { name: 'JavaScript', icon: FileCode2, color: '#fbbf24', slug: 'javascript' },
  { name: 'Java', icon: Coffee, color: '#f97316', slug: 'java' },
  { name: 'HTML', icon: Globe, color: '#f472b6', slug: 'html' },
  { name: 'CSS', icon: Paintbrush, color: '#22d3ee', slug: 'css' },
  { name: 'Tailwind', icon: Wind, color: '#38bdf8', slug: 'tailwind' },
  { name: 'SQL', icon: Database, color: '#34d399', slug: 'sql' },
  { name: 'MongoDB', icon: Server, color: '#4ade80', slug: 'mongodb' },
  { name: 'Shell', icon: Terminal, color: '#a78bfa', slug: 'shell' },
];

export const getLanguageBySlug = (slug) => languages.find(l => l.slug === slug);

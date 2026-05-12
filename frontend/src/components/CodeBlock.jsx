import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const langMap = {
  'C': 'c',
  'JavaScript': 'javascript',
  'Java': 'java',
  'HTML': 'html',
  'CSS': 'css',
  'Tailwind': 'html',
  'SQL': 'sql',
  'MongoDB': 'javascript',
  'Shell': 'bash',
};

export default function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);
  const formatted = code.replace(/\\n/g, '\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    toast.success('Copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-white/10">
      <div className="flex items-center justify-between px-4 py-2 bg-dark-700/50">
        <span className="text-xs text-dark-300 font-mono">{language}</span>
        <button onClick={handleCopy} className="flex items-center gap-1 text-xs text-dark-300 hover:text-white transition-colors">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={langMap[language] || 'text'}
        style={oneDark}
        customStyle={{ margin: 0, padding: '1.25rem', background: 'rgba(17,17,27,0.8)', fontSize: '0.85rem' }}
        showLineNumbers
      >
        {formatted}
      </SyntaxHighlighter>
    </div>
  );
}

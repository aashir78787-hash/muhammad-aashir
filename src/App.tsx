import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Code, 
  Sparkles, 
  Palette, 
  CheckSquare, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  Search, 
  Sliders, 
  FileText, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Info,
  ChevronRight,
  BookOpen,
  Filter
} from 'lucide-react';

// Color conversion utilities for Theme Craft feature
function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [
    Math.round(255 * f(0)),
    Math.round(255 * f(4)),
    Math.round(255 * f(8))
  ];
}

function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrast(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const l1 = getLuminance(rgb1[0], rgb1[1], rgb1[2]);
  const l2 = getLuminance(rgb2[0], rgb2[1], rgb2[2]);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

// Default snippets to pre-populate workspace
const INITIAL_SNIPPETS = [
  {
    id: 'snip-1',
    title: 'Google GenAI SDK Chat Stream',
    description: 'Establish a low-latency client stream using the new @google/genai package.',
    category: 'API Integration',
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI();
const response = await ai.models.generateContentStream({
  model: 'gemini-2.5-flash',
  contents: 'Provide a structured design review of an off-white dashboard layout.'
});

for await (const chunk of response) {
  process.stdout.write(chunk.text);
}`
  },
  {
    id: 'snip-2',
    title: 'Tailwind CSS Custom HSL Variable Map',
    description: 'Dynamic Tailwind CSS configuration mapper for custom color profiles.',
    category: 'Tailwind CSS',
    code: `// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(var(--color-primary-50) / <alpha-value>)',
          500: 'hsl(var(--color-primary-500) / <alpha-value>)',
          900: 'hsl(var(--color-primary-900) / <alpha-value>)',
        }
      }
    }
  }
}`
  },
  {
    id: 'snip-3',
    title: 'React 19 Form Action & Optimistic Hooks',
    description: 'Standard declarative server-action and transition hooks in modern React.',
    category: 'React 19',
    code: `import { useActionState, useOptimistic } from 'react';

async function updateTodoAction(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  await saveTodoToDatabase(title);
  return { success: true };
}

export function TodoForm() {
  const [state, formAction, isPending] = useActionState(updateTodoAction, null);
  return (
    <form action={formAction}>
      <input name="title" required className="border p-2 rounded" />
      <button disabled={isPending}>Submit</button>
    </form>
  );
}`
  }
];

// Default project roadmap tasks
const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Standardize system prompts for model calibration',
    description: 'Define crisp agent role parameters and strict visual system rules.',
    category: 'AI Pipeline',
    status: 'done' as const,
    priority: 'high' as const
  },
  {
    id: 'task-2',
    title: 'Calculate accessible color palettes dynamically',
    description: 'Implement relative luminance calculations to comply with WCAG AA standard (4.5:1).',
    category: 'UI/UX Design',
    status: 'done' as const,
    priority: 'medium' as const
  },
  {
    id: 'task-3',
    title: 'Add persistent snippet repository filters',
    description: 'Develop tags and text searching modules within LocalStorage.',
    category: 'Frontend Eng',
    status: 'progress' as const,
    priority: 'medium' as const
  },
  {
    id: 'task-4',
    title: 'Configure server-side proxy route definitions',
    description: 'Hide sensitive environment API keys from browser developer consoles.',
    category: 'Backend Security',
    status: 'backlog' as const,
    priority: 'high' as const
  }
];

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'prompt' | 'snippets' | 'theme' | 'tasks'>('prompt');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Prompt Builder States
  const [promptRole, setPromptRole] = useState('Senior TypeScript Architect');
  const [promptTask, setPromptTask] = useState('Build a robust, responsive workspace layout without nested frame layouts.');
  const [selectedConstraints, setSelectedConstraints] = useState<string[]>([
    'Use Tailwind CSS for custom utility styling',
    'Keep elements accessible with 4.5:1+ contrast ratios',
    'Follow simple single-screen desktop spacing rules'
  ]);
  const [customConstraint, setCustomConstraint] = useState('');
  const [variables, setVariables] = useState<{ key: string; value: string }[]>([
    { key: 'language', value: 'TypeScript' },
    { key: 'framework', value: 'React 19' }
  ]);
  const [newVarKey, setNewVarKey] = useState('');
  const [newVarVal, setNewVarVal] = useState('');

  // Snippets States
  const [snippets, setSnippets] = useState(() => {
    const saved = localStorage.getItem('ai_studio_snippets');
    return saved ? JSON.parse(saved) : INITIAL_SNIPPETS;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [newSnipTitle, setNewSnipTitle] = useState('');
  const [newSnipCategory, setNewSnipCategory] = useState('API Integration');
  const [newSnipDesc, setNewSnipDesc] = useState('');
  const [newSnipCode, setNewSnipCode] = useState('');
  const [showAddSnippet, setShowAddSnippet] = useState(false);

  // Theme Craft States (HSL base)
  const [hue, setHue] = useState(250); // Violet base
  const [saturation, setSaturation] = useState(85);
  const [lightness, setLightness] = useState(55);

  // Tasks (Roadmap) States
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('ai_studio_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Frontend Eng');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ai_studio_snippets', JSON.stringify(snippets));
  }, [snippets]);

  useEffect(() => {
    localStorage.setItem('ai_studio_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Compile Prompt System Instruction String
  const compiledPrompt = `# SYSTEM INSTRUCTION
You are acting as: ${promptRole || 'a professional helper'}.

# OBJECTIVE & TASK
Your primary goal is to: ${promptTask || 'Complete the task requested by the user'}.

# CORE CONSTRAINTS
${selectedConstraints.map(c => `- ${c}`).join('\n')}

# KEY-VALUE CONTEXT SLOTS
${variables.map(v => `- \${${v.key}}: ${v.value}`).join('\n')}`;

  // Add Constraints dynamically
  const addConstraint = () => {
    if (customConstraint.trim() && !selectedConstraints.includes(customConstraint.trim())) {
      setSelectedConstraints([...selectedConstraints, customConstraint.trim()]);
      setCustomConstraint('');
    }
  };

  const removeConstraint = (index: number) => {
    setSelectedConstraints(selectedConstraints.filter((_, i) => i !== index));
  };

  // Add Custom Variable
  const addVariable = () => {
    if (newVarKey.trim() && newVarVal.trim()) {
      setVariables([...variables, { key: newVarKey.trim(), value: newVarVal.trim() }]);
      setNewVarKey('');
      setNewVarVal('');
    }
  };

  const removeVariable = (keyToRemove: string) => {
    setVariables(variables.filter(v => v.key !== keyToRemove));
  };

  // Add Snippet
  const addSnippet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSnipTitle || !newSnipCode) return;
    const newSnip = {
      id: `snip-${Date.now()}`,
      title: newSnipTitle,
      description: newSnipDesc || 'Custom saved code helper snippet.',
      category: newSnipCategory,
      code: newSnipCode
    };
    setSnippets([newSnip, ...snippets]);
    setNewSnipTitle('');
    setNewSnipDesc('');
    setNewSnipCode('');
    setShowAddSnippet(false);
  };

  const deleteSnippet = (id: string) => {
    setSnippets(snippets.filter((s: any) => s.id !== id));
  };

  // Add Task
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    const newTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      description: newTaskDesc || 'No description provided.',
      category: newTaskCategory,
      status: 'backlog' as const,
      priority: newTaskPriority
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewTaskDesc('');
  };

  const moveTask = (id: string, nextStatus: 'backlog' | 'progress' | 'done') => {
    setTasks(tasks.map((t: any) => t.id === id ? { ...t, status: nextStatus } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t: any) => t.id !== id));
  };

  // HSL calculations for Theme Craft
  const rgbBase = hslToRgb(hue, saturation, lightness);
  const contrastWithWhite = getContrast(rgbBase, [255, 255, 255]);
  const contrastWithDark = getContrast(rgbBase, [24, 24, 27]); // Zinc 900 background

  const isAAOnWhite = contrastWithWhite >= 4.5;
  const isAAAOnWhite = contrastWithWhite >= 7.0;
  const isAAOnDark = contrastWithDark >= 4.5;
  const isAAAOnDark = contrastWithDark >= 7.0;

  // Render a nice badge indicating WCAG status
  const getContrastBadge = (contrast: number, isAA: boolean, isAAA: boolean) => {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold text-lg text-slate-900">{contrast.toFixed(2)}:1</span>
        <div className="flex gap-1">
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${isAA ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
            WCAG AA {isAA ? 'Pass' : 'Fail'}
          </span>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${isAAA ? 'bg-emerald-100 text-emerald-800 font-medium' : 'bg-slate-100 text-slate-500'}`}>
            AAA {isAAA ? 'Pass' : 'Low'}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div id="companion-app" className="min-h-screen bg-slate-50/70 text-slate-700 font-sans flex flex-col selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Top Professional Header Bar */}
      <header id="companion-header" className="bg-white border-b border-slate-200/80 sticky top-0 z-40 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-[15px] tracking-tight text-slate-900 leading-none">AI Studio</h1>
            <span className="text-[11px] text-slate-500 font-medium tracking-wide uppercase">Developer Companion</span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-500">
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-full text-slate-600">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-mono">UTC: {new Date().toISOString().substring(11, 16)}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium text-slate-600">Workspace Active</span>
          </div>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <div id="companion-main-workspace" className="flex-1 max-w-[1400px] w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Navigation Rail / Sidebar Cards */}
        <aside id="workspace-sidebar" className="lg:col-span-3 flex flex-col gap-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
            <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-3 px-1">Navigation Modules</p>
            <nav className="flex flex-col gap-1.5">
              <button 
                id="tab-prompt-builder"
                onClick={() => setActiveTab('prompt')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition text-sm font-medium ${
                  activeTab === 'prompt' 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Terminal className={`w-4 h-4 ${activeTab === 'prompt' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>Prompt Studio</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition ${activeTab === 'prompt' ? 'text-indigo-600' : 'text-slate-300'}`} />
              </button>

              <button 
                id="tab-snippets-safe"
                onClick={() => setActiveTab('snippets')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition text-sm font-medium ${
                  activeTab === 'snippets' 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Code className={`w-4 h-4 ${activeTab === 'snippets' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>Snippet Safe</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition ${activeTab === 'snippets' ? 'text-indigo-600' : 'text-slate-300'}`} />
              </button>

              <button 
                id="tab-theme-craft"
                onClick={() => setActiveTab('theme')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition text-sm font-medium ${
                  activeTab === 'theme' 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Palette className={`w-4 h-4 ${activeTab === 'theme' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>Theme Craft</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition ${activeTab === 'theme' ? 'text-indigo-600' : 'text-slate-300'}`} />
              </button>

              <button 
                id="tab-tasks-road"
                onClick={() => setActiveTab('tasks')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition text-sm font-medium ${
                  activeTab === 'tasks' 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CheckSquare className={`w-4 h-4 ${activeTab === 'tasks' ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>Workspace Tasks</span>
                </div>
                <ChevronRight className={`w-4 h-4 transition ${activeTab === 'tasks' ? 'text-indigo-600' : 'text-slate-300'}`} />
              </button>
            </nav>
          </div>

          {/* Quick Stats Sidebar Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm text-xs flex flex-col gap-3">
            <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase px-1">Project Statistics</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-500 block">Total Snippets</span>
                <span className="text-base font-bold text-slate-800">{snippets.length}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-500 block">Tasks Solved</span>
                <span className="text-base font-bold text-emerald-600">
                  {tasks.filter((t: any) => t.status === 'done').length}/{tasks.length}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <div className="flex justify-between text-slate-500 mb-1">
                <span>Core Build Progress</span>
                <span className="font-bold text-slate-800">
                  {Math.round((tasks.filter((t: any) => t.status === 'done').length / (tasks.length || 1)) * 100)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500" 
                  style={{ width: `${(tasks.filter((t: any) => t.status === 'done').length / (tasks.length || 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-950 text-indigo-200/90 rounded-2xl p-4 shadow-sm text-xs leading-relaxed border border-indigo-900/60 flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5 text-white font-medium">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>Prompting Guidelines</span>
            </div>
            <p className="text-indigo-200/70">
              When using Gemini models in AI Studio, system instructions are critical. Calibrate roles and set structured variable context before querying content.
            </p>
          </div>
        </aside>

        {/* Dynamic Center Stage Container */}
        <main id="workspace-stage" className="lg:col-span-9 flex flex-col gap-6">
          
          {/* Active Panel: Prompt Builder */}
          {activeTab === 'prompt' && (
            <section id="panel-prompt-studio" className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-indigo-500" />
                    System Prompt Studio
                  </h2>
                  <p className="text-xs text-slate-500">Draft, configure constraints, and compile high-performance system context templates.</p>
                </div>
                <button 
                  id="btn-reset-prompt-studio"
                  onClick={() => {
                    setPromptRole('Senior TypeScript Architect');
                    setPromptTask('Build a robust, responsive workspace layout without nested frame layouts.');
                    setSelectedConstraints([
                      'Use Tailwind CSS for custom utility styling',
                      'Keep elements accessible with 4.5:1+ contrast ratios',
                      'Follow simple single-screen desktop spacing rules'
                    ]);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-600 transition flex items-center gap-1.5 self-start"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Defaults
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Configuration Panel */}
                <div className="md:col-span-7 flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label id="lbl-role" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Model Role / Persona</label>
                    <input 
                      id="input-prompt-role"
                      type="text" 
                      value={promptRole}
                      onChange={(e) => setPromptRole(e.target.value)}
                      placeholder="e.g. Senior UX Designer"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                    />
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {['TypeScript Expert', 'AI Research Assistant', 'CSS Wizard', 'UX Critic'].map(preset => (
                        <button
                          key={preset}
                          id={`preset-role-${preset.replace(/\s+/g, '-').toLowerCase()}`}
                          onClick={() => setPromptRole(preset)}
                          className="px-2 py-0.5 rounded bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-[10px] text-slate-600 font-semibold transition"
                        >
                          + {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label id="lbl-task" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Core Objective / Task Instructions</label>
                    <textarea 
                      id="textarea-prompt-task"
                      rows={3}
                      value={promptTask}
                      onChange={(e) => setPromptTask(e.target.value)}
                      placeholder="Specify the operational logic the AI must adhere to..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition resize-none"
                    />
                  </div>

                  {/* Constraints Checklists */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label id="lbl-constraints" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Operational Constraints</label>
                      <span className="text-[10px] text-slate-400 font-medium">{selectedConstraints.length} active</span>
                    </div>

                    <div className="border border-slate-200 rounded-xl p-3 flex flex-col gap-2 max-h-[180px] overflow-y-auto bg-slate-50/50">
                      {selectedConstraints.map((constraint, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-2 text-xs bg-white border border-slate-100 px-3 py-2 rounded-lg">
                          <span className="text-slate-700 select-none font-medium">{constraint}</span>
                          <button 
                            id={`btn-del-constraint-${idx}`}
                            onClick={() => removeConstraint(idx)}
                            className="text-slate-400 hover:text-red-500 transition p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      {selectedConstraints.length === 0 && (
                        <div className="text-center py-6 text-slate-400 text-xs">No active operational constraints added yet.</div>
                      )}
                    </div>

                    {/* Add Custom Constraint Input */}
                    <div className="flex gap-2 mt-1.5">
                      <input 
                        id="input-new-constraint"
                        type="text"
                        value={customConstraint}
                        onChange={(e) => setCustomConstraint(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { addConstraint(); e.preventDefault(); } }}
                        placeholder="Add a custom system constraint..."
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500 transition"
                      />
                      <button 
                        id="btn-add-constraint"
                        onClick={addConstraint}
                        className="px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Template Variable Key-Values */}
                  <div className="flex flex-col gap-1.5">
                    <label id="lbl-variables" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Context Variables</label>
                    <div className="grid grid-cols-2 gap-2">
                      {variables.map((variable) => (
                        <div key={variable.key} className="flex items-center justify-between border border-slate-200 bg-white p-2.5 rounded-xl text-xs">
                          <div className="overflow-hidden">
                            <span className="font-mono text-indigo-600 font-bold block truncate">${`{${variable.key}}`}</span>
                            <span className="text-slate-500 truncate block">{variable.value}</span>
                          </div>
                          <button 
                            id={`btn-del-var-${variable.key}`}
                            onClick={() => removeVariable(variable.key)}
                            className="text-slate-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 mt-1">
                      <input 
                        id="input-var-key"
                        type="text" 
                        value={newVarKey}
                        onChange={(e) => setNewVarKey(e.target.value)}
                        placeholder="Key (e.g. language)"
                        className="w-1/2 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500 transition"
                      />
                      <input 
                        id="input-var-val"
                        type="text" 
                        value={newVarVal}
                        onChange={(e) => setNewVarVal(e.target.value)}
                        placeholder="Value (e.g. TypeScript)"
                        className="w-1/2 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500 transition"
                      />
                      <button 
                        id="btn-add-var"
                        onClick={addVariable}
                        className="px-3.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition flex items-center"
                      >
                        Map
                      </button>
                    </div>
                  </div>
                </div>

                {/* Compiled Live Output */}
                <div className="md:col-span-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label id="lbl-compiled-output" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Live Compiled Prompt</label>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{compiledPrompt.length} chars</span>
                  </div>

                  <div className="flex-1 bg-slate-900 text-slate-200 font-mono text-xs p-4 rounded-2xl relative min-h-[350px] flex flex-col justify-between border border-slate-950/80 shadow-inner">
                    <pre className="whitespace-pre-wrap overflow-y-auto leading-relaxed max-h-[360px] pr-2 scrollbar-thin">
                      {compiledPrompt}
                    </pre>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between bg-slate-900">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                        <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>Ready to load in Gemini SDK.</span>
                      </div>
                      <button 
                        id="btn-copy-prompt"
                        onClick={() => handleCopy(compiledPrompt, 'compiled_prompt')}
                        className={`px-3 py-1.5 rounded-lg transition text-xs font-bold flex items-center gap-1.5 ${
                          copiedId === 'compiled_prompt' 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-100'
                        }`}
                      >
                        {copiedId === 'compiled_prompt' ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy System
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Active Panel: Snippets Manager */}
          {activeTab === 'snippets' && (
            <section id="panel-snippets-manager" className="flex flex-col gap-6">
              
              {/* Header Action Row */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Code className="w-5 h-5 text-indigo-500" />
                    Snippet Safe
                  </h2>
                  <p className="text-xs text-slate-500">Store utility snippets and quick snippets with active copy-paste support.</p>
                </div>
                
                <button 
                  id="btn-trigger-add-snippet"
                  onClick={() => setShowAddSnippet(!showAddSnippet)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-start md:self-auto shadow-sm shadow-indigo-100"
                >
                  <Plus className="w-4 h-4" />
                  {showAddSnippet ? 'Close Creator' : 'Save New Snippet'}
                </button>
              </div>

              {/* Add Snippet Form */}
              {showAddSnippet && (
                <form id="form-add-snippet" onSubmit={addSnippet} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4 animate-fadeIn">
                  <h3 className="text-sm font-bold text-slate-900">Create Code Helper</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1">
                      <label id="lbl-snip-title" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Snippet Name</label>
                      <input 
                        id="input-snip-title"
                        type="text" 
                        required
                        value={newSnipTitle}
                        onChange={(e) => setNewSnipTitle(e.target.value)}
                        placeholder="e.g. Gemini Multimodal Request"
                        className="px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500 transition"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label id="lbl-snip-category" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Category Tag</label>
                      <select 
                        id="select-snip-category"
                        value={newSnipCategory}
                        onChange={(e) => setNewSnipCategory(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-indigo-500 transition"
                      >
                        <option value="API Integration">API Integration</option>
                        <option value="Tailwind CSS">Tailwind CSS</option>
                        <option value="React 19">React 19</option>
                        <option value="TypeScript Core">TypeScript Core</option>
                        <option value="Custom Module">Custom Module</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label id="lbl-snip-desc" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Description</label>
                      <input 
                        id="input-snip-desc"
                        type="text" 
                        value={newSnipDesc}
                        onChange={(e) => setNewSnipDesc(e.target.value)}
                        placeholder="Short summary of what this code does"
                        className="px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500 transition"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label id="lbl-snip-code" className="text-xs font-bold text-slate-500 uppercase tracking-wide">Code Block</label>
                    <textarea 
                      id="textarea-snip-code"
                      rows={5}
                      required
                      value={newSnipCode}
                      onChange={(e) => setNewSnipCode(e.target.value)}
                      placeholder={`// paste your developer snippet here...\nimport { GoogleGenAI } from "@google/genai";`}
                      className="w-full font-mono text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 transition bg-slate-50 resize-none"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button 
                      id="btn-cancel-snip"
                      type="button" 
                      onClick={() => setShowAddSnippet(false)}
                      className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 transition"
                    >
                      Cancel
                    </button>
                    <button 
                      id="btn-save-snip"
                      type="submit" 
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition"
                    >
                      Save to Safe
                    </button>
                  </div>
                </form>
              )}

              {/* Filtering & Listing */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                  {/* Text Search */}
                  <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                    <input 
                      id="input-search-snippets"
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search snippets..."
                      className="w-full pl-9 pr-4 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>

                  {/* Tag Quick Filter */}
                  <div className="flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs text-slate-500 font-medium">Category:</span>
                    <div className="flex gap-1">
                      {['All', 'API Integration', 'Tailwind CSS', 'React 19'].map((cat) => (
                        <button
                          key={cat}
                          id={`filter-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                            selectedCategory === cat 
                              ? 'bg-slate-800 text-white' 
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Snippets List Grid */}
                <div className="flex flex-col gap-4">
                  {snippets
                    .filter((s: any) => {
                      const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                            s.description.toLowerCase().includes(searchQuery.toLowerCase());
                      const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
                      return matchesSearch && matchesCategory;
                    })
                    .map((snippet: any) => (
                      <div key={snippet.id} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col bg-slate-50/20">
                        <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-slate-900">{snippet.title}</h4>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                                {snippet.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">{snippet.description}</p>
                          </div>
                          
                          <div className="flex items-center gap-1.5">
                            <button
                              id={`btn-copy-snip-${snippet.id}`}
                              onClick={() => handleCopy(snippet.code, snippet.id)}
                              className={`p-1.5 rounded-lg transition flex items-center gap-1 text-xs font-bold ${
                                copiedId === snippet.id 
                                  ? 'bg-emerald-500 text-white' 
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                              }`}
                              title="Copy code block"
                            >
                              {copiedId === snippet.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  Copy
                                </>
                              )}
                            </button>
                            <button
                              id={`btn-del-snip-${snippet.id}`}
                              onClick={() => deleteSnippet(snippet.id)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 transition"
                              title="Delete snippet"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <pre className="p-4 overflow-x-auto text-xs font-mono text-slate-800 bg-slate-900 text-slate-300 leading-relaxed border-t border-slate-100">
                          <code>{snippet.code}</code>
                        </pre>
                      </div>
                    ))}

                  {snippets.length === 0 && (
                    <div className="text-center py-10 text-slate-400 text-xs">No saved helper snippets found. Click "Save New Snippet" to add one!</div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Active Panel: Theme Craft (Accessibility Compliant Palette Generator) */}
          {activeTab === 'theme' && (
            <section id="panel-theme-craft" className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col gap-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-indigo-500" />
                  Theme Craft (WCAG Accessibility Analyzer)
                </h2>
                <p className="text-xs text-slate-500">Calculate custom UI hues dynamically and verify high-contrast WCAG 4.5:1 standards.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Sliders Configuration */}
                <div className="md:col-span-6 flex flex-col gap-5 bg-slate-50/50 border border-slate-200/60 p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 border-b border-slate-200 pb-2">
                    <Sliders className="w-4 h-4 text-indigo-500" />
                    <span>HSL Variable Control Range</span>
                  </div>

                  {/* Hue Slider */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-medium">Hue Color Angle</span>
                      <span className="font-mono text-slate-800 font-bold">{hue}°</span>
                    </div>
                    <input 
                      id="range-hue"
                      type="range" 
                      min="0" 
                      max="360" 
                      value={hue}
                      onChange={(e) => setHue(Number(e.target.value))}
                      className="w-full h-1.5 bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 via-purple-500 to-red-500 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Saturation Slider */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-medium">Saturation Intensity</span>
                      <span className="font-mono text-slate-800 font-bold">{saturation}%</span>
                    </div>
                    <input 
                      id="range-saturation"
                      type="range" 
                      min="0" 
                      max="100" 
                      value={saturation}
                      onChange={(e) => setSaturation(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>

                  {/* Lightness Slider */}
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 font-medium">Luminosity / Lightness</span>
                      <span className="font-mono text-slate-800 font-bold">{lightness}%</span>
                    </div>
                    <input 
                      id="range-lightness"
                      type="range" 
                      min="0" 
                      max="100" 
                      value={lightness}
                      onChange={(e) => setLightness(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>

                  <div className="flex gap-2 justify-end mt-2">
                    <button 
                      id="btn-preset-violet"
                      onClick={() => { setHue(250); setSaturation(85); setLightness(55); }}
                      className="px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 text-[10px] font-bold text-slate-700 transition"
                    >
                      Violet Pres.
                    </button>
                    <button 
                      id="btn-preset-teal"
                      onClick={() => { setHue(170); setSaturation(75); setLightness(45); }}
                      className="px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 text-[10px] font-bold text-slate-700 transition"
                    >
                      Teal Pres.
                    </button>
                    <button 
                      id="btn-preset-amber"
                      onClick={() => { setHue(35); setSaturation(95); setLightness(50); }}
                      className="px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 text-[10px] font-bold text-slate-700 transition"
                    >
                      Amber Pres.
                    </button>
                  </div>
                </div>

                {/* Real-time Diagnostics Output */}
                <div className="md:col-span-6 flex flex-col gap-4">
                  
                  {/* Generated Color Visualizer Card */}
                  <div 
                    id="theme-visualization-card"
                    style={{ backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)` }}
                    className="h-28 rounded-2xl p-4 flex flex-col justify-between transition-colors shadow-sm duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <span className="bg-white/95 text-slate-900 font-mono font-bold text-[10px] px-2 py-0.5 rounded">
                        BASE: hsl({hue}, {saturation}%, {lightness}%)
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-white text-xs font-bold drop-shadow-md">Sample Light Text</span>
                      <span className="text-slate-950 text-xs font-bold drop-shadow-md">Sample Dark Text</span>
                    </div>
                  </div>

                  {/* Contrast Results */}
                  <div className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3.5">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Contrast Standards Diagnostic</p>
                    
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <span className="text-xs text-slate-600 font-medium">Contrast with Standard White Text:</span>
                        {getContrastBadge(contrastWithWhite, isAAOnWhite, isAAAOnWhite)}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-slate-600 font-medium">Contrast with Zinc-900 Dark Text:</span>
                        {getContrastBadge(contrastWithDark, isAAOnDark, isAAAOnDark)}
                      </div>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] text-slate-500 leading-relaxed">
                      <span className="font-semibold text-slate-700 block mb-0.5">WCAG Compliant Guide:</span>
                      AA standard requires contrast ratios of at least <strong>4.5:1</strong> for normal body copy, and <strong>3.0:1</strong> for larger header lines. Adjust lightness sliders to maximize accessibility metrics.
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme Exports panel */}
              <div className="border-t border-slate-100 pt-5">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tailwind CSS Custom Style Injection code</h3>
                  <button 
                    id="btn-copy-css-injection"
                    onClick={() => handleCopy(`:root {\n  --color-primary-base: ${hue} ${saturation}% ${lightness}%;\n}`, 'theme-export')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                      copiedId === 'theme-export' ? 'bg-emerald-500 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {copiedId === 'theme-export' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy CSS Variable
                  </button>
                </div>
                <pre className="bg-slate-900 text-slate-300 font-mono text-xs p-3.5 rounded-xl border border-slate-950 overflow-x-auto leading-relaxed">
                  <code>{`:root {
  --color-primary-base: ${hue} ${saturation}% ${lightness}%;
  --color-primary-light: ${hue} ${Math.min(100, saturation + 5)}% ${Math.min(95, lightness + 15)}%;
  --color-primary-dark: ${hue} ${Math.max(0, saturation - 5)}% ${Math.max(5, lightness - 15)}%;
}`}</code>
                </pre>
              </div>
            </section>
          )}

          {/* Active Panel: Milestone Backlog / Tasks */}
          {activeTab === 'tasks' && (
            <section id="panel-milestones-tasks" className="flex flex-col gap-6">
              
              {/* Task Header & Quick Add */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-indigo-500" />
                    Workspace Tasks & Roadmap
                  </h2>
                  <p className="text-xs text-slate-500">Deconstruct project goals into granular tasks and monitor milestones securely.</p>
                </div>

                <form id="form-quick-add-task" onSubmit={addTask} className="bg-slate-50/50 border border-slate-200/70 p-3.5 rounded-xl flex flex-col gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-5">
                      <input 
                        id="input-task-title"
                        type="text" 
                        required
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        placeholder="Task name (e.g., Optimize HMR settings)..."
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-indigo-500 transition"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <select 
                        id="select-task-category"
                        value={newTaskCategory}
                        onChange={(e) => setNewTaskCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-indigo-500 transition"
                      >
                        <option value="Frontend Eng">Frontend Eng</option>
                        <option value="AI Pipeline">AI Pipeline</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Backend Security">Backend Security</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <select 
                        id="select-task-priority"
                        value={newTaskPriority}
                        onChange={(e) => setNewTaskPriority(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:border-indigo-500 transition"
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Pri</option>
                        <option value="high">High Priority</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <button 
                        id="btn-add-task"
                        type="submit" 
                        className="w-full py-2 bg-slate-850 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 bg-slate-800"
                      >
                        <Plus className="w-4 h-4" />
                        Create
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Three-Column Board (Kanban Setup) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Column: Backlog */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl shadow-sm">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                      Backlog Stack
                    </span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      {tasks.filter((t: any) => t.status === 'backlog').length}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 min-h-[250px]">
                    {tasks.filter((t: any) => t.status === 'backlog').map((task: any) => (
                      <div key={task.id} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col gap-2.5 hover:border-slate-300 transition">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider font-mono">{task.category}</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                              task.priority === 'high' ? 'bg-red-50 text-red-700' : task.priority === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-slate-50 text-slate-500'
                            }`}>{task.priority}</span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 mt-1">{task.title}</h4>
                        </div>
                        
                        <div className="flex justify-between items-center border-t border-slate-100 pt-2.5 mt-1.5">
                          <button 
                            id={`btn-del-task-${task.id}`}
                            onClick={() => deleteTask(task.id)}
                            className="text-slate-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            id={`btn-move-task-progress-${task.id}`}
                            onClick={() => moveTask(task.id, 'progress')}
                            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-[10px] font-bold transition flex items-center gap-0.5"
                          >
                            Start Task
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {tasks.filter((t: any) => t.status === 'backlog').length === 0 && (
                      <div className="border border-dashed border-slate-200 rounded-xl py-8 text-center text-xs text-slate-400 bg-slate-50/20">Empty column</div>
                    )}
                  </div>
                </div>

                {/* Column: In Progress */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl shadow-sm">
                    <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      In Active Execution
                    </span>
                    <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                      {tasks.filter((t: any) => t.status === 'progress').length}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 min-h-[250px]">
                    {tasks.filter((t: any) => t.status === 'progress').map((task: any) => (
                      <div key={task.id} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col gap-2.5 hover:border-slate-300 transition">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider font-mono">{task.category}</span>
                            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                              task.priority === 'high' ? 'bg-red-50 text-red-700' : task.priority === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-slate-50 text-slate-500'
                            }`}>{task.priority}</span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-900 mt-1">{task.title}</h4>
                        </div>
                        
                        <div className="flex justify-between items-center border-t border-slate-100 pt-2.5 mt-1.5">
                          <button 
                            id={`btn-move-task-backlog-${task.id}`}
                            onClick={() => moveTask(task.id, 'backlog')}
                            className="px-2 py-1 hover:bg-slate-100 text-slate-500 rounded text-[10px] font-medium transition"
                          >
                            Defer
                          </button>
                          <button 
                            id={`btn-move-task-done-${task.id}`}
                            onClick={() => moveTask(task.id, 'done')}
                            className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded text-[10px] font-bold transition flex items-center gap-0.5"
                          >
                            Complete
                            <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {tasks.filter((t: any) => t.status === 'progress').length === 0 && (
                      <div className="border border-dashed border-slate-200 rounded-xl py-8 text-center text-xs text-slate-400 bg-slate-50/20">Empty column</div>
                    )}
                  </div>
                </div>

                {/* Column: Done */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl shadow-sm">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Completed Milestones
                    </span>
                    <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full">
                      {tasks.filter((t: any) => t.status === 'done').length}
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 min-h-[250px]">
                    {tasks.filter((t: any) => t.status === 'done').map((task: any) => (
                      <div key={task.id} className="bg-white border border-slate-200/70 p-4 rounded-xl shadow-sm flex flex-col gap-2.5 opacity-80 hover:opacity-100 transition">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider font-mono">{task.category}</span>
                            <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded uppercase">SOLVED</span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-700 line-through mt-1">{task.title}</h4>
                        </div>
                        
                        <div className="flex justify-between items-center border-t border-slate-100 pt-2.5 mt-1.5">
                          <button 
                            id={`btn-del-task-done-${task.id}`}
                            onClick={() => deleteTask(task.id)}
                            className="text-slate-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            id={`btn-reopen-task-${task.id}`}
                            onClick={() => moveTask(task.id, 'progress')}
                            className="px-2 py-1 hover:bg-slate-100 text-slate-500 rounded text-[10px] font-medium transition"
                          >
                            Re-open
                          </button>
                        </div>
                      </div>
                    ))}
                    {tasks.filter((t: any) => t.status === 'done').length === 0 && (
                      <div className="border border-dashed border-slate-200 rounded-xl py-8 text-center text-xs text-slate-400 bg-slate-50/20">Empty column</div>
                    )}
                  </div>
                </div>

              </div>
            </section>
          )}

        </main>

      </div>

      {/* Modern Humble Margin footer */}
      <footer id="companion-footer" className="bg-white border-t border-slate-200/80 px-6 py-4 mt-12 text-center text-xs text-slate-400 font-medium">
        <p>© {new Date().getFullYear()} AI Studio Developer Companion • Clean Architectural Design • Offline Local-Persistence Sandbox</p>
      </footer>

    </div>
  );
}

import { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  useNodesState, 
  useEdgesState, 
  Handle, 
  Position, 
  ConnectionMode, 
  MarkerType, 
  useReactFlow, 
  ReactFlowProvider 
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ChevronLeft, BookOpen, Clock, Star, Trophy, ExternalLink, ArrowRight, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { cn } from '../utils/cn';

// --- High Fidelity Data Structure ---
const ROADMAP_DATA: any = {
  frontend: [
    {
      id: 'internet',
      label: 'Internet',
      type: 'main',
      level: 1,
      time: '45m',
      rating: 4.8,
      materialId: 1,
      description: 'The foundation of the web.',
      children: [
        { id: 'how-works', label: 'How does the internet work?', description: 'Overview of protocols, routers, and IP.' },
        { id: 'what-http', label: 'What is HTTP?', description: 'Understanding request/response cycle.' },
        { id: 'dns-works', label: 'DNS and how it works', description: 'Domain name system fundamentals.' },
      ]
    },
    {
      id: 'html',
      label: 'HTML',
      type: 'main',
      level: 2,
      time: '1h',
      rating: 4.9,
      materialId: 2,
      description: 'Structure of the web.',
      children: [
        { id: 'html-basics', label: 'Learn the basics', description: 'Tags, attributes, and elements.' },
        { id: 'semantic-html', label: 'Semantic HTML', description: 'Using the right tags for the right job.' },
        { id: 'forms-val', label: 'Forms and Validations', description: 'Collecting user input safely.' },
      ]
    },
    {
      id: 'css',
      label: 'CSS',
      type: 'main',
      level: 3,
      time: '2h',
      rating: 4.7,
      materialId: 3,
      description: 'Styling the web.',
      children: [
        { id: 'css-basics', label: 'Learn the basics', description: 'Selectors and box model.' },
        { id: 'layouts', label: 'Making Layouts', description: 'Flexbox and Grid.' },
        { id: 'responsive', label: 'Responsive Design', description: 'Media queries.' },
      ]
    }
  ],
  backend: [
    {
      id: 'internet-backend',
      label: 'Internet',
      type: 'main',
      level: 1,
      time: '45m',
      rating: 4.8,
      materialId: 4,
      description: 'How nodes communicate globally.',
      children: [
        { id: 'http-backend', label: 'HTTP/HTTPS', description: 'Request protocols.' },
        { id: 'dns-backend', label: 'DNS', description: 'Domain resolve system.' },
        { id: 'browsers-backend', label: 'Browsers', description: 'Client-side behavior.' },
      ]
    },
    {
      id: 'languages-backend',
      label: 'Languages',
      type: 'main',
      level: 2,
      time: '3h',
      rating: 4.9,
      materialId: 5,
      description: 'Server-side logic.',
      children: [
        { id: 'nodejs', label: 'Node.js', description: 'JavaScript runtime.' },
        { id: 'python', label: 'Python', description: 'Versatile scripting.' },
        { id: 'java-backend', label: 'Java', description: 'Enterprise standard.' },
      ]
    },
    {
      id: 'databases',
      label: 'Databases',
      type: 'main',
      level: 3,
      time: '4h',
      rating: 4.6,
      materialId: 6,
      description: 'Persistent data storage.',
      children: [
        { id: 'postgresql', label: 'PostgreSQL', description: 'Relational database.' },
        { id: 'mongodb', label: 'MongoDB', description: 'Document store.' },
        { id: 'redis', label: 'Redis', description: 'In-memory cache.' },
      ]
    }
  ]
};

// --- Custom Node Component (Card Style matching image) ---
const RoadmapNode = ({ data }: any) => {
  const isMain = data.type === 'main';
  
  if (isMain) {
    return (
      <div className={cn(
        "relative w-72 p-6 rounded-[2rem] border bg-[#0f172a]/95 backdrop-blur-xl transition-all duration-300 group shadow-2xl",
        data.isCompleted ? "border-emerald-500/50 shadow-emerald-500/10" : "border-white/10 hover:border-orange-500/50",
        data.selected ? "ring-2 ring-orange-500 ring-offset-4 ring-offset-slate-950" : ""
      )}>
        <Handle type="target" position={Position.Top} className="opacity-0" />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className={cn("text-[9px] font-black tracking-widest px-3 py-1 uppercase border-none", data.isCompleted ? "bg-emerald-500/10 text-emerald-400" : "bg-orange-500/20 text-orange-400")}>
              Level {data.level}
            </Badge>
            {data.isCompleted ? <Trophy size={16} className="text-emerald-400" /> : <Plus size={16} className="text-slate-500" />}
          </div>
          
          <div className="space-y-1">
            <h3 className="text-lg font-black text-white leading-tight">{data.label}</h3>
            <p className="text-xs text-slate-500 font-medium line-clamp-2">{data.description}</p>
          </div>
          
          <div className="flex items-center gap-4 pt-2 border-t border-white/5">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
              <Clock size={12} className="text-slate-500" /> {data.time}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
              <Star size={12} className="text-amber-500" /> {data.rating || '4.8'}
            </div>
          </div>
        </div>

        <Handle type="source" position={Position.Bottom} className="opacity-0" />
        <Handle type="source" position={Position.Right} id="right" className="opacity-0" />
      </div>
    );
  }

  // Sub-node (Topic)
  return (
    <div className={cn(
      "w-60 p-4 rounded-2xl border bg-slate-800/40 backdrop-blur-md transition-all duration-300 group shadow-lg",
      "border-white/5 hover:border-blue-500/50",
      data.selected ? "ring-2 ring-blue-500 ring-offset-4 ring-offset-slate-950" : ""
    )}>
      <Handle type="target" position={Position.Left} className="opacity-0" />
      
      <div className="space-y-2">
        <Badge variant="outline" className="text-[8px] font-black tracking-widest bg-blue-500/10 text-blue-400 border-blue-500/20 px-2 py-0.5 uppercase">
          Topic
        </Badge>
        <div className="space-y-1">
          <h4 className="text-xs font-black text-white">{data.label}</h4>
          <p className="text-[10px] text-slate-500 line-clamp-1">{data.description}</p>
        </div>
      </div>
      
      <Handle type="source" position={Position.Right} className="opacity-0" />
    </div>
  );
};

const nodeTypes = { roadmapNode: RoadmapNode };

const RoadmapContent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const roadmapData = useMemo(() => ROADMAP_DATA[id || 'frontend'] || [], [id]);

  useEffect(() => {
    const newNodes: any[] = [];
    const newEdges: any[] = [];
    let currentY = 50;
    const spineX = 400;

    roadmapData.forEach((section: any, idx: number) => {
      const mainId = section.id;
      const isCompleted = idx < 2;

      // Main Node
      newNodes.push({
        id: mainId,
        type: 'roadmapNode',
        position: { x: spineX, y: currentY },
        data: { ...section, isCompleted },
      });

      // Branching children
      if (section.children) {
        section.children.forEach((child: any, cIdx: number) => {
          const childId = child.id;
          const childX = spineX + 350;
          const childY = currentY + (cIdx * 100) - ((section.children.length - 1) * 50);
          
          newNodes.push({
            id: childId,
            type: 'roadmapNode',
            position: { x: childX, y: childY },
            data: { ...child, isSub: true },
          });

          newEdges.push({
            id: `e-${mainId}-${childId}`,
            source: mainId,
            target: childId,
            sourceHandle: 'right',
            type: 'smoothstep',
            style: { stroke: '#3b82f6', strokeWidth: 2, strokeDasharray: '4,4' },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6', size: 14 }
          });
        });

        currentY += Math.max(250, section.children.length * 100);
      } else {
        currentY += 250;
      }

      // Connectivity for the main spine
      if (idx < roadmapData.length - 1) {
        const nextId = roadmapData[idx + 1].id;
        newEdges.push({
          id: `spine-${mainId}-${nextId}`,
          source: mainId,
          target: nextId,
          type: 'smoothstep',
          style: { stroke: isCompleted ? '#10b981' : '#f97316', strokeWidth: 4 },
          markerEnd: { type: MarkerType.ArrowClosed, color: isCompleted ? '#10b981' : '#f97316' }
        });
      }
    });

    setNodes(newNodes);
    setEdges(newEdges);
    
    setTimeout(() => fitView({ padding: 0.2, duration: 800 }), 100);
  }, [roadmapData, id, fitView]);

  const onNodeClick = useCallback((_: any, node: any) => setSelectedNode(node), []);

  const handleStudyNavigation = () => {
    if (selectedNode?.data?.materialId) {
      navigate(`/materials/${selectedNode.data.materialId}`);
    } else {
      // Fallback: Navigate to materials list or provide feedback
      navigate('/materials');
    }
  };

  return (
    <div className="h-screen w-full bg-[#020617] flex flex-col overflow-hidden">
      <header className="px-6 py-4 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md z-20">
        <div className="flex items-center justify-between max-w-[1800px] mx-auto w-full">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/roadmaps')} 
              className="group p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 hover:bg-orange-500/10 text-slate-400 hover:text-orange-500 transition-all shadow-lg"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <div className="space-y-1">
              <h1 className="text-2xl font-black text-white uppercase tracking-tighter leading-none flex items-center gap-3">
                {id || 'Frontend'}
              </h1>
              <div className="flex items-center gap-3">
                <Badge className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 border-none shadow-[0_0_15px_rgba(249,115,22,0.3)]">Step 3 of 4</Badge>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">35% Achievement</span>
              </div>
            </div>
          </div>
          <Button 
            onClick={() => fitView({ nodes: [nodes.find((n: any) => !n.data.isCompleted)] as any, duration: 800, padding: 0.5 })}
            className="rounded-2xl px-8 font-black uppercase text-xs tracking-widest h-12 bg-orange-600 hover:bg-orange-500 text-white shadow-[0_0_30px_rgba(234,88,12,0.3)] border-none transition-all active:scale-95"
          >
            Resume Learning
          </Button>
        </div>
      </header>

      <main className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.5 }}
          minZoom={0.1}
          maxZoom={1.5}
          connectionMode={ConnectionMode.Loose}
        >
          <Background color="#1e293b" gap={40} size={1} />
          <Controls className="bg-slate-900 border-white/10 rounded-xl overflow-hidden shadow-2xl scale-90 origin-bottom-left" />
        </ReactFlow>

        <AnimatePresence>
          {selectedNode && (
            <motion.aside 
              initial={{ x: 400 }} 
              animate={{ x: 0 }} 
              exit={{ x: 400 }} 
              className="absolute right-6 top-6 bottom-6 w-[420px] bg-[#0f172a]/90 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 z-30 shadow-2xl flex flex-col"
            >
              <button 
                onClick={() => setSelectedNode(null)} 
                className="absolute top-10 right-10 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-500 hover:text-white transition-all shadow-inner"
              >
                <Plus className="rotate-45" size={24} />
              </button>
              
              <div className="flex-1 space-y-10 overflow-y-auto pr-2 custom-scrollbar mt-6">
                <div className="space-y-4">
                  <Badge variant="outline" className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1 border-none", selectedNode.data.isCompleted ? "bg-emerald-500/10 text-emerald-400" : "bg-orange-500/10 text-orange-400")}>
                    {selectedNode.data.isSub ? 'Sub-topic' : `Level ${selectedNode.data.level || '?'}`}
                  </Badge>
                  <h2 className="text-3xl font-black text-white leading-tight tracking-tight">{selectedNode.data.label}</h2>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">
                    {selectedNode.data.description || "Master the core concepts of this fundamental web technology through interactive exercises and deep-dive documentation."}
                  </p>
                </div>

                <section className="space-y-5">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                     Mastery Requirements
                   </h4>
                   <ul className="space-y-4">
                      {['Read documentation', 'Complete 5 exercises', 'Quiz score > 80%'].map((item, i) => (
                        <li key={i} className="flex items-center gap-4 text-sm text-slate-300 font-bold group cursor-default">
                          <div className="w-2 h-2 rounded-full border border-orange-500/50 group-hover:bg-orange-500 transition-all" />
                          {item}
                        </li>
                      ))}
                   </ul>
                </section>

                <div className="grid grid-cols-2 gap-5">
                  <div className="p-6 rounded-3xl bg-slate-800/40 border border-white/5 space-y-2 group hover:bg-slate-800/60 transition-colors">
                     <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Duration</p>
                     <div className="flex items-center gap-2">
                        <Clock size={16} className="text-slate-400" />
                        <p className="text-white font-black text-2xl">{selectedNode.data.time || '30m'}</p>
                     </div>
                  </div>
                  <div className="p-6 rounded-3xl bg-slate-800/40 border border-white/5 space-y-2 group hover:bg-slate-800/60 transition-colors">
                     <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Status</p>
                     <div className="flex items-center gap-2">
                        <Star size={16} className={cn(selectedNode.data.isCompleted ? "text-emerald-400" : "text-amber-400")} />
                        <p className={cn("font-black text-2xl uppercase tracking-tighter", selectedNode.data.isCompleted ? "text-emerald-400" : "text-amber-400")}>
                          {selectedNode.data.isCompleted ? 'Done' : 'Pending'}
                        </p>
                     </div>
                  </div>
                </div>

                <section className="space-y-5">
                  <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                    <BookOpen size={18} className="text-orange-500" /> Related Topics
                  </h3>
                  <div className="space-y-3">
                    {['Core Logic', 'Best Practices', 'Real-world Usage', 'Common Patterns'].map(topic => (
                      <button 
                        key={topic} 
                        onClick={handleStudyNavigation}
                        className="w-full px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between group cursor-pointer hover:bg-orange-500/10 hover:border-orange-500/30 transition-all text-left"
                      >
                        <span className="text-sm text-slate-300 font-bold group-hover:text-white transition-colors">{topic}</span>
                        <ArrowRight size={18} className="text-slate-600 group-hover:translate-x-1 group-hover:text-orange-500 transition-all" />
                      </button>
                    ))}
                  </div>
                </section>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <Button 
                  onClick={handleStudyNavigation}
                  className="w-full rounded-[2.2rem] py-8 font-black uppercase text-sm tracking-widest bg-orange-600 hover:bg-orange-500 text-white shadow-[0_0_30px_rgba(234,88,12,0.3)] border-none transition-all active:scale-[0.98] flex gap-3 h-auto"
                >
                   View Study Material <Plus className="rotate-0" size={20} />
                </Button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export const RoadmapDetail = () => (
  <ReactFlowProvider>
    <RoadmapContent />
  </ReactFlowProvider>
);

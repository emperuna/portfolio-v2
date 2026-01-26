import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ServiceMesh({ trafficLevel = 'low' }: { trafficLevel?: 'low' | 'high' }) {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Mock Architecture Data
    const nodes = [
        { id: 'user', label: 'USER', x: 50, y: 50, type: 'source', stats: { latency: 'N/A', status: 'Active' } },
        { id: 'cdn', label: 'CLOUDFLARE', x: 250, y: 50, type: 'infra', stats: { latency: '12ms', status: 'Cached' } },
        { id: 'lb', label: 'LOAD BALANCER', x: 450, y: 50, type: 'infra', stats: { latency: '2ms', status: 'Healthy' } },
        { id: 'fe', label: 'FRONTEND', x: 650, y: 50, type: 'service', stats: { latency: '24ms', uptime: '99.9%' } },
        { id: 'api', label: 'API GATEWAY', x: 650, y: 150, type: 'service', stats: { latency: '45ms', requests: '1.2k/s' } },
        { id: 'db', label: 'PRIMARY DB', x: 850, y: 150, type: 'db', stats: { latency: '5ms', connections: '420' } },
        { id: 'cache', label: 'REDIS', x: 850, y: 50, type: 'db', stats: { latency: '<1ms', hits: '94%' } },
    ];

    const edges = [
        { from: 'user', to: 'cdn' },
        { from: 'cdn', to: 'lb' },
        { from: 'lb', to: 'fe' },
        { from: 'fe', to: 'api' },
        { from: 'fe', to: 'cache' },
        { from: 'api', to: 'db' },
    ];

    // Responsive scaling (simplified)
    const viewBox = "0 0 1000 300";
    
    // Animation Speed: High Traffic = Faster (0.5s), Low = Slower (1.5s base)
    const speedFactor = trafficLevel === 'high' ? 0.3 : 1;

    return (
        <div className="w-full h-full flex items-center justify-center p-4 relative">
            <svg className="w-full h-full max-w-[800px]" viewBox={viewBox} overflow="visible">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#34d399" fillOpacity="0.5" />
                    </marker>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Edges */}
                {edges.map((edge, i) => {
                    const start = nodes.find(n => n.id === edge.from)!;
                    const end = nodes.find(n => n.id === edge.to)!;
                    const duration = (1 + i * 0.2) * speedFactor;
                    const begin = (i * 0.5) * speedFactor;

                    return (
                        <g key={`${edge.from}-${edge.to}`}>
                            <line 
                                x1={start.x} y1={start.y} 
                                x2={end.x} y2={end.y} 
                                stroke="rgba(52, 211, 153, 0.2)" 
                                strokeWidth="2"
                                markerEnd="url(#arrowhead)"
                            />
                            {/* Animated Packet */}
                            <motion.circle 
                                r="4" 
                                fill={trafficLevel === 'high' ? '#fbbf24' : '#34d399'} 
                                filter="url(#glow)"
                            >
                                <motion.animate 
                                    attributeName="cx"
                                    from={start.x}
                                    to={end.x}
                                    dur={`${duration}s`}
                                    repeatCount="indefinite"
                                    begin={`${begin}s`}
                                />
                                <motion.animate 
                                    attributeName="cy"
                                    from={start.y}
                                    to={end.y}
                                    dur={`${duration}s`}
                                    repeatCount="indefinite"
                                    begin={`${begin}s`}
                                />
                                <motion.animate 
                                    attributeName="opacity"
                                    values="0;1;0"
                                    dur={`${duration}s`}
                                    repeatCount="indefinite"
                                    begin={`${begin}s`}
                                />
                            </motion.circle>
                        </g>
                    );
                })}

                {/* Nodes */}
                {nodes.map((node) => (
                    <g 
                        key={node.id} 
                        className="cursor-pointer group"
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                    >
                        <circle 
                            cx={node.x} 
                            cy={node.y} 
                            r={node.type === 'user' ? 8 : 16} 
                            fill={node.type === 'db' ? '#3b82f6' : node.type === 'user' ? '#ffffff' : '#10b981'}
                            fillOpacity="0.1"
                            stroke={node.type === 'db' ? '#3b82f6' : node.type === 'user' ? '#ffffff' : '#10b981'}
                            strokeWidth="2"
                            className="transition-all duration-300 group-hover:stroke-white group-hover:fill-white/20"
                        />
                         {/* Hover Glow Ring */}
                        {hoveredNode === node.id && (
                            <motion.circle
                                initial={{ r: node.type === 'user' ? 8 : 16, opacity: 0.5 }}
                                animate={{ r: (node.type === 'user' ? 8 : 16) + 10, opacity: 0 }}
                                transition={{ duration: 1, repeat: Infinity }}
                                cx={node.x}
                                cy={node.y}
                                fill="none"
                                stroke={node.type === 'db' ? '#3b82f6' : '#10b981'}
                                strokeWidth="1"
                            />
                        )}
                        <rect 
                            x={node.x - 40} 
                            y={node.y + 20} 
                            width="80" 
                            height="20" 
                            fill="rgba(0,0,0,0.5)" 
                            rx="4"
                        />
                        <text 
                            x={node.x} 
                            y={node.y + 34} 
                            textAnchor="middle" 
                            fill="#a7f3d0" 
                            fontSize="10" 
                            fontFamily="monospace"
                        >
                            {node.label}
                        </text>
                    </g>
                ))}
            </svg>

            {/* Tooltip Overlay */}
            <AnimatePresence>
                {hoveredNode &&(() => {
                    const node = nodes.find(n => n.id === hoveredNode);
                    if (!node) return null;
                    
                    // Convert SVG coordinates to roughly % or px for the overlay
                    // Note: This is a simplified positioning. In a real app we might use a library or getBoundingClientRect.
                    // Since viewBox is 0-1000, and we are centered, we can approximate percentages.
                    const leftIds = ['user', 'cdn', 'lb'];
                    const isLeft = leftIds.includes(node.id);

                    return (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className="absolute z-20 bg-black/80 backdrop-blur-md border border-primary/30 p-3 rounded shadow-xl text-xs font-mono pointer-events-none"
                            style={{
                                top: `${(node.y / 300) * 100}%`, 
                                left: `${(node.x / 1000) * 100}%`,
                                transform: 'translate(-50%, -150%)', // Default above
                                marginTop: '-40px'
                            }}
                        >
                            <div className="font-bold text-white mb-1 border-b border-primary/20 pb-1 flex justify-between gap-4">
                                <span>{node.label}</span>
                                <div className={`w-2 h-2 rounded-full ${node.id === 'db' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
                            </div>
                            <div className="space-y-1 text-primary/80">
                                {Object.entries(node.stats).map(([key, value]) => (
                                    <div key={key} className="flex justify-between gap-4">
                                        <span className="uppercase text-primary/50">{key}:</span>
                                        <span className="text-white">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    );
                })()}
            </AnimatePresence>
        </div>
    );
}

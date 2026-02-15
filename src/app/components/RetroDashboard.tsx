import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import RetroAIModal from "./RetroAIModal";

const initialCases = [
  {
    id: 1,
    name: "LUNA",
    type: "DOG",
    sprite: "🐕",
    owner: "SOMCHAI",
    severity: "critical",
    symptoms: ["PALE GUMS", "GASPING", "SEIZURE"],
    heartRate: 180,
    hp: 15,
    maxHp: 100,
    level: 3,
    waitTime: 2,
  },
  {
    id: 2,
    name: "MOCHI",
    type: "CAT",
    sprite: "🐈",
    owner: "WANNA",
    severity: "urgent",
    symptoms: ["VOMIT", "NO EAT"],
    heartRate: 140,
    hp: 45,
    maxHp: 100,
    level: 5,
    waitTime: 5,
  },
  {
    id: 3,
    name: "COOKIE",
    type: "RABBIT",
    sprite: "🐰",
    owner: "PREECHA",
    severity: "stable",
    symptoms: ["CHECKUP"],
    heartRate: 200,
    hp: 85,
    maxHp: 100,
    level: 2,
    waitTime: 15,
  },
  {
    id: 4,
    name: "MAX",
    type: "DOG",
    sprite: "🐕",
    owner: "SUDA",
    severity: "urgent",
    symptoms: ["DIARRHEA"],
    heartRate: 120,
    hp: 55,
    maxHp: 100,
    level: 4,
    waitTime: 8,
  },
];

export default function RetroDashboard() {
  const [cases, setCases] = useState(initialCases);
  const [selectedCase, setSelectedCase] = useState<typeof initialCases[0] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newAlert, setNewAlert] = useState(false);
  const [animFrame, setAnimFrame] = useState(0);

  // Sprite animation frame
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimFrame(prev => (prev + 1) % 2);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Alert animation
  useEffect(() => {
    const interval = setInterval(() => {
      setNewAlert(true);
      setTimeout(() => setNewAlert(false), 2000);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "#FF6B6B";
      case "urgent": return "#FFD93D";
      case "stable": return "#6BCF7F";
      default: return "#FFFFFF";
    }
  };

  const criticalCount = cases.filter(c => c.severity === "critical").length;
  const urgentCount = cases.filter(c => c.severity === "urgent").length;
  const stableCount = cases.filter(c => c.severity === "stable").length;

  return (
    <div className="space-y-4">
      {/* Title Screen Style Header */}
      <div className="text-center mb-6">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            textShadow: [
              '0 0 10px rgba(255, 215, 0, 0.5)',
              '0 0 20px rgba(255, 215, 0, 0.8)',
              '0 0 10px rgba(255, 215, 0, 0.5)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="retro-text text-[#FFD700] text-xl mb-2"
        >
          ♥ HEARTBEAT COMMAND ♥
        </motion.div>
        <div className="retro-text text-[#FF69B4] text-[10px]">
          EMERGENCY TRIAGE CONTROL SYSTEM
        </div>
      </div>

      {/* Alert Box - Like Final Fantasy */}
      <AnimatePresence>
        {newAlert && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-[#FF6B6B] pixel-border border-[#FFD700] p-3 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: [-100, 300] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <div className="relative retro-text text-white text-[10px] text-center flex items-center justify-center gap-3">
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                ⚠
              </motion.span>
              NEW PATIENT ARRIVED!
              <motion.span
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                ⚠
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Priority Queue - RPG Style List */}
        <div className="lg:col-span-2 space-y-3">
          <div className="bg-black/50 pixel-border border-[#00FF00] p-2">
            <div className="retro-text text-[#00FF00] text-[10px] mb-3 flex items-center gap-2">
              <span className="animate-pulse">▶</span>
              PRIORITY QUEUE
            </div>

            <div className="space-y-2">
              {cases
                .sort((a, b) => {
                  const order = { critical: 0, urgent: 1, stable: 2 };
                  return order[a.severity as keyof typeof order] - order[b.severity as keyof typeof order];
                })
                .map((caseItem, index) => (
                  <motion.div
                    key={caseItem.id}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-[#1A0033] to-[#2D1B4E] pixel-border p-3 relative overflow-hidden cursor-pointer hover:from-[#2D1B4E] hover:to-[#4A148C] transition-all"
                    style={{
                      borderColor: getSeverityColor(caseItem.severity),
                      boxShadow: `0 0 15px ${getSeverityColor(caseItem.severity)}88, 4px 4px 0px rgba(0,0,0,0.5)`
                    }}
                    onClick={() => {
                      setSelectedCase(caseItem);
                      setShowModal(true);
                    }}
                  >
                    {/* Animated Background Pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-10"
                      animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
                        backgroundSize: '200% 200%'
                      }}
                    />

                    <div className="relative flex items-start gap-4">
                      {/* Animated Sprite */}
                      <div className="relative">
                        <motion.div
                          animate={{ 
                            y: caseItem.severity === "critical" ? [0, -4, 0] : [0, -2, 0],
                            rotate: animFrame === 0 ? -5 : 5
                          }}
                          transition={{ duration: 0.5 }}
                          className="text-5xl pixel-border bg-black/50 w-16 h-16 flex items-center justify-center"
                          style={{ 
                            borderColor: getSeverityColor(caseItem.severity),
                            imageRendering: 'pixelated'
                          }}
                        >
                          {caseItem.sprite}
                        </motion.div>
                        {/* Level Badge */}
                        <div 
                          className="absolute -bottom-1 -right-1 bg-[#FFD700] pixel-border border-black px-2 py-1"
                          style={{ boxShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
                        >
                          <span className="retro-text text-black text-[8px]">Lv{caseItem.level}</span>
                        </div>
                      </div>

                      {/* Info Section - Like Pokemon/Dragon Quest */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="retro-text text-white text-[12px] mb-1">
                              {caseItem.name}
                            </div>
                            <div className="retro-text text-[#B388FF] text-[8px]">
                              OWNER: {caseItem.owner}
                            </div>
                          </div>
                          
                          {/* Severity Badge */}
                          <motion.div
                            animate={{ 
                              scale: caseItem.severity === "critical" ? [1, 1.2, 1] : [1],
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="pixel-border px-2 py-1"
                            style={{
                              backgroundColor: getSeverityColor(caseItem.severity),
                              borderColor: '#000',
                              boxShadow: `0 0 10px ${getSeverityColor(caseItem.severity)}`
                            }}
                          >
                            <span className="retro-text text-black text-[8px]">
                              {caseItem.severity.toUpperCase()}
                            </span>
                          </motion.div>
                        </div>

                        {/* HP Bar - RPG Style */}
                        <div className="mb-2">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="retro-text text-[#FF6B9D] text-[8px]">HP</span>
                            <div className="flex-1 h-3 bg-black pixel-border border-white relative">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(caseItem.hp / caseItem.maxHp) * 100}%` }}
                                className="h-full"
                                style={{
                                  background: caseItem.hp < 30 
                                    ? 'linear-gradient(90deg, #FF6B6B, #FF1744)' 
                                    : caseItem.hp < 60
                                    ? 'linear-gradient(90deg, #FFD93D, #FFC107)'
                                    : 'linear-gradient(90deg, #6BCF7F, #00E676)'
                                }}
                              />
                              {caseItem.hp < 30 && (
                                <motion.div
                                  className="absolute inset-0"
                                  animate={{ opacity: [0, 0.5, 0] }}
                                  transition={{ duration: 0.5, repeat: Infinity }}
                                  style={{ backgroundColor: '#FF0000' }}
                                />
                              )}
                            </div>
                            <span className="retro-text text-white text-[8px]">
                              {caseItem.hp}/{caseItem.maxHp}
                            </span>
                          </div>
                        </div>

                        {/* Status Effects - Like Pokemon */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {caseItem.symptoms.map((symptom, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 + idx * 0.05 }}
                              className="bg-black/70 pixel-border border-[#FFD700] px-2 py-1"
                            >
                              <span className="retro-text text-[#FFD700] text-[7px]">
                                {symptom}
                              </span>
                            </motion.span>
                          ))}
                        </div>

                        {/* Stats Row */}
                        <div className="flex gap-3">
                          <div className="retro-text text-[#00FF00] text-[8px]">
                            <span className="text-white">♥</span> {caseItem.heartRate}
                          </div>
                          <div className="retro-text text-[#FFD700] text-[8px]">
                            <span className="text-white">⏰</span> {caseItem.waitTime}m
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-3 w-full bg-[#7E57C2] pixel-border border-[#B388FF] py-2 hover:bg-[#9575CD] transition-colors"
                      style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                    >
                      <span className="retro-text text-white text-[8px]">
                        ▶ EXAMINE
                      </span>
                    </motion.button>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>

        {/* Stats Panel - Like Game UI */}
        <div className="space-y-3">
          {/* Radar Chart Style Display */}
          <div className="bg-black/50 pixel-border border-[#FF69B4] p-3 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-full h-full"
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-full h-[2px] bg-[#FF69B4] origin-left"
                    style={{ transform: `rotate(${i * 45}deg)` }}
                  />
                ))}
              </motion.div>
            </div>

            <div className="relative">
              <div className="retro-text text-[#FF69B4] text-[10px] mb-3 text-center">
                STATUS MONITOR
              </div>

              {/* Pie Chart Pixel Art Style */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg viewBox="0 0 100 100" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
                  {/* Critical Slice */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1 }}
                    d={`M 50 50 L 50 10 A 40 40 0 ${criticalCount > 2 ? 1 : 0} 1 ${50 + 40 * Math.cos(2 * Math.PI * criticalCount / cases.length - Math.PI/2)} ${50 + 40 * Math.sin(2 * Math.PI * criticalCount / cases.length - Math.PI/2)} Z`}
                    fill="#FF6B6B"
                    stroke="#000"
                    strokeWidth="2"
                  />
                  {/* Urgent Slice */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    d={`M 50 50 L ${50 + 40 * Math.cos(2 * Math.PI * criticalCount / cases.length - Math.PI/2)} ${50 + 40 * Math.sin(2 * Math.PI * criticalCount / cases.length - Math.PI/2)} A 40 40 0 ${urgentCount > 2 ? 1 : 0} 1 ${50 + 40 * Math.cos(2 * Math.PI * (criticalCount + urgentCount) / cases.length - Math.PI/2)} ${50 + 40 * Math.sin(2 * Math.PI * (criticalCount + urgentCount) / cases.length - Math.PI/2)} Z`}
                    fill="#FFD93D"
                    stroke="#000"
                    strokeWidth="2"
                  />
                  {/* Stable Slice */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    d={`M 50 50 L ${50 + 40 * Math.cos(2 * Math.PI * (criticalCount + urgentCount) / cases.length - Math.PI/2)} ${50 + 40 * Math.sin(2 * Math.PI * (criticalCount + urgentCount) / cases.length - Math.PI/2)} A 40 40 0 ${stableCount > 2 ? 1 : 0} 1 50 10 Z`}
                    fill="#6BCF7F"
                    stroke="#000"
                    strokeWidth="2"
                  />
                  {/* Center Circle */}
                  <circle cx="50" cy="50" r="15" fill="#1A0033" stroke="#FFD700" strokeWidth="2" />
                  <text x="50" y="55" textAnchor="middle" fill="#FFD700" fontSize="12" fontFamily="Press Start 2P">
                    {cases.length}
                  </text>
                </svg>
              </div>

              {/* Legend */}
              <div className="space-y-2">
                {[
                  { label: "CRITICAL", count: criticalCount, color: "#FF6B6B" },
                  { label: "URGENT", count: urgentCount, color: "#FFD93D" },
                  { label: "STABLE", count: stableCount, color: "#6BCF7F" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 pixel-border border-black"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="retro-text text-white text-[8px]">
                        {item.label}
                      </span>
                    </div>
                    <span className="retro-text text-[8px]" style={{ color: item.color }}>
                      {item.count}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* High Score Style Stats */}
          <div className="bg-gradient-to-b from-[#4A148C] to-[#7B1FA2] pixel-border border-[#FFD700] p-3">
            <div className="retro-text text-[#FFD700] text-[10px] mb-3 text-center">
              ★ TODAY'S RECORDS ★
            </div>
            <div className="space-y-2">
              {[
                { label: "TOTAL CASES", value: cases.length, icon: "▣" },
                { label: "AVG WAIT", value: "5 MIN", icon: "⏰" },
                { label: "AI SCORE", value: "96%", icon: "★" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 + idx * 0.1, type: "spring" }}
                  className="bg-black/50 pixel-border border-[#00FF00] p-2 flex justify-between items-center"
                >
                  <span className="retro-text text-[#00FF00] text-[8px]">
                    {stat.icon} {stat.label}
                  </span>
                  <span className="retro-text text-white text-[8px]">
                    {stat.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Blinking Press Start Style Message */}
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="bg-black/70 pixel-border border-white p-3 text-center"
          >
            <div className="retro-text text-white text-[8px]">
              PRESS EXAMINE TO<br/>VIEW DETAILS
            </div>
          </motion.div>
        </div>
      </div>

      {/* AI Modal */}
      <RetroAIModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        caseData={selectedCase}
      />
    </div>
  );
}

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface RetroAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: any;
}

export default function RetroAIModal({ isOpen, onClose, caseData }: RetroAIModalProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [showText, setShowText] = useState(false);
  const [rotateAngle, setRotateAngle] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setShowText(true);
      setTextIndex(0);
    }
  }, [isOpen]);

  if (!caseData) return null;

  const aiMessage = caseData.severity === "critical"
    ? "CRITICAL! OXYGEN NEEDED!\nSHOCK DETECTED!\nIV FLUID REQUIRED!"
    : caseData.severity === "urgent"
    ? "URGENT CARE NEEDED!\nMONITOR VITALS!\nBLOOD TEST REQUIRED!"
    : "STABLE CONDITION\nROUTINE CHECKUP\nNO EMERGENCY";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
          onClick={onClose}
        >
          {/* CRT Effect Overlay */}
          <div className="absolute inset-0 scanlines pointer-events-none" />

          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full"
          >
            {/* Window Border - Like SNES Dialog */}
            <div className="bg-gradient-to-b from-[#4A148C] to-[#7B1FA2] pixel-border border-[#FFD700] p-2 crt-glow">
              {/* Title Bar */}
              <div className="bg-[#2D1B4E] pixel-border border-[#B388FF] p-2 mb-2 flex items-center justify-between">
                <div className="retro-text text-[#FFD700] text-[10px] flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    ⚙
                  </motion.span>
                  AI ANALYSIS SYSTEM
                </div>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="bg-[#FF6B6B] pixel-border border-black px-2 py-1"
                >
                  <span className="retro-text text-white text-[8px]">X</span>
                </motion.button>
              </div>

              {/* Main Content */}
              <div className="bg-black p-4 space-y-4">
                {/* Patient Sprite Display - Like Pokemon Battle */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Left: 3D Rotating Pet Model */}
                  <div className="bg-gradient-to-b from-[#1A0033] to-[#2D1B4E] pixel-border border-[#FF69B4] p-4">
                    <div className="retro-text text-[#FF69B4] text-[8px] mb-3 text-center">
                      PATIENT MODEL
                    </div>
                    <div 
                      className="relative h-48 flex items-center justify-center cursor-grab active:cursor-grabbing"
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        setRotateAngle((x / rect.width) * 360 - 180);
                      }}
                    >
                      {/* Isometric Grid Background */}
                      <div className="absolute inset-0 opacity-20">
                        <svg width="100%" height="100%">
                          <defs>
                            <pattern id="isoGrid" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                              <line x1="0" y1="0" x2="0" y2="20" stroke="#FF69B4" strokeWidth="1"/>
                              <line x1="0" y1="0" x2="20" y2="0" stroke="#FF69B4" strokeWidth="1"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#isoGrid)" />
                        </svg>
                      </div>

                      {/* 3D Pixelated Pet */}
                      <motion.div
                        animate={{ rotateY: rotateAngle }}
                        style={{ 
                          transformStyle: 'preserve-3d',
                          perspective: '1000px'
                        }}
                      >
                        <div className="text-8xl relative" style={{ imageRendering: 'pixelated' }}>
                          {caseData.sprite}
                          {/* Glow effect for critical */}
                          {caseData.severity === "critical" && (
                            <motion.div
                              className="absolute inset-0 blur-xl"
                              animate={{ 
                                opacity: [0.5, 1, 0.5],
                                scale: [1, 1.2, 1]
                              }}
                              transition={{ duration: 1, repeat: Infinity }}
                              style={{ backgroundColor: '#FF6B6B' }}
                            />
                          )}
                        </div>
                      </motion.div>

                      {/* Problem Areas Indicator */}
                      {caseData.severity === "critical" && (
                        <>
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute"
                              style={{
                                left: `${30 + i * 20}%`,
                                top: `${40 + Math.sin(i) * 20}%`,
                              }}
                              animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.8, 0.3, 0.8]
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.3
                              }}
                            >
                              <div className="w-6 h-6 bg-[#FF6B6B] pixel-border border-white" />
                            </motion.div>
                          ))}
                        </>
                      )}
                    </div>
                    <div className="retro-text text-center text-[#FFD700] text-[7px] mt-2">
                      DRAG TO ROTATE
                    </div>
                  </div>

                  {/* Right: Stats - Like RPG Character Screen */}
                  <div className="bg-gradient-to-b from-[#1A0033] to-[#2D1B4E] pixel-border border-[#00FF00] p-4">
                    <div className="retro-text text-[#00FF00] text-[8px] mb-3">
                      PATIENT DATA
                    </div>
                    <div className="space-y-2">
                      <div className="bg-black/50 pixel-border border-white p-2">
                        <div className="retro-text text-white text-[10px]">
                          {caseData.name}
                        </div>
                        <div className="retro-text text-[#B388FF] text-[7px]">
                          TYPE: {caseData.type}
                        </div>
                      </div>

                      {/* HP Bar */}
                      <div>
                        <div className="retro-text text-[#FF6B9D] text-[7px] mb-1">HP</div>
                        <div className="h-4 bg-black pixel-border border-white relative overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${caseData.hp}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full"
                            style={{
                              background: caseData.hp < 30 
                                ? 'linear-gradient(90deg, #FF6B6B, #FF1744)' 
                                : 'linear-gradient(90deg, #6BCF7F, #00E676)'
                            }}
                          />
                          {caseData.hp < 30 && (
                            <motion.div
                              className="absolute inset-0 bg-[#FF0000]"
                              animate={{ opacity: [0, 0.5, 0] }}
                              transition={{ duration: 0.5, repeat: Infinity }}
                            />
                          )}
                        </div>
                        <div className="retro-text text-white text-[7px] mt-1 text-right">
                          {caseData.hp} / {caseData.maxHp}
                        </div>
                      </div>

                      {/* Stats */}
                      {[
                        { label: "HEART RATE", value: `${caseData.heartRate} BPM`, icon: "♥" },
                        { label: "WAIT TIME", value: `${caseData.waitTime} MIN`, icon: "⏰" },
                        { label: "LEVEL", value: caseData.level, icon: "★" },
                      ].map((stat, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.7 + idx * 0.1 }}
                          className="flex justify-between items-center bg-black/50 pixel-border border-[#B388FF] p-2"
                        >
                          <span className="retro-text text-[#B388FF] text-[7px]">
                            {stat.icon} {stat.label}
                          </span>
                          <span className="retro-text text-white text-[7px]">
                            {stat.value}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Message Box - Like Text RPG Dialog */}
                <div className="bg-gradient-to-b from-[#1A0033] to-[#2D1B4E] pixel-border border-[#FFD700] p-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2">
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1, repeat: Infinity }
                      }}
                      className="retro-text text-[#FFD700] text-[10px]"
                    >
                      AI
                    </motion.div>
                  </div>

                  <div className="retro-text text-[#FFD700] text-[8px] mb-3">
                    DIAGNOSIS:
                  </div>

                  {/* Typewriter Effect Text */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-black p-3 pixel-border border-white"
                  >
                    <pre className="retro-text text-white text-[8px] leading-relaxed whitespace-pre-wrap">
                      {aiMessage}
                    </pre>
                  </motion.div>

                  {/* Blinking Cursor */}
                  {showText && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="retro-text text-white text-[10px] ml-1"
                    >
                      ▮
                    </motion.span>
                  )}
                </div>

                {/* MGCS Score Display - Like Fighting Game Combo Meter */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "MOTOR", score: 3, max: 6, color: "#FF6B9D" },
                    { label: "REFLEX", score: 3, max: 6, color: "#FFD93D" },
                    { label: "CONSCIOUS", score: 2, max: 6, color: "#6BCF7F" },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1 + idx * 0.1 }}
                      className="bg-black pixel-border p-2"
                      style={{ borderColor: stat.color }}
                    >
                      <div className="retro-text text-[7px] mb-2" style={{ color: stat.color }}>
                        {stat.label}
                      </div>
                      <div className="flex gap-1">
                        {[...Array(stat.max)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: i < stat.score ? 1 : 0.3 }}
                            transition={{ delay: 1.2 + idx * 0.1 + i * 0.05 }}
                            className="w-2 h-4 pixel-border border-black"
                            style={{ 
                              backgroundColor: i < stat.score ? stat.color : '#333'
                            }}
                          />
                        ))}
                      </div>
                      <div className="retro-text text-white text-[7px] mt-1 text-center">
                        {stat.score}/{stat.max}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Confidence Meter - Like Loading Bar */}
                <div className="bg-black pixel-border border-[#00FF00] p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="retro-text text-[#00FF00] text-[8px]">
                      AI CONFIDENCE
                    </span>
                    <span className="retro-text text-[#FFD700] text-[8px]">
                      {caseData.severity === "critical" ? 95 : caseData.severity === "urgent" ? 88 : 92}%
                    </span>
                  </div>
                  <div className="h-5 bg-[#1A0033] pixel-border border-white relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${caseData.severity === "critical" ? 95 : caseData.severity === "urgent" ? 88 : 92}%` }}
                      transition={{ duration: 2, delay: 1.5 }}
                      className="h-full relative"
                      style={{
                        background: 'linear-gradient(90deg, #00FF00, #FFD700, #FF6B9D)'
                      }}
                    >
                      {/* Animated Stripe Pattern */}
                      <motion.div
                        className="absolute inset-0 opacity-50"
                        animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        style={{
                          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.3) 10px, rgba(255,255,255,0.3) 20px)',
                          backgroundSize: '200% 100%'
                        }}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Action Buttons - Like Game Menu */}
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#6BCF7F] pixel-border border-black py-3 hover:bg-[#7FE29A] transition-colors"
                    style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                  >
                    <span className="retro-text text-black text-[8px]">
                      ▶ TREAT PATIENT
                    </span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="bg-[#FF6B6B] pixel-border border-black py-3 hover:bg-[#FF8A8A] transition-colors"
                    style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                  >
                    <span className="retro-text text-white text-[8px]">
                      ◀ BACK
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

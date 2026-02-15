import { motion, AnimatePresence } from "motion/react";
import { X, Brain, Activity, Thermometer, Heart, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface ModernAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: any;
}

export default function ModernAIModal({ isOpen, onClose, caseData }: ModernAIModalProps) {
  const [rotateY, setRotateY] = useState(0);

  if (!caseData) return null;

  const severityColor = {
    critical: "from-red-500 to-pink-600",
    urgent: "from-amber-500 to-orange-600",
    stable: "from-emerald-500 to-green-600",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-purple-200"
            style={{
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.3), 0 8px 16px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Header */}
            <div 
              className={`bg-gradient-to-r ${severityColor[caseData.severity as keyof typeof severityColor]} p-6 relative`}
              style={{
                boxShadow: 'inset 0 2px 8px rgba(255, 255, 255, 0.3)'
              }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-xl backdrop-blur-sm transition-all border-2 border-white/40"
                style={{
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                }}
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="flex items-center gap-4">
                <div 
                  className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl border-2 border-white/40"
                  style={{
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.4)'
                  }}
                >
                  <Brain className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white">
                    AI Insights & Analysis
                  </h2>
                  <p className="text-white/90 font-semibold mt-1">
                    Patient: {caseData.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* 3D Model Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 3D Anatomy */}
                <div 
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200"
                  style={{
                    boxShadow: '0 8px 16px rgba(139, 92, 246, 0.15)'
                  }}
                >
                  <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
                    🐾 3D Anatomy Model
                  </h3>
                  
                  <div 
                    className="relative h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden border-2 border-purple-200"
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      setRotateY(((x / rect.width) * 360) - 180);
                    }}
                    style={{
                      boxShadow: 'inset 0 4px 12px rgba(139, 92, 246, 0.1)'
                    }}
                  >
                    <motion.div
                      animate={{ rotateY: rotateY }}
                      style={{
                        transformStyle: 'preserve-3d',
                        perspective: '1000px'
                      }}
                      className="relative"
                    >
                      {/* 3D Pet Model */}
                      <svg width="200" height="200" viewBox="0 0 200 200">
                        <defs>
                          <filter id="shadow">
                            <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3"/>
                          </filter>
                          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FFD97D" />
                            <stop offset="100%" stopColor="#FFC44D" />
                          </linearGradient>
                        </defs>

                        {/* Body */}
                        <ellipse cx="100" cy="120" rx="60" ry="40" fill="url(#bodyGradient)" filter="url(#shadow)" />
                        
                        {/* Head */}
                        <circle cx="100" cy="70" r="35" fill="url(#bodyGradient)" filter="url(#shadow)" />
                        
                        {/* Ears */}
                        <ellipse cx="75" cy="50" rx="15" ry="25" fill="#FFD97D" filter="url(#shadow)" />
                        <ellipse cx="125" cy="50" rx="15" ry="25" fill="#FFD97D" filter="url(#shadow)" />
                        
                        {/* Problem indicators */}
                        {caseData.severity === "critical" && (
                          <>
                            <motion.circle
                              cx="100" cy="120" r="35"
                              fill="none"
                              stroke="#FF6B6B"
                              strokeWidth="4"
                              animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                              }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <motion.circle
                              cx="100" cy="70" r="25"
                              fill="none"
                              stroke="#FF6B6B"
                              strokeWidth="3"
                              animate={{ 
                                scale: [1, 1.3, 1],
                                opacity: [0.4, 0.8, 0.4]
                              }}
                              transition={{ duration: 1.2, repeat: Infinity }}
                            />
                          </>
                        )}
                      </svg>
                    </motion.div>

                    {/* Instruction */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg border-2 border-purple-200">
                      <span className="text-xs font-bold text-purple-700">
                        🖱️ Drag to rotate
                      </span>
                    </div>
                  </div>
                </div>

                {/* Vital Signs */}
                <div 
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200"
                  style={{
                    boxShadow: '0 8px 16px rgba(59, 130, 246, 0.15)'
                  }}
                >
                  <h3 className="text-lg font-black text-gray-800 mb-4">
                    📊 Vital Signs
                  </h3>
                  
                  <div className="space-y-3">
                    {[
                      { label: "Heart Rate", value: caseData.heartRate, unit: "bpm", icon: Heart, color: "from-red-400 to-pink-500", threshold: 160 },
                      { label: "Respiratory", value: caseData.respiratoryRate, unit: "/min", icon: Activity, color: "from-blue-400 to-cyan-500", threshold: 40 },
                      { label: "Temperature", value: caseData.temperature, unit: "°C", icon: Thermometer, color: "from-orange-400 to-red-500", threshold: 39.2 },
                    ].map((vital, idx) => (
                      <div 
                        key={idx}
                        className="bg-white rounded-xl p-4 border-2 border-gray-100"
                        style={{
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08)'
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div 
                              className={`bg-gradient-to-r ${vital.color} p-2 rounded-lg`}
                              style={{
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
                              }}
                            >
                              <vital.icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-gray-700 text-sm">{vital.label}</span>
                          </div>
                          <span className="text-2xl font-black text-gray-800">{vital.value}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-500">{vital.unit}</span>
                          {vital.value > vital.threshold ? (
                            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">
                              ⚠️ Elevated
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                              ✓ Normal
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* MGCS Score */}
              <div 
                className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200"
                style={{
                  boxShadow: '0 8px 16px rgba(139, 92, 246, 0.15)'
                }}
              >
                <h3 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-purple-600" />
                  Modified Glasgow Coma Scale
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Motor Activity", score: 3, max: 6 },
                    { label: "Brainstem Reflexes", score: 3, max: 6 },
                    { label: "Level of Consciousness", score: 2, max: 6 },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-4 border-2 border-gray-100">
                      <div className="flex justify-between mb-2">
                        <span className="font-bold text-sm text-gray-700">{item.label}</span>
                        <span className="text-xl font-black text-purple-600">{item.score}/{item.max}</span>
                      </div>
                      <div 
                        className="h-3 bg-gray-200 rounded-full overflow-hidden"
                        style={{
                          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.score / item.max) * 100}%` }}
                          transition={{ duration: 1, delay: idx * 0.2 }}
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                          style={{
                            boxShadow: '0 2px 4px rgba(139, 92, 246, 0.4)'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 bg-white rounded-xl p-4 border-2 border-purple-200">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-gray-800">Total MGCS Score</span>
                    <span className="text-4xl font-black text-purple-600">{caseData.mgcs}/18</span>
                  </div>
                </div>
              </div>

              {/* AI Analysis */}
              <div 
                className={`bg-gradient-to-r ${severityColor[caseData.severity as keyof typeof severityColor]} rounded-2xl p-6 text-white border-4 border-white`}
                style={{
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2), inset 0 2px 8px rgba(255, 255, 255, 0.3)'
                }}
              >
                <h3 className="text-xl font-black mb-3 flex items-center gap-2">
                  <Brain className="w-6 h-6" />
                  AI Diagnosis & Recommendations
                </h3>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4 border-2 border-white/30">
                  <p className="text-white font-semibold leading-relaxed">
                    {caseData.severity === "critical" && (
                      <>
                        🚨 <strong>CRITICAL EMERGENCY:</strong> Patient {caseData.name} presenting with severe respiratory distress 
                        and abnormally high heart rate ({caseData.heartRate} bpm). Pale gums indicate possible shock or hypotension. 
                        <br/><br/>
                        <strong>Immediate Actions Required:</strong>
                        <br/>• Administer oxygen (5-10 L/min)
                        <br/>• Establish IV access for fluid resuscitation
                        <br/>• Continuous vital sign monitoring
                        <br/>• Prepare emergency medications
                      </>
                    )}
                    {caseData.severity === "urgent" && (
                      <>
                        ⚡ <strong>URGENT CARE NEEDED:</strong> Patient {caseData.name} requires prompt attention. 
                        Symptoms of {caseData.symptoms.join(", ")} need immediate evaluation.
                        <br/><br/>
                        <strong>Recommended Actions:</strong>
                        <br/>• Complete physical examination
                        <br/>• Blood work (CBC, Chemistry panel)
                        <br/>• Monitor for dehydration
                      </>
                    )}
                    {caseData.severity === "stable" && (
                      <>
                        ✅ <strong>STABLE CONDITION:</strong> Patient {caseData.name} is in stable condition. 
                        Regular check-up procedure can be followed.
                        <br/><br/>
                        <strong>Standard Protocol:</strong>
                        <br/>• Routine health examination
                        <br/>• Update vaccination records
                      </>
                    )}
                  </p>
                </div>

                {/* Confidence Meter */}
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border-2 border-white/30">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">AI Confidence Level</span>
                    <span className="text-xl font-black">{caseData.aiConfidence}%</span>
                  </div>
                  <div 
                    className="h-4 bg-black/20 rounded-full overflow-hidden"
                    style={{
                      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${caseData.aiConfidence}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-white"
                      style={{
                        boxShadow: '0 2px 4px rgba(255, 255, 255, 0.5)'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-black text-lg border-2 border-white"
                  style={{
                    boxShadow: '0 8px 16px rgba(16, 185, 129, 0.4)'
                  }}
                >
                  ✓ Start Treatment
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 rounded-xl font-black text-lg border-2 border-white"
                  style={{
                    boxShadow: '0 8px 16px rgba(107, 114, 128, 0.4)'
                  }}
                >
                  ← Back to Dashboard
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

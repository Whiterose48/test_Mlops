import { motion, AnimatePresence } from "motion/react";
import { X, Brain, Heart, Thermometer, Activity, AlertTriangle, Crosshair, Zap, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface AIInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: any;
}

export default function AIInsightsModal({
  isOpen,
  onClose,
  caseData,
}: AIInsightsModalProps) {
  const [rotateY, setRotateY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!caseData || !mounted) return null;

  const mgcsBreakdown = [
    { category: "Motor Activity", score: 3, max: 6 },
    { category: "Brainstem Reflexes", score: 3, max: 6 },
    { category: "Level of Consciousness", score: 2, max: 6 },
  ];

  // สีโทน 2D/3D สบายตา
  const getTheme = (severity: string) => {
    switch (severity) {
      case 'critical': return { main: '#FF6B6B', bg: '#FFF0F0', border: '#FFD6D6' };
      case 'urgent': return { main: '#F59E0B', bg: '#FFFBEB', border: '#FEF3C7' };
      case 'stable': return { main: '#10B981', bg: '#ECFDF5', border: '#D1FAE5' };
      default: return { main: '#8B5CF6', bg: '#F5F3FF', border: '#EDE9FE' };
    }
  };

  const theme = getTheme(caseData.severity);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-6 bg-slate-900/50 backdrop-blur-[2px]"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.98, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.98, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F8FAFC] border-[3px] border-slate-800 rounded-3xl shadow-[6px_6px_0px_0px_#0f172a] w-[96vw] max-w-[1300px] max-h-[95vh] overflow-hidden flex flex-col"
          >
            {/* 🟢 Header Section */}
            <div 
              className="p-5 md:p-6 border-b-[3px] border-slate-800 flex items-center justify-between relative shrink-0"
              style={{ backgroundColor: theme.main }}
            >
              <div className="flex items-center gap-4">
                <div className="p-2 md:p-3 bg-white border-[2px] border-slate-800 rounded-2xl shadow-[2px_2px_0px_0px_#0f172a]">
                  <Brain className="w-6 h-6 md:w-8 md:h-8 text-slate-800" strokeWidth={2.5} />
                </div>
                <div>
                  <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-wider drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">
                    AI Diagnosis Report
                  </h2>
                  <div className="flex items-center gap-2 mt-1 md:mt-2">
                    <span className="bg-slate-800 text-white text-[10px] md:text-xs font-bold px-3 py-1 uppercase rounded-md tracking-widest">
                      Patient: {caseData.name}
                    </span>
                    <span className="bg-white/20 text-white text-[10px] md:text-xs font-bold px-3 py-1 uppercase rounded-md backdrop-blur-sm border-[1px] border-white/30">
                      ID: #{caseData.id}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="bg-white border-[2px] border-slate-800 shadow-[3px_3px_0px_0px_#0f172a] p-2 hover:bg-slate-100 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-none transition-all rounded-xl"
              >
                <X className="w-6 h-6 text-slate-800" strokeWidth={3} />
              </button>
            </div>

            {/* 🟢 Content Area */}
            <div className="p-6 md:p-8 overflow-y-auto overflow-x-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                
                {/* 📌 Left Column: 3D Scan & Vitals */}
                <div className="space-y-8">
                  
                  {/* Body Scan Component */}
                  <div className="bg-white border-[3px] border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] p-6 relative">
                    <h3 className="text-lg md:text-xl font-black uppercase text-slate-800 mb-4 flex items-center gap-2">
                      <Crosshair className="w-6 h-6" strokeWidth={2.5} /> Body Scan
                    </h3>
                    
                    <div className="relative h-64 md:h-72 flex items-center justify-center cursor-ew-resize bg-slate-50 border-[2px] border-slate-800 rounded-xl shadow-[inset_0px_4px_10px_rgba(0,0,0,0.05)]">
                      <motion.div
                        animate={{ rotateY: rotateY }}
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          setRotateY(((x / rect.width) * 360) - 180);
                        }}
                        className="active:cursor-grabbing"
                        style={{ transformStyle: "preserve-3d", perspective: "800px" }}
                      >
                        {/* 2.5D Pet Graphic สบายตาขึ้น */}
                        <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-[0px_8px_0px_rgba(0,0,0,0.1)]">
                          <ellipse cx="100" cy="120" rx="55" ry="45" fill="#F1F5F9" stroke="#1E293B" strokeWidth="3" />
                          <circle cx="100" cy="65" r="30" fill="#F1F5F9" stroke="#1E293B" strokeWidth="3" />
                          <ellipse cx="80" cy="45" rx="12" ry="20" fill="#F1F5F9" stroke="#1E293B" strokeWidth="3" />
                          <ellipse cx="120" cy="45" rx="12" ry="20" fill="#F1F5F9" stroke="#1E293B" strokeWidth="3" />
                          
                          {caseData.severity === "critical" && (
                            <motion.circle cx="100" cy="120" r="25" fill="#FF6B6B" opacity="0.8" stroke="#1E293B" strokeWidth="2"
                              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            />
                          )}
                        </svg>
                      </motion.div>
                    </div>
                    <p className="text-center text-xs font-bold uppercase text-slate-400 mt-4 tracking-widest">
                      ⟷ Drag to rotate
                    </p>
                  </div>

                  {/* Vitals Highlights (ย้ายมาฝั่งซ้ายให้บาลานซ์) */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border-[3px] border-slate-800 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#0f172a]">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-5 h-5 text-rose-500" strokeWidth={2.5} />
                        <span className="text-sm font-black uppercase text-slate-500">Heart Rate</span>
                      </div>
                      <p className="text-3xl font-black text-slate-800">{caseData.heartRate} <span className="text-base text-slate-400">BPM</span></p>
                    </div>
                    <div className="bg-white border-[3px] border-slate-800 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#0f172a]">
                      <div className="flex items-center gap-2 mb-2">
                        <Thermometer className="w-5 h-5 text-orange-500" strokeWidth={2.5} />
                        <span className="text-sm font-black uppercase text-slate-500">Temp</span>
                      </div>
                      <p className="text-3xl font-black text-slate-800">{caseData.temperature}° <span className="text-base text-slate-400">C</span></p>
                    </div>
                  </div>

                </div>

                {/* 📌 Right Column: AI Analysis & Action Plan */}
                <div className="space-y-8">
                  
                  {/* AI Explanation Card (ทำสีพื้นหลังให้อ่อน สบายตา) */}
                  <div 
                    className="border-[3px] border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] p-6 relative"
                    style={{ backgroundColor: theme.bg }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg md:text-xl font-black uppercase text-slate-800 flex items-center gap-2">
                        <AlertTriangle className="w-6 h-6" strokeWidth={2.5} /> Diagnosis Summary
                      </h3>
                      <div className="flex items-center gap-2 bg-white border-[2px] border-slate-800 px-3 py-1 rounded-full shadow-[2px_2px_0px_0px_#0f172a]">
                         <span className="text-xs font-black uppercase text-slate-800">Confidence:</span>
                         <span className="text-sm font-black text-[#A855F7]">{caseData.aiConfidence}%</span>
                      </div>
                    </div>
                    
                    <div className="bg-white border-[2px] border-slate-800 rounded-xl p-5 relative z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.05)]">
                      <p className="text-base md:text-lg font-bold text-slate-700 leading-relaxed">
                        {caseData.severity === "critical" && (
                          <>
                            <span className="text-rose-500 uppercase font-black">⚠️ Critical Alert:</span> น้อง {caseData.name}{" "}
                            มีภาวะหายใจลำบากร่วมกับอัตราการเต้นหัวใจสูงผิดปกติ ({caseData.heartRate} bpm) และเหงือกซีด บ่งชี้ถึงภาวะ Shock ควรให้ออกซิเจนทันที
                          </>
                        )}
                        {caseData.severity === "urgent" && (
                          <>
                            <span className="text-amber-500 uppercase font-black">⚡ Urgent Review:</span> น้อง {caseData.name}{" "}
                            มีอาการ {caseData.symptoms.join(", ")} ต้องได้รับการดูแลโดยเร็ว แนะนำให้ตรวจเลือด และประเมินการขาดน้ำเพิ่มเติม
                          </>
                        )}
                        {caseData.severity === "stable" && (
                          <>
                            <span className="text-emerald-500 uppercase font-black">✅ Stable Status:</span> น้อง {caseData.name}{" "}
                            มาตรวจสุขภาพประจำปี Vital signs อยู่ในเกณฑ์ปกติ สามารถดำเนินการตามขั้นตอนปกติได้เลย
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* MGCS Calculator (มินิมอลขึ้น) */}
                  <div className="bg-white border-[3px] border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] p-6">
                    <h3 className="text-lg font-black uppercase text-slate-800 mb-5 flex items-center gap-2">
                      <Activity className="w-5 h-5" strokeWidth={2.5} /> MGCS Breakdown
                    </h3>
                    
                    <div className="space-y-4">
                      {mgcsBreakdown.map((item, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between mb-1.5">
                            <span className="text-xs md:text-sm font-bold uppercase text-slate-500">
                              {item.category}
                            </span>
                            <span className="text-sm font-black text-slate-800">
                              {item.score}/{item.max}
                            </span>
                          </div>
                          <div className="h-3 bg-slate-100 border-[2px] border-slate-800 rounded-full overflow-hidden relative">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(item.score / item.max) * 100}%` }}
                              transition={{ duration: 1, delay: idx * 0.2 }}
                              className="absolute top-0 left-0 bottom-0"
                              style={{ backgroundColor: theme.main }}
                            />
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-4 mt-2 border-t-[2px] border-slate-200 flex justify-between items-center">
                        <span className="text-sm font-black uppercase text-slate-400">Total Score</span>
                        <span className="text-2xl font-black text-slate-800 leading-none">
                          {caseData.mgcs}<span className="text-base text-slate-400">/18</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-slate-800 border-[3px] border-slate-800 rounded-2xl shadow-[4px_4px_0px_0px_#0f172a] p-6 text-white">
                    <h3 className="text-lg font-black uppercase mb-5 flex items-center gap-2 text-[#4ADE80]">
                      <Zap className="w-5 h-5" strokeWidth={2.5} /> Action Plan
                    </h3>
                    <ul className="space-y-3">
                      {caseData.severity === "critical" && (
                        <>
                          <li className="flex items-center gap-3 font-bold text-sm md:text-base border-[2px] border-slate-600 p-3 rounded-xl bg-slate-700">
                            <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0" />
                            Administer oxygen (Flow: 5-10 L/min)
                          </li>
                          <li className="flex items-center gap-3 font-bold text-sm md:text-base border-[2px] border-slate-600 p-3 rounded-xl bg-slate-700">
                            <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0" />
                            Establish IV access & fluid resuscitation
                          </li>
                        </>
                      )}
                      {caseData.severity === "urgent" && (
                        <>
                          <li className="flex items-center gap-3 font-bold text-sm md:text-base border-[2px] border-slate-600 p-3 rounded-xl bg-slate-700">
                            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                            Complete physical examination
                          </li>
                          <li className="flex items-center gap-3 font-bold text-sm md:text-base border-[2px] border-slate-600 p-3 rounded-xl bg-slate-700">
                            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                            Blood work (CBC, Chemistry panel)
                          </li>
                        </>
                      )}
                      {caseData.severity === "stable" && (
                        <>
                          <li className="flex items-center gap-3 font-bold text-sm md:text-base border-[2px] border-slate-600 p-3 rounded-xl bg-slate-700">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                            Standard health check procedure
                          </li>
                          <li className="flex items-center gap-3 font-bold text-sm md:text-base border-[2px] border-slate-600 p-3 rounded-xl bg-slate-700">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                            Update vaccination records
                          </li>
                        </>
                      )}
                    </ul>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
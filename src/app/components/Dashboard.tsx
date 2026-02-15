import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  AlertCircle,
  Clock,
  Activity,
  TrendingUp,
  Dog,
  Cat,
  Zap,
  BarChart2 
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import AIInsightsModal from "./AIInsightsModal";

// Mock data for triage cases (นำกระต่ายออกแล้ว)
const initialCases = [
  {
    id: 1,
    name: "Luna",
    type: "dog",
    owner: "สมชาย ใจดี",
    severity: "critical",
    symptoms: ["เหงือกซีด", "หายใจหอบ", "ชัก"],
    heartRate: 180,
    respiratoryRate: 45,
    temperature: 39.5,
    mgcs: 8,
    waitTime: 2,
    aiConfidence: 95,
  },
  {
    id: 2,
    name: "Mochi",
    type: "cat",
    owner: "วรรณา สุขใส",
    severity: "urgent",
    symptoms: ["อาเจียน", "ไม่กินอาหาร"],
    heartRate: 140,
    respiratoryRate: 32,
    temperature: 38.8,
    mgcs: 14,
    waitTime: 5,
    aiConfidence: 88,
  },
  {
    id: 4,
    name: "Max",
    type: "dog",
    owner: "สุดา ดีใจ",
    severity: "urgent",
    symptoms: ["ท้องเสีย", "เฉื่อยชา"],
    heartRate: 120,
    respiratoryRate: 28,
    temperature: 39.2,
    mgcs: 12,
    waitTime: 8,
    aiConfidence: 90,
  },
];

// สี Solid Colors สไตล์ 2D Game
const severityColors = {
  critical: "#FF6B6B", 
  urgent: "#FFD93D",   
  stable: "#6BCB77",   
};

const severityLabels = {
  critical: "CRITICAL",
  urgent: "URGENT",
  stable: "STABLE",
};

// นำ Rabbit ออกจากรายการไอคอน
const animalIcons = {
  dog: Dog,
  cat: Cat,
};

export default function Dashboard() {
  const [cases, setCases] = useState(initialCases);
  const [newCaseAlert, setNewCaseAlert] = useState(false);
  const [selectedCase, setSelectedCase] = useState<typeof initialCases[0] | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);

  // Simulate new case arrival
  useEffect(() => {
    const interval = setInterval(() => {
      setNewCaseAlert(true);
      setTimeout(() => setNewCaseAlert(false), 3000);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const heatmapData = [
    {
      name: "Critical",
      value: cases.filter((c) => c.severity === "critical").length,
      color: severityColors.critical,
    },
    {
      name: "Urgent",
      value: cases.filter((c) => c.severity === "urgent").length,
      color: severityColors.urgent,
    },
    {
      name: "Stable",
      value: cases.filter((c) => c.severity === "stable").length,
      color: severityColors.stable,
    },
  ];

  const handleViewDetails = (caseData: typeof initialCases[0]) => {
    setSelectedCase(caseData);
    setShowAIModal(true);
  };

  return (
    <div className="w-full relative font-sans text-slate-900">
      
      <div className="w-full max-w-[1600px] mx-auto space-y-8 md:space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b-[4px] border-slate-900 pb-6 md:pb-8">
          <div>
            <p className="text-slate-700 font-bold mt-3 uppercase tracking-widest text-base md:text-lg bg-white inline-block px-5 py-2 border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a]">
              Triage Command Center
            </p>
          </div>

          <AnimatePresence>
            {newCaseAlert && (
              <motion.div
                initial={{ scale: 0, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 5 }}
                className="flex items-center gap-3 bg-[#FF6B6B] text-white px-6 py-4 rounded-xl border-[4px] border-slate-900 shadow-[6px_6px_0px_0px_#0f172a]"
              >
                <AlertCircle className="w-8 h-8 animate-pulse" />
                <span className="font-black uppercase tracking-wider text-lg md:text-xl">New Patient!</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main Grid Layout - แบ่งสัดส่วน 8:4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          
          {/* Left Side: Priority Queue */}
          <div className="lg:col-span-8 xl:col-span-8 space-y-6">
            
            {/* หัวข้อ Priority Queue */}
            <div className="flex items-center justify-between bg-white border-[4px] border-slate-900 shadow-[5px_5px_0px_0px_#0f172a] p-5 rounded-2xl">
              <div className="flex items-center gap-4">
                <Activity className="w-8 h-8 text-slate-900" strokeWidth={3} />
                <h3 className="text-2xl font-black uppercase tracking-wider">
                  Priority Queue
                </h3>
              </div>
              <span className="bg-slate-900 text-white px-5 py-2 text-base font-black rounded-lg">
                {cases.length} CASES
              </span>
            </div>

            {/* Grid ของการ์ดผู้ป่วย - ✨ ล็อคให้เป็น 2 คอลัมน์ (2x2) เสมอบนจอคอม ✨ */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {cases
                .sort((a, b) => {
                  const severityOrder = { critical: 0, urgent: 1, stable: 2 };
                  return (
                    severityOrder[a.severity as keyof typeof severityOrder] -
                    severityOrder[b.severity as keyof typeof severityOrder]
                  );
                })
                .map((caseItem, index) => {
                  const AnimalIcon = animalIcons[caseItem.type as keyof typeof animalIcons];
                  const bgColor = severityColors[caseItem.severity as keyof typeof severityColors];
                  
                  return (
                    <motion.div
                      key={caseItem.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white border-[4px] border-slate-900 rounded-2xl flex flex-col h-full transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_#0f172a] shadow-[5px_5px_0px_0px_#0f172a]"
                    >
                      {/* Card Header */}
                      <div className="p-6 border-b-[4px] border-slate-900 border-dashed flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-16 h-16 flex items-center justify-center rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] shrink-0"
                            style={{ backgroundColor: bgColor }}
                          >
                            <AnimalIcon className="w-10 h-10 text-slate-900" strokeWidth={2.5} />
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="text-2xl md:text-3xl font-black uppercase text-slate-900 truncate">
                              {caseItem.name}
                            </h4>
                            <p className="text-sm font-bold text-slate-500 truncate uppercase mt-1">
                              OWNER: {caseItem.owner}
                            </p>
                          </div>
                        </div>
                        {/* Severity Badge */}
                        <div
                          className="px-4 py-2 rounded-xl border-[3px] border-slate-900 font-black text-slate-900 text-sm md:text-base shadow-[3px_3px_0px_0px_#0f172a] whitespace-nowrap"
                          style={{ backgroundColor: bgColor }}
                        >
                          {severityLabels[caseItem.severity as keyof typeof severityLabels]}
                        </div>
                      </div>

                      {/* Symptoms Tags */}
                      <div className="px-6 pt-6 flex flex-wrap gap-2.5">
                        {caseItem.symptoms.map((symptom, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-slate-100 border-[3px] border-slate-900 rounded-lg text-sm font-black uppercase"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>

                      {/* Vitals Grid (2x2) */}
                      <div className="p-6 grid grid-cols-2 gap-4 mt-auto">
                        {[
                          { label: "HR", value: caseItem.heartRate, unit: "bpm" },
                          { label: "RR", value: caseItem.respiratoryRate, unit: "/m" },
                          { label: "TEMP", value: caseItem.temperature, unit: "°C" },
                          { label: "MGCS", value: caseItem.mgcs, unit: "/18" },
                        ].map((vital, idx) => (
                          <div key={idx} className="bg-slate-50 border-[3px] border-slate-900 rounded-xl p-4 text-center flex flex-col justify-center shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.05)]">
                            <div className="text-sm font-black uppercase text-slate-500 mb-2">{vital.label}</div>
                            <div className="text-2xl font-black text-slate-900 leading-none flex items-baseline justify-center gap-1.5">
                              {vital.value} <span className="text-xs text-slate-400 font-bold uppercase">{vital.unit}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Card Footer */}
                      <div className="p-6 pt-0 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5 text-base font-bold text-slate-600 bg-slate-100 border-[3px] border-slate-900 px-4 py-2.5 rounded-xl">
                          <Clock className="w-5 h-5" strokeWidth={3} />
                          <span>Wait: {caseItem.waitTime}m</span>
                        </div>
                        <button
                          onClick={() => handleViewDetails(caseItem)}
                          className="flex items-center gap-2.5 px-5 py-2.5 bg-[#A855F7] text-white border-[3px] border-slate-900 rounded-xl font-black text-base uppercase hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all shadow-[4px_4px_0px_0px_#0f172a]"
                        >
                          <Zap className="w-5 h-5" fill="white" />
                          AI View
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>

          {/* Right Side: Stats & Heatmap */}
          <div className="lg:col-span-4 xl:col-span-4 space-y-8">
            
            {/* Quick Stats Banner */}
            <div className="bg-[#4ADE80] border-[4px] border-slate-900 rounded-2xl shadow-[5px_5px_0px_0px_#0f172a] p-6 text-slate-900">
              <h3 className="text-xl font-black uppercase mb-5 flex items-center gap-3">
                <BarChart2 className="w-6 h-6" strokeWidth={3} /> Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="bg-white border-[3px] border-slate-900 p-4 rounded-xl flex justify-between items-center shadow-[4px_4px_0px_0px_#0f172a]">
                  <span className="font-bold text-sm md:text-base uppercase text-slate-600">Avg Wait Time</span>
                  <span className="font-black text-2xl">
                    {Math.round(cases.reduce((acc, c) => acc + c.waitTime, 0) / cases.length)} min
                  </span>
                </div>
                <div className="bg-white border-[3px] border-slate-900 p-4 rounded-xl flex justify-between items-center shadow-[4px_4px_0px_0px_#0f172a]">
                  <span className="font-bold text-sm md:text-base uppercase text-slate-600">AI Accuracy</span>
                  <span className="font-black text-2xl">
                    {Math.round(cases.reduce((acc, c) => acc + c.aiConfidence, 0) / cases.length)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Heatmap Widget */}
            <div className="bg-white border-[4px] border-slate-900 rounded-2xl shadow-[5px_5px_0px_0px_#0f172a] p-6">
              <div className="flex items-center gap-3 mb-6 border-b-[4px] border-slate-900 border-dashed pb-5">
                <TrendingUp className="w-6 h-6 text-slate-900" strokeWidth={3} />
                <h3 className="text-xl font-black uppercase tracking-wider">Case Heatmap</h3>
              </div>

              <div className="h-64 md:h-72 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={heatmapData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={90}
                      stroke="#0f172a" 
                      strokeWidth={4}
                      dataKey="value"
                    >
                      {heatmapData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend wrapperStyle={{ fontWeight: '900', fontSize: '14px', marginTop: '10px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4 bg-slate-50 border-[3px] border-slate-900 p-5 rounded-xl shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center font-bold">
                  <span className="uppercase text-sm md:text-base text-slate-500">Total Active</span>
                  <span className="text-2xl md:text-3xl font-black leading-none">{cases.length}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-[#FF6B6B]">
                  <span className="uppercase text-sm md:text-base">Critical Limit</span>
                  <span className="text-2xl md:text-3xl font-black leading-none">
                    {cases.filter((c) => c.severity === "critical").length}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* AI Insights Modal */}
      <AIInsightsModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        caseData={selectedCase}
      />
    </div>
  );
}
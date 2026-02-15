import { useState } from "react";
import { motion } from "motion/react";
import { 
  Heart, 
  Clock, 
  Activity, 
  AlertCircle,
  Dog,
  Cat,
  Rabbit,
  TrendingUp,
  Zap
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import ModernAIModal from "./ModernAIModal";

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
    id: 3,
    name: "Cookie",
    type: "rabbit",
    owner: "ปรีชา รักสัตว์",
    severity: "stable",
    symptoms: ["ตรวจสุขภาพ"],
    heartRate: 200,
    respiratoryRate: 50,
    temperature: 38.5,
    mgcs: 18,
    waitTime: 15,
    aiConfidence: 92,
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

const severityConfig = {
  critical: { 
    color: "from-red-400 to-pink-500", 
    bg: "from-red-50 to-pink-50",
    border: "border-red-300",
    text: "text-red-700",
    badge: "bg-gradient-to-r from-red-500 to-pink-500",
    shadow: "rgba(239, 68, 68, 0.4)"
  },
  urgent: { 
    color: "from-amber-400 to-orange-500", 
    bg: "from-amber-50 to-orange-50",
    border: "border-amber-300",
    text: "text-amber-700",
    badge: "bg-gradient-to-r from-amber-500 to-orange-500",
    shadow: "rgba(245, 158, 11, 0.4)"
  },
  stable: { 
    color: "from-emerald-400 to-green-500", 
    bg: "from-emerald-50 to-green-50",
    border: "border-emerald-300",
    text: "text-emerald-700",
    badge: "bg-gradient-to-r from-emerald-500 to-green-500",
    shadow: "rgba(16, 185, 129, 0.4)"
  },
};

const animalIcons = {
  dog: Dog,
  cat: Cat,
  rabbit: Rabbit,
};

export default function ModernDashboard() {
  const [cases, setCases] = useState(initialCases);
  const [selectedCase, setSelectedCase] = useState<typeof initialCases[0] | null>(null);
  const [showModal, setShowModal] = useState(false);

  const chartData = [
    { name: "Critical", value: cases.filter(c => c.severity === "critical").length, color: "#EF4444" },
    { name: "Urgent", value: cases.filter(c => c.severity === "urgent").length, color: "#F59E0B" },
    { name: "Stable", value: cases.filter(c => c.severity === "stable").length, color: "#10B981" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
        >
          🏥 The Heartbeat Dashboard
        </motion.h2>
        <p className="text-lg text-gray-600 mt-2 font-semibold">
          ศูนย์บัญชาการคัดกรองผู้ป่วยฉุกเฉิน
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Queue */}
        <div className="lg:col-span-2 space-y-4">
          {cases
            .sort((a, b) => {
              const order = { critical: 0, urgent: 1, stable: 2 };
              return order[a.severity as keyof typeof order] - order[b.severity as keyof typeof order];
            })
            .map((caseItem, index) => {
              const config = severityConfig[caseItem.severity as keyof typeof severityConfig];
              const AnimalIcon = animalIcons[caseItem.type as keyof typeof animalIcons];

              return (
                <motion.div
                  key={caseItem.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={`
                    bg-white rounded-2xl overflow-hidden border-2 ${config.border}
                    cursor-pointer transition-all duration-300
                  `}
                  style={{
                    boxShadow: `0 12px 32px ${config.shadow}, 0 4px 8px rgba(0, 0, 0, 0.08)`
                  }}
                  onClick={() => {
                    setSelectedCase(caseItem);
                    setShowModal(true);
                  }}
                >
                  <div className="flex">
                    {/* Left 3D Icon Panel */}
                    <div 
                      className={`w-40 bg-gradient-to-br ${config.color} p-6 relative flex flex-col items-center justify-center`}
                      style={{
                        boxShadow: `inset 0 2px 8px rgba(255, 255, 255, 0.3), inset 0 -2px 8px rgba(0, 0, 0, 0.1)`
                      }}
                    >
                      {/* 3D Pet Icon */}
                      <motion.div
                        animate={{ 
                          y: caseItem.severity === "critical" ? [0, -8, 0] : [0, -4, 0],
                        }}
                        transition={{ 
                          duration: caseItem.severity === "critical" ? 1.5 : 2.5,
                          repeat: Infinity 
                        }}
                        className="relative"
                      >
                        <div 
                          className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/40"
                          style={{
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.4)'
                          }}
                        >
                          <AnimalIcon className="w-12 h-12 text-white" strokeWidth={2.5} />
                        </div>
                        
                        {/* 3D shadow */}
                        <div 
                          className="absolute inset-0 bg-black/20 rounded-2xl blur-md -z-10"
                          style={{ transform: 'translateY(8px) scale(0.9)' }}
                        />
                      </motion.div>

                      {/* Term Badge */}
                      <div 
                        className="mt-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg border-2 border-white"
                        style={{
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
                        }}
                      >
                        <span className="text-xs font-black text-gray-800">
                          ID: {String(caseItem.id).padStart(4, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className={`flex-1 p-6 bg-gradient-to-br ${config.bg}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-black text-gray-800">
                            {caseItem.name}
                          </h3>
                          <p className="text-sm font-semibold text-gray-600 mt-1">
                            เจ้าของ: {caseItem.owner}
                          </p>
                        </div>

                        {/* Severity Badge */}
                        <motion.div
                          animate={caseItem.severity === "critical" ? { 
                            scale: [1, 1.1, 1],
                          } : {}}
                          transition={{ duration: 1, repeat: Infinity }}
                          className={`${config.badge} px-4 py-2 rounded-xl text-white font-black text-sm border-2 border-white`}
                          style={{
                            boxShadow: `0 6px 16px ${config.shadow}`
                          }}
                        >
                          {caseItem.severity === "critical" ? "🚨 CRITICAL" : 
                           caseItem.severity === "urgent" ? "⚡ URGENT" : "✅ STABLE"}
                        </motion.div>
                      </div>

                      {/* Symptoms */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {caseItem.symptoms.map((symptom, idx) => (
                          <div
                            key={idx}
                            className="bg-white px-3 py-1 rounded-lg font-semibold text-sm border-2 border-gray-200"
                            style={{
                              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)'
                            }}
                          >
                            {symptom}
                          </div>
                        ))}
                      </div>

                      {/* Vital Signs */}
                      <div className="grid grid-cols-4 gap-3">
                        {[
                          { label: "Heart", value: caseItem.heartRate, unit: "bpm", icon: Heart, color: "text-red-500" },
                          { label: "Resp.", value: caseItem.respiratoryRate, unit: "/min", icon: Activity, color: "text-blue-500" },
                          { label: "Temp", value: caseItem.temperature, unit: "°C", icon: Zap, color: "text-orange-500" },
                          { label: "MGCS", value: caseItem.mgcs, unit: "/18", icon: TrendingUp, color: "text-purple-500" },
                        ].map((vital, idx) => (
                          <div 
                            key={idx}
                            className="bg-white rounded-xl p-3 border-2 border-gray-100"
                            style={{
                              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.06)'
                            }}
                          >
                            <div className="flex items-center gap-1 mb-1">
                              <vital.icon className={`w-3 h-3 ${vital.color}`} />
                              <span className="text-xs font-bold text-gray-500">{vital.label}</span>
                            </div>
                            <div className="text-xl font-black text-gray-800">{vital.value}</div>
                            <div className="text-xs font-semibold text-gray-400">{vital.unit}</div>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                          <Clock className="w-4 h-4" />
                          Wait: {caseItem.waitTime} min
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl font-bold text-sm border-2 border-white"
                          style={{
                            boxShadow: '0 6px 16px rgba(139, 92, 246, 0.4)'
                          }}
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom 3D Shadow */}
                  <div 
                    className="absolute inset-0 -z-10 rounded-2xl opacity-50 blur-lg"
                    style={{
                      background: `linear-gradient(to bottom right, ${config.shadow}, transparent)`,
                      transform: 'translateY(8px)'
                    }}
                  />
                </motion.div>
              );
            })}
        </div>

        {/* Stats Panel */}
        <div className="space-y-6">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border-2 border-purple-200"
            style={{
              boxShadow: '0 12px 32px rgba(139, 92, 246, 0.15), 0 4px 8px rgba(0, 0, 0, 0.08)'
            }}
          >
            <h3 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-500" />
              Real-time Monitor
            </h3>

            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 mt-4">
              {chartData.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ 
                        backgroundColor: item.color,
                        boxShadow: `0 2px 4px ${item.color}66`
                      }}
                    />
                    <span className="font-bold text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-xl font-black" style={{ color: item.color }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white border-2 border-indigo-700"
            style={{
              boxShadow: '0 12px 32px rgba(99, 102, 241, 0.4), inset 0 2px 8px rgba(255, 255, 255, 0.2)'
            }}
          >
            <h3 className="text-lg font-black mb-4">⚡ Quick Stats</h3>
            <div className="space-y-3">
              {[
                { label: "Total Cases", value: cases.length },
                { label: "Avg Wait", value: `${Math.round(cases.reduce((acc, c) => acc + c.waitTime, 0) / cases.length)} min` },
                { label: "AI Accuracy", value: "96%" },
              ].map((stat, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="font-semibold text-white/90">{stat.label}</span>
                  <span className="text-2xl font-black">{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <ModernAIModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        caseData={selectedCase}
      />
    </div>
  );
}

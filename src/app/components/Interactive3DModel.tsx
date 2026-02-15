import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Rotate3D, ZoomIn, ZoomOut, RotateCcw, RotateCw } from "lucide-react";

interface BodyPartData {
  id: string;
  name: string;
  thaiName: string;
  position: { x: number; y: number };
  status: "normal" | "warning" | "critical" | "unknown";
  details: string;
  findings: string[];
  icon: any;
}

interface Interactive3DModelProps {
  imageUrl: string | null;
  bodyParts: BodyPartData[];
  analyzing: boolean;
  analyzed: boolean;
  onPartSelect: (part: BodyPartData | null) => void;
  selectedPart: BodyPartData | null;
}

export default function Interactive3DModel({
  imageUrl,
  bodyParts,
  analyzing,
  analyzed,
  onPartSelect,
  selectedPart
}: Interactive3DModelProps) {
  const [rotateY, setRotateY] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [autoRotate, setAutoRotate] = useState(false);
  const [viewAngle, setViewAngle] = useState(0); // 0 = front, 180 = back

  const resetView = () => {
    setRotateY(0);
    setRotateX(0);
    setZoom(1);
    setViewAngle(0);
    setAutoRotate(false);
  };

  const toggleView = () => {
    setViewAngle(prev => prev === 0 ? 180 : 0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "#10B981";
      case "warning": return "#F59E0B";
      case "critical": return "#EF4444";
      default: return "#9CA3AF";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border-2 border-indigo-200 relative overflow-hidden"
      style={{
        boxShadow: '0 12px 32px rgba(99, 102, 241, 0.2)'
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-black text-gray-800 flex items-center gap-2">
          <Rotate3D className="w-6 h-6 text-indigo-600" />
          🎯 เลือกตำแหน่งที่มีปัญหา (Visual UI)
        </h3>
        
        {imageUrl && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(prev => Math.max(0.7, prev - 0.1))}
              className="p-2 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-all border-2 border-indigo-200"
              title="ซูมออก"
            >
              <ZoomOut className="w-4 h-4 text-indigo-600" />
            </button>
            <button
              onClick={() => setZoom(prev => Math.min(1.5, prev + 0.1))}
              className="p-2 bg-indigo-100 rounded-lg hover:bg-indigo-200 transition-all border-2 border-indigo-200"
              title="ซูมเข้า"
            >
              <ZoomIn className="w-4 h-4 text-indigo-600" />
            </button>
            <button
              onClick={toggleView}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-bold text-sm border-2 border-white flex items-center gap-2"
              style={{
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)'
              }}
              title="หมุน 180°"
            >
              <RotateCw className="w-4 h-4" />
              หมุน
            </button>
            <button
              onClick={resetView}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all border-2 border-gray-200"
              title="รีเซ็ต"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div 
        className="relative rounded-xl overflow-visible"
        style={{
          height: '600px',
          perspective: '2000px',
          perspectiveOrigin: 'center center'
        }}
      >
        {!imageUrl ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              📸
            </motion.div>
            <p className="text-lg font-bold text-gray-600">อัพโหลดรูปภาพเพื่อเริ่มการวิเคราะห์</p>
            <p className="text-sm text-gray-500 mt-2">ระบบจะสร้างโมเดล 3D แบบหมุนได้ 180°</p>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* 3D Scene with proper perspective */}
            <motion.div
              className="relative"
              style={{
                transformStyle: 'preserve-3d',
                transform: `
                  rotateY(${viewAngle + rotateY}deg) 
                  rotateX(${rotateX}deg) 
                  scale(${zoom})
                `,
                transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              animate={autoRotate ? {
                rotateY: [0, 360]
              } : {}}
              transition={autoRotate ? {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              } : {}}
            >
              {/* 3D Card Container */}
              <div
                className="relative"
                style={{
                  width: '450px',
                  height: '450px',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Main 3D Card Front Side */}
                <motion.div
                  className="absolute inset-0 rounded-3xl overflow-hidden border-8 border-white"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(60px) rotateY(5deg)',
                    boxShadow: `
                      0 40px 80px rgba(0, 0, 0, 0.3),
                      0 20px 40px rgba(0, 0, 0, 0.2),
                      0 10px 20px rgba(0, 0, 0, 0.15),
                      inset 0 2px 8px rgba(255, 255, 255, 0.4)
                    `,
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,240,255,0.8))'
                  }}
                >
                  {/* Image */}
                  <img 
                    src={imageUrl} 
                    alt="Pet for analysis"
                    className="w-full h-full object-cover"
                    style={{
                      filter: analyzing ? 'blur(4px) brightness(0.8)' : 'none'
                    }}
                  />

                  {/* Glass overlay */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 pointer-events-none"
                    style={{
                      mixBlendMode: 'overlay'
                    }}
                  />

                  {/* Analyzing Overlay */}
                  <AnimatePresence>
                    {analyzing && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-md flex items-center justify-center"
                      >
                        <div className="text-center">
                          <motion.div
                            animate={{ 
                              rotate: 360,
                              scale: [1, 1.2, 1]
                            }}
                            transition={{ 
                              rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                              scale: { duration: 1, repeat: Infinity }
                            }}
                            className="text-7xl mb-4"
                          >
                            🧠
                          </motion.div>
                          <p className="text-2xl font-black text-white">AI กำลังวิเคราะห์...</p>
                          <div className="mt-4 flex gap-2 justify-center">
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                animate={{ 
                                  scale: [1, 1.5, 1],
                                  opacity: [0.5, 1, 0.5]
                                }}
                                transition={{ 
                                  duration: 1,
                                  repeat: Infinity,
                                  delay: i * 0.2
                                }}
                                className="w-4 h-4 bg-white rounded-full"
                                style={{
                                  boxShadow: '0 4px 8px rgba(255, 255, 255, 0.4)'
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Body Part Markers */}
                  {analyzed && bodyParts.map((part, idx) => {
                    const isSelected = selectedPart?.id === part.id;
                    const color = getStatusColor(part.status);

                    return (
                      <motion.div
                        key={part.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: idx * 0.1, type: "spring", stiffness: 200 }}
                        style={{
                          position: 'absolute',
                          left: `${part.position.x}%`,
                          top: `${part.position.y}%`,
                          transform: 'translate(-50%, -50%)',
                          zIndex: isSelected ? 30 : 20
                        }}
                      >
                        <motion.button
                          onClick={() => onPartSelect(part)}
                          whileHover={{ 
                            scale: 1.4,
                            z: 40
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="relative"
                          animate={part.status === "critical" ? {
                            scale: [1, 1.3, 1],
                          } : {}}
                          transition={part.status === "critical" ? {
                            duration: 1.5,
                            repeat: Infinity
                          } : {}}
                        >
                          {/* 3D Marker */}
                          <div 
                            className="w-14 h-14 rounded-full border-4 border-white backdrop-blur-md flex items-center justify-center relative"
                            style={{
                              backgroundColor: `${color}EE`,
                              boxShadow: `
                                0 12px 32px ${color}BB, 
                                0 6px 16px ${color}88,
                                0 0 48px ${color}66,
                                inset 0 3px 10px rgba(255, 255, 255, 0.5),
                                inset 0 -2px 8px rgba(0, 0, 0, 0.2)
                              `,
                              transform: `translateZ(${isSelected ? 40 : 20}px)`
                            }}
                          >
                            <part.icon className="w-7 h-7 text-white drop-shadow-lg" strokeWidth={2.5} />
                            
                            {/* Status Dot */}
                            <motion.div 
                              className="absolute -top-1 -right-1 w-5 h-5 rounded-full border-3 border-white"
                              style={{ 
                                backgroundColor: color,
                                boxShadow: `0 4px 12px ${color}AA, 0 0 20px ${color}77`
                              }}
                              animate={{
                                scale: part.status === "critical" ? [1, 1.3, 1] : 1
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity
                              }}
                            />

                            {/* Glow overlay */}
                            <div 
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), transparent 60%)'
                              }}
                            />
                          </div>

                          {/* Animated Pulse Rings */}
                          {[0, 1].map((ringIdx) => (
                            <motion.div
                              key={ringIdx}
                              className="absolute inset-0 rounded-full border-4"
                              style={{ 
                                borderColor: color,
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'
                              }}
                              animate={{ 
                                scale: [1, 2.5, 1],
                                opacity: [0.8, 0, 0.8]
                              }}
                              transition={{ 
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeOut",
                                delay: ringIdx * 0.4
                              }}
                            />
                          ))}

                          {/* Label on Hover/Select */}
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, y: 15, scale: 0.8 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-xl whitespace-nowrap border-4 z-50"
                              style={{
                                borderColor: color,
                                boxShadow: `0 8px 24px ${color}66, 0 4px 12px rgba(0,0,0,0.2)`,
                                transform: 'translate(-50%, 0) translateZ(50px)'
                              }}
                            >
                              <p className="font-black text-sm text-gray-800">
                                {part.thaiName}
                              </p>
                              <p className="text-xs font-semibold" style={{ color }}>
                                {part.name}
                              </p>
                            </motion.div>
                          )}
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Back Side (optional - for future use) */}
                <motion.div
                  className="absolute inset-0 rounded-3xl overflow-hidden border-8 border-white bg-gradient-to-br from-indigo-100 to-purple-100"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(60px) rotateY(185deg)',
                    boxShadow: `
                      0 40px 80px rgba(0, 0, 0, 0.3),
                      0 20px 40px rgba(0, 0, 0, 0.2),
                      inset 0 2px 8px rgba(255, 255, 255, 0.4)
                    `
                  }}
                >
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-2xl font-black text-gray-800 mb-2">
                        มุมมองด้านหลัง
                      </h3>
                      <p className="text-gray-600 font-semibold">
                        สำหรับตรวจสอบส่วนอื่นๆ ของสัตว์เลี้ยง
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* 3D Shadow Base */}
                <div
                  className="absolute rounded-full blur-3xl opacity-40"
                  style={{
                    width: '500px',
                    height: '100px',
                    background: 'radial-gradient(ellipse, rgba(0,0,0,0.5), transparent 70%)',
                    bottom: '-120px',
                    left: '50%',
                    transform: 'translateX(-50%) translateZ(-100px) rotateX(90deg)',
                  }}
                />
              </div>
            </motion.div>

            {/* Instructions */}
            {!analyzing && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-6 py-3 rounded-2xl border-4 border-indigo-200"
                style={{
                  boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)'
                }}
              >
                <p className="text-sm font-black text-indigo-700 text-center">
                  🔄 กด "หมุน" เพื่อดูมุม 180° | 👆 คลิกจุดสีเพื่อดูรายละเอียด
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      {analyzed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 grid grid-cols-3 gap-3"
        >
          {[
            { status: "normal", label: "ปกติ", color: "#10B981" },
            { status: "warning", label: "เฝ้าระวัง", color: "#F59E0B" },
            { status: "critical", label: "ฉุกเฉิน", color: "#EF4444" },
          ].map((item, idx) => (
            <motion.div 
              key={item.status} 
              className="flex items-center gap-2 bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 rounded-xl border-2 border-gray-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + idx * 0.1 }}
              style={{
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08)'
              }}
            >
              <motion.div 
                className="w-4 h-4 rounded-full border-2 border-white"
                style={{ 
                  backgroundColor: item.color,
                  boxShadow: `0 4px 12px ${item.color}88, 0 0 20px ${item.color}44`
                }}
                animate={{
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.3
                }}
              />
              <span className="text-sm font-black text-gray-700">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Auto-rotate toggle */}
      {imageUrl && analyzed && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => setAutoRotate(!autoRotate)}
          className={`mt-4 w-full py-3 rounded-xl font-bold text-sm border-2 transition-all ${
            autoRotate 
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-white' 
              : 'bg-gray-100 text-gray-700 border-gray-200 hover:border-gray-300'
          }`}
          style={{
            boxShadow: autoRotate 
              ? '0 6px 16px rgba(16, 185, 129, 0.4)' 
              : '0 2px 6px rgba(0, 0, 0, 0.08)'
          }}
        >
          {autoRotate ? '⏸️ หยุดหมุนอัตโนมัติ' : '▶️ หมุนอัตโนมัติ'}
        </motion.button>
      )}
    </motion.div>
  );
}

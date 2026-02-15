import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BedDouble,
  Activity,
  Heart,
  Stethoscope,
  X,
  Users,
  CheckCircle2,
  AlertCircle,
  Loader2
} from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { 
  OrbitControls, 
  RoundedBox, 
  Environment, 
  Html,
  ContactShadows,
  Text
} from "@react-three/drei";

const rooms = [
  { id: 1, name: "ER 1", status: "occupied", patient: "Luna", type: "emergency" },
  { id: 2, name: "ER 2", status: "available", patient: null, type: "emergency" },
  { id: 3, name: "ER 3", status: "occupied", patient: "Mochi", type: "emergency" },
  { id: 4, name: "ICU 1", status: "occupied", patient: "Max", type: "icu" },
  { id: 5, name: "ICU 2", status: "available", patient: null, type: "icu" },
  { id: 6, name: "Recovery", status: "cleaning", patient: null, type: "recovery" },
];

const doctors = [
  { id: 1, name: "Dr. สมชาย ใจดี", specialty: "Emergency Med", status: "busy", currentCase: "Luna (Critical)" },
  { id: 2, name: "Dr. วรรณา สุขใส", specialty: "Internal Med", status: "available", currentCase: null },
  { id: 3, name: "Dr. ปรีชา รักสัตว์", specialty: "Surgery", status: "busy", currentCase: "Max (Urgent)" },
  { id: 4, name: "Dr. สุดา ดีใจ", specialty: "Critical Care", status: "available", currentCase: null },
];

// 🎨 3D Component: โมเดลเตียงคนไข้
const BedModel = ({ color }: { color: string }) => (
  <group position={[0, 0.4, 0]}>
    {/* ฐานเตียง */}
    <mesh position={[0, 0, 0]} castShadow receiveShadow>
      <boxGeometry args={[1.6, 0.4, 2.4]} />
      <meshStandardMaterial color="#CBD5E1" roughness={0.2} />
    </mesh>
    {/* ฟูกที่นอน */}
    <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
      <boxGeometry args={[1.5, 0.3, 2.3]} />
      <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
    </mesh>
    {/* หมอน */}
    <mesh position={[0, 0.5, -0.8]} castShadow receiveShadow>
      <boxGeometry args={[1, 0.2, 0.5]} />
      <meshStandardMaterial color="#F8FAFC" roughness={0.9} />
    </mesh>
    {/* ผ้าห่ม (เปลี่ยนสีตามสถานะห้อง) */}
    <mesh position={[0, 0.46, 0.3]} castShadow receiveShadow>
      <boxGeometry args={[1.55, 0.1, 1.6]} />
      <meshStandardMaterial color={color} roughness={0.6} />
    </mesh>
  </group>
);

// 🎨 3D Component: ห้องพัก 1 ห้อง
const WardRoom3D = ({ room, isSelected, onClick, position }: any) => {
  const [hovered, setHovered] = useState(false);

  const getRoomStyle = (status: string) => {
    switch (status) {
      case "occupied": return { color: "#FF6B6B", border: "#991B1B" };
      case "available": return { color: "#4ADE80", border: "#166534" };
      case "cleaning": return { color: "#FFD93D", border: "#854D0E" };
      default: return { color: "#E2E8F0", border: "#334155" };
    }
  };

  const style = getRoomStyle(room.status);
  const Icon = room.type === "emergency" ? Activity : room.type === "icu" ? Heart : room.type === "recovery" ? Stethoscope : BedDouble;

  const roomWidth = 4;
  const roomDepth = 4;
  const wallHeight = 1.5;
  const wallThickness = 0.2;

  return (
    <group 
      position={position} 
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
      className="cursor-pointer"
    >
      {/* เอฟเฟกต์เลือกห้อง */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[roomWidth + 0.2, 0.1, roomDepth + 0.2]} />
        <meshStandardMaterial color={isSelected ? "#A855F7" : hovered ? "#CBD5E1" : "#0f172a"} />
      </mesh>

      {/* พื้นห้อง */}
      <RoundedBox args={[roomWidth, 0.2, roomDepth]} position={[0, 0.15, 0]} radius={0.05} receiveShadow>
        <meshStandardMaterial color={style.color} roughness={0.4} />
      </RoundedBox>

      {/* ผนัง (จัดแบบเข้ามุม 2 ด้าน) */}
      <group position={[0, 0.15 + wallHeight/2, 0]}>
        {/* ผนังหลัง */}
        <mesh position={[0, 0, -roomDepth/2 + wallThickness/2]} castShadow receiveShadow>
          <boxGeometry args={[roomWidth, wallHeight, wallThickness]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.2} />
        </mesh>
        {/* ผนังซ้าย */}
        <mesh position={[-roomWidth/2 + wallThickness/2, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[wallThickness, wallHeight, roomDepth]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.2} />
        </mesh>
      </group>

      {/* เฟอร์นิเจอร์: เตียง */}
      <BedModel color={style.color} />

      {/* 2D UI ซ้อนบน 3D (ชื่อห้องและไอคอน) */}
      <Html position={[0, 2.5, 0]} center zIndexRange={[100, 0]} className="pointer-events-none">
        <motion.div 
          animate={isSelected ? { y: -10, scale: 1.1 } : { y: 0, scale: 1 }}
          className={`flex flex-col items-center justify-center p-2 rounded-xl border-[3px] border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] transition-colors
            ${isSelected ? 'bg-[#A855F7] text-white' : 'bg-white text-slate-900'}
          `}
        >
          <Icon className="w-5 h-5 mb-1" strokeWidth={3} />
          <span className="text-[10px] font-black uppercase whitespace-nowrap">{room.name}</span>
        </motion.div>
      </Html>

      {/* ป้ายชื่อคนไข้ (ถ้ามี) */}
      {room.patient && (
        <Html position={[0, 1.2, 1.5]} center zIndexRange={[100, 0]} className="pointer-events-none">
          <div className="bg-slate-900 text-white px-2 py-1 rounded-md text-[10px] font-black uppercase shadow-lg border-[2px] border-white/20 whitespace-nowrap">
            🐾 {room.patient}
          </div>
        </Html>
      )}
    </group>
  );
};

// 🎨 3D Scene หลัก
const WardScene = ({ selectedRoom, setSelectedRoom }: any) => {
  const gridCols = 3;
  const spacingX = 4.5;
  const spacingZ = 4.5;

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 20, 15]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />
      <Environment preset="city" />
      
      {/* Group จัดตำแหน่ง Grid ให้อยู่กึ่งกลาง */}
      <group position={[-(spacingX * 2) / 2, 0, -spacingZ / 2]}>
        {rooms.map((room, index) => {
          const row = Math.floor(index / gridCols);
          const col = index % gridCols;
          return (
            <WardRoom3D
              key={room.id}
              room={room}
              isSelected={selectedRoom === room.id}
              onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
              position={[col * spacingX, 0, row * spacingZ]}
            />
          );
        })}
      </group>

      <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={30} blur={2} far={4} />
      {/* พื้นตาราง */}
      <gridHelper args={[30, 30, "#94A3B8", "#E2E8F0"]} position={[0, -0.05, 0]} />
    </>
  );
};

export default function WardLogistics() {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  const getRoomColor = (status: string) => {
    switch (status) {
      case "occupied": return "#FF6B6B";
      case "available": return "#4ADE80";
      case "cleaning": return "#FFD93D";
      default: return "#E2E8F0";
    }
  };

  const getRoomIcon = (type: string) => {
    switch (type) {
      case "emergency": return Activity;
      case "icu": return Heart;
      case "recovery": return Stethoscope;
      default: return BedDouble;
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto font-sans text-slate-900 space-y-6 md:space-y-8 pb-12">
      
      {/* 🟢 Header Title */}
      <div className="flex items-center gap-4 border-b-[4px] border-slate-900 pb-4 md:pb-6">
        <div className="bg-[#A855F7] border-[3px] border-slate-900 rounded-xl p-3 shadow-[4px_4px_0px_0px_#0f172a]">
          <BedDouble className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={3} />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase text-slate-900 drop-shadow-[2px_2px_0px_#fff]">
            Ward Logistics
          </h2>
          <span className="bg-slate-900 text-white text-[10px] md:text-xs font-bold px-3 py-1 uppercase rounded-md tracking-widest mt-1 inline-block">
            Hospital Resource Management
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* 📌 Left Panel: 3D Floor Plan & Room Details */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          
          {/* 3D Map Container */}
          <div className="bg-white border-[4px] border-slate-900 rounded-2xl p-6 shadow-[5px_5px_0px_0px_#0f172a]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-xl font-black uppercase flex items-center gap-2 text-slate-800">
                <span className="bg-slate-900 text-white w-6 h-6 flex items-center justify-center rounded-md text-sm">1</span>
                3D Ward Floor Plan
              </h3>
              
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { label: "Available", color: "#4ADE80" },
                  { label: "Occupied", color: "#FF6B6B" },
                  { label: "Cleaning", color: "#FFD93D" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 bg-slate-50 border-[2px] border-slate-900 px-2 py-1 rounded-md">
                    <div className="w-3 h-3 border-[2px] border-slate-900 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] font-black uppercase tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 🚀 3D Canvas 🚀 */}
            <div className="relative bg-[#F8FAFC] border-[4px] border-slate-900 rounded-xl h-[450px] md:h-[550px] shadow-[inset_0px_4px_10px_rgba(0,0,0,0.05)] overflow-hidden cursor-move">
              <Suspense fallback={<div className="absolute inset-0 flex flex-col items-center justify-center font-black text-slate-400 gap-4"><Loader2 className="w-10 h-10 animate-spin text-[#A855F7]" />LOADING 3D WARD...</div>}>
                <Canvas shadows camera={{ position: [0, 12, 12], fov: 45 }}>
                  <OrbitControls 
                    enablePan={true} 
                    enableZoom={true} 
                    minPolarAngle={Math.PI / 6} 
                    maxPolarAngle={Math.PI / 2.2}
                  />
                  <WardScene selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
                </Canvas>
              </Suspense>
              
              {/* Hint Overlay */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none">
                <span className="bg-slate-900/90 backdrop-blur-sm text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg border-[2px] border-white/20">
                  Drag to Rotate • Scroll to Zoom • Click Room
                </span>
              </div>
            </div>
          </div>

          {/* Selected Room Details */}
          <AnimatePresence mode="wait">
            {selectedRoom && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                className="overflow-hidden"
              >
                {rooms.filter(r => r.id === selectedRoom).map(room => {
                  const bgColor = getRoomColor(room.status);
                  const Icon = getRoomIcon(room.type);
                  
                  return (
                    <div key={`detail-${room.id}`} className="bg-white border-[4px] border-slate-900 rounded-2xl p-6 shadow-[5px_5px_0px_0px_#0f172a] relative mt-6">
                      <button onClick={() => setSelectedRoom(null)} className="absolute top-4 right-4 p-1.5 bg-slate-100 border-[2px] border-slate-900 rounded-lg hover:bg-slate-200 transition-colors">
                        <X className="w-5 h-5 text-slate-900" strokeWidth={3} />
                      </button>

                      <div className="flex items-start gap-4 mb-6">
                        <div className="p-4 border-[3px] border-slate-900 rounded-xl shadow-[3px_3px_0px_0px_#0f172a]" style={{ backgroundColor: bgColor }}>
                          <Icon className="w-8 h-8 text-slate-900" strokeWidth={2.5} />
                        </div>
                        <div className="mt-1">
                          <h4 className="text-2xl font-black uppercase text-slate-900 leading-none mb-1">{room.name}</h4>
                          <span className="text-xs font-bold uppercase text-slate-500 tracking-widest bg-slate-100 px-2 py-1 rounded-md border-[2px] border-slate-900">
                            Type: {room.type}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 border-[3px] border-slate-900 rounded-xl p-4">
                          <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Current Status</p>
                          <p className="text-lg font-black uppercase flex items-center gap-2" style={{ color: room.status === 'occupied' ? '#EF4444' : room.status === 'available' ? '#22C55E' : '#EAB308' }}>
                            <CheckCircle2 className="w-5 h-5" strokeWidth={3} /> {room.status}
                          </p>
                        </div>
                        <div className="bg-slate-50 border-[3px] border-slate-900 rounded-xl p-4">
                          <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Patient Assigned</p>
                          <p className="text-lg font-black uppercase text-slate-900">
                            {room.patient ? `🐾 ${room.patient}` : 'NONE'}
                          </p>
                        </div>
                      </div>

                      {room.status === "available" && (
                        <motion.button
                          whileHover={{ y: -2 }}
                          whileTap={{ y: 2, boxShadow: '0px 0px 0px 0px #0f172a' }}
                          className="w-full mt-6 bg-[#4ADE80] text-slate-900 border-[4px] border-slate-900 rounded-xl py-4 font-black uppercase text-lg shadow-[4px_4px_0px_0px_#0f172a] hover:bg-[#22C55E] transition-all"
                        >
                          Assign Patient to Room
                        </motion.button>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 📌 Right Panel: Staff & Summary */}
        <div className="lg:col-span-5 space-y-6 md:space-y-8">
          
          <div className="bg-[#A855F7] border-[4px] border-slate-900 rounded-2xl p-6 shadow-[5px_5px_0px_0px_#0f172a]">
             <h3 className="text-xl font-black uppercase text-white mb-5 flex items-center gap-2 drop-shadow-[2px_2px_0px_#000]">
              <Activity className="w-6 h-6" strokeWidth={3} /> Resource Summary
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Free Rooms", value: rooms.filter((r) => r.status === "available").length, color: "bg-[#4ADE80]" },
                { label: "Occupied", value: rooms.filter((r) => r.status === "occupied").length, color: "bg-[#FF6B6B]" },
                { label: "Free Doctors", value: doctors.filter((d) => d.status === "available").length, color: "bg-[#4ADE80]" },
                { label: "Busy Doctors", value: doctors.filter((d) => d.status === "busy").length, color: "bg-[#FFD93D]" },
              ].map((item, idx) => (
                <div key={idx} className={`${item.color} border-[3px] border-slate-900 rounded-xl p-4 text-center shadow-[3px_3px_0px_0px_#0f172a]`}>
                  <p className="text-3xl font-black text-slate-900">{item.value}</p>
                  <p className="text-[10px] md:text-xs mt-1 font-black uppercase tracking-wider text-slate-800">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border-[4px] border-slate-900 rounded-2xl p-6 shadow-[5px_5px_0px_0px_#0f172a]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-black uppercase flex items-center gap-2 text-slate-800">
                <Users className="w-6 h-6 text-slate-900" strokeWidth={3} />
                Medical Staff
              </h3>
            </div>
            <div className="space-y-4">
              {doctors.map((doctor) => {
                const isAvailable = doctor.status === "available";
                return (
                  <div key={doctor.id} className="bg-slate-50 border-[3px] border-slate-900 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`text-2xl w-12 h-12 flex items-center justify-center rounded-xl border-[2px] border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] shrink-0
                        ${isAvailable ? 'bg-[#4ADE80]' : 'bg-[#FF6B6B]'}
                      `}>
                        {isAvailable ? '👩‍⚕️' : '👨‍⚕️'}
                      </div>
                      <div>
                        <h4 className="font-black uppercase text-slate-900">{doctor.name}</h4>
                        <p className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Spec: {doctor.specialty}</p>
                        {doctor.currentCase && (
                          <div className="mt-1 flex items-center gap-1.5 text-xs font-black text-rose-600 bg-rose-100 px-2 py-0.5 rounded border border-rose-200 w-fit">
                            <AlertCircle className="w-3 h-3" strokeWidth={3} /> {doctor.currentCase}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                      <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase border-[2px] border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]
                        ${isAvailable ? "bg-[#4ADE80] text-slate-900" : "bg-[#FFD93D] text-slate-900"}
                      `}>
                        {doctor.status}
                      </span>
                      {isAvailable && (
                        <button className="text-[10px] font-black uppercase text-white bg-slate-900 px-3 py-1 rounded-md border-[2px] border-slate-900 hover:bg-slate-800 transition-colors w-full sm:w-auto">
                          Assign
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white border-[4px] border-slate-900 rounded-2xl p-6 shadow-[5px_5px_0px_0px_#0f172a]">
            <h3 className="text-xl font-black uppercase text-slate-800 mb-5 flex items-center gap-2">
              <Activity className="w-6 h-6" strokeWidth={3} /> Equipment Status
            </h3>
            <div className="space-y-4">
              {[
                { name: "Oxygen Tanks", available: 8, total: 10, color: "#4ADE80" },
                { name: "Ventilators", available: 2, total: 3, color: "#FFD93D" },
                { name: "IV Pumps", available: 12, total: 15, color: "#4ADE80" },
                { name: "Monitors", available: 1, total: 4, color: "#FF6B6B" },
              ].map((eq, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-black uppercase text-slate-700">{eq.name}</span>
                    <span className="text-sm font-black text-slate-900">
                      {eq.available} <span className="text-xs text-slate-400">/ {eq.total}</span>
                    </span>
                  </div>
                  <div className="h-4 bg-slate-100 border-[2px] border-slate-900 rounded-md overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(eq.available / eq.total) * 100}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className="absolute top-0 left-0 bottom-0 border-r-[2px] border-slate-900"
                      style={{ backgroundColor: eq.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
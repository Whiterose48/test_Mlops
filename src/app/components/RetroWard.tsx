import { useState } from "react";
import { motion } from "motion/react";

const rooms = [
  { id: 1, name: "ER-1", status: "occupied", patient: "LUNA", color: "#FF6B6B", floor: 0 },
  { id: 2, name: "ER-2", status: "available", patient: null, color: "#6BCF7F", floor: 0 },
  { id: 3, name: "ER-3", status: "occupied", patient: "MOCHI", color: "#FF6B6B", floor: 0 },
  { id: 4, name: "ICU-1", status: "occupied", patient: "MAX", color: "#FFD93D", floor: 1 },
  { id: 5, name: "ICU-2", status: "available", patient: null, color: "#6BCF7F", floor: 1 },
  { id: 6, name: "REC-1", status: "cleaning", patient: null, color: "#B388FF", floor: 1 },
];

const doctors = [
  { id: 1, name: "DR.SOMCHAI", status: "busy", case: "LUNA", sprite: "👨‍⚕️", hp: 85, mp: 60 },
  { id: 2, name: "DR.WANNA", status: "available", case: null, sprite: "👩‍⚕️", hp: 100, mp: 100 },
  { id: 3, name: "DR.PREECHA", status: "busy", case: "MAX", sprite: "👨‍⚕️", hp: 70, mp: 40 },
  { id: 4, name: "DR.SUDA", status: "available", case: null, sprite: "👩‍⚕️", hp: 95, mp: 85 },
];

const equipment = [
  { name: "OXYGEN", available: 8, total: 10, icon: "O₂", color: "#00E5FF" },
  { name: "VENTILATOR", available: 2, total: 3, icon: "⚡", color: "#FFD93D" },
  { name: "IV PUMP", available: 12, total: 15, icon: "💉", color: "#6BCF7F" },
  { name: "MONITOR", available: 1, total: 4, icon: "📊", color: "#FF6B6B" },
];

export default function RetroWard() {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'iso' | 'side'>('iso');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "occupied": return "▣";
      case "available": return "▢";
      case "cleaning": return "⚙";
      default: return "◯";
    }
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="text-center mb-4">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="retro-text text-[#FFD700] text-xl"
        >
          ▣ WARD LOGISTICS ▣
        </motion.div>
        <div className="retro-text text-[#B388FF] text-[8px] mt-2">
          HOSPITAL RESOURCE MANAGEMENT
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex justify-center gap-2">
        {['iso', 'side'].map((mode) => (
          <motion.button
            key={mode}
            onClick={() => setViewMode(mode as 'iso' | 'side')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 pixel-border ${
              viewMode === mode
                ? 'bg-[#FFD700] border-black'
                : 'bg-[#2D1B4E] border-[#7E57C2]'
            }`}
            style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
          >
            <span className={`retro-text text-[8px] ${viewMode === mode ? 'text-black' : 'text-white'}`}>
              {mode === 'iso' ? 'ISOMETRIC' : 'SIDE VIEW'}
            </span>
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Hospital Floor Plan - SimCity/Theme Hospital Style */}
        <div className="lg:col-span-2">
          <div className="bg-black/50 pixel-border border-[#00FF00] p-3">
            <div className="retro-text text-[#00FF00] text-[10px] mb-3 flex items-center justify-between">
              <span>▶ 3D HOSPITAL MAP</span>
              <span className="text-[#FFD700]">FLOOR 1-2</span>
            </div>

            {/* Isometric Hospital View */}
            {viewMode === 'iso' && (
              <div className="bg-gradient-to-b from-[#0A1929] to-[#1A0033] h-96 pixel-border border-[#7E57C2] relative overflow-hidden p-4">
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="hospitalGrid" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                        <line x1="0" y1="0" x2="0" y2="40" stroke="#00FF00" strokeWidth="1"/>
                        <line x1="0" y1="0" x2="40" y2="0" stroke="#00FF00" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hospitalGrid)" />
                  </svg>
                </div>

                {/* Isometric Rooms */}
                <svg viewBox="0 0 600 400" className="w-full h-full">
                  {rooms.map((room, idx) => {
                    const row = room.floor;
                    const col = idx % 3;
                    
                    // Isometric projection
                    const baseX = 150 + col * 140;
                    const baseY = 250 - row * 120;
                    
                    return (
                      <g key={room.id}>
                        {/* Room Base (3D Box) */}
                        <motion.g
                          whileHover={{ scale: 1.1 }}
                          onClick={() => setSelectedRoom(room.id)}
                          className="cursor-pointer"
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          {/* Top face */}
                          <polygon
                            points={`${baseX},${baseY} ${baseX+50},${baseY-25} ${baseX+50},${baseY+25} ${baseX},${baseY+50}`}
                            fill={room.color}
                            opacity="0.8"
                            stroke="#000"
                            strokeWidth="3"
                          />
                          {/* Left face */}
                          <polygon
                            points={`${baseX},${baseY} ${baseX},${baseY+50} ${baseX},${baseY+90} ${baseX},${baseY+40}`}
                            fill={room.color}
                            opacity="0.6"
                            stroke="#000"
                            strokeWidth="3"
                          />
                          {/* Right face */}
                          <polygon
                            points={`${baseX},${baseY} ${baseX+50},${baseY-25} ${baseX+50},${baseY+15} ${baseX},${baseY+40}`}
                            fill={room.color}
                            opacity="0.4"
                            stroke="#000"
                            strokeWidth="3"
                          />
                          
                          {/* Room Label */}
                          <text
                            x={baseX + 15}
                            y={baseY + 30}
                            fill="#000"
                            fontSize="10"
                            fontFamily="Press Start 2P"
                            fontWeight="bold"
                          >
                            {room.name}
                          </text>
                          
                          {/* Status Icon */}
                          <text
                            x={baseX + 15}
                            y={baseY + 45}
                            fill="#000"
                            fontSize="12"
                            fontFamily="Press Start 2P"
                          >
                            {getStatusIcon(room.status)}
                          </text>
                          
                          {/* Patient Name */}
                          {room.patient && (
                            <text
                              x={baseX + 10}
                              y={baseY + 60}
                              fill="#FFD700"
                              fontSize="8"
                              fontFamily="Press Start 2P"
                            >
                              {room.patient}
                            </text>
                          )}

                          {/* Glow effect if selected */}
                          {selectedRoom === room.id && (
                            <motion.polygon
                              points={`${baseX},${baseY} ${baseX+50},${baseY-25} ${baseX+50},${baseY+25} ${baseX},${baseY+50}`}
                              fill="none"
                              stroke="#FFD700"
                              strokeWidth="4"
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1, repeat: Infinity }}
                            />
                          )}
                        </motion.g>
                      </g>
                    );
                  })}
                </svg>

                {/* Mini Map */}
                <div className="absolute bottom-2 right-2 bg-black/80 pixel-border border-[#00FF00] p-2 w-24">
                  <div className="retro-text text-[#00FF00] text-[6px] mb-1">MAP</div>
                  <div className="grid grid-cols-3 gap-1">
                    {rooms.map(room => (
                      <div
                        key={room.id}
                        className="w-2 h-2 pixel-border border-black"
                        style={{ backgroundColor: room.color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Side View - Like Platformer Game */}
            {viewMode === 'side' && (
              <div className="bg-gradient-to-b from-[#0A1929] to-[#1A0033] h-96 pixel-border border-[#7E57C2] relative overflow-hidden">
                {rooms.map((room, idx) => {
                  const col = idx % 3;
                  const row = room.floor;
                  
                  return (
                    <motion.div
                      key={room.id}
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => setSelectedRoom(room.id)}
                      className="absolute cursor-pointer"
                      style={{
                        left: `${col * 33}%`,
                        bottom: `${row * 50}%`,
                        width: '30%',
                        height: '45%'
                      }}
                    >
                      <div 
                        className="w-full h-full pixel-border p-2 relative"
                        style={{ 
                          borderColor: room.color,
                          backgroundColor: `${room.color}33`,
                          boxShadow: selectedRoom === room.id 
                            ? `0 0 20px ${room.color}, inset 0 0 10px ${room.color}44`
                            : '4px 4px 0px rgba(0,0,0,0.5)'
                        }}
                      >
                        <div className="retro-text text-white text-[8px]">{room.name}</div>
                        <div className="text-2xl mt-2">{getStatusIcon(room.status)}</div>
                        {room.patient && (
                          <div className="retro-text text-[#FFD700] text-[7px] mt-1">
                            {room.patient}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}

                {/* Platform floors */}
                {[0, 1].map(floor => (
                  <div
                    key={floor}
                    className="absolute w-full h-1 bg-[#7E57C2]"
                    style={{ bottom: `${floor * 50}%` }}
                  />
                ))}
              </div>
            )}

            <div className="retro-text text-[#FFD700] text-[7px] mt-2 text-center">
              CLICK ROOM FOR DETAILS
            </div>
          </div>

          {/* Room Details */}
          {selectedRoom && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-black/70 pixel-border border-[#FFD700] p-3"
            >
              {rooms
                .filter(r => r.id === selectedRoom)
                .map(room => (
                  <div key={room.id}>
                    <div className="retro-text text-[#FFD700] text-[10px] mb-3">
                      ROOM INFO: {room.name}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-black/50 pixel-border border-white p-2">
                        <div className="retro-text text-white text-[7px]">STATUS</div>
                        <div className="retro-text text-[8px] mt-1" style={{ color: room.color }}>
                          {room.status.toUpperCase()}
                        </div>
                      </div>
                      <div className="bg-black/50 pixel-border border-white p-2">
                        <div className="retro-text text-white text-[7px]">PATIENT</div>
                        <div className="retro-text text-[#FFD700] text-[8px] mt-1">
                          {room.patient || "NONE"}
                        </div>
                      </div>
                    </div>
                    {room.status === "available" && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-3 bg-[#6BCF7F] pixel-border border-black py-2"
                        style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                      >
                        <span className="retro-text text-black text-[8px]">
                          ▶ ASSIGN PATIENT
                        </span>
                      </motion.button>
                    )}
                  </div>
                ))}
            </motion.div>
          )}
        </div>

        {/* Right Panel - Staff & Equipment */}
        <div className="space-y-4">
          {/* Doctors - Character Select Style */}
          <div className="bg-black/50 pixel-border border-[#FF69B4] p-3">
            <div className="retro-text text-[#FF69B4] text-[10px] mb-3">
              ▶ MEDICAL STAFF
            </div>
            <div className="space-y-2">
              {doctors.map((doc, idx) => (
                <motion.div
                  key={doc.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`pixel-border p-2 ${
                    doc.status === "available"
                      ? 'bg-[#6BCF7F] border-black'
                      : 'bg-[#FF6B6B] border-black'
                  }`}
                  style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-2xl" style={{ imageRendering: 'pixelated' }}>
                      {doc.sprite}
                    </div>
                    <div className="flex-1">
                      <div className="retro-text text-black text-[8px]">
                        {doc.name}
                      </div>
                      <div className="retro-text text-[7px]" style={{ 
                        color: doc.status === "available" ? "#004D00" : "#FFFFFF" 
                      }}>
                        {doc.status.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  {/* HP/MP Bars */}
                  <div className="space-y-1">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="retro-text text-black text-[6px]">HP</span>
                        <span className="retro-text text-black text-[6px]">{doc.hp}/100</span>
                      </div>
                      <div className="h-2 bg-black pixel-border border-black">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${doc.hp}%` }}
                          className="h-full bg-[#00FF00]"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="retro-text text-black text-[6px]">MP</span>
                        <span className="retro-text text-black text-[6px]">{doc.mp}/100</span>
                      </div>
                      <div className="h-2 bg-black pixel-border border-black">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${doc.mp}%` }}
                          className="h-full bg-[#00E5FF]"
                        />
                      </div>
                    </div>
                  </div>

                  {doc.case && (
                    <div className="mt-2 bg-black/30 pixel-border border-black p-1">
                      <div className="retro-text text-white text-[6px]">
                        CASE: {doc.case}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Equipment - Item Inventory Style */}
          <div className="bg-black/50 pixel-border border-[#FFD700] p-3">
            <div className="retro-text text-[#FFD700] text-[10px] mb-3">
              ▶ EQUIPMENT
            </div>
            <div className="grid grid-cols-2 gap-2">
              {equipment.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.1, type: "spring" }}
                  className="bg-gradient-to-b from-[#1A0033] to-[#2D1B4E] pixel-border p-2"
                  style={{ borderColor: item.color }}
                >
                  <div className="text-center mb-1 text-xl">{item.icon}</div>
                  <div className="retro-text text-white text-[7px] text-center mb-1">
                    {item.name}
                  </div>
                  <div className="retro-text text-center text-[8px]" style={{ color: item.color }}>
                    {item.available}/{item.total}
                  </div>
                  <div className="h-2 bg-black pixel-border border-black mt-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.available / item.total) * 100}%` }}
                      transition={{ duration: 1, delay: 0.7 + idx * 0.1 }}
                      style={{ backgroundColor: item.color }}
                      className="h-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Summary Stats - Scoreboard */}
          <div className="bg-gradient-to-b from-[#4A148C] to-[#7B1FA2] pixel-border border-black p-3">
            <div className="retro-text text-[#FFD700] text-[10px] mb-3 text-center">
              ★ SUMMARY ★
            </div>
            <div className="space-y-2">
              {[
                { label: "FREE ROOMS", value: rooms.filter(r => r.status === "available").length },
                { label: "FREE DOCS", value: doctors.filter(d => d.status === "available").length },
                { label: "OCCUPIED", value: rooms.filter(r => r.status === "occupied").length },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-black/30 pixel-border border-[#FFD700] p-2"
                >
                  <span className="retro-text text-white text-[7px]">{stat.label}</span>
                  <span className="retro-text text-[#FFD700] text-[8px]">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  Star,
  Sparkles,
  Send,
  Trophy,
  Target,
  Zap,
  MessageCircle,
  BarChart2,
  Smile,
  X
} from "lucide-react";

const stickers = ["❤️", "🌟", "👏", "🎉", "💪", "🙌", "✨", "🎊"];
const noteColors = ["bg-[#FEF08A]", "bg-[#BBF7D0]", "bg-[#BFDBFE]", "bg-[#FBCFE8]"];

interface KudosMessage {
  id: number;
  from: string;
  to: string;
  message: string;
  sticker: string;
  timestamp: Date;
}

export default function ImpactCorner() {
  const [livesSaved, setLivesSaved] = useState(247);
  const [kudosMessages, setKudosMessages] = useState<KudosMessage[]>([
    {
      id: 1,
      from: "Dr. สมชาย",
      to: "ทีมทั้งหมด",
      message: "ทุกคนทำงานได้ยอดเยี่ยมมากวันนี้! จัดการเคสฉุกเฉินได้มืออาชีพสุดๆ",
      sticker: "👏",
      timestamp: new Date("2026-02-15T13:02:45"),
    },
    {
      id: 2,
      from: "พยาบาล วรรณา",
      to: "Dr. ปรีชา",
      message: "ขอบคุณที่ช่วยรักษา Luna นะคะ การผ่าตัดราบรื่นมากเลย!",
      sticker: "❤️",
      timestamp: new Date("2026-02-15T13:17:45"),
    },
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [selectedSticker, setSelectedSticker] = useState("❤️");
  
  // ✨ เริ่มต้นที่ 2 Kudos (เท่ากับ 50% ของ Level 0)
  const [kudosCount, setKudosCount] = useState(2); 
  
  const [showKudosForm, setShowKudosForm] = useState(false);
  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) setLivesSaved((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSendKudos = () => {
    if (newMessage.trim() && fromName.trim() && toName.trim()) {
      const newKudos: KudosMessage = {
        id: Date.now(),
        from: fromName,
        to: toName,
        message: newMessage,
        sticker: selectedSticker,
        timestamp: new Date(),
      };
      setKudosMessages([newKudos, ...kudosMessages]);
      setKudosCount((prev) => Math.min(prev + 1, 40));
      setNewMessage("");
      setFromName("");
      setToName("");
      setShowKudosForm(false);
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60);
    if (diff < 1) return "เมื่อสักครู่";
    if (diff < 60) return `${diff} นาทีที่แล้ว`;
    if (diff < 1440) {
      const hours = Math.floor(diff / 60);
      return `${hours} ชั่วโมงที่แล้ว`;
    }
    return date.toLocaleDateString('th-TH');
  };

  // ✨ ตรรกะ: 4 Kudos = 1 เลเวลเต็ม. เริ่มต้นที่ Level 0.
  const currentLevel = Math.floor(kudosCount / 4);
  const levelProgress = kudosCount >= 40 ? 100 : (kudosCount % 4) * 25;
  const kudosToNextLevel = 4 - (kudosCount % 4);

  const applePositions = [
    { x: 100, y: 40 }, { x: 65, y: 75 }, { x: 135, y: 85 },
    { x: 45, y: 120 }, { x: 155, y: 130 }, { x: 85, y: 110 },
    { x: 115, y: 150 }, { x: 60, y: 160 }, { x: 140, y: 170 },
    { x: 100, y: 180 }
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto font-sans text-slate-900 space-y-6 md:space-y-8 pb-12">
      
      {/* 🟢 หัวข้อหลัก */}
      <div className="flex items-center gap-4 border-b-[4px] border-slate-900 pb-4 md:pb-6">
        <div className="bg-[#FFD93D] border-[3px] border-slate-900 rounded-xl p-3 shadow-[4px_4px_0px_0px_#0f172a]">
          <Star className="w-6 h-6 md:w-8 md:h-8 text-slate-900" strokeWidth={3} fill="#0f172a" />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter uppercase text-slate-900 drop-shadow-[2px_2px_0px_#fff]">
            ผลงานและสถิติ
          </h2>
          <span className="bg-slate-900 text-white text-[10px] md:text-xs font-bold px-3 py-1 uppercase rounded-md tracking-widest mt-1 inline-block">
            ความสำเร็จของทีมและการวิเคราะห์
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* 📌 คอลัมน์ซ้าย: ต้นไม้และตัวนับชีวิต */}
        <div className="lg:col-span-6 xl:col-span-5 space-y-6 md:space-y-8">
          
          {/* 🌳 ต้นไม้แห่งความสำเร็จ */}
          <div className="bg-white border-[4px] border-slate-900 rounded-2xl p-6 shadow-[5px_5px_0px_0px_#0f172a]">
            <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2 text-slate-800">
              <Sparkles className="w-6 h-6 text-[#A855F7]" strokeWidth={3} />
              The Wellness Tree
            </h3>

            <div className="bg-[#ECFDF5] border-[3px] border-slate-900 rounded-xl p-3 mb-6 shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.05)]">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wide text-center">
                แอปเปิ้ลจะโตขึ้นครั้งละ 25% ทุกครั้งที่คุณส่งคำชมให้เพื่อน! 🍎
              </p>
            </div>

            <div className="relative h-[320px] md:h-[380px] flex items-end justify-center bg-[#F0F9FF] border-[4px] border-slate-900 rounded-xl overflow-hidden shadow-[inset_0px_4px_10px_rgba(0,0,0,0.05)]">
              <div className="absolute inset-0 opacity-[0.05] bg-[size:24px_24px] bg-[linear-gradient(to_right,#000_2px,transparent_2px),linear-gradient(to_bottom,#000_2px,transparent_2px)] pointer-events-none"></div>

              <div className="absolute bottom-[-10px] w-[280px] h-[340px] z-10">
                <svg viewBox="0 0 200 240" className="w-full h-full overflow-visible">
                  <path d="M85 240 L95 120 L105 120 L115 240 Z" fill="#92400E" stroke="#0f172a" strokeWidth="6" />
                  <motion.g
                    animate={{ rotate: [-1, 1, -1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "100px 180px" }}
                  >
                    <path d="M100 10 C40 10 15 55 30 90 C5 100 5 150 40 160 C50 195 150 195 160 160 C195 150 195 100 170 90 C185 55 160 10 100 10 Z" fill="#16A34A" stroke="#0f172a" strokeWidth="6" strokeLinejoin="round" />
                    <path d="M100 20 C55 20 40 60 45 80 C25 90 25 130 50 140 C60 170 140 170 150 140 C175 130 175 90 155 80 C160 60 145 20 100 20 Z" fill="#22C55E" />
                    
                    <AnimatePresence>
                      {applePositions.map((pos, idx) => {
                        const appleKudos = kudosCount - (idx * 4);
                        if (appleKudos <= 0) return null;
                        const growthStep = Math.min(4, appleKudos);
                        const scale = growthStep * 0.25;
                        const isFullyGrown = growthStep === 4;

                        return (
                          <motion.g 
                            key={`apple-${idx}`}
                            initial={{ scale: 0 }}
                            animate={{ scale: scale }}
                            style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                          >
                            <circle cx={pos.x} cy={pos.y} r="10" fill={isFullyGrown ? "#EF4444" : "#FACC15"} stroke="#0f172a" strokeWidth="3" />
                            <path d={`M${pos.x} ${pos.y-10} Q${pos.x+3} ${pos.y-15} ${pos.x+6} ${pos.y-10}`} fill="none" stroke="#0f172a" strokeWidth="2" />
                          </motion.g>
                        );
                      })}
                    </AnimatePresence>
                  </motion.g>
                </svg>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 block tracking-widest">สถานะการเติบโต</span>
                  <span className="text-2xl font-black text-slate-900 leading-none text-emerald-600">เลเวล {currentLevel}</span>
                </div>
                <span className="text-sm font-black text-slate-900">{levelProgress}%</span>
              </div>
              <div className="h-6 bg-slate-100 border-[3px] border-slate-900 rounded-xl overflow-hidden relative shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.05)]">
                <motion.div initial={{ width: 0 }} animate={{ width: `${levelProgress}%` }} transition={{ type: "spring", bounce: 0.2 }} className="absolute top-0 left-0 bottom-0 bg-[#4ADE80] border-r-[3px] border-slate-900" />
              </div>
              <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest mt-1">
                {kudosCount < 40 ? `อีก ${kudosToNextLevel} คำชมเพื่อทำให้แอปเปิ้ลลูกต่อไปโตเต็มที่!` : '🎉 ต้นไม้เติบโตสูงสุดแล้ว!'}
              </p>
            </div>
          </div>

          {/* ❤️ ตัวนับจำนวนสัตว์ที่ช่วยไว้ */}
          <div className="bg-[#FF6B6B] border-[4px] border-slate-900 rounded-2xl p-8 shadow-[5px_5px_0px_0px_#0f172a] text-center relative overflow-hidden group">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_2px,transparent_2px)] bg-[size:16px_16px]"></div>
            <div className="relative z-10">
              <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-16 h-16 bg-white border-[4px] border-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[4px_4px_0px_0px_#0f172a]">
                <Heart className="w-8 h-8 text-[#FF6B6B]" strokeWidth={3} fill="#FF6B6B" />
              </motion.div>
              <h3 className="text-lg font-black uppercase text-white tracking-widest mb-1 drop-shadow-[2px_2px_0px_#0f172a]">จำนวนที่ช่วยชีวิตไว้</h3>
              <motion.p key={livesSaved} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className="text-6xl md:text-7xl font-black text-white drop-shadow-[4px_4px_0px_#0f172a] mb-2">
                {livesSaved.toLocaleString()}
              </motion.p>
            </div>
          </div>

        </div>

        {/* 📌 คอลัมน์ขวา: Kudos Board */}
        <div className="lg:col-span-6 xl:col-span-7 space-y-6 md:space-y-8">
          
          <div className="bg-white border-[4px] border-slate-900 rounded-2xl p-6 shadow-[5px_5px_0px_0px_#0f172a]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b-[3px] border-slate-900 pb-4 border-dashed">
              <h3 className="text-xl font-black uppercase flex items-center gap-2 text-slate-800">
                <MessageCircle className="w-6 h-6" strokeWidth={3} />
                กระดานคำชม (Kudos)
              </h3>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 2 }}
                onClick={() => setShowKudosForm(!showKudosForm)}
                className="bg-[#A855F7] text-white border-[3px] border-slate-900 px-5 py-2.5 rounded-xl text-sm font-black uppercase flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_#0f172a] transition-all"
              >
                {showKudosForm ? <X className="w-4 h-4" strokeWidth={3}/> : <Star className="w-4 h-4" fill="white" />}
                {showKudosForm ? "ปิดหน้าต่าง" : "เขียนคำชม"}
              </motion.button>
            </div>

            <AnimatePresence>
              {showKudosForm && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-8 overflow-hidden">
                  <div className="p-2">
                    <div className="bg-slate-100 border-[3px] border-slate-900 rounded-xl p-5 space-y-4 shadow-[inset_0px_4px_0px_0px_rgba(0,0,0,0.05)] relative">
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" value={fromName} onChange={(e) => setFromName(e.target.value)} placeholder="จาก (ชื่อคุณ)" className="w-full bg-white border-[3px] border-slate-900 rounded-lg p-2.5 font-bold text-slate-900 text-sm focus:outline-none" />
                        <input type="text" value={toName} onChange={(e) => setToName(e.target.value)} placeholder="ถึง (ชื่อเพื่อน)" className="w-full bg-white border-[3px] border-slate-900 rounded-lg p-2.5 font-bold text-slate-900 text-sm focus:outline-none" />
                      </div>
                      <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="เขียนข้อความให้กำลังใจเพื่อนร่วมงาน... 💪" rows={3} className="w-full bg-white border-[3px] border-slate-900 rounded-lg p-3 font-bold text-slate-900 text-sm focus:outline-none resize-none" />
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider">เลือกสติกเกอร์</label>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 w-full">
                          {stickers.map((sticker) => (
                            <motion.button
                              key={sticker}
                              type="button"
                              onClick={() => setSelectedSticker(sticker)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`text-2xl h-12 w-full flex items-center justify-center border-[3px] border-slate-900 rounded-xl transition-all
                                ${selectedSticker === sticker ? "bg-[#FFD93D] shadow-[2px_2px_0px_0px_#0f172a] -translate-y-1" : "bg-white hover:bg-slate-200"}
                              `}
                            >
                              {sticker}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <button onClick={handleSendKudos} disabled={!newMessage.trim() || !fromName.trim() || !toName.trim()} className={`w-full py-4 rounded-xl font-black uppercase tracking-wider flex items-center justify-center gap-2 border-[3px] border-slate-900 transition-all ${newMessage.trim() && fromName.trim() && toName.trim() ? 'bg-[#A855F7] text-white shadow-[4px_4px_0px_0px_#0f172a] hover:-translate-y-1' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                        <Send className="w-5 h-5" /> แปะโน้ตคำชม
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 📝 รายการข้อความ (Sticky Notes) */}
            <div className="max-h-[600px] overflow-y-auto px-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 pb-8">
                <AnimatePresence>
                  {kudosMessages.map((kudos, idx) => (
                    <motion.div
                      key={kudos.id}
                      initial={{ opacity: 0, scale: 0.8, rotate: idx % 2 === 0 ? -2 : 2 }}
                      animate={{ opacity: 1, scale: 1, rotate: idx % 2 === 0 ? -1 : 1 }}
                      whileHover={{ rotate: 0, scale: 1.05, zIndex: 10 }}
                      className={`relative ${noteColors[idx % 4]} border-[4px] border-slate-900 rounded-xl p-5 shadow-[6px_6px_0px_0px_#0f172a] transition-all m-2`}
                    >
                      <div className="absolute -top-4 -right-4 w-12 h-12 bg-white border-[3px] border-slate-900 rounded-full flex items-center justify-center text-2xl shadow-[3px_3px_0px_0px_#0f172a] rotate-12 z-20">
                        {kudos.sticker}
                      </div>
                      <div className="border-b-[3px] border-slate-900 border-dashed pb-2 mb-3">
                        <div className="flex flex-wrap items-center gap-1.5 leading-tight">
                          <span className="font-black uppercase text-slate-900 text-xs">{kudos.from}</span>
                          <span className="text-slate-900 font-black text-[10px]">▶</span>
                          <span className="font-black uppercase text-slate-900 text-xs">{kudos.to}</span>
                        </div>
                      </div>
                      <p className="text-slate-800 font-bold text-sm leading-snug mb-3 italic">"{kudos.message}"</p>
                      <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 opacity-70">
                         {formatTime(kudos.timestamp)}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* 📈 สถิติทีม */}
          <div className="bg-[#4ADE80] border-[4px] border-slate-900 rounded-2xl p-6 shadow-[5px_5px_0px_0px_#0f172a]">
            <div className="flex items-center gap-2 mb-6">
              <BarChart2 className="w-6 h-6 text-slate-900" strokeWidth={3} />
              <h3 className="text-xl font-black uppercase text-slate-900">วิเคราะห์ผลงานทีม</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[{ label: "เวลาคัดกรองเฉลี่ย", value: "3.2 นาที", icon: Target }, { label: "ความพึงพอใจ", value: "98%", icon: Smile }].map((stat, idx) => (
                <div key={idx} className="bg-white border-[3px] border-slate-900 rounded-xl p-4 shadow-[4px_4px_0px_0px_#0f172a] hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-slate-900 p-1.5 rounded-lg"><stat.icon className="w-4 h-4 text-white" strokeWidth={3} /></div>
                    <span className="text-[11px] font-black uppercase text-slate-500 tracking-wider truncate">{stat.label}</span>
                  </div>
                  <span className="text-3xl font-black text-slate-900">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
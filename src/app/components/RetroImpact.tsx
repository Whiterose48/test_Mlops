import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: number;
  from: string;
  to: string;
  text: string;
  sticker: string;
}

export default function RetroImpact() {
  const [livesSaved, setLivesSaved] = useState(247);
  const [treeLevel, setTreeLevel] = useState(5);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, from: "DR.SOMCHAI", to: "TEAM", text: "GREAT JOB TODAY!", sticker: "👏" },
    { id: 2, from: "DR.WANNA", to: "DR.PREECHA", text: "THANKS FOR HELP!", sticker: "❤️" },
  ]);
  const [newMsg, setNewMsg] = useState("");
  const [selectedSticker, setSelectedSticker] = useState("❤️");
  const [showForm, setShowForm] = useState(false);
  const [coins, setCoins] = useState(9999);

  const stickers = ["❤️", "⭐", "👏", "🎉", "💪", "🏆", "✨", "🎊"];

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setLivesSaved(prev => prev + 1);
        setCoins(prev => prev + 100);
        if (treeLevel < 10) setTreeLevel(prev => prev + 1);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [treeLevel]);

  const handleSend = () => {
    if (newMsg.trim()) {
      setMessages([
        { id: Date.now(), from: "YOU", to: "TEAM", text: newMsg, sticker: selectedSticker },
        ...messages
      ]);
      setNewMsg("");
      setShowForm(false);
      setCoins(prev => prev + 50);
    }
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="text-center mb-4">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            textShadow: [
              '0 0 10px rgba(255, 215, 0, 0.5)',
              '0 0 30px rgba(255, 215, 0, 1)',
              '0 0 10px rgba(255, 215, 0, 0.5)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="retro-text text-[#FFD700] text-xl"
        >
          ★ IMPACT CORNER ★
        </motion.div>
        <div className="retro-text text-[#FF69B4] text-[8px] mt-2">
          TEAM WELLNESS & ACHIEVEMENTS
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Wellness Tree & Counter */}
        <div className="space-y-4">
          {/* Pixel Art Tree - Zelda/Stardew Valley Style */}
          <div className="bg-gradient-to-b from-[#1B5E20] to-[#2E7D32] pixel-border border-[#FFD700] p-4 relative overflow-hidden">
            <div className="retro-text text-[#FFD700] text-[10px] mb-3 text-center">
              🌳 WELLNESS TREE
            </div>

            {/* Pixel Tree */}
            <div className="relative h-80 flex items-end justify-center">
              {/* Ground */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#3E2723] pixel-border border-t-4 border-[#5D4037]" />

              {/* Tree Trunk */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 bg-[#6D4C41] pixel-border border-4 border-[#4E342E]"
                style={{ height: `${Math.min(treeLevel * 15, 120)}px` }}
              >
                {/* Tree rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#5D4037] pixel-border border-2 border-[#4E342E]" />
              </div>

              {/* Leaves/Foliage - Pixel style */}
              {treeLevel > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute pixel-border border-4 border-[#2E7D32]"
                  style={{
                    bottom: `${Math.min(treeLevel * 15 + 30, 150)}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: `${Math.min(treeLevel * 20 + 40, 180)}px`,
                    height: `${Math.min(treeLevel * 20 + 40, 180)}px`,
                    backgroundColor: '#66BB6A',
                    borderRadius: '50%',
                  }}
                >
                  {/* Inner foliage layers */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full bg-[#81C784] pixel-border border-2 border-[#4CAF50]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-full bg-[#A5D6A7] pixel-border border-2 border-[#66BB6A]" />
                </motion.div>
              )}

              {/* Pixel Flowers and Creatures */}
              <AnimatePresence>
                {[...Array(Math.min(treeLevel, 8))].map((_, i) => {
                  const positions = [
                    { x: '20%', y: '40%' },
                    { x: '75%', y: '45%' },
                    { x: '50%', y: '25%' },
                    { x: '30%', y: '35%' },
                    { x: '70%', y: '50%' },
                    { x: '40%', y: '55%' },
                    { x: '80%', y: '30%' },
                    { x: '25%', y: '50%' },
                  ];
                  const sprites = ['🐦', '🦋', '🌸', '🌺', '🐝', '🌼', '🌻', '🐛'];

                  return (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        y: [0, -10, 0],
                      }}
                      transition={{
                        scale: { duration: 0.5, delay: i * 0.2 },
                        y: { duration: 2 + i * 0.2, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute text-2xl pixel-border-none"
                      style={{
                        left: positions[i].x,
                        top: positions[i].y,
                        imageRendering: 'pixelated',
                        filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.5))'
                      }}
                    >
                      {sprites[i]}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Sparkles */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`spark-${i}`}
                  className="absolute w-2 h-2 bg-[#FFD700] pixel-border border-black"
                  style={{
                    left: `${30 + i * 12}%`,
                    top: `${20 + Math.sin(i) * 15}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4
                  }}
                />
              ))}
            </div>

            {/* Level Display */}
            <div className="mt-4 bg-black/70 pixel-border border-[#FFD700] p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="retro-text text-[#FFD700] text-[8px]">TREE LEVEL</span>
                <span className="retro-text text-white text-[10px]">LV.{treeLevel}</span>
              </div>
              <div className="h-3 bg-black pixel-border border-white">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(treeLevel / 10) * 100}%` }}
                  className="h-full bg-gradient-to-r from-[#66BB6A] to-[#FFD700]"
                />
              </div>
              <div className="retro-text text-[#B388FF] text-[7px] mt-1 text-center">
                EXP: {treeLevel * 100}/1000
              </div>
            </div>
          </div>

          {/* Lives Counter - Like High Score */}
          <div className="bg-gradient-to-b from-[#C2185B] to-[#D81B60] pixel-border border-black p-4 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
                backgroundSize: '200% 200%'
              }}
            />

            <div className="relative">
              <div className="flex justify-center mb-3">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    scale: { duration: 1, repeat: Infinity },
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" }
                  }}
                  className="w-16 h-16 bg-white pixel-border border-4 border-black flex items-center justify-center"
                >
                  <span className="text-3xl">♥</span>
                </motion.div>
              </div>

              <div className="retro-text text-white text-[10px] text-center mb-2">
                LIVES SAVED
              </div>
              
              <motion.div
                key={livesSaved}
                initial={{ scale: 1.5, color: '#FFD700' }}
                animate={{ scale: 1, color: '#FFFFFF' }}
                className="retro-text text-5xl text-center mb-3"
              >
                {livesSaved}
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "WEEK", value: 34 },
                  { label: "MONTH", value: 156 },
                  { label: "YEAR", value: 1247 },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-black/50 pixel-border border-white p-2 text-center">
                    <div className="retro-text text-[#FFD700] text-[7px]">{stat.label}</div>
                    <div className="retro-text text-white text-[10px] mt-1">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Coin Counter */}
              <div className="mt-3 bg-black/70 pixel-border border-[#FFD700] p-2 flex items-center justify-between">
                <span className="retro-text text-[#FFD700] text-[8px]">COINS</span>
                <motion.span
                  key={coins}
                  initial={{ scale: 1.3 }}
                  animate={{ scale: 1 }}
                  className="retro-text text-[#FFD700] text-[10px]"
                >
                  ★ {coins}
                </motion.span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Kudos & Stats */}
        <div className="space-y-4">
          {/* Kudos Box - Chat Log Style */}
          <div className="bg-black/50 pixel-border border-[#FF69B4] p-3">
            <div className="flex items-center justify-between mb-3">
              <div className="retro-text text-[#FF69B4] text-[10px]">
                💌 KUDOS BOARD
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowForm(!showForm)}
                className="bg-[#FF69B4] pixel-border border-black px-3 py-1"
                style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}
              >
                <span className="retro-text text-white text-[8px]">+</span>
              </motion.button>
            </div>

            {/* Send Form */}
            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-3 overflow-hidden"
                >
                  <div className="bg-gradient-to-b from-[#1A0033] to-[#2D1B4E] pixel-border border-[#B388FF] p-2 space-y-2">
                    <input
                      type="text"
                      value={newMsg}
                      onChange={(e) => setNewMsg(e.target.value.toUpperCase())}
                      placeholder="TYPE MESSAGE..."
                      maxLength={30}
                      className="w-full bg-black pixel-border border-white p-2 retro-text text-white text-[8px] focus:outline-none uppercase"
                    />
                    
                    {/* Sticker Select */}
                    <div className="flex gap-1">
                      {stickers.map(sticker => (
                        <button
                          key={sticker}
                          onClick={() => setSelectedSticker(sticker)}
                          className={`w-8 h-8 pixel-border flex items-center justify-center ${
                            selectedSticker === sticker
                              ? 'bg-[#FFD700] border-black scale-125'
                              : 'bg-black border-white hover:bg-[#2D1B4E]'
                          }`}
                        >
                          {sticker}
                        </button>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSend}
                      className="w-full bg-[#6BCF7F] pixel-border border-black py-2"
                      style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}
                    >
                      <span className="retro-text text-black text-[8px]">SEND</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages - Chat Style */}
            <div className="space-y-2 max-h-80 overflow-y-auto">
              <AnimatePresence>
                {messages.map((msg, idx) => (
                  <motion.div
                    key={msg.id}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-gradient-to-r from-[#4A148C] to-[#7B1FA2] pixel-border border-[#FFD700] p-2"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-2xl" style={{ imageRendering: 'pixelated' }}>
                        {msg.sticker}
                      </span>
                      <div className="flex-1">
                        <div className="retro-text text-[#FFD700] text-[7px]">
                          {msg.from} → {msg.to}
                        </div>
                        <div className="retro-text text-white text-[8px] mt-1">
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Performance Stats - Achievement Style */}
          <div className="bg-black/50 pixel-border border-[#00FF00] p-3">
            <div className="retro-text text-[#00FF00] text-[10px] mb-3">
              📊 PERFORMANCE
            </div>
            <div className="space-y-2">
              {[
                { label: "AVG TRIAGE", value: "3.2 MIN", trend: "↓15%", good: true },
                { label: "SATISFACTION", value: "98%", trend: "↑5%", good: true },
                { label: "RESPONSE", value: "<2 MIN", trend: "↓30%", good: true },
                { label: "AI ACCURACY", value: "96%", trend: "↑8%", good: true },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="bg-gradient-to-r from-[#1A0033] to-[#2D1B4E] pixel-border border-[#7E57C2] p-2 flex justify-between items-center"
                >
                  <span className="retro-text text-white text-[7px]">{stat.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="retro-text text-[#FFD700] text-[8px]">{stat.value}</span>
                    <span className={`retro-text text-[7px] ${stat.good ? 'text-[#6BCF7F]' : 'text-[#FF6B6B]'}`}>
                      {stat.trend}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievement Badge - Game Trophy */}
          <motion.div
            animate={{ 
              boxShadow: [
                '0 0 10px rgba(255, 215, 0, 0.5), 4px 4px 0px rgba(0,0,0,0.5)',
                '0 0 30px rgba(255, 215, 0, 1), 4px 4px 0px rgba(0,0,0,0.5)',
                '0 0 10px rgba(255, 215, 0, 0.5), 4px 4px 0px rgba(0,0,0,0.5)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-gradient-to-b from-[#FFD700] to-[#FFA000] pixel-border border-black p-4 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl mb-2"
            >
              🏆
            </motion.div>
            <div className="retro-text text-black text-[10px] mb-1">
              TEAM MVP
            </div>
            <div className="retro-text text-[#4A148C] text-[8px]">
              "EVERY LIFE MATTERS"
            </div>
          </motion.div>
        </div>
      </div>

      {/* Motivational Banner - Game Over Style */}
      <motion.div
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="bg-gradient-to-r from-[#F57C00] to-[#FF9800] pixel-border border-black p-4 text-center"
      >
        <div className="retro-text text-white text-[10px]">
          ⭐ KEEP UP THE GREAT WORK! ⭐
        </div>
        <div className="retro-text text-black text-[8px] mt-1">
          SAVING LIVES ONE PAW AT A TIME
        </div>
      </motion.div>
    </div>
  );
}

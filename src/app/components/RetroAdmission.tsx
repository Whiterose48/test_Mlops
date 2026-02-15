import { useState } from "react";
import { motion } from "motion/react";

const animalTypes = [
  { id: "dog", name: "DOG", sprite: "🐕", stats: { hp: 100, speed: 50 } },
  { id: "cat", name: "CAT", sprite: "🐈", stats: { hp: 80, speed: 70 } },
  { id: "rabbit", name: "RABBIT", sprite: "🐰", stats: { hp: 60, speed: 90 } },
  { id: "bird", name: "BIRD", sprite: "🐦", stats: { hp: 40, speed: 95 } },
];

const bodyParts = [
  { id: "head", name: "HEAD", x: 50, y: 20, icon: "◉" },
  { id: "eyes", name: "EYES", x: 45, y: 25, icon: "👁" },
  { id: "ears", name: "EARS", x: 35, y: 18, icon: "◐" },
  { id: "nose", name: "NOSE", x: 50, y: 30, icon: "▼" },
  { id: "mouth", name: "MOUTH", x: 50, y: 35, icon: "◭" },
  { id: "chest", name: "CHEST", x: 50, y: 55, icon: "♥" },
  { id: "legs", name: "LEGS", x: 50, y: 75, icon: "┃" },
];

export default function RetroAdmission() {
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [petName, setPetName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [aiTags, setAiTags] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSymptomChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setSymptoms(text);
    
    // AI Keyword extraction
    const keywords = ["PALE", "GASP", "SEIZURE", "VOMIT", "DIARRHEA", "WEAK"];
    const found = keywords.filter(k => text.toUpperCase().includes(k));
    setAiTags([...new Set([...aiTags, ...found])]);
  };

  const toggleBodyPart = (partId: string) => {
    setSelectedParts(prev =>
      prev.includes(partId)
        ? prev.filter(id => id !== partId)
        : [...prev, partId]
    );
  };

  const handleSave = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          alert("SAVE COMPLETE!\nAI ANALYZING...");
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="text-center mb-4">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="retro-text text-[#00FF00] text-xl"
        >
          + SMART ADMISSION +
        </motion.div>
        <div className="retro-text text-[#B388FF] text-[8px] mt-2">
          PATIENT REGISTRATION SYSTEM
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Panel */}
        <div className="space-y-4">
          {/* Character Select - Like Fighting Game */}
          <div className="bg-black/50 pixel-border border-[#FFD700] p-3">
            <div className="retro-text text-[#FFD700] text-[10px] mb-3">
              ▶ SELECT ANIMAL TYPE
            </div>
            <div className="grid grid-cols-2 gap-2">
              {animalTypes.map((animal) => (
                <motion.button
                  key={animal.id}
                  onClick={() => setSelectedAnimal(animal.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 pixel-border transition-all ${
                    selectedAnimal === animal.id
                      ? 'bg-[#FF69B4] border-[#FFD700]'
                      : 'bg-[#2D1B4E] border-[#7E57C2] hover:bg-[#4A148C]'
                  }`}
                  style={{
                    boxShadow: selectedAnimal === animal.id
                      ? '0 0 20px rgba(255, 105, 180, 0.8), 4px 4px 0px rgba(0,0,0,0.5)'
                      : '4px 4px 0px rgba(0,0,0,0.5)'
                  }}
                >
                  <div className="text-4xl mb-2" style={{ imageRendering: 'pixelated' }}>
                    {animal.sprite}
                  </div>
                  <div className="retro-text text-white text-[8px]">
                    {animal.name}
                  </div>
                  {selectedAnimal === animal.id && (
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="retro-text text-[7px] text-white">HP</span>
                        <span className="retro-text text-[7px] text-[#00FF00]">{animal.stats.hp}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="retro-text text-[7px] text-white">SPD</span>
                        <span className="retro-text text-[7px] text-[#FFD700]">{animal.stats.speed}</span>
                      </div>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Input Fields - RPG Style */}
          <div className="bg-black/50 pixel-border border-[#00FF00] p-3">
            <div className="retro-text text-[#00FF00] text-[10px] mb-3">
              ▶ BASIC INFO
            </div>
            <div className="space-y-3">
              <div>
                <div className="retro-text text-white text-[8px] mb-1">PET NAME:</div>
                <input
                  type="text"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value.toUpperCase())}
                  placeholder="ENTER NAME"
                  maxLength={12}
                  className="w-full bg-black pixel-border border-white p-2 retro-text text-[#FFD700] text-[10px] focus:border-[#00FF00] focus:outline-none uppercase"
                />
              </div>
              <div>
                <div className="retro-text text-white text-[8px] mb-1">OWNER NAME:</div>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value.toUpperCase())}
                  placeholder="ENTER OWNER"
                  maxLength={12}
                  className="w-full bg-black pixel-border border-white p-2 retro-text text-[#FFD700] text-[10px] focus:border-[#00FF00] focus:outline-none uppercase"
                />
              </div>
            </div>
          </div>

          {/* Voice Input - Like Audio Recording in Games */}
          <div className="bg-black/50 pixel-border border-[#FF69B4] p-3">
            <div className="retro-text text-[#FF69B4] text-[10px] mb-3 flex items-center justify-between">
              <span>▶ SYMPTOMS LOG</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setIsRecording(!isRecording);
                  if (!isRecording) {
                    setTimeout(() => {
                      setIsRecording(false);
                      setSymptoms(prev => prev + " PALE GUMS GASPING");
                      setAiTags([...aiTags, "PALE", "GASP"]);
                    }, 2000);
                  }
                }}
                className={`px-3 py-1 pixel-border ${
                  isRecording ? 'bg-[#FF6B6B] border-white' : 'bg-[#7E57C2] border-[#B388FF]'
                }`}
                style={{ boxShadow: '3px 3px 0px rgba(0,0,0,0.5)' }}
              >
                <span className="retro-text text-white text-[8px]">🎤 REC</span>
              </motion.button>
            </div>

            <textarea
              value={symptoms}
              onChange={handleSymptomChange}
              placeholder="TYPE OR SPEAK..."
              rows={4}
              className="w-full bg-black pixel-border border-white p-2 retro-text text-white text-[8px] focus:border-[#FF69B4] focus:outline-none resize-none uppercase"
            />

            {/* Sound Wave Visual */}
            {isRecording && (
              <div className="mt-2 flex items-center justify-center gap-1">
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [4, 20, 4],
                      backgroundColor: ['#FF69B4', '#FFD700', '#FF69B4']
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.05
                    }}
                    className="w-1 pixel-border border-black"
                  />
                ))}
              </div>
            )}

            {/* AI Tags */}
            {aiTags.length > 0 && (
              <div className="mt-3">
                <div className="retro-text text-[#FFD700] text-[7px] mb-1">AI DETECTED:</div>
                <div className="flex flex-wrap gap-1">
                  {aiTags.map((tag, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-[#FFD700] pixel-border border-black px-2 py-1"
                    >
                      <span className="retro-text text-black text-[7px]">{tag}</span>
                    </motion.span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Body Part Selector - Like Mega Man Stage Select */}
          <div className="bg-black/50 pixel-border border-[#FF6B9D] p-3">
            <div className="retro-text text-[#FF6B9D] text-[10px] mb-3">
              ▶ SELECT PROBLEM AREA
            </div>

            {/* Pixel Art Body */}
            <div className="relative bg-gradient-to-b from-[#1A0033] to-[#2D1B4E] h-64 pixel-border border-[#7E57C2] p-4">
              {/* Simple Pixel Pet Silhouette */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <svg width="100" height="150" style={{ imageRendering: 'pixelated' }}>
                  {/* Head */}
                  <rect x="30" y="10" width="40" height="40" fill="#7E57C2" />
                  {/* Body */}
                  <rect x="25" y="50" width="50" height="60" fill="#7E57C2" />
                  {/* Legs */}
                  <rect x="30" y="110" width="15" height="30" fill="#7E57C2" />
                  <rect x="55" y="110" width="15" height="30" fill="#7E57C2" />
                </svg>
              </div>

              {/* Interactive Body Parts */}
              {bodyParts.map((part) => (
                <motion.button
                  key={part.id}
                  onClick={() => toggleBodyPart(part.id)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    position: 'absolute',
                    left: `${part.x}%`,
                    top: `${part.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className={`w-10 h-10 pixel-border flex items-center justify-center ${
                    selectedParts.includes(part.id)
                      ? 'bg-[#FF6B6B] border-[#FFD700]'
                      : 'bg-[#2D1B4E] border-white hover:bg-[#4A148C]'
                  }`}
                  style={{
                    boxShadow: selectedParts.includes(part.id)
                      ? '0 0 15px rgba(255, 107, 107, 1), 3px 3px 0px rgba(0,0,0,0.5)'
                      : '3px 3px 0px rgba(0,0,0,0.5)'
                  }}
                >
                  <span className="text-lg">{part.icon}</span>
                </motion.button>
              ))}
            </div>

            {/* Selected Parts Display */}
            <div className="mt-3 flex flex-wrap gap-1">
              {selectedParts.map(partId => {
                const part = bodyParts.find(p => p.id === partId);
                return (
                  <span
                    key={partId}
                    className="bg-[#FF6B6B] pixel-border border-black px-2 py-1"
                  >
                    <span className="retro-text text-white text-[7px]">{part?.name}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Image Upload - Like Item Box in RPG */}
          <div className="bg-black/50 pixel-border border-[#FFD700] p-3">
            <div className="retro-text text-[#FFD700] text-[10px] mb-3">
              ▶ PHOTO UPLOAD
            </div>
            <div className="bg-gradient-to-b from-[#1A0033] to-[#2D1B4E] h-32 pixel-border border-[#7E57C2] flex items-center justify-center cursor-pointer hover:from-[#2D1B4E] hover:to-[#4A148C] transition-all">
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-4xl mb-2"
                >
                  📸
                </motion.div>
                <div className="retro-text text-[#B388FF] text-[8px]">
                  CLICK TO UPLOAD
                </div>
              </div>
            </div>
          </div>

          {/* Save Button - Like Game Over Continue */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-[#6BCF7F] to-[#00E676] pixel-border border-black py-4 relative overflow-hidden"
            style={{ boxShadow: '6px 6px 0px rgba(0,0,0,0.5)' }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: [-100, 300] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="retro-text text-black text-[10px] relative z-10">
              ★ SAVE & ANALYZE ★
            </span>
          </motion.button>

          {/* Progress Bar */}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="bg-black pixel-border border-[#00FF00] p-2">
              <div className="retro-text text-[#00FF00] text-[8px] mb-1">
                UPLOADING... {uploadProgress}%
              </div>
              <div className="h-4 bg-[#1A0033] pixel-border border-white">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  className="h-full bg-gradient-to-r from-[#00FF00] to-[#FFD700]"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="bg-black/70 pixel-border border-[#00FF00] p-3 text-center"
      >
        <div className="retro-text text-[#00FF00] text-[8px]">
          💡 AI WILL AUTO-DETECT SYMPTOMS AND ASSIGN PRIORITY
        </div>
      </motion.div>
    </div>
  );
}

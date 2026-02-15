import { useState, useRef, Suspense, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Dog, Cat, Camera, Save, Activity, X,
  Brain, Heart, Eye, Crosshair, Bone, Sparkles, Loader2, Stethoscope
} from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, ContactShadows, Environment, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from 'three';

const PIN_CONFIG = [
  { id: "head", label: "ศีรษะ/สมอง", icon: Brain },
  { id: "eyes", label: "ดวงตา", icon: Eye },
  { id: "ears", label: "หู", icon: Activity },
  { id: "mouth", label: "ปาก/ฟัน", icon: Crosshair },
  { id: "chest", label: "หน้าอก/หัวใจ", icon: Heart },
  { id: "stomach", label: "ช่องท้อง", icon: Activity },
  { id: "legs", label: "ขา/กระดูก", icon: Bone },
];

// 🐕 Component: โหลดโมเดล 3D แบบ Local
const LocalMappedModel = ({ animalType, textureUrl, selectedParts, toggleBodyPart }: any) => {
  // 🟢 ชี้เป้าไปที่ไฟล์ในโฟลเดอร์ public (ต้องมีเครื่องหมาย / นำหน้าเสมอ)
  const modelPath = animalType === 'cat' ? '/low_poly_cat.glb' : '/low_poly_dog.glb';
  const { scene } = useGLTF(modelPath);
  const texture = useTexture(textureUrl);
  const [pins, setPins] = useState<any[]>([]);

  useEffect(() => {
    if (scene && texture) {
      texture.flipY = false;
      // แปะรูปถ่ายลงบนโมเดล 3D
      scene.traverse((child: any) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.5,
            metalness: 0.1
          });
        }
      });

      // คำนวณหาขนาดโมเดลเพื่อปักหมุดให้ตรงเป๊ะ
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      const dynamicPins = PIN_CONFIG.map(p => {
        let pos = [center.x, center.y, center.z];
        if (p.id === "head") pos = [center.x, center.y + size.y * 0.4, center.z + size.z * 0.35];
        if (p.id === "eyes") pos = [center.x + size.x * 0.1, center.y + size.y * 0.3, center.z + size.z * 0.45];
        if (p.id === "ears") pos = [center.x - size.x * 0.25, center.y + size.y * 0.45, center.z + size.z * 0.15];
        if (p.id === "mouth") pos = [center.x, center.y + size.y * 0.2, center.z + size.z * 0.5];
        if (p.id === "chest") pos = [center.x, center.y + size.y * 0.05, center.z + size.z * 0.35];
        if (p.id === "stomach") pos = [center.x, center.y - size.y * 0.15, center.z + size.z * 0.28];
        if (p.id === "legs") pos = [center.x + size.x * 0.2, center.y - size.y * 0.4, center.z + size.z * 0.15];
        return { ...p, position: pos };
      });
      setPins(dynamicPins);
    }
  }, [scene, texture, animalType]);

  return (
    <group position={[0, -1, 0]} scale={2.5}>
      <primitive object={scene} />
      {pins.map((pin) => {
        const isSelected = selectedParts.includes(pin.id);
        const Icon = pin.icon;
        return (
          <Html key={pin.id} position={pin.position as any} center zIndexRange={[100, 0]}>
            <motion.div
              onClick={(e) => { e.stopPropagation(); toggleBodyPart(pin.id); }}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.9 }}
              className={`w-10 h-10 rounded-full border-[3px] border-slate-900 flex items-center justify-center cursor-pointer transition-all shadow-[4px_4px_0px_0px_#000]
                ${isSelected ? 'bg-[#FF6B6B] text-white' : 'bg-white text-slate-800 hover:bg-slate-50'}
              `}
            >
              <Icon size={18} strokeWidth={3} className={isSelected ? 'animate-pulse' : ''} />
            </motion.div>
          </Html>
        );
      })}
    </group>
  );
};

// 🟢 Preload โมเดลไว้ล่วงหน้าเพื่อไม่ให้กระตุกตอนสลับหมา/แมว
useGLTF.preload('/low_poly_dog.glb');
useGLTF.preload('/low_poly_cat.glb');

export default function SmartAdmission() {
  const [selectedAnimal, setSelectedAnimal] = useState("dog");
  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "generating" | "ready">("idle");
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startGeneration = () => {
    if (!file || !breed) return alert("กรุณาระบุข้อมูลให้ครบถ้วน");
    
    setStatus("generating");
    
    setTimeout(() => {
      setModelUrl(imagePreview);
      setStatus("ready");
    }, 1500);
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setImagePreview(URL.createObjectURL(f));
      setModelUrl(null);
      setStatus("idle");
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    setFile(null);
    setModelUrl(null);
    setStatus("idle");
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6 space-y-8 font-sans text-slate-900 pb-20">
      <header className="flex items-center gap-4 border-b-[5px] border-slate-900 pb-6">
        <div className="bg-[#A855F7] p-4 border-[4px] border-slate-900 rounded-2xl shadow-[5px_5px_0px_0px_#000]">
          <Stethoscope size={32} color="white" strokeWidth={3} />
        </div>
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">Smart Admission AI</h1>
          <div className="flex gap-2 items-center mt-1">
             <span className="bg-[#6BCB77] text-white text-[10px] px-3 py-1 font-bold rounded uppercase border-[2px] border-slate-900 shadow-[2px_2px_0px_0px_#000]">
               Local Engine Active • No Fetch Errors
             </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* ⬅️ ฝั่งซ้าย: ข้อมูลสัตว์ป่วย & รูปภาพ (ข้อ 1-3) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-[4px] border-slate-900 rounded-3xl p-6 shadow-[8px_8px_0px_0px_#000]">
            <h2 className="text-xl font-black uppercase mb-4 flex items-center gap-2">1. เลือกชนิดสัตว์</h2>
            <div className="flex gap-4">
              {['dog', 'cat'].map(type => (
                <button 
                  key={type} 
                  onClick={() => setSelectedAnimal(type)} 
                  className={`flex-1 py-4 border-[4px] border-slate-900 rounded-2xl font-black uppercase transition-all flex items-center justify-center gap-2 ${selectedAnimal === type ? 'bg-[#FFD93D] -translate-y-1 shadow-[5px_5px_0px_0px_#000]' : 'bg-white hover:bg-slate-50'}`}
                >
                  {type === 'dog' ? <Dog /> : <Cat />} {type === 'dog' ? 'สุนัข' : 'แมว'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border-[4px] border-slate-900 rounded-3xl p-6 shadow-[8px_8px_0px_0px_#000]">
            <h2 className="text-xl font-black uppercase mb-4 flex items-center gap-2">2. ข้อมูลพื้นฐาน</h2>
            <div className="space-y-4">
              <input value={petName} onChange={e => setPetName(e.target.value)} type="text" placeholder="ชื่อสัตว์เลี้ยง" className="w-full bg-slate-50 border-[3px] border-slate-900 rounded-xl p-3 font-bold focus:bg-white outline-none" />
              <input value={breed} onChange={e => setBreed(e.target.value)} type="text" placeholder="สายพันธุ์" className="w-full bg-[#E0F2FE] border-[3px] border-slate-900 rounded-xl p-3 font-bold focus:bg-white outline-none" />
            </div>
          </div>

          <div className="bg-[#FFF0F0] border-[4px] border-slate-900 rounded-3xl p-6 shadow-[8px_8px_0px_0px_#000] flex flex-col gap-4">
            <h2 className="text-xl font-black uppercase flex items-center gap-2">3. อาการและรูปถ่าย</h2>
            <textarea value={symptoms} onChange={e => setSymptoms(e.target.value)} placeholder="ระบุอาการเจ็บป่วยเบื้องต้น..." rows={3} className="w-full bg-white border-[3px] border-slate-900 rounded-xl p-4 font-bold resize-none outline-none" />
            
            {!imagePreview ? (
              <div onClick={() => fileInputRef.current?.click()} className="border-[3px] border-slate-900 border-dashed rounded-xl h-36 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-slate-50 transition-all group">
                <Camera size={40} className="text-slate-400 group-hover:text-slate-900 mb-2 transition-colors" />
                <span className="font-black uppercase text-slate-400 group-hover:text-slate-900">คลิกเพื่ออัปโหลดรูปภาพ</span>
                <input type="file" className="hidden" ref={fileInputRef} onChange={onImageChange} accept="image/*" />
              </div>
            ) : (
              <div className="relative border-[3px] border-slate-900 rounded-xl h-48 overflow-hidden bg-slate-900 shadow-[inset_0px_4px_10px_rgba(0,0,0,0.5)]">
                <img src={imagePreview} alt="preview" className="w-full h-full object-cover opacity-90" />
                <button onClick={clearImage} className="absolute top-2 right-2 bg-white border-[3px] border-slate-900 p-1.5 rounded-lg shadow-[3px_3px_0px_0px_#000] hover:bg-red-50 hover:scale-105 transition-all">
                  <X size={18} strokeWidth={3} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ➡️ ฝั่งขวา: แสดงผล 3D อย่างเดียว (ข้อ 4) */}
        <div className="lg:col-span-7 space-y-8 flex flex-col">
          <div className="bg-white border-[4px] border-slate-900 rounded-3xl p-6 shadow-[8px_8px_0px_0px_#000] flex-1 flex flex-col min-h-[600px]">
            <h2 className="text-xl font-black uppercase mb-6 flex items-center justify-between">
              4. สร้างโมเดล 3D เสมือนจริง
            </h2>

            <div className="flex-1 flex flex-col justify-center relative w-full h-full">
              {!imagePreview ? (
                <div className="flex flex-col items-center justify-center text-slate-300">
                  <Sparkles size={80} className="mb-4" />
                  <span className="font-black text-2xl uppercase">กรุณาอัปโหลดรูปภาพในข้อ 3</span>
                </div>
              ) : status === "idle" ? (
                <div className="flex flex-col items-center justify-center">
                  <button onClick={startGeneration} className="w-full max-w-sm bg-[#A855F7] text-white border-[5px] border-slate-900 rounded-2xl py-8 font-black text-3xl shadow-[8px_8px_0px_0px_#000] flex items-center justify-center gap-4 hover:-translate-y-1 active:translate-y-1 transition-all">
                    <Sparkles size={32} /> GENERATE 3D
                  </button>
                </div>
              ) : status === "generating" ? (
                <div className="flex flex-col items-center justify-center text-slate-900">
                  <Loader2 className="animate-spin mb-6" size={80} strokeWidth={3} />
                  <span className="font-black text-3xl uppercase animate-pulse text-center">
                    กำลังจำลองพื้นผิว<br/>ลงบนโมเดล {selectedAnimal === 'dog' ? 'สุนัข' : 'แมว'}...
                  </span>
                </div>
              ) : status === "ready" && modelUrl && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full w-full flex flex-col">
                  <div className="flex-1 bg-[#F8FAFC] border-[4px] border-slate-900 rounded-3xl overflow-hidden relative shadow-[inset_0px_4px_10px_rgba(0,0,0,0.05)]">
                    <Canvas shadows camera={{ position: [0, 2, 8], fov: 40 }}>
                      {/* 🟢 Suspense ตัวนี้จะป้องกันไม่ให้จอขาวตอนโหลด 3D */}
                      <Suspense fallback={<Html center><Loader2 className="animate-spin text-slate-900" size={48} /></Html>}>
                        <OrbitControls enablePan={false} maxDistance={12} minDistance={4} />
                        <LocalMappedModel 
                          animalType={selectedAnimal}
                          textureUrl={modelUrl} 
                          selectedParts={selectedParts}
                          toggleBodyPart={(id: string) => setSelectedParts(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])}
                        />
                        <Environment preset="city" />
                        <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={10} blur={2.5} />
                      </Suspense>
                    </Canvas>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {selectedParts.length === 0 && <span className="text-[12px] font-black uppercase text-slate-400 italic">ยังไม่ได้เลือกจุดตรวจ</span>}
                    {selectedParts.map(id => {
                      const pin = PIN_CONFIG.find(p => p.id === id);
                      return (
                        <span key={id} className="bg-[#6BCB77] border-[3px] border-slate-900 px-4 py-2 rounded-xl text-sm font-black uppercase shadow-[3px_3px_0px_0px_#000] flex items-center gap-2">
                          {pin && <pin.icon size={16} />} {pin?.label}
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          <button className="w-full bg-[#4ADE80] border-[5px] border-slate-900 rounded-3xl py-8 font-black text-3xl shadow-[10px_10px_0px_0px_#000] hover:-translate-y-1 active:translate-y-1 transition-all flex items-center justify-center gap-4 shrink-0">
            <Save size={32} /> COMPLETE ADMISSION
          </button>
        </div>
      </div>
    </div>
  );
}
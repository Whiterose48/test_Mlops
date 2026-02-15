import { Outlet, NavLink } from "react-router";
import { motion, AnimatePresence } from "motion/react"; 
import { useState, useEffect } from "react";
import { 
  Heart, 
  Activity, 
  ClipboardList, 
  BedDouble, 
  BarChart2, 
  Clock,
  Menu,
  X
} from "lucide-react";

export default function RootLayout() {
  const [time, setTime] = useState(new Date());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // ฟอร์แมตเวลาแบบเต็ม
  const formattedDateTime = time.toLocaleString('en-GB', {
    timeZone: 'Asia/Bangkok',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }).replace(',', '').toUpperCase();

  const navItems = [
    { path: "/", label: "TRIAGE", icon: Activity, bgColor: "#FF6B6B" },
    { path: "/admission", label: "ADMIT", icon: ClipboardList, bgColor: "#FFD93D" },
    { path: "/ward", label: "WARD", icon: BedDouble, bgColor: "#6BCB77" },
    { path: "/impact", label: "STATS", icon: BarChart2, bgColor: "#A855F7" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans relative">
      
      {/* 2D Grid Background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[size:32px_32px] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] pointer-events-none fixed z-0"></div>

      {/* Header / Top Navigation */}
      <header className="relative z-50 sticky top-0 w-full pt-4 md:pt-6 px-4 md:px-8">
        <div className="max-w-[1600px] mx-auto relative">
          
          {/* Top Bar (โลโก้ + นาฬิกามือถือแบบเต็ม + Hamburger) */}
          <div className="flex items-center justify-between gap-2 md:gap-4">
            
            {/* Logo Badge */}
            <div className="bg-white border-[3px] md:border-[4px] border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] md:shadow-[6px_6px_0px_0px_#0f172a] px-3 py-2 md:px-6 md:py-4 rounded-2xl flex items-center gap-2 md:gap-4 transition-all z-20 shrink-0">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-8 h-8 md:w-16 md:h-16 bg-[#FF6B6B] border-[2px] md:border-[3px] border-slate-900 rounded-xl flex items-center justify-center shadow-[2px_2px_0px_0px_#0f172a] md:shadow-[4px_4px_0px_0px_#0f172a] shrink-0"
              >
                <Heart className="text-white w-4 h-4 md:w-8 md:h-8" strokeWidth={3} fill="white" />
              </motion.div>
              <div className="flex flex-col">
                <h1 className="text-base md:text-3xl font-black uppercase tracking-widest text-slate-900 leading-none mb-0.5 md:mb-2">
                  Vet Care
                </h1>
                <span className="text-[8px] md:text-xs font-black text-slate-500 uppercase tracking-widest">
                  System V.1
                </span>
              </div>
            </div>

            {/* Mobile Actions (เวลาแบบเต็ม + Hamburger) - สำหรับจอมือถือ */}
            <div className="lg:hidden flex items-center justify-end gap-2 z-20 w-full">
              
              {/* Mobile Clock (แสดงเวลาเต็มๆ เหมือนจอคอม) */}
              <div className="bg-slate-900 border-[3px] border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl flex items-center gap-1.5 sm:gap-2 overflow-hidden">
                <Clock className="text-[#FF6B9D] animate-pulse shrink-0 w-3.5 h-3.5 sm:w-5 sm:h-5" strokeWidth={2.5} />
                <div className="flex flex-col">
                  <span className="font-black text-slate-400 tracking-widest text-[6px] sm:text-[9px] uppercase leading-none mb-0.5">
                    UTC+7 THAILAND
                  </span>
                  <span className="font-black text-[#FF6B9D] tracking-wider text-[8px] sm:text-xs tabular-nums leading-none whitespace-nowrap">
                    {formattedDateTime}
                  </span>
                </div>
              </div>

              {/* Hamburger Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="bg-white border-[3px] border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] p-1.5 sm:p-3 rounded-xl active:translate-y-1 active:shadow-none transition-all shrink-0"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-8 sm:h-8 text-slate-900" strokeWidth={3} />
                ) : (
                  <Menu className="w-5 h-5 sm:w-8 sm:h-8 text-slate-900" strokeWidth={3} />
                )}
              </button>
            </div>

            {/* Desktop Navigation Menu (ซ่อนบนมือถือ) */}
            <div className="hidden lg:flex flex-wrap items-center justify-center gap-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) => `
                      relative px-6 py-4 border-[4px] border-slate-900 rounded-xl font-black uppercase text-lg flex items-center gap-3 transition-all duration-150
                      ${isActive 
                        ? 'translate-y-1 shadow-none'
                        : 'bg-white hover:-translate-y-1 shadow-[6px_6px_0px_0px_#0f172a]'
                      }
                    `}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? item.bgColor : '#ffffff',
                    })}
                  >
                    {({ isActive }) => (
                      <>
                        <IconComponent className="w-6 h-6" strokeWidth={3} />
                        <span className="tracking-wide">{item.label}</span>
                        {isActive && (
                          <span className="absolute -top-2 -right-2 w-5 h-5 bg-slate-900 rounded-full animate-bounce border-[3px] border-white"></span>
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>

            {/* Desktop Digital Clock (ซ่อนบนมือถือ) */}
            <div className="hidden lg:flex bg-slate-900 border-[4px] border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] px-6 py-4 rounded-2xl items-center gap-4 min-w-[320px] justify-center">
              <Clock className="text-[#FF6B9D] animate-pulse shrink-0 w-8 h-8" strokeWidth={2.5} />
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-black uppercase tracking-widest leading-none mb-1.5">
                  UTC+7 THAILAND
                </span>
                <span className="font-black text-[#FF6B9D] tracking-widest text-lg tabular-nums leading-none">
                  {formattedDateTime}
                </span>
              </div>
            </div>

          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden absolute top-full left-0 right-0 mt-4 bg-white border-[4px] border-slate-900 shadow-[6px_6px_0px_0px_#0f172a] rounded-2xl p-4 flex flex-col gap-3 z-10"
              >
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === "/"}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) => `
                        relative px-5 py-4 border-[3px] border-slate-900 rounded-xl font-black uppercase text-base flex items-center gap-3 transition-all duration-150
                        ${isActive 
                          ? 'translate-y-1 shadow-none'
                          : 'bg-slate-50 hover:-translate-y-1 shadow-[4px_4px_0px_0px_#0f172a]'
                        }
                      `}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? item.bgColor : undefined,
                      })}
                    >
                      {({ isActive }) => (
                        <>
                          <IconComponent className="w-6 h-6" strokeWidth={3} />
                          <span className="tracking-wide">{item.label}</span>
                          {isActive && (
                            <span className="absolute right-4 w-4 h-4 bg-slate-900 rounded-full animate-bounce border-[2px] border-white"></span>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full overflow-x-hidden">
        <div className="min-h-screen pt-8 md:pt-16 px-4 md:px-8 max-w-[1600px] mx-auto pb-12">
          <Outlet />
        </div>
      </main>

    </div>
  );
}
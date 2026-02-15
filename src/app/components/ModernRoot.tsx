import { Outlet, NavLink } from "react-router";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Heart, ClipboardPlus, BedDouble, Sparkles } from "lucide-react";

export default function ModernRoot() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { path: "/", label: "Heartbeat", icon: Heart, color: "from-pink-400 to-rose-400" },
    { path: "/admission", label: "Admission", icon: ClipboardPlus, color: "from-blue-400 to-cyan-400" },
    { path: "/ward", label: "Ward", icon: BedDouble, color: "from-purple-400 to-indigo-400" },
    { path: "/impact", label: "Impact", icon: Sparkles, color: "from-amber-400 to-orange-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b-4 border-indigo-900 sticky top-0 z-50"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
            >
              <div 
                className="relative bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-4 transform rotate-3"
                style={{
                  boxShadow: '0 12px 24px rgba(236, 72, 153, 0.4), 0 4px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                <motion.div
                  animate={{ rotate: [3, -3, 3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-8 h-8 text-white" fill="white" />
                </motion.div>
                
                {/* 3D effect layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                <div className="absolute -bottom-1 -right-1 w-full h-full bg-rose-600/30 rounded-2xl -z-10 blur-sm" />
              </div>

              <div>
                <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
                  VETCARE TRIAGE
                </h1>
                <p className="text-sm font-semibold text-purple-400">
                  Macaron Professional System
                </p>
              </div>
            </motion.div>

            {/* Time Display */}
            <div 
              className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl px-6 py-3 border-2 border-indigo-700"
              style={{
                boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.2)'
              }}
            >
              <div className="text-sm font-bold text-white/80">
                {time.toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: 'numeric' })}
              </div>
              <div className="text-2xl font-black text-white">
                {time.toLocaleTimeString('en-US', { hour12: false })}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-3 mt-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
              >
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ y: 0, scale: 0.98 }}
                    className={`
                      relative px-6 py-3 rounded-xl font-bold text-sm
                      transition-all duration-300 border-2
                      ${isActive 
                        ? `bg-gradient-to-r ${item.color} text-white border-transparent` 
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                      }
                    `}
                    style={{
                      boxShadow: isActive 
                        ? '0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)'
                        : '0 2px 8px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>

                    {/* 3D Bottom shadow */}
                    {isActive && (
                      <>
                        <div 
                          className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-xl opacity-30 blur-lg -z-10`}
                          style={{ transform: 'translateY(4px)' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-xl" />
                      </>
                    )}
                  </motion.div>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>

      {/* Floating decorative elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-16 h-16 rounded-full blur-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${
              ['rgba(236, 72, 153, 0.2)', 'rgba(139, 92, 246, 0.2)', 'rgba(59, 130, 246, 0.2)'][i % 3]
            }, transparent)`,
            left: `${10 + i * 20}%`,
            top: `${30 + Math.sin(i) * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

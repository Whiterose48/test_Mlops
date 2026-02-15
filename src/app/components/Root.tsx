import { Outlet, NavLink } from "react-router";
import { Heart, ClipboardPlus, Brain, BedDouble, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function Root() {
  const navItems = [
    { path: "/", label: "Heartbeat", icon: Heart },
    { path: "/admission", label: "Admission", icon: ClipboardPlus },
    { path: "/ward", label: "Ward", icon: BedDouble },
    { path: "/impact", label: "Impact", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-purple-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="bg-gradient-to-br from-pink-400 to-purple-400 p-3 rounded-2xl shadow-lg"
              >
                <Heart className="w-6 h-6 text-white" fill="white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  VetCare Triage
                </h1>
                <p className="text-xs text-purple-400">Macaron Professional</p>
              </div>
            </div>

            {/* Nav Links */}
            <div className="flex gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg"
                        : "text-purple-600 hover:bg-purple-100"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}

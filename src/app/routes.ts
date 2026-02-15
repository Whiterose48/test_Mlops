import { createBrowserRouter } from "react-router";
import RetroRoot from "./components/RetroRoot";
import Dashboard from "./components/Dashboard"; 
import SmartAdmission from "./components/SmartAdmission";
import WardLogistics from "./components/WardLogistics";
import ImpactCorner from "./components/ImpactCorner";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RetroRoot, // ✨ 2. เปลี่ยนกรอบหลัก (Layout) มาใช้ RetroRoot
    children: [
      { index: true, Component: Dashboard }, // หน้าแรกดึง Dashboard แบบ 2D มาแสดง
      { path: "admission", Component: SmartAdmission },
      { path: "ward", Component: WardLogistics },
      { path: "impact", Component: ImpactCorner },
    ],
  },
]);
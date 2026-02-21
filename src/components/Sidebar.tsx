"use client";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  LogOut,
  Package,
  Globe,
  Repeat,
  ArrowLeftRight,
} from "lucide-react";
interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
}
const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { id: "user", label: "User", icon: Users, path: "/user" },
{ id: "plans", label: "Plans", icon: Package, path: "/plans" },
{ id: "subdomains", label: "Subdomains", icon: Globe, path: "/subdomains" },
{ id: "subscription", label: "Subscription", icon: Repeat, path: "/subscription" },{ id: "transactions", label: "Transactions", icon: ArrowLeftRight, path: "/transactions" }

];
const Sidebar: React.FC = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const isLight = theme === "light";
  return (
    <aside
      className={`flex h-screen w-72 flex-col border-r p-6 shadow-2xl
        ${isLight
          ? "bg-white border-gray-200 text-gray-700"
          : "bg-[#0f172a] border-white/10 text-slate-300"
        }
      `}
    >
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20">
          <ShieldCheck className="text-white" size={24} />
        </div>
        <span
          className={`text-xl font-bold tracking-tight ${isLight ? "text-gray-900" : "text-white"
            }`}
        >
          Nexus Core
        </span>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              `group relative flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all duration-300
              ${isActive
                ? isLight
                  ? "bg-gray-100 text-gray-900"
                  : "bg-white/10 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
                : isLight
                  ? "hover:bg-gray-100 hover:text-gray-900"
                  : "hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-4">
                  <item.icon
                    size={20}
                    className={`transition-colors ${isActive
                        ? "text-indigo-400"
                        : "group-hover:text-indigo-400"
                      }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </div>
                {isActive && (
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div
        className={`mt-auto border-t pt-6 ${isLight ? "border-gray-200" : "border-white/5"
          }`}
      >
       <button
  className="group flex w-full items-center gap-4 rounded-xl px-4 py-3 transition-all
             text-slate-400 hover:bg-red-500/10 hover:text-red-400"
  onClick={() => {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("mode")
    localStorage.removeItem("name")
    window.location.href = "/login";
  }}
>
  <LogOut size={20} />
  <span className="font-medium">Logout</span>
</button>

      </div>
    </aside>
  );
};
export default Sidebar;
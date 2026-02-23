"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Bell,
  Moon,
  Sun,
  Command,
  ChevronDown,
} from "lucide-react";
import { toggleTheme } from "../redux/themeSlice";
import { Link } from "react-router-dom";
const Header: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.theme);
  const userRole =localStorage.getItem("role");
  const userName =localStorage.getItem("name");
  const tokken= localStorage.getItem('token')
  return (
    <header
      className={`${tokken?"block":"hidden"}
        sticky top-0 z-40 w-full border-b border-white/10 backdrop-blur-md px-8 py-3
        ${theme === "light" ? "bg-white" : "bg-[#0f172a]/80"}
      `}>
      <div className="flex items-center justify-between">
        <div className="relative group w-96">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search anything..."
            className={`
              w-full border rounded-xl py-2 pl-10 pr-12 text-sm focus:outline-none
              focus:ring-2 focus:ring-indigo-500/50 transition-all
              ${
                theme === "light"
                  ? "bg-gray-100 text-gray-800 placeholder:text-gray-400 border-gray-200"
                  : "bg-white/5 text-slate-200 placeholder:text-slate-500 border-white/10"
              }
            `}
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded border px-1.5 font-sans text-[10px] font-medium
              border-white/20 bg-white/5 text-slate-400">
              <Command size={10} />K
            </kbd>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center border-r border-white/10 pr-4 gap-2">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-gray-300 transition-all">
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          
          </div>
          <button className="flex items-center gap-3 pl-2 group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-black group-hover:text-indigo-400 transition-colors">
                {userName}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                {userRole}
              </p>
            </div>
            <Link to="/profile">
              <img
                src="https://i.pravatar.cc/300"
                alt="User Avatar"
                className="h-8 w-8 rounded-full object-cover border-2 border-white"
              />
            </Link>
            <ChevronDown size={16} className="text-slate-500 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
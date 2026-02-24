"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Mail,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Calendar,
  Settings,
} from "lucide-react";
import { FETCH } from "../utils/apiUtils";
const Profile: React.FC = () => {
  const [user, setUser] = useState({
    email: "", role: "", isActive: "", name: "", mobileNo: ""
  });
  const theme = useSelector((state: any) => state.theme.theme);
  const isLight = theme === "light";
  const userprofile = async () => {
    try {
      const res = await FETCH({
        url: "/auth/user/me",
      });
      setUser(res.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userprofile();
  }, []);
  const cardBase = `rounded-3xl border transition-all duration-300 hover:shadow-xl ${
    isLight 
      ? "bg-white border-gray-100 shadow-sm" 
      : "bg-slate-900/50 border-white/5 backdrop-blur-xl"
  }`;
  return (
    <div className={`min-h-[92vh] font-sans selection:bg-indigo-500/30 ${
      isLight ? "bg-[#fcfcfd] text-slate-900" : "bg-[#020617] text-slate-100"
    }`}>
      <div className="relative h-72 w-full overflow-hidden">
        <div className={`absolute inset-0 opacity-40 ${
          isLight 
            ? "bg-[radial-gradient(circle_at_top_right,#e0e7ff,transparent)]" 
            : "bg-[radial-gradient(circle_at_top_right,#1e1b4b,transparent)]"
        }`} />
        <div className="absolute bottom-0 h-px w-full bg-linear-to-r from-transparent via-slate-500/20 to-transparent" />
      </div>
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="relative -mt-32 flex flex-col items-center md:items-end md:flex-row md:gap-8">
          <div className="group relative">
            <div className={`absolute -inset-1 rounded-[2.5rem] bg-linear-to-tr from-indigo-500 to-purple-500 opacity-20 blur transition duration-500 group-hover:opacity-40`} />
            <img
              src="https://i.pravatar.cc/300"
              alt="Avatar"
              className={`relative h-44 w-44 rounded-[2.2rem] border-8 object-cover shadow-2xl ${
                isLight ? "border-white" : "border-[#020617]"
              }`} />
            {user.isActive === "true" && (
              <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 ring-4 ring-white dark:ring-[#020617]">
                <div className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
              </div>
            )}
          </div>
          <div className="mt-6 flex-1 text-center md:mb-4 md:text-left">
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <h1 className="text-5xl font-extrabold tracking-tighter">
                {user.name || "Loading..."}
              </h1>
              <CheckCircle2 className="text-indigo-500" size={28} />
            </div>
            <p className="mt-2 text-lg font-medium text-slate-500 dark:text-slate-400">
              {user.role}
            </p>
          </div>
          <div className="mt-6 flex gap-3 md:mb-6">
            <button className={`flex items-center gap-2 rounded-2xl px-6 py-2.5 text-sm font-semibold transition-all hover:scale-105 active:scale-95 ${
              isLight ? "bg-slate-900 text-white" : "bg-white text-slate-900"
            }`}>
              <Settings size={16} /> Edit Profile
            </button>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 pb-20">
          <div className={`${cardBase} md:col-span-2 p-8`}>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 mb-8">
              Personal Information
            </h3>            
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <div className="space-y-1">
                <span className="text-sm text-slate-400">Email Address</span>
                <div className="flex items-center gap-3 font-medium">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                    <Mail size={18} />
                  </div>
                  {user.email}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-slate-400">Mobile Number</span>
                <div className="flex items-center gap-3 font-medium">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
                    <Phone size={18} />
                  </div>
                  {user.mobileNo || "Not provided"}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-slate-400">Account Status</span>
                <div className="flex items-center gap-3 font-medium">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    user.isActive === "true" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                  }`}>
                    <ShieldCheck size={18} />
                  </div>
                  {user.isActive === "true" ? "Verified Elite" : "Pending Verification"}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-slate-400">Member Since</span>
                <div className="flex items-center gap-3 font-medium">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                    <Calendar size={18} />
                  </div>
                  February 2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
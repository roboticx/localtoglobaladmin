"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Mail,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { FETCH } from "../utils/apiUtils";
const Profile: React.FC = () => {
  const [user, setUser] = useState({
    email: "", role: "", isActive: "", name: ""
  })
  const [active, setActive] = useState(false);

  const theme = useSelector((state: any) => state.theme.theme);
  const isLight = theme === "light";
  const userprofile = async () => {
    try {
      const res = await FETCH({
        url: "/user/me",
        toast: true,
      })
      setUser(res.user)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    userprofile()
  }, [])
  return (
    <div
      className={`min-h-screen ${isLight ? "bg-gray-50 text-gray-900" : "bg-[#0f172a] text-white"
        }`}>
      <div className="relative h-64 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="mx-auto max-w-5xl px-8">
        <div className="relative -mt-20 flex flex-col items-end md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center md:flex-row md:items-end gap-6">
            <div className="relative">
              <img
                 src="https://i.pravatar.cc/300"
                alt="Avatar"
                className={`h-40 w-40 rounded-3xl border-4 object-cover shadow-2xl ${isLight
                    ? "border-gray-50 bg-white"
                    : "border-[#0f172a] bg-[#1e293b]"
                  }`} />
              <div
                className={`absolute bottom-2 right-2 rounded-full bg-emerald-500 p-1.5 border-4 ${isLight ? "border-gray-50" : "border-[#0f172a]"
                  }`} >
                <div className="h-3 w-3 rounded-full bg-white animate-pulse" />
              </div>
            </div>
            <div className="mb-4 text-center md:text-left">
              <div className="flex items-center gap-2">
                <h1 className="text-4xl font-bold tracking-tight">
                  {user.name}
                </h1>
                <CheckCircle2 className="text-indigo-400" size={24} />
              </div>
              <p className="text-slate-400 font-medium">
                {user.role}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActive(!active)}
            className={`relative mb-4 flex h-11 w-36 items-center rounded-full px-1 transition-all duration-300 active:scale-95 shadow-lg
        ${isLight
                ? "bg-gray-200 shadow-gray-300"
                : "bg-slate-700 shadow-black/40"
              }`}
          >
            <span
              className={`absolute left-1 top-1 h-9 w-16 rounded-full transition-all duration-300 ease-in-out
          ${active
                  ? "translate-x-[68px] bg-indigo-600"
                  : "translate-x-0 bg-gray-400"
                }`}
            />
            <span
              className={`relative z-10 flex-1 text-sm font-semibold transition-colors duration-300
          ${!active ? "text-white" : "text-gray-500"}`}
            >
              OFF
            </span>
            <span
              className={`relative z-10 flex-1 text-sm font-semibold transition-colors duration-300
          ${active ? "text-white" : "text-gray-500"}`}
            >
              ON
            </span>
          </button>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3 pb-12">
          <div className="space-y-6">
            <div
              className={`rounded-2xl border p-6 backdrop-blur-sm ${isLight
                  ? "bg-white border-gray-200"
                  : "bg-white/5 border-white/5"
                }`}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
                About
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-indigo-400" />
                  {user.email}
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={18} className="text-indigo-400" />
                  {user.isActive === "true" ? "Active" : "Inactive"}
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div
              className={`rounded-2xl border p-8 ${isLight
                  ? "bg-white border-gray-200"
                  : "bg-white/5 border-white/5"
                }`}>
              <h3 className="mb-6 text-xl font-bold">Recent Activity</h3>
              <div className="space-y-6">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="flex gap-4 border-l-2 border-indigo-500/30 pl-6 relative">
                    <div
                      className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-indigo-500 ${isLight ? "bg-white" : "bg-[#0f172a]"
                        }`} />
                    <div>
                      <p className="font-medium">
                        Deployed "Nexus Dashboard v2.0" to production
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};
export default Profile;
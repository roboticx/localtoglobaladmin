"use client";

import React from "react";
import { useSelector } from "react-redux";
import { Bell, Lock, Eye, Globe, Save } from "lucide-react";
const Setting: React.FC = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const isLight = theme === "light";
  const sections = [
    { title: "Profile", desc: "Manage your public information.", icon: Eye },
    {
      title: "Notifications",
      desc: "Choose how you want to be alerted.",
      icon: Bell,
    },
    {
      title: "Security",
      desc: "Update your password and 2FA settings.",
      icon: Lock,
    },
    {
      title: "Localization",
      desc: "Change your language and timezone.",
      icon: Globe,
    },
  ];
  return (
    <div
      className={`min-h-screen p-8 ${
        isLight ? "bg-gray-50 text-gray-900" : "bg-[#0f172a] text-white"
      }`}
    >
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p
            className={`${
              isLight ? "text-gray-500" : "text-slate-400"
            }`}
          >
            Configure your account preferences.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors font-medium">
          <Save size={18} />
          Save Changes
        </button>
      </header>
      <div className="max-w-3xl space-y-6">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-6 rounded-2xl border transition-all
              ${
                isLight
                  ? "bg-white border-gray-200 hover:bg-gray-50"
                  : "bg-white/5 border-white/5 hover:bg-white/[0.07]"
              }
            `}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                <section.icon size={22} />
              </div>
              <div>
                <h3 className="font-semibold">{section.title}</h3>
                <p
                  className={`text-sm ${
                    isLight ? "text-gray-500" : "text-slate-400"
                  }`}
                >
                  {section.desc}
                </p>
              </div>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                defaultChecked={index % 2 === 0}
              />
              <div
                className={`h-6 w-11 rounded-full after:absolute after:left-[2px] after:top-[2px]
                after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all
                ${
                  isLight
                    ? "bg-gray-300 peer-checked:bg-indigo-500"
                    : "bg-slate-700 peer-checked:bg-indigo-500"
                }
                peer-checked:after:translate-x-full`}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Setting;
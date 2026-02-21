"use client";
import React from "react";
import { useSelector } from "react-redux";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";
const Dashboard: React.FC = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const isLight = theme === "light";
  const stats = [
    {
      label: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      icon: DollarSign,
    },
    {
      label: "Subscriptions",
      value: "+2,350",
      change: "+180.1%",
      icon: Users,
    },
    {
      label: "Sales",
      value: "+12,234",
      change: "+19%",
      icon: TrendingUp,
    },
    {
      label: "Active Now",
      value: "+573",
      change: "+201 since last hour",
      icon: Activity,
    },
  ];
  return (
    <div
      className={`min-h-screen p-8 ${
        isLight ? "bg-gray-50 text-gray-900" : "bg-[#0f172a] text-white"
      }`}
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p
          className={`${
            isLight ? "text-gray-500" : "text-slate-400"
          }`}>
          Welcome back, here is what's happening today.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-2xl border p-6 backdrop-blur-sm transition-all
              ${
                isLight
                  ? "bg-white border-gray-200 hover:bg-gray-50"
                  : "bg-white/5 border-white/5 hover:bg-white/10"
              }
            `}>
            <div className="flex items-center justify-between pb-2">
              <span
                className={`text-sm font-medium ${
                  isLight ? "text-gray-500" : "text-slate-400"
                }`}>
                {stat.label}
              </span>
              <stat.icon size={18} className="text-indigo-400" />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-emerald-400 mt-1">
              {stat.change}
            </p>
          </div>
        ))}
      </div>
      <div
        className={`mt-8 h-64 rounded-2xl border p-8 flex items-center justify-center italic
          ${
            isLight
              ? "bg-white border-gray-200 text-gray-400"
              : "bg-white/5 border-white/5 text-slate-500"
          }
        `}
      >
        Activity Chart / Analytics visualization goes here
      </div>
    </div>
  );
};
export default Dashboard;
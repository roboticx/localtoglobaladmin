"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Users, Activity, DollarSign, Globe } from "lucide-react";
import { FETCH } from "../utils/apiUtils";

interface DashboardData {
  users: {
    total: number;
    active: number;
    inactive: number;
  };
  transactions: {
    total: number;
    statusWise: {
      pending: number;
      success: number;
      failed: number;
    };
    recent: any[];
  };
  subdomains: {
    total: number;
    status: {
      active: number;
      inactive: number;
    };
  };
}

const Dashboard: React.FC = () => {
  const theme = useSelector((state: any) => state.theme.theme);
  const isLight = theme === "light";

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  const getdashboard = async () => {
    try {
      const res = await FETCH({
        url: "/dashboard/admin",
      });
      setDashboard(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdashboard();
  }, []);

  const totalRevenue =
    dashboard?.transactions?.recent
      ?.filter((t) => t.status === "SUCCESS")
      ?.reduce((acc, curr) => acc + curr.amount, 0) || 0;

  const cardStyle = isLight
    ? "bg-white border border-gray-200 shadow-sm hover:shadow-md"
    : "bg-slate-800 border border-slate-700 hover:border-slate-600";

  return (
    <div
      className={`min-h-[92vh] p-10 transition-colors duration-300 ${
        isLight ? "bg-gray-50 text-gray-900" : "bg-slate-900 text-slate-100"
      }`}
    >
      {/* HEADER */}
      <header className="mb-12">
        <h1 className="text-4xl font-semibold tracking-tight">
          Overview
        </h1>
        <p className={`${isLight ? "text-gray-500" : "text-slate-400"} mt-2`}>
          Monitor platform performance and insights in real time.
        </p>
      </header>

      {/* STAT CARDS */}
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

        {/* USERS */}
        <div className={`rounded-2xl p-6 transition-all ${cardStyle}`}>
          <div className="flex items-center justify-between">
            <Users size={20} className="text-indigo-400" />
            <span className="text-xs opacity-60">Users</span>
          </div>
          <div className="mt-6 text-3xl font-semibold">
            {dashboard?.users?.total || 0}
          </div>
          <p className="mt-1 text-sm opacity-60">
            {dashboard?.users?.active || 0} active users
          </p>
        </div>

        {/* TRANSACTIONS */}
        <div className={`rounded-2xl p-6 transition-all ${cardStyle}`}>
          <div className="flex items-center justify-between">
            <Activity size={20} className="text-indigo-400" />
            <span className="text-xs opacity-60">Transactions</span>
          </div>
          <div className="mt-6 text-3xl font-semibold">
            {dashboard?.transactions?.total || 0}
          </div>
          <p className="mt-1 text-sm opacity-60">
            {dashboard?.transactions?.statusWise?.pending || 0} pending
          </p>
        </div>

        {/* REVENUE */}
        <div className={`rounded-2xl p-6 transition-all ${cardStyle}`}>
          <div className="flex items-center justify-between">
            <DollarSign size={20} className="text-indigo-400" />
            <span className="text-xs opacity-60">Revenue</span>
          </div>
          <div className="mt-6 text-3xl font-semibold">
            ₹{totalRevenue}
          </div>
          <p className="mt-1 text-sm opacity-60">
            {dashboard?.transactions?.statusWise?.success || 0} successful payments
          </p>
        </div>

        {/* SUBDOMAINS */}
        <div className={`rounded-2xl p-6 transition-all ${cardStyle}`}>
          <div className="flex items-center justify-between">
            <Globe size={20} className="text-indigo-400" />
            <span className="text-xs opacity-60">Subdomains</span>
          </div>
          <div className="mt-6 text-3xl font-semibold">
            {dashboard?.subdomains?.total || 0}
          </div>
          <p className="mt-1 text-sm opacity-60">
            {dashboard?.subdomains?.status?.active || 0} active instances
          </p>
        </div>
      </div>

      {/* RECENT TRANSACTIONS */}
      <div
        className={`mt-14 rounded-2xl p-8 transition-all ${
          isLight
            ? "bg-white border border-gray-200 shadow-sm"
            : "bg-slate-800 border border-slate-700"
        }`}
      >
        <h2 className="text-xl font-semibold mb-6">
          Recent Transactions
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead
              className={`border-b ${
                isLight ? "border-gray-200" : "border-slate-700"
              }`}
            >
              <tr className="text-left opacity-60">
                <th className="pb-3">User</th>
                <th className="pb-3">Plan</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Transaction ID</th>
                <th className="pb-3">Payment Method</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboard?.transactions?.recent?.slice(0, 6).map((tx) => (
                <tr
                  key={tx._id}
                  className={`border-b ${
                    isLight ? "border-gray-100" : "border-slate-700"
                  }`}
                >
                  <td className="py-4">{tx.user?.name}</td>
                  <td className="py-4">{tx.plan?.name}</td>
                  <td className="py-4 font-medium">₹{tx.amount}</td>
                  <td className="py-4 font-medium">{tx.transactionID}</td>
                  <td className="py-4 font-medium">{tx.paymentMethod}</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        tx.status === "SUCCESS"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : tx.status === "PENDING"
                          ? "bg-indigo-500/10 text-indigo-400"
                          : "bg-slate-500/10 text-slate-400"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
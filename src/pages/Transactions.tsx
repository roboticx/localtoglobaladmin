import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { FETCH} from '../utils/apiUtils';
const Transactions = () => {
    const [Transactions, setTransactions] = useState<any>([]);
    const theme = useSelector((state: any) => state.theme.theme);
    const isLight = theme === "light";
    const getTransactions = async () => {
        try {
            const res = await FETCH({
                url: "/transactions/admin",
                toast: true
            })
            setTransactions(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getTransactions()
    }, [])
    return (
      <div
  className={`min-h-screen p-8 ${
    isLight ? "bg-gray-50 text-gray-900" : "bg-[#0f172a] text-white"
  }`}>
  <header className="mb-8 flex flex-col gap-2">
    <h1 className="text-3xl font-bold tracking-tight">
      Transactions
    </h1>
    <p className={isLight ? "text-gray-500" : "text-slate-400"}>
      All subscription transactions in one place.
    </p>
  </header>
  <div
    className={`overflow-x-auto rounded-2xl border shadow-sm ${
      isLight
        ? "bg-white border-gray-200"
        : "bg-slate-800 border-white/10"
    }`}>
    <table className="w-full border-collapse text-xs">
      <thead
        className={`sticky top-0 z-10 ${
          isLight ? "bg-gray-100" : "bg-[#1e293b]"
        }`}>
        <tr className="text-left font-semibold uppercase tracking-wide">
          <th className="px-6 py-4 text-xs ">#</th>
          <th className="px-6 py-4 text-xm ">Name</th>
          <th className="px-6 py-4 text-xm ">Email</th>
          <th className="px-6 py-4 text-xm ">Mobile</th>
          <th className="px-6 py-4 text-xm ">Monthly Offer</th>
          <th className="px-6 py-4 text-xm ">Annual Offer</th>
          <th className="px-6 py-4 text-xm ">Plan Name</th>
          <th className="px-6 py-4 text-xm ">Price</th>
          <th className="px-6 py-4 text-xm ">Duration (Days)</th>
          <th className="px-6 py-4 text-xm text-center">Active</th>
          <th className="px-6 py-4 text-xm text-center">Amount</th>
          <th className="px-6 py-4 text-xm text-center">Payment</th>
          <th className="px-6 py-4 text-xm text-center">Status</th>
        </tr>
      </thead>
      <tbody>
        {Transactions.map((el: any, idx: any) => (
          <tr
            key={idx}
            className={`border-t transition-all ${
              isLight
                ? "border-gray-200 hover:bg-gray-50"
                : "border-white/10 hover:bg-white/5"
            }`}>
            <td className="px-6 py-4 font-medium">
              {idx + 1}
            </td>
            <td className="px-6 py-4 font-medium">
              {el.user.name}
            </td>
            <td className="px-6 py-4 text-sm opacity-80">
              {el.user.email}
            </td>
            <td className="px-6 py-4">
              {el.user.mobileNo}
            </td>
            <td className="px-6 py-4">
              ₹{el.plan.offerPriceMonthly}
            </td>
            <td className="px-6 py-4">
              ₹{el.plan.offerPriceAnnual}
            </td>
            <td className="px-6 py-4 font-semibold">
              {el.plan.name}
            </td>
            <td className="px-6 py-4">
              ₹{el.plan.price}
            </td>
            <td className="px-6 py-4">
              {el.plan.durationDays}
            </td>
            <td className="px-6 py-4 text-center">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  el.plan.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}>
                {String(el.plan.isActive)}
              </span>
            </td>
            <td className="px-6 py-4 text-center font-semibold">
              ₹{el.amount}
            </td>
            <td className="px-6 py-4 text-center capitalize">
              {el.paymentMethod}
            </td>
            <td className="px-6 py-4 text-center">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  el.status === "success"
                    ? "bg-emerald-100 text-emerald-700"
                    : el.status === "failed"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                {el.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
)
}
export default Transactions
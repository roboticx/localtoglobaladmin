import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { FETCH} from '../utils/apiUtils';
import { IndianRupee } from 'lucide-react';
const Transactions = () => {
    const [Transactions, setTransactions] = useState([]);
    const theme = useSelector((state: any) => state.theme.theme);
      const [loading, setLoading] = useState(true);
    const isLight = theme === "light";
    const getTransactions = async () => {
        try {
            const res = await FETCH({
                url: "/transactions/admin",
                toast: true
            })
            setTransactions(res?.data)
        } catch (error) {
            console.log(error);
        }finally {
      setLoading(false);
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
     {loading && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/10 z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="loader"></div>
            <p className="text-sm opacity-60">Loading transaction page...</p>
          </div>
        </div>
      )}
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
          <th className="px-6 py-4 text-xm ">Plan Name</th>
          <th className="px-6 py-4 text-xm ">Price</th>
          <th className="px-6 py-4 text-xm text-center">Amount</th>
          <th className="px-6 py-4 text-xm text-center">subscription</th>
          <th className="px-6 py-4 text-xm text-center">transactionID</th>
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
              {el?.user?.name}
            </td>
            <td className="px-6 py-4 text-sm opacity-80">
              {el?.user?.email}
            </td>
            <td className="px-6 py-4 font-semibold">
              {el?.plan?.name}
            </td>
          <td className="px-6 py-4">
  <div className="flex items-center">
    <IndianRupee size={14} className="text-gray-500" />
    <span>{el?.plan?.price}</span>
  </div>
</td>

<td className="px-6 py-4 text-center font-semibold">
  <div className="flex items-center justify-center">
    <IndianRupee size={14} className="text-gray-500" />
    <span>{el?.amount}</span>
  </div>
</td>
             <td className="px-6 py-4 text-center font-semibold">
              {el?.subscription?`₹ ${el?.subscription}`:"N/A"}
            </td>
            <td className="px-6 py-4 text-center capitalize">
              {el?.transactionID}
            </td> <td className="px-6 py-4 text-center capitalize">
              {el?.paymentMethod}
            </td>
            <td className="px-6 py-4 text-center">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  el?.status === "SUCCESS"
                    ? "bg-emerald-100 text-emerald-700"
                    : el?.status === "FAILED"
                    ? "bg-red-100 text-red-700"
                    :el?.status ==="PENDING"?
                    "bg-yellow-100 text-yellow-700":""
                }`}>
                {el?.status}
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

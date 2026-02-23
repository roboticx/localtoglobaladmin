import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { FETCH } from '../utils/apiUtils';
const Subscriptions = () => {
    const [subscription, setSubscription] = useState([])
    const [selectedPlanData, setSelectedPlanData] = useState<any>(null)
    const [transdata, setTransdata] = useState({
        planid: "",
        modelStat: false
    })
    const [isModalOpen, setIsModalOpen] = useState(false);
    const theme = useSelector((state: any) => state.theme.theme);
    const isLight = theme === "light";
    const dataSubscription = async () => {
        try {
            const res = await FETCH({
                url: "/subscriptions/admin",
                toast: true
            })
            setSubscription(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        dataSubscription()
    }, [])
    return (
        <div className={`min-h-screen p-8 ${isLight ? "bg-gray-50 text-gray-900" : "bg-[#0f172a] text-white"}`}>
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Subscriptions
</h1>
                <div className='flex justify-between'>
                    <p className={isLight ? "text-gray-500" : "text-slate-400"}>
                        All subscription in one place.
                    </p>
                </div>
            </header>
            <div className="overflow-x-auto">
                <table
                    className={`w-full border-collapse rounded-2xl overflow-hidden shadow-md ${isLight ? "bg-white" : "bg-slate-800"
                        }`}>
                    <thead className={isLight ? "bg-gray-200" : "bg-slate-700"}>
                        <tr className="text-left text-xs font-semibold uppercase tracking-wider">
                            <th className="px-6 py-3">Sr.No</th>
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Plan Name</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Duration</th>
                            <th className="px-6 py-3">Active</th>
                            <th className="px-6 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscription.map((el: any, idx: number) => {
                            const plan = el.plans?.[0];
                            const planId = plan?.planId;
                            return (
                                <tr
                                    key={idx}
                                    className={`border-t transition ${isLight
                                        ? "border-gray-200 hover:bg-gray-50"
                                        : "border-white/10 hover:bg-white/5"
                                        }`}>
                                    <td className="px-6 py-4 text-sm font-medium">{idx + 1}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="font-semibold">{el.user?.name}</div>
                                        <div className="text-xs text-gray-500">
                                            {el.user?.mobileNo}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold">
                                        {el.user?.email}
                                    </td>
 <td className="px-6 py-4 text-sm font-semibold">
                                        {el.user?.role}
                                    </td>
                                    <td className="px-6 py-4 text-sm">{planId?.name}</td>
                                    <td className="px-6 py-4 text-sm">₹{planId?.price}</td>
                                    <td className="px-6 py-4 text-sm">
                                        {planId?.durationDays} days
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${planId?.isActive
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-600"
                                                }`}>
                                            {planId?.isActive ? "True" : "False"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button onClick={() => {
  setSelectedPlanData(el.plans);
  setIsModalOpen(true);
}} className={` ${isLight ? "text-indigo-600" : "text-slate-400"}  hover:underline text-sm font-medium`}>
                                            View Transactions
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
           {isModalOpen && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    onClick={() => setIsModalOpen(false)}   // close on outside click
  >
    <div
      className="bg-white w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl p-6 relative"
      onClick={(e) => e.stopPropagation()}  // prevent closing when clicking inside
    >
      {/* Close Button */}
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
      >
        ✕
      </button>

      <h2 className="text-xl font-semibold mb-6">
        Subscription Details
      </h2>

      <table className="w-full border border-gray-200 rounded-lg text-sm">
        {selectedPlanData?.map((plan: any, index: number) => (
          <tbody key={plan._id}>
            <tr className="bg-gray-100">
              <td colSpan={2} className="px-4 py-2 font-semibold">
                Plan #{index + 1}
              </td>
            </tr>

            <tr>
              <td className="px-4 py-2 font-medium">Plan Name</td>
              <td className="px-4 py-2">{plan.planId?.name}</td>
            </tr>

            <tr>
              <td className="px-4 py-2 font-medium">Price</td>
              <td className="px-4 py-2">₹{plan.planId?.price}</td>
            </tr>

            <tr>
              <td className="px-4 py-2 font-medium">Duration</td>
              <td className="px-4 py-2">{plan.planId?.durationDays} days</td>
            </tr>

            <tr>
              <td className="px-4 py-2 font-medium">Status</td>
              <td className="px-4 py-2">{plan.status}</td>
            </tr>

            <tr>
              <td className="px-4 py-2 font-medium">Start Date</td>
              <td className="px-4 py-2">
                {new Date(plan.startDate).toLocaleString()}
              </td>
            </tr>

            <tr>
              <td className="px-4 py-2 font-medium">End Date</td>
              <td className="px-4 py-2">
                {new Date(plan.endDate).toLocaleString()}
              </td>
            </tr>

            {plan.transaction && (
              <>
                <tr className="bg-gray-100">
                  <td colSpan={2} className="px-4 py-2 font-semibold">
                    Transaction
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2 font-medium">Transaction ID</td>
                  <td className="px-4 py-2">
                    {plan.transaction.transactionID}
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2 font-medium">Amount</td>
                  <td className="px-4 py-2">
                    ₹{plan.transaction.amount}
                  </td>
                </tr>

                <tr>
                  <td className="px-4 py-2 font-medium">Payment Status</td>
                  <td className="px-4 py-2">
                    {plan.transaction.status}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        ))}
      </table>
    </div>
  </div>
)}
        </div>
    )
}
export default Subscriptions
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
                        }`}
                >
                    <thead className={isLight ? "bg-gray-200" : "bg-slate-700"}>
                        <tr className="text-left text-xs font-semibold uppercase tracking-wider">
                            <th className="px-6 py-3">Sr.No</th>
                            <th className="px-6 py-3">User</th>
                            <th className="px-6 py-3">Plan</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Duration</th>
                            <th className="px-6 py-3">Active</th>
                            <th className="px-6 py-3">User ID</th>
                            <th className="px-6 py-3">Used</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-center">Start Date</th>
                            <th className="px-6 py-3 text-center">End Date</th>
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
                                        }`}
                                >
                                    <td className="px-6 py-4 text-sm font-medium">{idx + 1}</td>

                                    <td className="px-6 py-4 text-sm">
                                        <div className="font-semibold">{el.user?.name}</div>
                                        <div className="text-xs text-gray-500">
                                            {el.user?.mobileNo}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-sm font-semibold">
                                        {planId?.name}
                                    </td>

                                    <td className="px-6 py-4 text-sm">₹{planId?.price}</td>

                                    <td className="px-6 py-4 text-sm">
                                        {planId?.durationDays} days
                                    </td>

                                    <td className="px-6 py-4 text-sm">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${planId?.isActive
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {planId?.isActive ? "True" : "False"}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-sm truncate max-w-30">
                                        {planId?.user}
                                    </td>

                                    <td className="px-6 py-4 text-sm">
                                        {plan?.isUsed ? "Yes" : "No"}
                                    </td>

                                    <td className="px-6 py-4 text-sm font-semibold">
                                        <span
                                            className={`${plan?.isUsed ? "text-green-600" : "text-orange-500"
                                                }`}
                                        >
                                            {plan?.isUsed ? "Active" : "Inactive"}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-center">
                                        {plan?.startDate
                                            ? new Date(plan.startDate).toLocaleDateString()
                                            : "-"}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-center">
                                        {plan?.endDate
                                            ? new Date(plan.endDate).toLocaleDateString()
                                            : "-"}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <button onClick={() => {
                                            setSelectedPlanData(plan)
                                            setTransdata({
                                                modelStat: true,
                                                planid: el._id
                                            })
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
            {transdata.modelStat && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="mb-6 text-lg font-semibold">Subscription Details</h2>

                        <div className="overflow-x-auto">
                            <table className="w-full border border-gray-200 rounded-lg text-sm">
                                <tbody>
                                    {/* PLAN INFO */}
                                    <tr className="bg-gray-100">
                                        <td colSpan={2} className="px-4 py-2 font-semibold">
                                            Plan Information
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 font-medium">Plan Name</td>
                                        <td className="px-4 py-2">{selectedPlanData.planId.name}</td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 font-medium">Price</td>
                                        <td className="px-4 py-2">₹{selectedPlanData.planId.price}</td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 font-medium">Duration (Days)</td>
                                        <td className="px-4 py-2">{selectedPlanData.planId.durationDays}</td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 font-medium">Plan Active</td>
                                        <td className="px-4 py-2">
                                            {selectedPlanData.planId.isActive ? "Yes" : "No"}
                                        </td>
                                    </tr>

                                    {/* SUBSCRIPTION INFO */}
                                    <tr className="bg-gray-100">
                                        <td colSpan={2} className="px-4 py-2 font-semibold">
                                            Subscription Status
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 font-medium">Status</td>
                                        <td className="px-4 py-2">{selectedPlanData.status}</td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 font-medium">Is Used</td>
                                        <td className="px-4 py-2">
                                            {selectedPlanData.isUsed ? "Yes" : "No"}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 font-medium">Start Date</td>
                                        <td className="px-4 py-2">
                                            {new Date(selectedPlanData.startDate).toLocaleString()}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="px-4 py-2 font-medium">End Date</td>
                                        <td className="px-4 py-2">
                                            {new Date(selectedPlanData.endDate).toLocaleString()}
                                        </td>
                                    </tr>

                                    {/* TRANSACTION INFO */}
                                    {selectedPlanData.transaction && (
                                        <>
                                            <tr className="bg-gray-100">
                                                <td colSpan={2} className="px-4 py-2 font-semibold">
                                                    Transaction Details
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="px-4 py-2 font-medium">Transaction ID</td>
                                                <td className="px-4 py-2">
                                                    {selectedPlanData.transaction.transactionID}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="px-4 py-2 font-medium">Amount</td>
                                                <td className="px-4 py-2">
                                                    ₹{selectedPlanData.transaction.amount}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="px-4 py-2 font-medium">Payment Method</td>
                                                <td className="px-4 py-2">
                                                    {selectedPlanData.transaction.paymentMethod}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="px-4 py-2 font-medium">Payment Status</td>
                                                <td className="px-4 py-2">
                                                    {selectedPlanData.transaction.status}
                                                </td>
                                            </tr>

                                            <tr>
                                                <td className="px-4 py-2 font-medium">Transaction Date</td>
                                                <td className="px-4 py-2">
                                                    {new Date(
                                                        selectedPlanData.transaction.createdAt
                                                    ).toLocaleString()}
                                                </td>
                                            </tr>
                                        </>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* ACTIONS */}
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() =>
                                    setTransdata({
                                        modelStat: false,
                                        planid: "",
                                    })
                                }
                                className="rounded-lg border px-5 py-2 text-sm hover:bg-gray-100"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}
export default Subscriptions

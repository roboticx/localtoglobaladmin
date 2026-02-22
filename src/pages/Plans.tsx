import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { DELETE, FETCH, PATCH, POST } from '../utils/apiUtils';
type Plan = {
  _id: string;
  name: string;
  price: string;
  durationDays: string;
  offerPriceMonthly: string;
  offerPriceAnnual: string;
  isActive: boolean;
  user?: string;
};
const Plans = () => {
   const [plans, setPlans] = useState<Plan[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [plansData, setPlansData] = useState({
        name: "",
        price: "",
        durationDays: "",
        offerPriceMonthly: "",
        offerPriceAnnual: ""
    })
    const theme = useSelector((state: any) => state.theme.theme);
    const isLight = theme === "light";
    const getplans = async () => {
        try {
            const res = await FETCH({
                url: "/plans",
                toast: true
            })
            setPlans(res.data)
        } catch (error) {
            console.log(error);
        }
    }
const submitPlan = async () => {
  try {
    if (editId) {
      await PATCH({
        url: `/plans/admin/${editId}`,
        data: plansData,
        toast: true,
      });
    } else {
      await POST({
        url: "/plans/admin",
        data: plansData,
        toast: true,
      });
    }
    setIsOpen(false);
    getplans(); // refresh table
  } catch (error) {
    console.error(error);
  }
};
    const openAddModal = () => {
  setEditId(null);
  setPlansData({
    name: "",
    price: "",
    durationDays: "",
    offerPriceMonthly: "",
    offerPriceAnnual: "",
  });
  setIsOpen(true);
};
const openEditModal = (plan: any) => {
  setEditId(plan._id);
  setPlansData({
    name: plan.name,
    price: plan.price,
    durationDays: plan.durationDays,
    offerPriceMonthly: plan.offerPriceMonthly,
    offerPriceAnnual: plan.offerPriceAnnual,
  });
  setIsOpen(true);
};
const deletePlans = async(_id:string)=>{
    try {
       await DELETE({
  url: `/plans/admin/${_id}`,
  toast: true,
});
        getplans()
    } catch (error) {
        console.log(error);
    }
}
const toggleStatus = async (_id: string, currentStatus: boolean) => {
  try {
    setPlans((prev) =>
      prev.map((p) =>
        p._id === _id ? { ...p, isActive: !currentStatus } : p
      )
    );
    await PATCH({
      url: `/plans/admin/${_id}/status`,
      data: { isActive: !currentStatus },
      toast: true,
    });
  } catch (error) {
    console.log(error);
    getplans(); 
  }
};
    useEffect(() => {
        getplans()
    }, [])
    return (
        <div
            className={`min-h-screen p-8 ${isLight ? "bg-gray-50 text-gray-900" : "bg-[#0f172a] text-white"
                }`}>
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Plan's</h1>
                <div className='flex justify-between'>
                    <p className={isLight ? "text-gray-500" : "text-slate-400"}>
                        All subscription plans in one place.
                    </p>
                    <button
  onClick={openAddModal}
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
>
  Add Plan
</button>
                </div>
            </header>
            <div className="overflow-x-auto">
                <table
                    className={`w-full border-collapse rounded-lg overflow-hidden shadow-lg ${isLight ? "bg-white" : "bg-slate-800"
                        }`}>
                    <thead className={isLight ? "bg-gray-200" : "bg-[#1e293b]"}>
                        <tr className="text-left text-sm font-semibold uppercase">
                            <th className="px-6 py-3">Sr.No</th>
                            <th className="px-6 py-3">name</th>
                            <th className="px-6 py-3">user</th>
                            <th className="px-6 py-3">price</th>
                            <th className="px-6 py-3">offerPriceMonthly</th>
                            <th className="px-6 py-3">offerPriceAnnual</th>
                            <th className="px-6 py-3">durationDays</th>
                            <th className="px-6 py-3">isActive</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans.map((el: any, idx) => {
                            return (
                                <tr
                                    className={`border-t ${isLight
                                        ? "border-gray-200 hover:bg-gray-50"
                                        : "border-white/10 hover:bg-white/5"
                                        }`}>
                                    <td className="px-6 py-4">{idx + 1}</td>
                                    <td className="px-6 py-4">{el.name}</td>
                                    <td className="px-6 py-4">{el.user}</td>
                                    <td className="px-6 py-4">{el.price}</td>
                                    <td className="px-6 py-4">{el.offerPriceMonthly}</td>
                                    <td className="px-6 py-4">{el.offerPriceAnnual}</td>
                                    <td className="px-6 py-4">
                                        {el.durationDays}
                                    </td>
                                    <td className="px-6 py-4">
                                        {el.isActive ? "Yes" : "No"}
                                    </td>
                                      <td className=" py-4 flex  gap-2">
                                        <button className='bg-blue-600 rounded-md px-3 py-1 text-white' onClick={()=>{openEditModal(el);}}>Update</button>
                                        <button className='bg-red-600 rounded-md px-3 py-1 text-white' 
                                        onClick={()=>deletePlans(el._id)}
                                        >Delete</button>
                                       <button
                                        onClick={() => toggleStatus(el._id, el.isActive)}
                                        className={`relative inline-flex h-7 w-14 rounded-full transition-colors duration-300
                                        ${el.isActive ? "bg-black/90" : "bg-gray-400"}`}>
                                        <span
                                            className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300
                                            ${el.isActive ? "translate-x-7" : "translate-x-0"}`}/>
                                    </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {isOpen &&
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
                    <div
                        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"

                    />
                    <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <div className="flex items-center justify-between border-b border-gray-300 pb-3">
                            <h3 className="text-lg font-semibold text-gray-900">
  {editId ? "Update Plan" : "Add Plan"}
</h3>
                           <button
  onClick={() => setIsOpen(false)}
  className="text-gray-400 hover:text-gray-600 transition-colors"
>
  ✕
</button>
                        </div>

                        <div className="mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                                <input type="text" name="planName" id="planName" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"  onChange={(e)=>setPlansData({...plansData,name:e.target.value})}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Price</label>
                                <input type="text" name="planPrice" id="planPrice" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e)=>setPlansData({...plansData,price:e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Duration Days</label>
                                <input type="text" name="planDurationDays" id="planDurationDays" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e)=>setPlansData({...plansData,durationDays:e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Offer Price Monthly</label>
                                <input type="text" name="planOfferPriceMonthly" id="planOfferPriceMonthly" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e)=>setPlansData({...plansData,offerPriceMonthly:e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Plan Offer Price Annual</label>
                                <input type="text" name="planOfferPriceAnnual" id="planOfferPriceAnnual" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" onChange={(e)=>setPlansData({...plansData,offerPriceAnnual:e.target.value})} />
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col gap-3">
                          <button
  onClick={submitPlan}
  className="rounded-lg w-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
>
  {editId ? "Update Plan" : "Create Plan"}
</button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg px-4 w-full py-2 text-sm bg-gray-300 font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
export default Plans

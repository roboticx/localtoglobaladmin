import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { DELETE, FETCH, PATCH } from '../utils/apiUtils';
type subdoamin = {
    _id: string;
    name: string;
    price: string;
    durationDays: string;
    offerPriceMonthly: string;
    offerPriceAnnual: string;
    isActive: boolean;
    user?: string;
};
type Subdomain = {
  _id: string;
  subdomain: string;
  port: number;
  status: boolean;
  isConnected: boolean;
  isBanned: boolean;
  failedAuthCount: number;
  user?: string;
  subdoaminId?: string;
};
const Subdomains = () => {
    const [subdoamins, setsubdoamins] = useState<Subdomain[]>([]);
    const theme = useSelector((state: any) => state.theme.theme);
    const isLight = theme === "light";
    const getsubdoamins = async () => {
        try {
            const res = await FETCH({
                url: "/subdomains/admin",
                toast: true
            })
            setsubdoamins(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    const deletesubdoamins = async (_id: string) => {
        try {
            await DELETE({
                url: `/subdomains/admin/${_id}`,
                toast: true,
            });
            getsubdoamins()
        } catch (error) {
            console.log(error);
        }
    }
const toggleStatus = async (_id: string, isBanned: boolean) => {
  // 1️⃣ Optimistic UI update
  setsubdoamins((prev) =>
    prev.map((p) =>
      p._id === _id ? { ...p, isBanned: !isBanned } : p
    )
  );

  try {
    const endpoint = isBanned
      ? `/subdomains/admin/${_id}/unban`
      : `/subdomains/admin/${_id}/ban`;

    await PATCH({
      url: endpoint,
      toast: true,
    });
  } catch (error) {
    console.log(error);

    // 2️⃣ Rollback if API fails
    setsubdoamins((prev) =>
      prev.map((p) =>
        p._id === _id ? { ...p, isBanned } : p
      )
    );
  }
};


    useEffect(() => {
        getsubdoamins()
    }, [])
    return (
        <div
            className={`min-h-screen p-8 ${isLight ? "bg-gray-50 text-gray-900" : "bg-[#0f172a] text-white"
                }`}>
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Subdomain</h1>
                <div className='flex justify-between'>
                    <p className={isLight ? "text-gray-500" : "text-slate-400"}>
                        All subscription subdoamins in one place.
                    </p>
                </div>
            </header>
            <div className="overflow-x-auto">
                <table
                    className={`w-full border-collapse rounded-lg overflow-hidden shadow-lg ${isLight ? "bg-white" : "bg-slate-800"
                        }`}>
                    <thead className={isLight ? "bg-gray-200" : "bg-[#1e293b]"}>
                        <tr className="text-left text-sm font-semibold uppercase">
                            <th className="px-6 py-3">Sr.No</th>
                            <th className="px-6 py-3">subdomain</th>
                            <th className="px-6 py-3">port</th>
                            <th className="px-6 py-3">status</th>
                            <th className="px-6 py-3">isConnected</th>
                            <th className="px-6 py-3">isBanned</th>
                            <th className="px-6 py-3">failedAuthCount</th>
                            <th className="px-6 py-3">user</th>
                            <th className="px-6 py-3 ">subdoaminId</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subdoamins.map((el: any, idx) => {
                            return (
                                <tr
                                    className={`border-t ${isLight
                                        ? "border-gray-200 hover:bg-gray-50"
                                        : "border-white/10 hover:bg-white/5"
                                        }`}>
                                    <td className="px-6 py-4">{idx + 1}</td>
                                    <td className="px-6 py-4">{el.subdomain}</td>
                                    <td className="px-6 py-4">{el.port}</td>
                                    <td className="px-6 py-4">{el.status ? "Yes" : "No"}</td>
                                    <td className="px-6 py-4">{el.isConnected ? "Yes" : "No"}</td>
                                    <td className="px-6 py-4">{el.isBanned ? "Yes" : "No"}</td>
                                    <td className="px-6 py-4">{el.failedAuthCount}</td>
                                    <td className="px-6 py-4">{el.user}</td>
                                    <td className="px-6 py-4">{el.subdoaminId}</td>
                                    <td className=" py-4 flex  gap-2">
                              <button
  onClick={() => toggleStatus(el._id, el.isBanned)}
  className={`relative inline-flex h-7 w-14 rounded-full transition-colors duration-300
    ${el.isBanned ? "bg-gray-400" : "bg-black/90"}`}
>
  <span
    className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300
      ${el.isBanned ? "translate-x-0" : "translate-x-7"}`}
  />
</button>

                                        <button className='bg-red-600 rounded-md px-3 py-1 text-white'
                                            onClick={() => deletesubdoamins(el._id)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Subdomains
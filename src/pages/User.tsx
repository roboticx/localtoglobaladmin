"use client";

import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FETCH, PATCH } from "../utils/apiUtils";
import { Mail, Phone } from "lucide-react";
import { showToast } from "../components/ToastProvider";
interface UserType {
    _id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
}
const User = () => {
    const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

    const theme = useSelector((state: any) => state.theme.theme);
    const isLight = theme === "light";

    const getUserData = async () => {
        try {
              setLoading(true);
            const res = await FETCH({
                url: "/auth/admin/users",
            });
            setUsers(res.data as UserType[]);
            showToast({
      type: "success",
      message: "Users loaded successfully",
    });
        } catch (error) {
            console.error(error);
        }
        finally{
            setLoading(false)
        }
    };

 const toggleStatus = async (_id: string, currentStatus: boolean) => {
  try {
    if (currentStatus) {
      await PATCH({
        url: `/auth/admin/${_id}/deactivate`,
      });

      showToast({
        type: "warning",
        message: "User deactivated",
      });

    } else {
      await PATCH({
        url: `/auth/admin/${_id}/activate`,
      });

      showToast({
        type: "success",
        message: "User activated",
      });
    }

    setUsers(prev =>
      prev.map(user =>
        user._id === _id
          ? { ...user, isActive: !currentStatus }
          : user
      )
    );

  } catch (error: any) {
    console.error(error);

    showToast({
      type: "error",
      message: error?.response?.data?.message || "Something went wrong",
    });
  }
};

    useEffect(() => {
        getUserData();
    }, []);
    return (
        <div
            className={`min-h-screen p-8 ${isLight ? "bg-gray-50 text-gray-900" : "bg-[#0f172a] text-white"
                }`}>

                          {loading && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/10 z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="loader"></div>
            <p className="text-sm opacity-60">Loading user page ...</p>
          </div>
        </div>
      )}
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                <p className={isLight ? "text-gray-500" : "text-slate-400"}>
                    Welcome back, here is what's happening today.
                </p>
            </header>
            <div className="overflow-x-auto">
                <table
                    className={`w-full border-collapse rounded-lg overflow-hidden shadow-lg ${isLight ? "bg-white" : "bg-slate-800"
                        }`}>
                    <thead className={isLight ? "bg-gray-200" : "bg-[#1e293b]"}>
                        <tr className="text-left text-sm font-semibold uppercase">
                            <th className="px-6 py-3">Sr.No</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Number</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Role</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((el: any, idx) => (
                            <tr
                                key={el.id}
                                className={`border-t ${isLight
                                    ? "border-gray-200 hover:bg-gray-50"
                                    : "border-white/10 hover:bg-white/5"
                                    }`}>
                                <td className="px-6 py-4">{idx + 1}</td>
                                <td className="px-6 py-4">{el.name}</td>
                              <td className="px-6 py-4">
  <div className="flex items-center gap-2">
    <Phone size={16} className="text-gray-400" />
    <span>{el.mobileNo}</span>
  </div>
</td>

<td className="px-6 py-4">
  <div className="flex items-center gap-2">
    <Mail size={16} className="text-gray-400" />
    <span>{el.email}</span>
  </div>
</td>
                                <td className="px-6 py-4">{el.role}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => toggleStatus(el._id, el.isActive)}
                                        className={`relative inline-flex h-7 w-14 rounded-full transition-colors duration-300
                                        ${el.isActive ? "bg-[#8CAD8A]" : "bg-[#F77376]"}`}>
                                        <span
                                            className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300
                                            ${el.isActive ? "translate-x-7" : "translate-x-0"}`}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;

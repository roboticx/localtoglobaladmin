"use client";

import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FETCH, PATCH } from "../utils/apiUtils";
interface UserType {
    _id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
}
const User = () => {
    const [users, setUsers] = useState<UserType[]>([]);

    const theme = useSelector((state: any) => state.theme.theme);
    const isLight = theme === "light";

    const getUserData = async () => {
        try {
            const res = await FETCH({
                url: "/auth/admin/users",
                toast: true,
            });
            setUsers(res.data as UserType[]);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleStatus = async (_id: string, currentStatus: boolean) => {
        try {
            if (currentStatus) {
                await PATCH({
                    url: `/auth/admin/${_id}/deactivate`,
                    toast: true,
                });
            } else {
                await PATCH({
                    url: `/auth/admin/${_id}/activate`,
                    toast: true,
                });
            }

            setUsers(prev =>
                prev.map(user =>
                    user._id === _id
                        ? { ...user, isActive: !currentStatus }
                        : user
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);
    return (
        <div
            className={`min-h-screen p-8 ${isLight ? "bg-gray-50 text-gray-900" : "bg-[#0f172a] text-white"
                }`}>
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
                                <td className="px-6 py-4">{el.email}</td>
                                <td className="px-6 py-4">{el.role}</td>
                                <td className="px-6 py-4">
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

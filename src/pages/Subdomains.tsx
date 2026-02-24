import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DELETE, FETCH, PATCH } from "../utils/apiUtils";
import { showToast } from "../components/ToastProvider";
type Subdomain = {
  id: string;
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
  const [deleteModal, setDeleteModal] = useState({
    id: '',
    open: false
  });
  const [banModalId, setBanModalId] = useState<string | null>(null);
  const [banReason, setBanReason] = useState("");
  const [loading, setLoading] = useState(true);
  const theme = useSelector((state: any) => state.theme.theme);
         const [users, setUsers] = useState([]);
     
  
  const isLight = theme === "light";
  const getsubdoamins = async () => {
    try {
      const res = await FETCH({
        url: "/subdomains/admin",
        toast: true,
      });
      setsubdoamins(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const confirmDelete = async () => {
    if (!deleteModal.id) return;
    try {
      await DELETE({
        url: `/subdomains/admin/${deleteModal.id}`,
        toast: true,
      });
      setDeleteModal({
        id: '',
        open:false
      });
      getsubdoamins();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };
  const handleBanClick = async (id: string, isBanned: boolean) => {
    if (isBanned) {
      try {
        setsubdoamins((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, isBanned: false } : p
          )
        );
        await PATCH({
          url: `/subdomains/admin/${id}/unban`,
          toast: true,
        });
      } catch (error) {
        console.log(error);
        getsubdoamins();
      }
      getsubdoamins();
    } else {
      setBanModalId(id);
    }
  };
  const submitBan = async () => {
    if (!banReason.trim()) {
      alert("Please enter ban reason");
      return;
    }
    try {
      await PATCH({
        url: `/subdomains/admin/${banModalId}/ban`,
        data: { reason: banReason },
        toast: true,
      });
      setsubdoamins((prev) =>
        prev.map((p) =>
          p.id === banModalId ? { ...p, isBanned: true } : p
        )
      );
      setBanModalId(null);
      setBanReason("");
      getsubdoamins();
    } catch (error) {
      console.log(error);
    }
  };
const toggleactiveinactive = async (id: string, currentStatus: boolean) => {
  try {
    if (currentStatus) {
      await PATCH({
        url: `/subdomains/${id}/disconnect`,
      });

      showToast({
        type: "warning",
        message: "Subdomain disconnected",
      });
    } else {
      await PATCH({
        url: `/subdomains/${id}/connect`,
      });

      showToast({
        type: "success",
        message: "Subdomain connected",
      });
    }

    // ✅ Correct state update
   setsubdoamins(prev =>
  prev.map(user =>
    user.id === id
      ? { ...user, isConnected: !currentStatus }
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
    getsubdoamins();
  }, []);
  return (
    <div
      className={`min-h-screen p-8 ${isLight ? "bg-gray-50 text-gray-900" : "bg-[#0f172a] text-white"
        }`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/10 z-50">
          <div className="flex flex-col items-center gap-4">
            <div className="loader"></div>
            <p className="text-sm opacity-60">Loading sybdomains page...</p>
          </div>
        </div>
      )}
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Subdomain</h1>
        <div className="flex justify-between">
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
              <th className="px-6 py-3">failedAuthCount</th>
              <th className="px-6 py-3">user</th>
              <th className="px-6 py-3">isBanned</th>
              <th className="px-6 py-3 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subdoamins.map((el: any, idx) => {
              return (
                <tr
                  key={el.id}
                  className={`border-t ${isLight
                    ? "border-gray-200 hover:bg-gray-50"
                    : "border-white/10 hover:bg-white/5"
                    }`}>
                  <td className="px-6 py-4">{idx + 1}</td>
                  <td className="px-6 py-4">{el.subdomain}</td>
                  <td className="px-6 py-4">{el.port}</td>
                  <td className="px-6 py-4">{el.status ? "Yes" : "No"}</td>
              <td className="px-6 py-4">
  <button
    onClick={() => toggleactiveinactive(el.id, el.isConnected)}
    className={`relative inline-flex h-7 w-14 rounded-full transition-colors duration-300
    ${el.isConnected ? "bg-[#8CAD8A]" : "bg-[#E5E7EB]"}`}
  >
    <span
      className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300
      ${el.isConnected ? "translate-x-7" : "translate-x-0"}`}
    />
  </button>
</td>
                  <td className="px-6 py-4">{el.failedAuthCount}</td>
                  <td className="px-6 py-4">
                    {el.user?.name}
                  </td>
                  <td className="px-6 py-4">
                    {
                      <button
                        onClick={() => handleBanClick(el?.id, el.isBanned)}
                        className={`relative inline-flex h-7 w-14 rounded-full transition-colors duration-300
                            ${!el.isBanned ? "bg-[#8CAD8A] " : "bg-[#F77376]"}`}>
                        <span
                          className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-300
                              ${el.isBanned ? "translate-x-7" : "translate-x-0"}`}/>
                      </button>
                    }{banModalId && (
                      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl">
                          <h2 className="text-lg font-semibold mb-4">Enter Ban Reason</h2>
                          <textarea
                            value={banReason}
                            onChange={(e) => setBanReason(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                            placeholder="Enter reason (about 30 words)"/>
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => {
                                setBanModalId(null);
                                setBanReason("");
                              }}
                              className="px-4 py-2 bg-gray-300 rounded-lg">
                              Cancel
                            </button>
                            <button
                              onClick={submitBan}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        className="bg-red-600 rounded-md px-3 py-1 text-white"
                        onClick={() => {setDeleteModal({
                          id: el.id,
                          open: true
                        })
                        console.log(el);
                        }}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {deleteModal.open &&
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl">
            <h2 className="text-lg font-semibold mb-4 text-red-600">
              Confirm Delete
            </h2>
            <p className="mb-4 text-gray-600">
              Are you sure you want to delete this subdomain?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteModal({
                  id:"",
                  open:false
                })}
                className="px-4 py-2 bg-gray-300 rounded-lg">
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg">
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};
export default Subdomains;
import { Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Sidebar from "./Sidebar";
import Header from "./Header";

const PrivateLayout = () => {
  return (
    <ProtectedRoute>
      <div className="text-red-900 flex min-h-screen w-full">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header />

          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PrivateLayout;
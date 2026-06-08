import Sidebar from "@/components/ui/Sidebar";
import { Menu, Bell, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  const { user } = useSelector((store) => store.user);
  const { cart } = useSelector((store) => store.product);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setOpen(false)}
          />

          <div className="fixed top-0 left-0 z-50 lg:hidden">
            <Sidebar />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 md:px-6">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div>
              <h1 className="text-lg font-semibold text-slate-800">
                Dashboard
              </h1>

              <p className="text-xs text-slate-500 hidden sm:block">
                Welcome back, {user?.firstName || "Admin"}
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-5">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative cursor-pointer"
            >
              <ShoppingCart
                size={22}
                className="text-slate-600 hover:text-pink-600 transition"
              />

              <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                {cart?.items?.length || 0}
              </span>
            </Link>

            {/* Notification */}
            <button className="relative">
              <Bell size={20} className="text-slate-600" />

              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-pink-600" />
            </button>

            {/* Profile */}
            <Link
              to={`/profile/${user?._id}`}
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <div className="h-9 w-9 rounded-full bg-pink-600 text-white flex items-center justify-center font-medium">
                {user?.firstName?.charAt(0).toUpperCase()}
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-700">
                  {user?.firstName}
                </p>

                <p className="text-xs text-slate-500">
                  {user?.role === "admin"
                    ? "Administrator"
                    : "Customer"}
                </p>
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
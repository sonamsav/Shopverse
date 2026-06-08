import React from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  PlusCircle,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Add Product",
      icon: PlusCircle,
      path: "/dashboard/add-product",
    },
    {
      name: "Products",
      icon: Package,
      path: "/dashboard/products",
    },

   
    {
      name: "Users",
      icon: Users,
      path: "/dashboard/users",
    },
     {
      name: "Orders",
      icon: ShoppingCart,
      path: "/dashboard/orders",
    },
  ];

  return (
    <aside className="w-64 bg-white border-r sticky top-0 h-screen shrink-0">
      {" "}
      <div className="h-16 border-b flex items-center px-6">
        <h1 className="text-xl font-bold text-pink-600">ShopVerse</h1>
      </div>
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-pink-600 text-white"
                    : "text-slate-600 hover:bg-pink-50"
                }`
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
      {/* <div className="absolute bottom-5 left-4 right-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50">
          <LogOut size={18} />
          Logout
        </button>
      </div> */}
    </aside>
  );
};

export default Sidebar;

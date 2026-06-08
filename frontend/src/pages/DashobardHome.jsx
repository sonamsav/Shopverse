import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const DashboardHome = () => {
  const salesData = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 19000 },
    { month: "Mar", sales: 15000 },
    { month: "Apr", sales: 25000 },
    { month: "May", sales: 30000 },
    { month: "Jun", sales: 40000 },
  ];

  const orderData = [
    { name: "Delivered", value: 540 },
    { name: "Pending", value: 120 },
    { name: "Cancelled", value: 60 },
  ];

  const userData = [
    { month: "Jan", users: 120 },
    { month: "Feb", users: 180 },
    { month: "Mar", users: 250 },
    { month: "Apr", users: 320 },
    { month: "May", users: 410 },
    { month: "Jun", users: 500 },
  ];

  const categoryData = [
    { category: "Mobiles", count: 120 },
    { category: "Laptops", count: 80 },
    { category: "Fashion", count: 150 },
    { category: "Shoes", count: 95 },
  ];

  const COLORS = ["#ec4899", "#8b5cf6", "#f97316"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">Dashboard Overview</h1>

        <p className="text-sm text-slate-500">Monitor your store performance</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <p className="text-sm text-gray-500">Total Orders</p>
          <h2 className="text-3xl font-bold mt-2">720</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-5">
          <p className="text-sm text-gray-500">Revenue</p>
          <h2 className="text-3xl font-bold mt-2">₹4.5L</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-5">
          <p className="text-sm text-gray-500">Pending Orders</p>
          <h2 className="text-3xl font-bold mt-2">120</h2>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-5">
          <p className="text-sm text-gray-500">Customers</p>
          <h2 className="text-3xl font-bold mt-2">500</h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Revenue */}
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <h3 className="font-semibold mb-4">Revenue Trend</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#ec4899"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Orders */}
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <h3 className="font-semibold mb-4">Order Status</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={orderData} dataKey="value" outerRadius={90} label>
                {orderData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Customers */}
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <h3 className="font-semibold mb-4">Customer Growth</h3>

          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={userData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#8b5cf6"
                fill="#c4b5fd"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-xl shadow-sm border p-5">
          <h3 className="font-semibold mb-4">Top Categories</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#ec4899" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

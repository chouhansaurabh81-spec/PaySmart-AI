import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowDown,
  FaArrowUp,
  FaBell,
  FaWallet,
} from "react-icons/fa";

import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const menuItems = [
    { label: "📊 Dashboard", path: "/dashboard" },
    { label: "💰 Income", path: "/income" },
    { label: "💸 Expense", path: "/expense" },
    { label: "📈 Analytics", path: "/analytics" },
    { label: "👤 Profile", path: "/profile" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchDashboard();
  }, [navigate]);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/dashboard");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      navigate("/login", { replace: true });
    }
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 sticky top-0 h-screen">
        <h1 className="text-2xl font-bold mb-10 text-green-400">PaySmart-AI</h1>
        <ul className="space-y-5">
          {menuItems.map((item) => (
            <li
              key={item.path}
              onClick={() => navigate(item.path)}
              className="cursor-pointer hover:text-green-400 transition font-medium"
            >
              {item.label}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Navbar */}
        <div className="bg-white shadow-md px-8 py-5 flex justify-between items-center sticky top-0 z-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back 👋</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="font-semibold text-gray-700">User</p>
              <p className="text-sm text-gray-500">{today}</p>
            </div>
            <FaBell className="text-2xl text-gray-600 hover:text-purple-600 cursor-pointer" />
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
          <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-2xl shadow-xl p-8 hover:scale-105 transition">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Total Income</h3>
                <p className="text-4xl font-bold mt-4">₹ {Number(data.total_income).toLocaleString("en-IN")}</p>
              </div>
              <FaArrowUp size={40} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-red-700 text-white rounded-2xl shadow-xl p-8 hover:scale-105 transition">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Total Expense</h3>
                <p className="text-4xl font-bold mt-4">₹ {Number(data.total_expense).toLocaleString("en-IN")}</p>
              </div>
              <FaArrowDown size={40} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl shadow-xl p-8 hover:scale-105 transition">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Balance</h3>
                <p className="text-4xl font-bold mt-4">₹ {Number(data.balance).toLocaleString("en-IN")}</p>
              </div>
              <FaWallet size={40} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg text-gray-500">Income Records</h3>
            <p className="text-4xl font-bold text-green-600 mt-3">{data.income_count}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg text-gray-500">Expense Records</h3>
            <p className="text-4xl font-bold text-red-600 mt-3">{data.expense_count}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg text-gray-500">Total Transactions</h3>
            <p className="text-4xl font-bold text-blue-600 mt-3">{data.total_transactions}</p>
          </div>
        </div>

        {/* Recent Transactions Section (Moved inside main and return) */}
        <div className="bg-white rounded-xl shadow-lg mx-8 mb-8 p-6">
          <h2 className="text-2xl font-bold mb-5 text-gray-800">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Category / Source</th>
                  <th className="p-3 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.recent_income?.map((income) => (
                  <tr key={`income-${income.id}`} className="border-b hover:bg-green-50 transition">
                    <td className="p-3">
                      {new Date(income.date).toLocaleDateString("en-IN")}
                    </td>
                    <td className="p-3 font-semibold text-green-600">Income</td>
                    <td className="p-3">
                      <div className="font-semibold">{income.title}</div>
                      <div className="text-sm text-gray-500">{income.source}</div>
                    </td>
                    <td className="p-3 font-bold text-green-600">₹ {Number(income.amount).toLocaleString("en-IN")}</td>
                  </tr>
                ))}
                {data.recent_expense?.map((expense) => (
                  <tr key={`expense-${expense.id}`} className="border-b hover:bg-red-50 transition">
                    <td className="p-3">
                      {new Date(expense.date).toLocaleDateString("en-IN")}
                    </td>
                    <td className="p-3 font-semibold text-red-600">Expense</td>
                    <td className="p-3">
                      <div className="font-semibold">{expense.title}</div>
                      <div className="text-sm text-gray-500">{expense.category}</div>
                    </td>
                    <td className="p-3 font-bold text-red-600">₹ {Number(expense.amount).toLocaleString("en-IN")}</td>
                  </tr>
                ))}
                {(data.recent_income?.length === 0 && data.recent_expense?.length === 0) && (
                  <tr>
                    <td colSpan="4" className="text-center text-gray-500 p-6">
                      No Transactions Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

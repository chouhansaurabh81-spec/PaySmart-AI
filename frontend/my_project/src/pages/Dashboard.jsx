import { useEffect, useState } from "react";
import api from "../services/api";
import { FaWallet, FaArrowDown, FaArrowUp , FaBell, FaUserCircle } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Dashboard(){
  const navigate = useNavigate();

  const [data, setData] = useState(null);

  const today = new Date().toLocaleDateString("en-IN", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  });


  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  fetchDashboard();
}, []);

  async function fetchDashboard() {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  function handleLogout() {
  localStorage.removeItem("token");
  navigate("/login");
}

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl">
        Loading...
      </div>
    );
  }

  return (
  <div className="min-h-screen flex bg-gray-100">

    {/* Sidebar */}
    <div className="w-64 bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">PaySmart-AI</h1>

      <ul className="space-y-5">
        <li className="hover:text-green-400 cursor-pointer">📊 Dashboard</li>
        <li
  onClick={() => navigate("/income")}
  className="hover:text-green-400 cursor-pointer"
>
  💰 Income
</li>
        <li className="hover:text-green-400 cursor-pointer">💸 Expense</li>
        <li className="hover:text-green-400 cursor-pointer">📈 Analytics</li>
        <li className="hover:text-green-400 cursor-pointer">👤 Profile</li>
      </ul>
    </div>

    {/* Main Content */}
    <div className="flex-1">

      {/* Navbar */}
      <div className="bg-white shadow-md px-8 py-5 flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back 👋</p>
        </div>

        <div className="flex items-center gap-6">

          <div className="text-right">
            <p className="font-semibold text-gray-700">Saurabh</p>
            <p className="text-sm text-gray-500">{today}</p>
          </div>

          <FaBell className="text-2xl text-gray-600 cursor-pointer hover:text-purple-600" />

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">

        {/* Income */}
        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-8 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Total Income</h3>
              <p className="text-4xl font-bold mt-4">
                ₹ {data.total_income}
              </p>
            </div>
            <FaArrowUp size={40} />
          </div>
        </div>

        {/* Expense */}
        <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-8 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Total Expense</h3>
              <p className="text-4xl font-bold mt-4">
                ₹ {data.total_expense}
              </p>
            </div>
            <FaArrowDown size={40} />
          </div>
        </div>

        {/* Balance */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-8 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">Balance</h3>
              <p className="text-4xl font-bold mt-4">
                ₹ {data.balance}
              </p>
            </div>
            <FaWallet size={40} />
          </div>
        </div>

      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-lg mx-8 mb-8 p-6">

        <h2 className="text-2xl font-bold mb-5">
          Recent Transactions
        </h2>

        <table className="w-full border-collapse">

          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="p-3">17 Jul 2026</td>
              <td className="p-3 text-green-600">Income</td>
              <td className="p-3">Salary</td>
              <td className="p-3 font-bold">₹50,000</td>
            </tr>

            <tr className="border-b">
              <td className="p-3">16 Jul 2026</td>
              <td className="p-3 text-red-600">Expense</td>
              <td className="p-3">Food</td>
              <td className="p-3 font-bold">₹450</td>
            </tr>

            <tr>
              <td className="p-3">15 Jul 2026</td>
              <td className="p-3 text-red-600">Expense</td>
              <td className="p-3">Travel</td>
              <td className="p-3 font-bold">₹1200</td>
            </tr>
          </tbody>

        </table>

      </div>

    </div>

  </div>
);
};

export default Dashboard;
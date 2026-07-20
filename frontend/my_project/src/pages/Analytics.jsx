import { useEffect, useState } from "react";
import api from "../services/api";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";

function Analytics() {
  const [summary, setSummary] = useState({
    total_income: 0,
    total_expense: 0,
    balance: 0,
  });

  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchSummary();
    fetchMonthlyData();
    fetchCategoryData();
  }, []);

  async function fetchSummary() {
    try {
      const response = await api.get("/analytics/summary");
      setSummary(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMonthlyData() {
    try {
      const [incomeRes, expenseRes] = await Promise.all([
        api.get("/analytics/monthly-income"),
        api.get("/analytics/monthly-expense"),
      ]);

      const incomeMap = {};
      incomeRes.data.forEach((item) => {
        incomeMap[item.month] = item.total_income;
      });

      const expenseMap = {};
      expenseRes.data.forEach((item) => {
        expenseMap[item.month] = item.total_expense;
      });

      const months = [
        ...new Set([
          ...Object.keys(incomeMap),
          ...Object.keys(expenseMap),
        ]),
      ].sort();

      const chartData = months.map((month) => ({
        month,
        income: incomeMap[month] || 0,
        expense: expenseMap[month] || 0,
      }));

      setMonthlyData(chartData);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCategoryData() {
    try {
      const response = await api.get("/analytics/category-expense");
      setCategoryData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF4560",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        📊 Analytics Dashboard
      </h1>

      {/* Summary Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-green-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">Total Income</h2>
          <p className="text-3xl mt-4">
            ₹ {summary.total_income}
          </p>
        </div>

        <div className="bg-red-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">Total Expense</h2>
          <p className="text-3xl mt-4">
            ₹ {summary.total_expense}
          </p>
        </div>

        <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold">Balance</h2>
          <p className="text-3xl mt-4">
            ₹ {summary.balance}
          </p>
        </div>

      </div>

      {/* Bar Chart */}

      <div className="bg-white rounded-xl shadow-lg mt-10 p-6">

        <h2 className="text-2xl font-bold mb-5">
          Income vs Expense
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="income" fill="#00C49F" />
            <Bar dataKey="expense" fill="#FF4560" />

          </BarChart>
        </ResponsiveContainer>

      </div>

      {/* Pie Chart */}

      <div className="bg-white rounded-xl shadow-lg mt-10 p-6">

        <h2 className="text-2xl font-bold mb-5">
          Expense by Category
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <PieChart>

            <Pie
              data={categoryData}
              dataKey="total"
              nameKey="category"
              outerRadius={120}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

      {/* Line Chart */}

      <div className="bg-white rounded-xl shadow-lg mt-10 p-6">

        <h2 className="text-2xl font-bold mb-5">
          Monthly Trend
        </h2>

        <ResponsiveContainer width="100%" height={350}>

          <LineChart data={monthlyData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#00C49F"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#FF4560"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Analytics;
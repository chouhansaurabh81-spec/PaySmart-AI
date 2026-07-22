import React, { useEffect, useState } from "react";
import api from "../services/api";

function Expense() {
  // ===========================
  // State
  // ===========================

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  // Search & Filters
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [sort, setSort] = useState("latest");

  // ===========================
  // Fetch Expenses
  // ===========================

  const fetchExpenses = async (searchValue = "") => {
    try {
      setLoading(true);

      const response = await api.get("/expenses", {
        params: {
          search: searchValue,
          category: categoryFilter,
          from_date: fromDate,
          to_date: toDate,
          min_amount: minAmount || undefined,
          max_amount: maxAmount || undefined,
          sort,
        },
      });

      setExpenses(response.data.expenses);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses(search);
  }, [
    search,
    categoryFilter,
    fromDate,
    toDate,
    minAmount,
    maxAmount,
    sort,
  ]);

  // ===========================
  // Form Handlers
  // ===========================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      amount: "",
      category: "",
      date: "",
      description: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/expense/${editingId}`, formData);
        alert("Expense Updated Successfully!");
      } else {
        await api.post("/expense", formData);
        alert("Expense Added Successfully!");
      }

      resetForm();
      fetchExpenses(search);
    } catch (error) {
      console.error(error);

      alert(
        editingId
          ? "Failed to update expense"
          : "Failed to add expense"
      );
    }
  };

  const editExpense = (expense) => {
    setEditingId(expense.id);

    setFormData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
      description: expense.description,
    });
  };

  const deleteExpense = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    try {
      await api.delete(`/expense/${id}`);

      alert("Expense Deleted Successfully!");

      fetchExpenses(search);
    } catch (error) {
      console.error(error);
      alert("Failed to delete expense");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Expense Management
      </h1>

      {/* Search */}

      <input
        type="text"
        placeholder="🔍 Search by Title or Category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg p-3 mb-6"
      />

      {/* Filters */}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">

        <input
          type="text"
          placeholder="Category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded p-3"
        />

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border rounded p-3"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border rounded p-3"
        />

        <input
          type="number"
          placeholder="Min Amount"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
          className="border rounded p-3"
        />

        <input
          type="number"
          placeholder="Max Amount"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
          className="border rounded p-3"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded p-3"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>

      </div>

      {/* Expense Form */}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 space-y-4"
      >

        <input
          type="text"
          name="title"
          placeholder="Expense Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />

        <button
          type="submit"
          className={`w-full text-white p-3 rounded transition ${
            editingId
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {editingId ? "Update Expense" : "Add Expense"}
        </button>

      </form>

      {/* Expense List */}

      <div className="mt-8">

        <h2 className="text-2xl font-bold mb-4">
          All Expenses
        </h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-collapse border">

            <thead>

              <tr className="bg-gray-200">
                <th className="border p-2">Title</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Category</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Actions</th>
              </tr>

            </thead>

            <tbody>

              {expenses.map((expense) => (
                <tr key={expense.id}>

                  <td className="border p-2">{expense.title}</td>
                  <td className="border p-2">₹{expense.amount}</td>
                  <td className="border p-2">{expense.category}</td>
                  <td className="border p-2">{expense.date}</td>
                  <td className="border p-2">{expense.description}</td>

                  <td className="border p-2">

                    <button
                      onClick={() => editExpense(expense)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
}

export default Expense;
import React, { useEffect, useState } from "react";
import api from "../services/api";

function Expense() {
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

const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    let response;

    if (editingId) {
       response = await api.put(`/expense/${editingId}`, formData);
       alert("Expense Updated Successfully!");
    } else {
        response = await api.post("/expense", formData);
       alert("Expense Added Successfully!");
    }

    console.log(response.data);

    fetchExpenses();

    setFormData({
      title: "",
      amount: "",
      category: "",
      date: "",
      description: "",
    });

    setEditingId(null);

  } catch (error) {
    console.error(error);

    alert(editingId ? "Failed to update expense" : "Failed to add expense");
  }
};

const fetchExpenses = async () => {
  try {
    const response = await api.get("/expenses");

    setExpenses(response.data.expenses);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

const deleteExpense = async (id) => {
  try {
    await api.delete(`/expense/${id}`);

    alert("Expense Deleted Successfully!");

    fetchExpenses();
  } catch (error) {
    console.error(error);

    alert("Failed to delete expense");
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

useEffect(() => {
  fetchExpenses();
}, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Expense Management</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

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
          className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700"
        >
          {editingId ? "Update Expense" : "Add Expense"}
        </button>

      </form>
      <hr className="my-8" />
      <h2 className="text-2xl font-bold mb-4">All Expenses</h2>

      {loading ? ( <p>Loading...</p>
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
  );
}

export default Expense;
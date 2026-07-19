import { useState, useEffect } from "react";
import api from "../services/api";

function Income() {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    source: "",
    date: "",
    description: "",
  });

  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log("Sending Data:", formData);

    let response;

    if (editingId) {
      response = await api.put(`/income/${editingId}`, formData);

      alert("Income Updated Successfully!");
    } else {
      response = await api.post("/income", formData);

      alert("Income Added Successfully!");
    }

    console.log(response.data);

    await fetchIncomes();

    setFormData({
      title: "",
      amount: "",
      source: "",
      date: "",
      description: "",
    });

    setEditingId(null);
  } catch (error) {
    console.error("Error:", error);

    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
    }

    alert(
      editingId
        ? "Failed to update income"
        : "Failed to add income"
    );
  }
};

  const fetchIncomes = async () => {
  try {
    const response = await api.get("/incomes");

    setIncomes(response.data.incomes);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const deleteIncome = async (id) => {
  try {
    await api.delete(`/income/${id}`);

    alert("Income Deleted Successfully");

    fetchIncomes();
  } catch (error) {
    console.log(error);

    alert("Failed to delete income");
  }
};

const editIncome = (income) => {
  setEditingId(income.id);

  setFormData({
    title: income.title,
    amount: income.amount,
    source: income.source,
    date: income.date,
    description: income.description,
  });
};

useEffect(() => {
  fetchIncomes();
}, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">
        Add Income
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg max-w-xl"
      >
        <input
          type="text"
          name="title"
          placeholder="Income Title"
          className="w-full border p-3 rounded-lg mb-4"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="w-full border p-3 rounded-lg mb-4"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="source"
          placeholder="Source (Salary, Freelancing, etc.)"
          className="w-full border p-3 rounded-lg mb-4"
          value={formData.source}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          className="w-full border p-3 rounded-lg mb-4"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-3 rounded-lg mb-4"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg w-full"
        >
            {editingId ? "Update Income" : "Add Income"}
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-10 mb-4">
  All Incomes
</h2>

{loading ? (
  <p>Loading...</p>
) : (
  <table className="w-full border border-gray-300">
    <thead>
      <tr className="bg-gray-200">
        <th className="border p-2">Title</th>
        <th className="border p-2">Amount</th>
        <th className="border p-2">Source</th>
        <th className="border p-2">Date</th>
        <th className="border p-2">Description</th>
        <th className="border p-2">Actions</th>
      </tr>
    </thead>

    <tbody>
  {incomes.length === 0 ? (
    <tr>
      <td
        colSpan="5"
        className="border p-4 text-center text-gray-500"
      >
        No Income Found
      </td>
    </tr>
  ) : (
    incomes.map((income) => (
      <tr key={income.id}>
        <td className="border p-2">{income.title}</td>
        <td className="border p-2">₹ {income.amount}</td>
        <td className="border p-2">{income.source}</td>
        <td className="border p-2">{income.date}</td>
        <td className="border p-2">{income.description}</td>
        <td className="border p-2">
  <button
  onClick={() => editIncome(income)}
  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
>
  Edit
</button>

  <button
  onClick={() => deleteIncome(income.id)}
  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
>
  Delete
</button>
</td>
      </tr>
    ))
  )}
</tbody>

  </table>
)}
    </div>
  );
}

export default Income;
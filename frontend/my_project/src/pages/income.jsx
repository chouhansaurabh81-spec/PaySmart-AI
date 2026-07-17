import { useState } from "react";

function Income() {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

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
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="w-full border p-3 rounded-lg mb-4"
          value={formData.amount}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full border p-3 rounded-lg mb-4"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          className="w-full border p-3 rounded-lg mb-4"
          value={formData.date}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          Add Income
        </button>

      </form>

    </div>
  );
}

export default Income;
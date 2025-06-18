// src/pages/Subscribe.jsx
import { useState } from "react";
import API from "../api";

const categories = ["Politics", "Sports", "Technology", "Health", "Business"];
const frequencies = ["daily", "weekly", "monthly"];

export default function Subscribe() {
  const [selected, setSelected] = useState([]);
  const [frequency, setFrequency] = useState("daily");

  const toggleCategory = (cat) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("userEmail"); // Must be set during login

    if (!email) {
      alert("User email not found. Please log in again.");
      return;
    }

    try {
      await API.post("/alerts/subscribe", {
        email,
        preferences: selected,
        frequency,
      });
      alert("Subscription updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to subscribe: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Select News Categories</h2>
      <form onSubmit={handleSubmit}>
        {categories.map((cat) => (
          <label key={cat} className="block mb-2">
            <input
              type="checkbox"
              checked={selected.includes(cat)}
              onChange={() => toggleCategory(cat)}
              className="mr-2"
            />
            {cat}
          </label>
        ))}

        <label className="block mt-4">
          <span className="block mb-1 font-semibold">Select Frequency:</span>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {frequencies.map((freq) => (
              <option key={freq} value={freq}>
                {freq.charAt(0).toUpperCase() + freq.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Preferences
        </button>
      </form>
    </div>
  );
}

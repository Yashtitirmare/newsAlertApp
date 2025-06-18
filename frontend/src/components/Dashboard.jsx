// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await API.get("/alerts/latest");
        setAlerts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAlerts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">News Alerts</h1>
      <div className="space-y-4">
        {alerts.map((alert, idx) => (
          <div key={idx} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">{alert.title}</h2>
            <p>{alert.description}</p>
            <p className="text-xs text-gray-500 mt-2">{new Date(alert.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

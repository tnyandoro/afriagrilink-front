import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axiosClient
      .get("/")
      .then((res) => setData(res.data))
      .catch(console.error);
  }, []);

  if (!data) return <div className="text-center p-8">Loading dashboard...</div>;

  const stats = data.stats;
  const listings = data.recent_listings;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Agricultural Logistics Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-gray-600">Farmers</h2>
          <p className="text-3xl font-bold">{stats.total_farmers}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-gray-600">Markets</h2>
          <p className="text-3xl font-bold">{stats.total_markets}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-gray-600">Truckers</h2>
          <p className="text-3xl font-bold">{stats.total_truckers}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-gray-600">Active Listings</h2>
          <p className="text-3xl font-bold">{stats.active_listings}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Listings</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={listings}>
            <XAxis dataKey="produce_type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="price_per_unit" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;

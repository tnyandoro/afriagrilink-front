import React, { useEffect, useState } from "react";
import axios from "../api/axiosClient";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import DashboardHeader from "../components/DashboardHeader";

const FarmerDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("/api/v1/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    };
    fetchDashboard();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <DashboardHeader title="Farmer Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Produce" value={stats.total_produce || 0} />
        <StatCard
          title="Active Shipments"
          value={stats.active_shipments || 0}
        />
        <StatCard
          title="Pending Requests"
          value={stats.pending_requests || 0}
        />
      </div>
      <div className="mt-6">
        <ChartCard
          data={stats.chart_data || []}
          title="Monthly Produce Sales"
        />
      </div>
    </div>
  );
};

export default FarmerDashboard;

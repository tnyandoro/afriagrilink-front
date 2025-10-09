import React, { useEffect, useState } from "react";
import axios from "../api/axiosClient";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import { Truck, Package, Clock } from "lucide-react";

const TruckingDashboard = () => {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/api/v1/dashboard");
        setStats(res.data.stats || {});
        setChartData([
          { name: "Jan", value: 5 },
          { name: "Feb", value: 8 },
          { name: "Mar", value: 3 },
          { name: "Apr", value: 6 },
        ]);
      } catch (err) {
        console.error("Failed to load trucking dashboard:", err);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Trucking Company Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Active Shipments"
          value={stats.active_shipments || 0}
          icon={Truck}
        />
        <StatCard
          title="Pending Bids"
          value={stats.pending_bids || 0}
          icon={Clock}
        />
        <StatCard
          title="Completed Deliveries"
          value={stats.completed_shipments || 0}
          icon={Package}
        />
      </div>

      <ChartCard title="Monthly Shipments Trend" data={chartData} />
    </div>
  );
};

export default TruckingDashboard;

import React, { useEffect, useState } from "react";
import axios from "../api/axiosClient";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import {
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import DashboardHeader from "../components/DashboardHeader";

const MarketDashboard = () => {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("/api/v1/dashboard");
        setStats(res.data.stats || {});
        setChartData([
          { name: "Jan", value: 1200 },
          { name: "Feb", value: 1900 },
          { name: "Mar", value: 1100 },
          { name: "Apr", value: 2500 },
        ]);
      } catch (err) {
        console.error("Failed to load market dashboard:", err);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <DashboardHeader title="Market Dashboard" />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Market Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            title="Active Produce Listings"
            value={stats.active_listings || 0}
            icon={ShoppingBagIcon}
          />
          <StatCard
            title="Total Purchases"
            value={stats.total_purchases || 0}
            icon={CurrencyDollarIcon}
          />
          <StatCard
            title="Vendors Engaged"
            value={stats.total_farmers || 0}
            icon={ChartBarIcon}
          />
        </div>

        <ChartCard title="Monthly Purchase Volume" data={chartData} />
      </div>
    </div>
  );
};

export default MarketDashboard;

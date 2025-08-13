/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard", {
          withCredentials: true,
        });
        setStats(res.data);
      } catch (error) {
        console.log("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!stats) return <div className="p-8">No data available</div>;

  const barData = {
    labels: stats.messagesPerDay.map((item: any) => item.day.slice(5)),
    datasets: [
      {
        label: "Messages",
        data: stats.messagesPerDay.map((item: any) => item.count),
        backgroundColor: "rgba(59, 130, 246, 0.5)",
      },
    ],
  };

  const pieData = {
    labels: ["Single Chats", "Group Chats"],
    datasets: [
      {
        data: [stats.singleChatsCount, stats.groupChatsCount],
        backgroundColor: ["#3b82f6", "#10b981"],
      },
    ],
  };

  return (
    <div className="p-8 mt-10 space-y-8">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-base-200 shadow">
          <div className="stat-title">Users</div>
          <div className="stat-value">{stats.totalUsers}</div>
        </div>
        <div className="stat bg-base-200 shadow">
          <div className="stat-title">Group Chats</div>
          <div className="stat-value">{stats.groupChatsCount}</div>
        </div>
        <div className="stat bg-base-200 shadow">
          <div className="stat-title">Messages</div>
          <div className="stat-value">{stats.totalMessages}</div>
        </div>
      </div>
      {/* Charts section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-base-100 shadow rounded p-4">
          <h3 className="text-lg font-bold mb-2">Last Messages</h3>
          <Bar data={barData} options={{ responsive: true }} />
        </div>
        <div className="bg-base-100 shadow rounded p-4">
          <h3 className="text-lg font-bold mb-2">Chats Overview</h3>
          <Doughnut data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

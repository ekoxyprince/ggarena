import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
  // Example data
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Sales ($)",
        data: [12000, 19000, 3000, 5000, 2000, 30000, 45000],
        backgroundColor: "#3b82f6", // Tailwind blue-500
        borderRadius: 6,
      },
      {
        label: "Expenses ($)",
        data: [8000, 15000, 2000, 3000, 1500, 20000, 35000],
        backgroundColor: "#f87171", // Tailwind red-400
        borderRadius: 6,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#e4e4e7", // gray-200
        },
      },
      title: {
        display: true,
        text: "Monthly Sales & Expenses",
        color: "#fafafa",
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#a1a1aa", // gray-400
        },
        grid: {
          color: "#27272a", // gray-800
        },
      },
      y: {
        ticks: {
          color: "#a1a1aa",
        },
        grid: {
          color: "#27272a",
        },
      },
    },
  };

  return (
    <div className="w-full min-h-[20rem] bg-[#18181b] p-2 rounded-lg">
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;

"use client";

import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from "recharts";

// Define the data type
type RevenueData = {
  [key: string]: { date: string; amount: number }[];
};

// Revenue data with explicit type
const monthlyRevenue: RevenueData = {
  January: [
    { date: "2nd", amount: 500 },
    { date: "4th", amount: 700 },
    { date: "6th", amount: 800 },
    { date: "8th", amount: 900 },
    { date: "10th", amount: 1000 },
    { date: "12th", amount: 200 },
    { date: "14th", amount: 600 },
    { date: "16th", amount: 400 },
    { date: "18th", amount: 800 },
    { date: "20th", amount: 100 },
    { date: "22nd", amount: 1000 },
  ],
  February: [
    { date: "2nd", amount: 450 },
    { date: "4th", amount: 620 },
    { date: "6th", amount: 730 },
    { date: "8th", amount: 200 },
    { date: "10th", amount: 600 },
    { date: "12th", amount: 400 },
    { date: "14th", amount: 800 },
    { date: "16th", amount: 100 },
    { date: "18nd", amount: 1000 },
    { date: "20th", amount: 880 },
    { date: "22nd", amount: 920 },
  ],
  March: [
    { date: "2nd", amount: 920 },
    { date: "4th", amount: 880 },
    { date: "6th", amount: 1000 },
    { date: "8th", amount: 100 },
    { date: "10th", amount: 800 },
    { date: "12th", amount: 400 },
    { date: "14th", amount: 600 },
    { date: "16th", amount: 200 },
    { date: "18nd", amount: 730 },
    { date: "20th", amount: 620 },
    { date: "22nd", amount: 450 },
  ],
  // Add more months as needed
};

const RevenueComp = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("January");

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Month Selector */}
      <div className="mb-2">
        <label htmlFor="month-selector" className="mr-2 font-medium text-xs">
          Select Month:
        </label>
        <select
          id="month-selector"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="p-1 text-xs border border-blue-950 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          {Object.keys(monthlyRevenue).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Line Chart */}
      <ResponsiveContainer className={`w-80 lg:w-96 pr-5`} height={240}>
        <LineChart
          data={monthlyRevenue[selectedMonth]}
          margin={{
            top: 20,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#036" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#036" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            label={{
              value: "Date",
              position: "bottom",
              offset: -5,
              fontSize: "12px"
            }} 
            fontSize={10} 
          />
          <YAxis 
            label={{
              value: "Amount ($)",
              angle: -90,
              position: "insideLeft",
              offset: 15,
              fontSize: "12px",
              dy: 30,
            }} 
            fontSize={10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#f9f9f9",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "10px",
              fontSize: "10px",
            }}
            labelStyle={{
              color: "#036",
              fontWeight: "bold",
            }}
            itemStyle={{
              color: "#036",
            }}
            cursor={{ stroke: "rgba(0, 0, 0, 0.1)", strokeWidth: 2 }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "10px",
              fontSize: "12px",
            }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#036"
            fill="url(#colorRevenue)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#036"
            strokeWidth={2}
            dot={{ r: 4, fill: "#036" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueComp;
"use client";

import React, { useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface DataEntry {
    name: string;
    value: number;
}

type LegendEntry = {
    value: string;
    color?: string;
    payload?: {
        strokeDasharray: string | number;
        value?: number;
    };
};

const ComplianceTraining: React.FC = () => {
    // Define initial data for different years
    const yearlyData: Record<string, DataEntry[]> = {
        2023: [
            { name: "Audit ready", value: 65 },
            { name: "Not ready", value: 35 },
        ],
        2024: [
            { name: "Audit ready", value: 75 },
            { name: "Not ready", value: 25 },
        ],
        2025: [
            { name: "Audit ready", value: 85 },
            { name: "Not ready", value: 15 },
        ],
    };

    // State for the selected year
    const [selectedYear, setSelectedYear] = useState<string>("2023");

    // Data for the selected year
    const data = yearlyData[selectedYear];

    // Calculate the total value for percentages
    const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

    // Define the colors for the chart
    const COLORS: string[] = ["#036", "#22c55e"]; // Blue for Compliant, Green for Non-Compliant

    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
                <h2 className="text-sm font-normal mb-7 mt-5 text-left">Compliance training completion rate</h2>
                {/* Year Selector */}
                <div className="mb-5">
                    <select
                        id="year-select"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="border border-gray-300 rounded px-1 py-0.5 text-xs"
                    >
                        {Object.keys(yearlyData).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Pie Chart */}
            <ResponsiveContainer width={384} height={240}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                    // label={(entry) => `${entry.name}: ${entry.value}%`}
                    >
                        {data.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#f9f9f9",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            padding: "10px",
                            fontSize: "10px",
                        }}
                        labelStyle={{
                            color: "#333",
                            fontWeight: "bold",
                        }}
                        itemStyle={{
                            color: "#666",
                        }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        align="center"
                        formatter={(value: string, entry: LegendEntry) => {
                            const percentage = entry.payload?.value
                                ? ((entry.payload.value / totalValue) * 100).toFixed(1)
                                : "0.0";
                            return `${value} (${percentage}%)`;
                        }}
                        wrapperStyle={{
                            fontSize: "12px",
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ComplianceTraining;
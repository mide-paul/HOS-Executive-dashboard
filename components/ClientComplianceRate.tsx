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

const CompliantRate: React.FC = () => {
    // Define initial data for different years
    const yearlyData: Record<string, DataEntry[]> = {
        2023: [
            { name: "Compliant", value: 65 },
            { name: "Non-Compliant", value: 35 },
        ],
        2024: [
            { name: "Compliant", value: 75 },
            { name: "Non-Compliant", value: 25 },
        ],
        2025: [
            { name: "Compliant", value: 85 },
            { name: "Non-Compliant", value: 15 },
        ],
    };

    // State for the selected year
    const [selectedYear, setSelectedYear] = useState<string>("2023");

    // const [data, setData] = useState<DataEntry[]>([]);
    // const [loading, setLoading] = useState<boolean>(false);
    // const [error, setError] = useState<string | null>(null);

    // const fetchData = async (year: string) => {
    //     setLoading(true);
    //     setError(null);
    //     try {
    //         const response = await fetch(`/api/compliance-data?year=${year}`);
    //         if (!response.ok) {
    //             throw new Error("Failed to fetch data");
    //         }
    //         const result: DataEntry[] = await response.json();
    //         setData(result);
    //     } catch (err: any) {
    //         setError(err.message || "An unknown error occurred");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // // Fetch data whenever the selected year changes
    // useEffect(() => {
    //     fetchData(selectedYear);
    // }, [selectedYear]);

    // Data for the selected year
    const data = yearlyData[selectedYear];

    // Calculate the total value for percentages
    const totalValue = data.reduce((sum, entry) => sum + entry.value, 0);

    // Define the colors for the chart
    const COLORS: string[] = ["#036", "#22c55e"]; // Blue for Compliant, Green for Non-Compliant

    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-14">
                <h2 className="text-sm font-normal mb-7 mt-5 text-left">Client Compliance Rate</h2>
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

export default CompliantRate;
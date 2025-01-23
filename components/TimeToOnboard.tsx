"use client";
import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

// Define the shape of the data
interface DataPoint {
    time: number;
    replies: number;
}

// Define the shape of the monthly data
interface MonthlyData {
    [month: string]: DataPoint[];
}

// Sample data for different months
const monthlyData: MonthlyData = {
    January: [
        { time: 1, replies: 60 },
        { time: 2, replies: 110 },
        { time: 3, replies: 140 },
        { time: 4, replies: 150 },
        { time: 5, replies: 170 },
        { time: 6, replies: 220 },
        { time: 7, replies: 290 },
        { time: 8, replies: 280 },
        { time: 9, replies: 300 },
        { time: 10, replies: 320 },
        { time: 11, replies: 340 },
        { time: 12, replies: 370 },
        { time: 13, replies: 420 },
        { time: 14, replies: 480 },
    ],
    February: [
        { time: 1, replies: 50 },
        { time: 2, replies: 100 },
        { time: 3, replies: 150 },
        { time: 4, replies: 180 },
        { time: 5, replies: 200 },
        { time: 6, replies: 250 },
        { time: 7, replies: 290 },
        { time: 8, replies: 310 },
        { time: 9, replies: 285 },
        { time: 10, replies: 300 },
        { time: 11, replies: 320 },
        { time: 12, replies: 350 },
        { time: 13, replies: 400 },
        { time: 14, replies: 460 },
    ],
};

const TimeToOnboard: React.FC = () => {

    const [selectedMonth, setSelectedMonth] = useState<string>("January");

    // const [monthlyData, setMonthlyData] = useState<MonthlyData | null>(null);
    // const [selectedMonth, setSelectedMonth] = useState<string>("January");
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);

    // // Fetch data from the backend
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await fetch("/api/monthly-data");
    //             if (!response.ok) {
    //                 throw new Error(`Failed to fetch data: ${response.statusText}`);
    //             }
    //             const data: MonthlyData = await response.json();
    //             setMonthlyData(data);
    //             setSelectedMonth(Object.keys(data)[0]); // Default to the first month
    //         } catch (err: any) {
    //             setError(err.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // if (loading) {
    //     return <div className="text-center">Loading...</div>;
    // }

    // if (error) {
    //     return <div className="text-center text-red-500">Error: {error}</div>;
    // }

    // if (!monthlyData) {
    //     return <div className="text-center">No data available</div>;
    // }

    return (
        <div className="p-1">
            {/* Dropdown to select month */}
            <div className="flex justify-center mb-6">
                <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="p-1 border border-gray-300 rounded-md shadow-sm text-xs"
                >
                    {Object.keys(monthlyData).map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            {/* Line Chart */}
            <ResponsiveContainer className={`w-80 lg:w-96 pr-1`} height={240}>
                <LineChart
                    data={monthlyData[selectedMonth]}
                    className="mx-auto"
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="time"
                        label={{
                            value: "Time (Minutes)",
                            position: "insideBottom",
                            offset: -5,
                            fontSize: "12px",
                        }}
                        fontSize={10}
                    />
                    <YAxis
                        label={{
                            value: "Number of replies",
                            angle: -90,
                            position: "insideLeft",
                            offset: 10,
                            dy: 50,
                            fontSize: "12px",
                        }}
                        fontSize={10}
                    />
                    <Tooltip
                        contentStyle={{
                            fontSize: "10px",
                        }}
                    />
                    <Legend
                        wrapperStyle={{
                            paddingTop: "10px",
                            fontSize: "12px",
                        }}
                    />
                    <Line type="monotone" dataKey="replies" stroke="#1D4ED8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TimeToOnboard;
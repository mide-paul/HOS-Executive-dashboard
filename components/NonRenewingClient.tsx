'use client'
import React, { useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface DataPoint {
    date: string;
    lackOfFeatures: number;
    poorSupport: number;
    highCost: number;
}

type Data = {
    [month: string]: DataPoint[];
};

const data: Data = {
    January: [
        { date: "Week 1", lackOfFeatures: 70, poorSupport: 50, highCost: 60 },
        { date: "Week 2", lackOfFeatures: 65, poorSupport: 55, highCost: 65 },
        { date: "Week 3", lackOfFeatures: 80, poorSupport: 60, highCost: 70 },
        { date: "Week 4", lackOfFeatures: 75, poorSupport: 62, highCost: 68 },
    ],
    February: [
        { date: "Week 1", lackOfFeatures: 68, poorSupport: 48, highCost: 58 },
        { date: "Week 2", lackOfFeatures: 66, poorSupport: 50, highCost: 60 },
        { date: "Week 3", lackOfFeatures: 72, poorSupport: 53, highCost: 62 },
        { date: "Week 4", lackOfFeatures: 70, poorSupport: 55, highCost: 65 },
    ],
    // Add more months as needed
};

// Helper function to calculate average percentages
const calculateAverages = (dataPoints: DataPoint[]) => {
    const totals = dataPoints.reduce(
        (acc, point) => ({
            lackOfFeatures: acc.lackOfFeatures + point.lackOfFeatures,
            poorSupport: acc.poorSupport + point.poorSupport,
            highCost: acc.highCost + point.highCost,
        }),
        { lackOfFeatures: 0, poorSupport: 0, highCost: 0 }
    );

    const count = dataPoints.length;
    return {
        lackOfFeatures: (totals.lackOfFeatures / count).toFixed(1),
        poorSupport: (totals.poorSupport / count).toFixed(1),
        highCost: (totals.highCost / count).toFixed(1),
    };
};

const CustomLegend = ({
    averages,
}: {
    averages: { lackOfFeatures: string; poorSupport: string; highCost: string };
}) => {
    return (
        <div className="flex justify-center space-x-3 mb-4 text-xs">
            <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                Lack of Features: {averages.lackOfFeatures}%
            </div>
            <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                Poor Support: {averages.poorSupport}%
            </div>
            <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                High Cost: {averages.highCost}%
            </div>
        </div>
    );
};

const ChartComponent: React.FC = () => {
    const [selectedMonth, setSelectedMonth] = useState<string>("January");

    const averages = calculateAverages(data[selectedMonth]);

    return (
        <div className="p-4">
            {/* Header Section */}
            <div className="float-right mb-4">
                <select
                    className="border border-gray-300 rounded-md p-1 text-xs"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    {Object.keys(data).map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            {/* Legend Section */}
            <CustomLegend averages={averages} />

            {/* Chart Section */}
            <ResponsiveContainer className={`w-80 lg:w-96 pr-1`} height={240}>
                <LineChart data={data[selectedMonth]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        label={{
                            value: "Weeks",
                            position: "bottom",
                            offset: -5,
                            fill: "#555",
                            fontSize: "12px",
                        }}
                        fontSize={10} 
                    />
                    <YAxis
                        label={{
                            value: "Rate (%)",
                            angle: -90,
                            position: "insideLeft",
                            offset: 5,
                            fill: "#555",
                            fontSize: "12px",
                        }}
                        fontSize={10} 
                    />
                    <Tooltip
                    contentStyle={{
                        fontSize: "10px",
                      }}
                    />
                    <Line
                        type="monotone"
                        dataKey="lackOfFeatures"
                        stroke="#3B82F6" // Blue
                        strokeWidth={2}
                    />
                    <Line
                        type="monotone"
                        dataKey="poorSupport"
                        stroke="#A855F7" // Purple
                        strokeWidth={2}
                    />
                    <Line
                        type="monotone"
                        dataKey="highCost"
                        stroke="#22C55E" // Green
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartComponent;
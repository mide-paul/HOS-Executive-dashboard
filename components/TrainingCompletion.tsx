'use client';

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import BarChartTraining with SSR disabled
const BarChartTraining = dynamic(() => import("./BarChartTraining"), { ssr: false });

const TrainingCompletion = () => {
  const data = [
    { time: "1min", drivers: 50, enterpriseClients: 30 },
    { time: "2min", drivers: 40, enterpriseClients: 25 },
    { time: "3min", drivers: 30, enterpriseClients: 20 },
    { time: "4min", drivers: 60, enterpriseClients: 35 },
    { time: "5min", drivers: 70, enterpriseClients: 40 },
    { time: "6min", drivers: 80, enterpriseClients: 45 },
    { time: "7min", drivers: 70, enterpriseClients: 50 },
    { time: "8min", drivers: 70, enterpriseClients: 55 },
    { time: "9min", drivers: 70, enterpriseClients: 60 },
    { time: "10min", drivers: 70, enterpriseClients: 65 },
    { time: "11min", drivers: 70, enterpriseClients: 60 },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
    className="flex lg:max-w-5xl lg:h-60 items-center">
      <BarChartTraining data={data} />
    </div>
  );
};

export default TrainingCompletion;
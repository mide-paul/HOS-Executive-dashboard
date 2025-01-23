import React from 'react';

interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, max }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="flex flex-col items-start w-full mb-1 p-4">
      <div className="text-sm font-medium text-gray-700 mb-2">{label}</div>
      <div className="relative w-full bg-gray-200 rounded-lg h-4">
        <div
          className="absolute top-0 left-0 h-full bg-green-400 rounded-lg transition-all"
          style={{ width: `${percentage}%` }}
        ></div>
        <span className="absolute top-0 left-0 h-full flex items-center justify-center text-xs text-white font-medium w-full">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {value} / {max}
      </div>
    </div>
  );
};

export default ProgressBar;


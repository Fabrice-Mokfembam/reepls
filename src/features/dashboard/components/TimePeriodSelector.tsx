import React, { useState } from 'react';

const timePeriods = ['Day', 'Week', 'Month', 'Year'];

export const TimePeriodSelector: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Month');

  return (
    <div className="flex bg-neutral-700 rounded-lg p-1">
      {timePeriods.map((period) => (
        <button
          key={period}
          onClick={() => setSelectedPeriod(period)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedPeriod === period
              ? 'bg-primary-400 text-neutral-800'
              : 'text-neutral-300 hover:text-foreground'
          }`}
        >
          {period}
        </button>
      ))}
    </div>
  );
};

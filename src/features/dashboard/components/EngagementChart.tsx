import React from 'react';

export const EngagementChart: React.FC = () => {
  return (
    <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">Engagement Rate</h3>
        <p className="text-sm text-neutral-300">Monthly evaluation of the ratio of engagements vs views</p>
      </div>
      
      {/* Placeholder for chart - you can replace with actual chart library */}
      <div className="h-64 bg-neutral-700 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4 relative">
            {/* Simple line chart representation */}
            <svg viewBox="0 0 200 100" className="w-full h-full">
              <polyline
                points="10,80 30,60 50,70 70,40 90,50 110,30 130,45 150,25 170,35 190,20"
                fill="none"
                stroke="#57c016"
                strokeWidth="2"
              />
              <polyline
                points="10,90 30,75 50,85 70,65 90,75 110,60 130,70 150,55 170,65 190,50"
                fill="none"
                stroke="#ffcd29"
                strokeWidth="2"
              />
            </svg>
          </div>
          <p className="text-neutral-400 text-sm">Chart visualization</p>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine } from 'recharts';
import { Hand } from '../types';

interface StrategyChartProps {
  hands: Hand[];
}

const StrategyChart: React.FC<StrategyChartProps> = ({ hands }) => {
  const data = hands.length > 0 ? hands : [{ id: 0, runningTotal: 0 }];

  // Generate grid line values for intervals of 2 from -20 to 20
  const gridLines = [];
  for (let i = -20; i <= 20; i += 2) {
    if (i !== 0) gridLines.push(i);
  }

  return (
    <div className="w-full h-full bg-zinc-900/30 border-b border-zinc-800 relative overflow-hidden select-none rounded-none">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          {/* Subtle vertical grid lines */}
          <CartesianGrid strokeDasharray="0" stroke="#111111" vertical={true} horizontal={false} />
          
          {/* Custom horizontal grid lines at 2-unit intervals */}
          {gridLines.map(val => (
            <ReferenceLine 
              key={val} 
              y={val} 
              stroke="#141417" 
              strokeWidth={1} 
            />
          ))}
          
          {/* Prominent Zero baseline */}
          <ReferenceLine y={0} stroke="#3f3f46" strokeWidth={1} />
          
          <XAxis 
            dataKey="id" 
            hide={true} 
            type="number" 
            domain={[0, 75]} 
          />
          <YAxis 
            hide={true}
            domain={[-20, 20]} 
          />
          <Line 
            type="linear" 
            dataKey="runningTotal" 
            stroke="#5DD3B6" 
            strokeWidth={2} 
            dot={false}
            activeDot={{ r: 4, fill: '#5DD3B6', stroke: '#09090b', strokeWidth: 2 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StrategyChart;
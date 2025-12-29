import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Legend, Sector,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip
} from 'recharts';
import { EmotionData, CognitiveData } from '../types';

interface EmotionPieChartProps {
  data: EmotionData[];
}

const renderActiveShape = (props: {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: { name: string };
  value: number;
}) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-8} textAnchor="middle" fill="#1F2937" className="text-lg font-bold" style={{ fontSize: '18px' }}>
        {payload.name.split(' ')[0]}
      </text>
      <text x={cx} y={cy} dy={16} textAnchor="middle" fill="#6B7280" className="text-sm" style={{ fontSize: '14px' }}>
        {`${value}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={6}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius - 8}
        outerRadius={innerRadius - 4}
        fill={fill}
        cornerRadius={4}
      />
    </g>
  );
};

export const EmotionPieChart: React.FC<EmotionPieChartProps> = ({ data }) => {
  // Calculate the index of the item with the highest value to set as default active
  const defaultActiveIndex = useMemo(() => {
    if (!data || data.length === 0) return 0;
    return data.reduce((maxIdx, item, idx, arr) => 
      item.value > arr[maxIdx].value ? idx : maxIdx
    , 0);
  }, [data]);

  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

  // Sync state if data changes
  useEffect(() => {
    setActiveIndex(defaultActiveIndex);
  }, [defaultActiveIndex]);

  const onPieEnter = useCallback((_: unknown, index: number) => {
    setActiveIndex(index);
  }, []);

  const onPieLeave = useCallback(() => {
    setActiveIndex(defaultActiveIndex);
  }, [defaultActiveIndex]);

  return (
    <div className="h-64 w-full font-sans">
      <style>{`
        .recharts-wrapper *:focus {
          outline: none;
        }
      `}</style>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            cornerRadius={4}
            stroke="none"
            isAnimationActive={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle" 
            iconSize={8}
            formatter={(value) => <span className="text-gray-500 text-xs ml-1 font-medium">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

interface CognitiveLineChartProps {
  data: CognitiveData[];
}

export const CognitiveLineChart: React.FC<CognitiveLineChartProps> = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6"/>
          <XAxis 
            dataKey="week" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#9CA3AF', fontSize: 11}} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#9CA3AF', fontSize: 11}}
          />
          <LineTooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
          />
          <Legend 
            verticalAlign="top" 
            height={36} 
            iconType="circle" 
            iconSize={8}
            wrapperStyle={{ fontSize: '12px', color: '#6B7280' }}
          />
          <Line 
            type="monotone" 
            dataKey="vocabulary" 
            name="词汇丰富度" 
            stroke="#4F46E5" 
            strokeWidth={3} 
            dot={{r: 4, strokeWidth: 0, fill: '#4F46E5'}} 
            activeDot={{ r: 6, strokeWidth: 0 }} 
          />
          <Line 
            type="monotone" 
            dataKey="logic" 
            name="逻辑关联度" 
            stroke="#F59E0B" 
            strokeWidth={3} 
            dot={{r: 4, strokeWidth: 0, fill: '#F59E0B'}} 
            activeDot={{ r: 6, strokeWidth: 0 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

interface MetricSparklineProps {
  data: number[];
  color: string;
}

export const MetricSparkline: React.FC<MetricSparklineProps> = ({ data, color }) => {
  const chartData = data.map((val, i) => ({ i, val }));
  
  // Calculate reasonable Y-domain to make the line look dynamic but not exaggerated
  const min = Math.min(...data);
  const max = Math.max(...data);
  const padding = (max - min) * 0.5 || 5; 

  return (
    <div className="h-10 w-20">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <YAxis domain={[min - padding, max + padding]} hide />
          <Line
            type="monotone"
            dataKey="val"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
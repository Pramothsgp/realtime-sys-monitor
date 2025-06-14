import { cloneElement } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label
} from 'recharts';
import CustomTooltip from './CustomTooltip';

const ChartCard = ({ title, icon, dataKey, color, data, format ,max = 1}: any) => {
    // Find the max value for the given dataKey
    const maxValue = data && data.length > 0
        ? Math.max(...data.map((d: any) => d[dataKey]))
        : 0;

    // Find the corresponding x (timestamp) for the max value
    const maxDataPoint = data && data.length > 0
        ? data.reduce((prev: any, curr: any) => (curr[dataKey] > prev[dataKey] ? curr : prev), data[0])
        : null;

    return (
        <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:scale-[1.02]">
            <div className="relative p-6">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 rounded-2xl bg-gray-100/50 dark:bg-gray-700/50">
                        {cloneElement(icon, {
                            className: `w-6 h-6 text-blue-600 dark:text-blue-400`,
                        })}
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h2>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                        <XAxis dataKey="timestamp" stroke="#6b7280" fontSize={12} className="dark:stroke-gray-400" />
                        <YAxis
                            domain={[0, max]}
                            tickCount={5}
                            tickFormatter={(v) =>
                                format === 'gb' ? `${v.toFixed(0)} GB` : `${(v * 100).toFixed(0)}%`
                            }
                            stroke="#6b7280"
                            fontSize={12}
                            className="dark:stroke-gray-400"
                        >
                            <Label
                                value={`Max: ${format === 'gb' ? `${maxValue.toFixed(0)} GB` : `${(maxValue * 100).toFixed(0)}%`}`}
                                position="top"
                                offset={10}
                                fill="#2563eb"
                                fontSize={14}
                            />
                        </YAxis>
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke={color}
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, fill: color }}
                        />
                        {maxDataPoint && (
                            <ReferenceLine
                                x={maxDataPoint.timestamp}
                                y={maxValue}
                                stroke="red"
                                strokeDasharray="3 3"
                                label={{
                                    value: `Max: ${format === 'gb' ? `${maxValue.toFixed(0)} GB` : `${(maxValue * 100).toFixed(0)}%`}`,
                                    position: 'top',
                                    fill: 'red',
                                    fontSize: 12,
                                }}
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ChartCard;
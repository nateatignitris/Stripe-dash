"use client";

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

interface ChartData {
    date: string;
    volume: number;
}

const defaultData: ChartData[] = [
    { date: 'Mar 1', volume: 1200 },
    { date: 'Mar 2', volume: 1800 },
    { date: 'Mar 3', volume: 1400 },
    { date: 'Mar 4', volume: 2200 },
    { date: 'Mar 5', volume: 1900 },
    { date: 'Mar 6', volume: 2600 },
    { date: 'Mar 7', volume: 1490 },
];

export function StripeChart({ data = defaultData }: { data?: ChartData[] }) {
    return (
        <div className="w-full h-full relative">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="stripeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#E3E8EE" strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#697386', fontSize: 10 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#697386', fontSize: 10 }}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                        contentStyle={{
                            borderRadius: '8px',
                            border: '1px solid #E3E8EE',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            fontSize: '12px',
                            color: '#1A1F36'
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="volume"
                        stroke="#8B5CF6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#stripeGradient)"
                        animationDuration={1500}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

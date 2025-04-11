
import { MetricData } from "@/services/apiMonitorService";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

interface DetailChartProps {
  title: string;
  metric: MetricData;
  color: string;
  gradient: [string, string];
  formatValue?: (value: number) => string;
}

export function DetailChart({ title, metric, color, gradient, formatValue }: DetailChartProps) {
  const formattedData = metric.history.map(point => ({
    ...point,
    time: format(new Date(point.timestamp), 'HH:mm:ss'),
  }));

  return (
    <div className="bg-dashboard-card rounded-lg p-4 shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg text-white">{title}</h3>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={formattedData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`color${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradient[0]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={gradient[1]} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="time" 
              stroke="#999" 
              tick={{ fill: '#999' }} 
            />
            <YAxis 
              stroke="#999" 
              tick={{ fill: '#999' }} 
              tickFormatter={formatValue}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#333', color: '#fff' }}
              labelStyle={{ color: '#fff' }}
              formatter={(value: any) => [
                formatValue ? formatValue(value) : value,
                title
              ]}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              fillOpacity={1} 
              fill={`url(#color${title.replace(/\s+/g, '')})`} 
              isAnimationActive={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

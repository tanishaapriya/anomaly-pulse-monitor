
import { MetricData } from "@/services/apiMonitorService";
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  metric: MetricData;
  value: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

export function MetricCard({ title, metric, value, icon, color, bgColor }: MetricCardProps) {
  const getTrendIcon = () => {
    switch (metric.trend) {
      case 'up':
        return <ArrowUpIcon className="h-4 w-4" />;
      case 'down':
        return <ArrowDownIcon className="h-4 w-4" />;
      default:
        return <MinusIcon className="h-4 w-4" />;
    }
  };

  const getTrendColor = () => {
    if (title === 'Error Rate' || title === 'Response Time') {
      // For these metrics, up is bad, down is good
      return metric.trend === 'up' ? 'text-red-500' : metric.trend === 'down' ? 'text-green-500' : 'text-yellow-400';
    } else {
      // For these metrics, up is good, down is bad
      return metric.trend === 'up' ? 'text-green-500' : metric.trend === 'down' ? 'text-red-500' : 'text-yellow-400';
    }
  };

  const getStatusColor = () => {
    switch (metric.status) {
      case 'healthy':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-400';
      case 'critical':
        return 'bg-red-500 animate-pulse-slow';
      default:
        return 'bg-gray-400';
    }
  };

  const getDiff = () => {
    const diff = ((metric.current - metric.previous) / metric.previous) * 100;
    if (isNaN(diff) || !isFinite(diff)) return '0%';
    return diff > 0 ? `+${diff.toFixed(1)}%` : `${diff.toFixed(1)}%`;
  };

  return (
    <div className={`rounded-lg overflow-hidden shadow-lg border ${bgColor} border-opacity-20`}>
      <div className="p-4 text-white">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-full ${color} bg-opacity-20`}>
              {icon}
            </div>
            <h3 className="font-medium text-sm">{title}</h3>
          </div>
          <div className={`h-2 w-2 rounded-full ${getStatusColor()}`} />
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="flex items-center text-xs mt-1">
              <span className={cn("flex items-center", getTrendColor())}>
                {getTrendIcon()}
                <span className="ml-1">{getDiff()}</span>
              </span>
            </div>
          </div>
          
          <div className="h-12 w-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metric.history}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={color.replace('bg-', 'rgb(')} 
                  strokeWidth={2} 
                  dot={false} 
                  isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}


import { MetricData } from "@/services/apiMonitorService";
import { TrendingUpIcon, TrendingDownIcon, AlertCircleIcon } from "lucide-react";
import { IssueDetails } from "./IssueDetails";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface MetricCardProps {
  title: string;
  value: string;
  metric: MetricData;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

export function MetricCard({ title, value, metric, icon, color, bgColor }: MetricCardProps) {
  const getStatusColor = (status: MetricData["status"]) => {
    switch (status) {
      case 'healthy':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-400';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };
  
  const getTrendIcon = (trend: MetricData['trend']) => {
    switch (trend) {
      case 'up':
        return metric.status === 'critical' ? 
          <TrendingUpIcon className="h-4 w-4 text-red-500" /> : 
          <TrendingUpIcon className="h-4 w-4 text-green-500" />;
      case 'down':
        return metric.status === 'critical' ? 
          <TrendingDownIcon className="h-4 w-4 text-green-500" /> : 
          <TrendingDownIcon className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };
  
  const getPercentChange = () => {
    if (metric.previous === 0) return 0;
    const change = ((metric.current - metric.previous) / metric.previous) * 100;
    return Math.abs(change).toFixed(1);
  };

  const formatMetricTitle = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '');
  };
  
  return (
    <div className={`bg-dashboard-card rounded-lg p-4 shadow-lg border-l-4 ${bgColor}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className={`${color} p-2 rounded-full bg-opacity-20 mr-3`}>
            {icon}
          </div>
          <h3 className="font-medium text-white">{title}</h3>
        </div>
        
        {metric.issues && metric.issues.length > 0 ? (
          <HoverCard>
            <HoverCardTrigger asChild>
              <button className={`${getStatusColor(metric.status)} focus:outline-none`}>
                <AlertCircleIcon className="h-5 w-5" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent side="right" className="w-72 p-0 bg-dashboard-card border border-gray-700">
              <div className="p-3">
                <IssueDetails issues={metric.issues} metricName={formatMetricTitle(title)} />
              </div>
            </HoverCardContent>
          </HoverCard>
        ) : (
          <div className={`${getStatusColor(metric.status)}`}>
            <div className="h-5 w-5" />
          </div>
        )}
      </div>
      
      <div className="mt-2 flex justify-between items-end">
        <div className="text-2xl font-bold text-white">{value}</div>
        {metric.trend !== 'stable' && (
          <div className="flex items-center">
            {getTrendIcon(metric.trend)}
            <span className={`text-xs ml-1 ${metric.trend === 'up' ? 
              (metric.status === 'critical' ? 'text-red-500' : 'text-green-500') : 
              (metric.status === 'critical' ? 'text-green-500' : 'text-red-500')}`}>
              {getPercentChange()}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

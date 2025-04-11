
import { Anomaly } from "@/services/apiMonitorService";
import { AlertTriangleIcon } from "lucide-react";
import { format } from "date-fns";

interface AnomalyListProps {
  anomalies: Anomaly[];
}

export function AnomalyList({ anomalies }: AnomalyListProps) {
  if (anomalies.length === 0) {
    return (
      <div className="bg-dashboard-card rounded-lg p-4 shadow-lg h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <div className="flex justify-center">
            <div className="text-green-500 bg-green-500 bg-opacity-10 p-3 rounded-full inline-block mb-2">
              <AlertTriangleIcon className="h-6 w-6" />
            </div>
          </div>
          <p>No anomalies detected</p>
        </div>
      </div>
    );
  }

  const getSeverityColor = (severity: Anomaly["severity"]) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500 text-red-500';
      case 'medium':
        return 'bg-yellow-400 text-yellow-400';
      case 'low':
        return 'bg-blue-500 text-blue-500';
      default:
        return 'bg-gray-400 text-gray-400';
    }
  };

  const getMetricName = (metric: string) => {
    switch (metric) {
      case 'responseTime':
        return 'Response Time';
      case 'errorRate':
        return 'Error Rate';
      case 'requestRate':
        return 'Request Rate';
      case 'activeEndpoints':
        return 'Active Endpoints';
      default:
        return metric;
    }
  };
  
  return (
    <div className="bg-dashboard-card rounded-lg p-4 shadow-lg h-full">
      <h3 className="font-medium text-lg text-white mb-4">Recent Anomalies</h3>
      <div className="space-y-3">
        {anomalies.map((anomaly) => (
          <div 
            key={anomaly.id} 
            className="border border-gray-700 rounded-lg p-3 flex items-start"
          >
            <div className={`${getSeverityColor(anomaly.severity)} p-2 rounded-full bg-opacity-10 mr-3 mt-1`}>
              <AlertTriangleIcon className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center">
                <h4 className="font-medium text-white">{getMetricName(anomaly.metric)}</h4>
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getSeverityColor(anomaly.severity)} bg-opacity-10`}>
                  {anomaly.severity}
                </span>
              </div>
              <p className="text-sm text-gray-400">{anomaly.message}</p>
              <div className="text-xs text-gray-500 mt-1">
                {format(new Date(anomaly.timestamp), 'HH:mm:ss')} - Value: {anomaly.value.toFixed(2)} (Expected: {anomaly.expectedValue.toFixed(2)})
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

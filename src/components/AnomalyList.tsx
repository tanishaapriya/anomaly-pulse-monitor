
import { Anomaly } from "@/services/apiMonitorService";
import { AlertTriangleIcon, PieChartIcon, WrenchIcon } from "lucide-react";
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
      <div className="space-y-3 overflow-auto max-h-[500px] pr-1">
        {anomalies.map((anomaly) => (
          <div 
            key={anomaly.id} 
            className="border border-gray-700 rounded-lg p-3"
          >
            <div className="flex items-start gap-3">
              <div className={`${getSeverityColor(anomaly.severity)} p-2 rounded-full bg-opacity-10 mt-1`}>
                <AlertTriangleIcon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">{getMetricName(anomaly.metric)}</h4>
                    <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${getSeverityColor(anomaly.severity)} bg-opacity-10`}>
                      {anomaly.severity}
                    </span>
                  </div>
                  <div className="flex items-center bg-gray-800 px-2 py-1 rounded text-xs">
                    <PieChartIcon size={12} className="mr-1" />
                    <span>{(anomaly.confidence * 100).toFixed(0)}% confidence</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-1">{anomaly.message}</p>
                
                {anomaly.issueType && (
                  <div className="mt-2 pt-2 border-t border-gray-700">
                    <div className="flex items-center text-sm text-dashboard-purple mb-1">
                      <span className="font-medium">Issue: {anomaly.issueType}</span>
                    </div>
                    {anomaly.solution && (
                      <div className="flex items-start text-xs text-gray-400 mt-1">
                        <WrenchIcon size={12} className="mr-1 mt-0.5 shrink-0 text-dashboard-orange" />
                        <span>{anomaly.solution}</span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="text-xs text-gray-500 mt-2">
                  {format(new Date(anomaly.timestamp), 'HH:mm:ss')} - Value: {anomaly.value.toFixed(2)} (Expected: {anomaly.expectedValue.toFixed(2)})
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

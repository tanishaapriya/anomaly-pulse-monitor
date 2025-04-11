
import { useState } from "react";
import { Anomaly } from "@/services/apiMonitorService";
import { AlertTriangleIcon, PieChartIcon, WrenchIcon, FilterIcon, ShieldIcon, ClockIcon } from "lucide-react";
import { format, isSameDay } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EnhancedAnomalyListProps {
  anomalies: Anomaly[];
}

export function EnhancedAnomalyList({ anomalies }: EnhancedAnomalyListProps) {
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [metricFilter, setMetricFilter] = useState<string>("all");
  
  if (anomalies.length === 0) {
    return (
      <Card className="bg-dashboard-card border-gray-700 shadow-xl h-full">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <AlertTriangleIcon className="h-5 w-5 mr-2 text-green-500" />
            Recent Anomalies
          </CardTitle>
          <CardDescription className="text-gray-400">
            No anomalies detected in the system
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="flex justify-center">
              <div className="text-green-500 bg-green-500 bg-opacity-10 p-3 rounded-full inline-block mb-2">
                <ShieldIcon className="h-6 w-6" />
              </div>
            </div>
            <p className="text-lg font-medium text-white">Systems Running Normally</p>
            <p className="text-sm text-gray-400 mt-2">All metrics are within expected parameters</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const filteredAnomalies = anomalies.filter((anomaly) => {
    if (severityFilter !== "all" && anomaly.severity !== severityFilter) return false;
    if (metricFilter !== "all" && anomaly.metric !== metricFilter) return false;
    return true;
  });

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

  const groupAnonymiesByDate = () => {
    const grouped: { [key: string]: Anomaly[] } = {};
    
    filteredAnomalies.forEach(anomaly => {
      const date = new Date(anomaly.timestamp);
      const key = isSameDay(date, new Date())
        ? 'Today'
        : isSameDay(date, new Date(Date.now() - 86400000))
        ? 'Yesterday'
        : format(date, 'MMM dd, yyyy');
      
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(anomaly);
    });
    
    return grouped;
  };
  
  const groupedAnomalies = groupAnonymiesByDate();
  
  return (
    <Card className="bg-dashboard-card border-gray-700 shadow-xl h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-white flex items-center">
            <AlertTriangleIcon className="h-5 w-5 mr-2 text-yellow-400" />
            Recent Anomalies
          </CardTitle>
          <Badge variant="outline" className="bg-dashboard-card border-gray-600 text-gray-300">
            {filteredAnomalies.length} Issues
          </Badge>
        </div>
        <CardDescription className="text-gray-400">
          Security and performance anomalies detected in your system
        </CardDescription>
        <div className="flex gap-2 mt-2">
          <Select 
            value={severityFilter} 
            onValueChange={setSeverityFilter}
          >
            <SelectTrigger className="w-[130px] h-8 text-xs bg-gray-800 border-gray-700">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={metricFilter} 
            onValueChange={setMetricFilter}
          >
            <SelectTrigger className="w-[150px] h-8 text-xs bg-gray-800 border-gray-700">
              <SelectValue placeholder="Metric" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">All Metrics</SelectItem>
              <SelectItem value="responseTime">Response Time</SelectItem>
              <SelectItem value="errorRate">Error Rate</SelectItem>
              <SelectItem value="requestRate">Request Rate</SelectItem>
              <SelectItem value="activeEndpoints">Active Endpoints</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 overflow-auto max-h-[430px] pr-1">
          {Object.entries(groupedAnomalies).map(([date, anomalies]) => (
            <div key={date} className="space-y-2">
              <div className="flex items-center text-sm text-gray-400">
                <ClockIcon size={14} className="mr-1" />
                <span>{date}</span>
              </div>
              
              {anomalies.map((anomaly) => (
                <div 
                  key={anomaly.id} 
                  className="border border-gray-700 rounded-lg p-3 hover:bg-gray-800/50 transition-colors"
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

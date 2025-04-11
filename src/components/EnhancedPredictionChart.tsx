
import { Prediction } from "@/services/apiMonitorService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend, Label } from "recharts";
import { format, addMinutes } from "date-fns";
import { TrendingUp, AlertCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EnhancedPredictionChartProps {
  predictions: Prediction[];
  currentValues: {
    responseTime: number;
    errorRate: number;
    requestRate: number;
    activeEndpoints: number;
  };
}

export function EnhancedPredictionChart({ predictions, currentValues }: EnhancedPredictionChartProps) {
  if (!predictions || predictions.length === 0) {
    return (
      <Card className="bg-dashboard-card border-gray-700 shadow-xl">
        <CardHeader>
          <CardTitle className="text-white">Metric Predictions</CardTitle>
          <CardDescription className="text-gray-400">
            No prediction data available
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p>Waiting for prediction data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const getMetricName = (metric: string) => {
    switch (metric) {
      case 'responseTime': return 'Response Time';
      case 'errorRate': return 'Error Rate';
      case 'requestRate': return 'Request Rate';
      case 'activeEndpoints': return 'Active Endpoints';
      default: return metric;
    }
  };
  
  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'responseTime': return '#8B5CF6';
      case 'errorRate': return '#F97316';
      case 'requestRate': return '#0EA5E9';
      case 'activeEndpoints': return '#E879F9';
      default: return '#22C55E';
    }
  };
  
  const getMetricUnit = (metric: string) => {
    switch (metric) {
      case 'responseTime': return 'ms';
      case 'errorRate': return '%';
      case 'requestRate': return '/min';
      case 'activeEndpoints': return '';
      default: return '';
    }
  };
  
  const generateForecastData = (metric: string) => {
    const metricPredictions = predictions.filter(p => p.metric === metric);
    if (metricPredictions.length === 0) return [];
    
    const now = Date.now();
    const currentValue = currentValues[metric as keyof typeof currentValues] || 0;
    
    // Generate a time series from now to the prediction time
    const forecastData = [
      { timestamp: now, value: currentValue, type: 'current' }
    ];
    
    // Add intermediate points
    const predictionTime = metricPredictions[0].timestamp;
    const predictedValue = metricPredictions[0].predictedValue;
    const steps = 5;
    
    for (let i = 1; i <= steps; i++) {
      const time = now + ((predictionTime - now) * i / steps);
      const progress = i / steps;
      const value = currentValue + (predictedValue - currentValue) * progress;
      
      forecastData.push({
        timestamp: time,
        value,
        type: 'forecast'
      });
    }
    
    return forecastData;
  };
  
  const getPredictionConfidence = (metric: string) => {
    const metricPredictions = predictions.filter(p => p.metric === metric);
    if (metricPredictions.length === 0) return 0;
    return metricPredictions[0].confidence;
  };
  
  const getPredictionTime = (metric: string) => {
    const metricPredictions = predictions.filter(p => p.metric === metric);
    if (metricPredictions.length === 0) return 0;
    
    const predictionTimestamp = metricPredictions[0].timestamp;
    return format(new Date(predictionTimestamp), 'HH:mm');
  };
  
  const getConfidenceLevel = (confidence: number) => {
    if (confidence >= 0.85) return 'high';
    if (confidence >= 0.7) return 'medium';
    return 'low';
  };
  
  const getConfidenceBadge = (confidence: number) => {
    const level = getConfidenceLevel(confidence);
    const colors = {
      high: 'bg-green-500/10 text-green-500 border-green-500/20',
      medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      low: 'bg-red-500/10 text-red-500 border-red-500/20'
    };
    
    return (
      <Badge variant="outline" className={`${colors[level]} ml-2`}>
        {(confidence * 100).toFixed(0)}% confidence
      </Badge>
    );
  };
  
  return (
    <Card className="bg-dashboard-card border-gray-700 shadow-xl">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-dashboard-blue" />
            Metric Predictions
          </CardTitle>
        </div>
        <CardDescription className="text-gray-400">
          AI-powered forecasting for key metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="responseTime">
          <TabsList className="grid grid-cols-4 bg-gray-800 mb-4">
            <TabsTrigger value="responseTime">Response Time</TabsTrigger>
            <TabsTrigger value="errorRate">Error Rate</TabsTrigger>
            <TabsTrigger value="requestRate">Request Rate</TabsTrigger>
            <TabsTrigger value="activeEndpoints">Endpoints</TabsTrigger>
          </TabsList>
          
          {['responseTime', 'errorRate', 'requestRate', 'activeEndpoints'].map(metric => (
            <TabsContent key={metric} value={metric} className="mt-0">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-400">Prediction for {getPredictionTime(metric)}</span>
                  {getConfidenceBadge(getPredictionConfidence(metric))}
                </div>
                
                {getPredictionConfidence(metric) < 0.7 && (
                  <div className="flex items-center text-yellow-400 text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Low confidence prediction
                  </div>
                )}
              </div>
              
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={generateForecastData(metric)}
                    margin={{ top: 20, right: 30, left: 10, bottom: 30 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis 
                      dataKey="timestamp"
                      tickFormatter={(ts) => format(new Date(ts), 'HH:mm')}
                      stroke="#999"
                      tick={{ fill: '#999' }}
                    >
                      <Label value="Time" position="insideBottom" offset={-10} fill="#999" />
                    </XAxis>
                    <YAxis 
                      stroke="#999" 
                      tick={{ fill: '#999' }}
                      tickFormatter={(value) => `${value}${getMetricUnit(metric)}`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#333', color: '#fff' }}
                      labelFormatter={(value) => `Time: ${format(new Date(value), 'HH:mm:ss')}`}
                      formatter={(value: any) => [`${value}${getMetricUnit(metric)}`, getMetricName(metric)]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={getMetricColor(metric)} 
                      strokeWidth={2}
                      dot={{ stroke: getMetricColor(metric), strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                    <ReferenceLine 
                      x={Date.now()} 
                      stroke="#888" 
                      strokeDasharray="3 3" 
                      label={{ value: "Now", position: "insideTopRight", fill: '#888' }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

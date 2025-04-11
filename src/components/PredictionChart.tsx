
import { Prediction } from "@/services/apiMonitorService";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { format } from "date-fns";

interface PredictionChartProps {
  title: string;
  predictions: Prediction[];
  currentValue: number;
  color: string;
}

export function PredictionChart({ title, predictions, currentValue, color }: PredictionChartProps) {
  // Filter predictions for the specific metric
  const relevantPredictions = predictions.filter(p => p.metric === title.toLowerCase().replace(/\s+/g, ''));
  
  if (relevantPredictions.length === 0) {
    return (
      <div className="bg-dashboard-card rounded-lg p-4 shadow-lg">
        <h3 className="font-medium text-lg text-white mb-2">{title} Prediction</h3>
        <div className="text-center text-muted-foreground h-32 flex items-center justify-center">
          No prediction data available
        </div>
      </div>
    );
  }
  
  const now = Date.now();
  const predictionTime = relevantPredictions[0].timestamp;
  
  const data = [
    { timestamp: now, value: currentValue, label: 'Current' },
    { timestamp: predictionTime, value: relevantPredictions[0].predictedValue, label: 'Predicted' }
  ];
  
  return (
    <div className="bg-dashboard-card rounded-lg p-4 shadow-lg">
      <h3 className="font-medium text-lg text-white mb-2">
        {title} Prediction
        <span className="ml-2 text-xs text-gray-400">
          Confidence: {(relevantPredictions[0].confidence * 100).toFixed(0)}%
        </span>
      </h3>
      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="timestamp"
              stroke="#999"
              tick={{ fill: '#999' }}
              tickFormatter={(timestamp) => format(new Date(timestamp), 'HH:mm')}
            />
            <YAxis stroke="#999" tick={{ fill: '#999' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#333', color: '#fff' }}
              labelFormatter={(value) => format(new Date(value), 'HH:mm:ss')}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={2}
              activeDot={{ r: 8 }}
              isAnimationActive={true}
            />
            <ReferenceLine 
              x={now} 
              stroke="#888" 
              strokeDasharray="3 3" 
              label={{ value: "Now", position: "insideTopRight", fill: '#888' }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

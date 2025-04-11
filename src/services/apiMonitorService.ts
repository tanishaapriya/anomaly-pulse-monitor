
import { toast } from "sonner";

// Data types
export interface ApiMetrics {
  responseTime: MetricData;
  errorRate: MetricData;
  requestRate: MetricData;
  activeEndpoints: MetricData;
  anomalies: Anomaly[];
  predictions: Prediction[];
}

export interface MetricData {
  current: number;
  previous: number;
  history: DataPoint[];
  trend: 'up' | 'down' | 'stable';
  status: 'healthy' | 'warning' | 'critical';
}

export interface DataPoint {
  timestamp: number;
  value: number;
}

export interface Anomaly {
  id: string;
  metric: string;
  timestamp: number;
  value: number;
  expectedValue: number;
  severity: 'low' | 'medium' | 'high';
  message: string;
}

export interface Prediction {
  metric: string;
  timestamp: number;
  predictedValue: number;
  confidence: number;
}

// Sample data generation for demonstration
const generateRandomTrend = (): 'up' | 'down' | 'stable' => {
  const random = Math.random();
  if (random < 0.33) return 'up';
  if (random < 0.66) return 'down';
  return 'stable';
};

const generateRandomStatus = (): 'healthy' | 'warning' | 'critical' => {
  const random = Math.random();
  if (random < 0.7) return 'healthy';
  if (random < 0.9) return 'warning';
  return 'critical';
};

const generateRandomSeverity = (): 'low' | 'medium' | 'high' => {
  const random = Math.random();
  if (random < 0.5) return 'low';
  if (random < 0.8) return 'medium';
  return 'high';
};

const generateHistoricalData = (
  baseValue: number,
  variance: number,
  count: number
): DataPoint[] => {
  const now = Date.now();
  return Array.from({ length: count }).map((_, i) => {
    const randomVariance = (Math.random() - 0.5) * variance;
    return {
      timestamp: now - (count - i) * 5000, // 5 second intervals
      value: Math.max(0, baseValue + randomVariance),
    };
  });
};

// Create anomalies based on some random data
const generateAnomalies = (): Anomaly[] => {
  const metrics = ['responseTime', 'errorRate', 'requestRate', 'activeEndpoints'];
  const now = Date.now();
  
  // Generate between 0 and 3 anomalies
  const anomalyCount = Math.floor(Math.random() * 4);
  return Array.from({ length: anomalyCount }).map((_, i) => {
    const metric = metrics[Math.floor(Math.random() * metrics.length)];
    const severity = generateRandomSeverity();
    const value = Math.random() * 100;
    const expectedValue = value * (0.5 + Math.random() * 0.5);
    
    return {
      id: `anomaly-${now}-${i}`,
      metric,
      timestamp: now - Math.floor(Math.random() * 300000), // Within last 5 minutes
      value,
      expectedValue,
      severity,
      message: `Unusual ${metric} detected - ${severity} severity`
    };
  });
};

// Generate predictions
const generatePredictions = (): Prediction[] => {
  const metrics = ['responseTime', 'errorRate', 'requestRate', 'activeEndpoints'];
  const now = Date.now();
  
  return metrics.map(metric => {
    return {
      metric,
      timestamp: now + 300000, // 5 minutes in the future
      predictedValue: Math.random() * 100,
      confidence: 0.5 + Math.random() * 0.5 // 50-100% confidence
    };
  });
};

// Main API monitoring service
export const fetchApiMetrics = async (): Promise<ApiMetrics> => {
  // In a real application, this would fetch from your actual API monitoring backend
  // For demo purposes, we'll generate random data
  
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Generate random metrics
  const responseTime: MetricData = {
    current: 120 + Math.random() * 80, // 120-200ms
    previous: 120 + Math.random() * 80,
    history: generateHistoricalData(150, 50, 20), // 20 data points
    trend: generateRandomTrend(),
    status: generateRandomStatus()
  };
  
  const errorRate: MetricData = {
    current: Math.random() * 5, // 0-5%
    previous: Math.random() * 5,
    history: generateHistoricalData(2.5, 2, 20),
    trend: generateRandomTrend(),
    status: generateRandomStatus()
  };
  
  const requestRate: MetricData = {
    current: 50 + Math.random() * 100, // 50-150 req/min
    previous: 50 + Math.random() * 100,
    history: generateHistoricalData(100, 40, 20),
    trend: generateRandomTrend(),
    status: generateRandomStatus()
  };
  
  const activeEndpoints: MetricData = {
    current: 5 + Math.floor(Math.random() * 10), // 5-15 endpoints
    previous: 5 + Math.floor(Math.random() * 10),
    history: generateHistoricalData(10, 5, 20).map(dp => ({ 
      ...dp, 
      value: Math.floor(dp.value) 
    })),
    trend: generateRandomTrend(),
    status: generateRandomStatus()
  };
  
  // Randomly trigger critical status to showcase anomaly
  if (Math.random() < 0.1) {
    // 10% chance of a critical status
    const metrics = [responseTime, errorRate, requestRate, activeEndpoints];
    const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
    randomMetric.status = 'critical';
    randomMetric.trend = 'up';
    toast.error(`Anomaly detected: Critical ${randomMetric === responseTime ? 'response time' : 
      randomMetric === errorRate ? 'error rate' : 
      randomMetric === requestRate ? 'request rate' : 
      'active endpoints'}`);
  }
  
  return {
    responseTime,
    errorRate,
    requestRate,
    activeEndpoints,
    anomalies: generateAnomalies(),
    predictions: generatePredictions()
  };
};

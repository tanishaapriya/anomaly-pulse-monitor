
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
  issues?: IssueDetails[];
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
  issueType?: string;
  solution?: string;
  confidence: number;
}

export interface Prediction {
  metric: string;
  timestamp: number;
  predictedValue: number;
  confidence: number;
}

export interface IssueDetails {
  type: string;
  description: string;
  solution: string;
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

const issueTypes = {
  responseTime: [
    { type: 'Network Latency', description: 'High network latency detected', solution: 'Consider CDN implementation or optimize server network configuration' },
    { type: 'Server Overload', description: 'Server processing time is high', solution: 'Scale up server resources or optimize database queries' },
    { type: 'API Endpoint Slow', description: 'Specific endpoint is responding slowly', solution: 'Review endpoint implementation and add caching where possible' }
  ],
  errorRate: [
    { type: 'Server Error Spike', description: 'Increase in 5xx errors', solution: 'Check server logs for exceptions and fix underlying code issues' },
    { type: 'Client Error Increase', description: 'Increase in 4xx errors', solution: 'Review client requests and API documentation for proper usage' },
    { type: 'Timeout Errors', description: 'Requests are timing out', solution: 'Increase timeout thresholds or optimize response time' }
  ],
  requestRate: [
    { type: 'Traffic Spike', description: 'Unusual spike in traffic detected', solution: 'Implement rate limiting or scale infrastructure to handle load' },
    { type: 'DDoS Suspicion', description: 'Unusual pattern in request distribution', solution: 'Implement DDoS protection or review security measures' },
    { type: 'Low Traffic', description: 'Traffic is lower than expected', solution: 'Check for API availability issues or client connectivity problems' }
  ],
  activeEndpoints: [
    { type: 'Endpoint Usage Change', description: 'Change in active endpoint pattern', solution: 'Review API documentation and communicate changes to users' },
    { type: 'Unused Endpoints', description: 'Some endpoints are not being used', solution: 'Consider deprecating unused endpoints or improving documentation' },
    { type: 'Endpoint Overload', description: 'Few endpoints receiving most traffic', solution: 'Review load balancing strategy and optimize high-traffic endpoints' }
  ]
};

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
    const confidence = 0.65 + (Math.random() * 0.3); // 65-95% confidence
    
    // Get random issue type for this metric
    const metricIssues = issueTypes[metric as keyof typeof issueTypes];
    const issue = metricIssues[Math.floor(Math.random() * metricIssues.length)];
    
    return {
      id: `anomaly-${now}-${i}`,
      metric,
      timestamp: now - Math.floor(Math.random() * 300000), // Within last 5 minutes
      value,
      expectedValue,
      severity,
      message: `Unusual ${metric} detected - ${severity} severity`,
      issueType: issue.type,
      solution: issue.solution,
      confidence
    };
  });
};

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

const generateIssuesForMetric = (metric: string, status: 'healthy' | 'warning' | 'critical'): IssueDetails[] => {
  if (status === 'healthy') return [];
  
  const metricIssues = issueTypes[metric as keyof typeof issueTypes];
  if (!metricIssues) return []; // Handle case where metric key doesn't exist
  
  const issueCount = status === 'critical' ? 2 : 1;
  
  return Array.from({ length: issueCount }).map(() => {
    const issue = metricIssues[Math.floor(Math.random() * metricIssues.length)];
    return {
      ...issue,
      confidence: 0.7 + (Math.random() * 0.25) // 70-95% confidence
    };
  });
};

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
  
  // Add issues based on status
  responseTime.issues = generateIssuesForMetric('responseTime', responseTime.status);
  errorRate.issues = generateIssuesForMetric('errorRate', errorRate.status);
  requestRate.issues = generateIssuesForMetric('requestRate', requestRate.status);
  activeEndpoints.issues = generateIssuesForMetric('activeEndpoints', activeEndpoints.status);
  
  // Randomly trigger critical status to showcase anomaly
  if (Math.random() < 0.1) {
    // 10% chance of a critical status
    const metrics = [responseTime, errorRate, requestRate, activeEndpoints];
    const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
    randomMetric.status = 'critical';
    randomMetric.trend = 'up';
    
    // Get the metric name
    const metricName = randomMetric === responseTime ? 'response time' : 
                    randomMetric === errorRate ? 'error rate' : 
                    randomMetric === requestRate ? 'request rate' : 
                    'active endpoints';
    
    // Add issues for this critical metric
    randomMetric.issues = generateIssuesForMetric(
      metricName.replace(' ', ''), 
      'critical'
    );
    
    toast.error(`Anomaly detected: Critical ${metricName}`);
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

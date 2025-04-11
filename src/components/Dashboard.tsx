
import { useEffect, useState } from "react";
import { ApiMetrics, fetchApiMetrics } from "@/services/apiMonitorService";
import { MetricCard } from "./MetricCard";
import { DetailChart } from "./DetailChart";
import { AnomalyList } from "./AnomalyList";
import { PredictionChart } from "./PredictionChart";
import { BarChart4, AlertCircle, Activity, Globe, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Dashboard() {
  const [metrics, setMetrics] = useState<ApiMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchApiMetrics();
      setMetrics(data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error("Error fetching API metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  // Auto-refresh every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatResponseTime = (value: number) => `${value.toFixed(0)} ms`;
  const formatErrorRate = (value: number) => `${value.toFixed(1)}%`;
  const formatRequestRate = (value: number) => `${value.toFixed(0)}/min`;
  const formatActiveEndpoints = (value: number) => `${value.toFixed(0)}`;

  if (loading && !metrics) {
    return (
      <div className="flex items-center justify-center h-screen bg-dashboard-background">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-dashboard-purple border-t-transparent rounded-full mb-4 mx-auto"></div>
          <h2 className="text-xl font-semibold text-white">Loading dashboard data...</h2>
        </div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="flex items-center justify-center h-screen bg-dashboard-background">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4 mx-auto" />
          <h2 className="text-xl font-semibold text-white">Failed to load dashboard data</h2>
          <Button onClick={fetchData} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dashboard-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">API Monitoring Dashboard</h1>
            <p className="text-gray-400">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={fetchData}
            className="text-gray-300 border-gray-700 hover:bg-gray-800"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard 
            title="Response Time" 
            metric={metrics.responseTime}
            value={formatResponseTime(metrics.responseTime.current)}
            icon={<Activity className="h-5 w-5 text-dashboard-purple" />}
            color="bg-dashboard-purple"
            bgColor="border-dashboard-purple"
          />
          <MetricCard 
            title="Error Rate" 
            metric={metrics.errorRate}
            value={formatErrorRate(metrics.errorRate.current)}
            icon={<AlertCircle className="h-5 w-5 text-dashboard-orange" />}
            color="bg-dashboard-orange"
            bgColor="border-dashboard-orange"
          />
          <MetricCard 
            title="Request Rate" 
            metric={metrics.requestRate}
            value={formatRequestRate(metrics.requestRate.current)}
            icon={<BarChart4 className="h-5 w-5 text-dashboard-blue" />}
            color="bg-dashboard-blue"
            bgColor="border-dashboard-blue"
          />
          <MetricCard 
            title="Active Endpoints" 
            metric={metrics.activeEndpoints}
            value={formatActiveEndpoints(metrics.activeEndpoints.current)}
            icon={<Globe className="h-5 w-5 text-dashboard-pink" />}
            color="bg-dashboard-pink"
            bgColor="border-dashboard-pink"
          />
        </div>

        {/* Detailed Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <DetailChart 
            title="Response Time" 
            metric={metrics.responseTime}
            color="#8B5CF6"
            gradient={["#8B5CF6", "#1A1F2C"]}
            formatValue={(value) => `${value.toFixed(0)} ms`}
          />
          <DetailChart 
            title="Error Rate" 
            metric={metrics.errorRate}
            color="#F97316"
            gradient={["#F97316", "#1A1F2C"]}
            formatValue={(value) => `${value.toFixed(1)}%`}
          />
        </div>

        {/* Predictions and Anomalies */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <DetailChart 
              title="Request Rate" 
              metric={metrics.requestRate}
              color="#0EA5E9"
              gradient={["#0EA5E9", "#1A1F2C"]}
              formatValue={(value) => `${value.toFixed(0)}/min`}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PredictionChart 
                title="responseTime" 
                predictions={metrics.predictions}
                currentValue={metrics.responseTime.current}
                color="#8B5CF6"
              />
              <PredictionChart 
                title="errorRate" 
                predictions={metrics.predictions}
                currentValue={metrics.errorRate.current}
                color="#F97316"
              />
            </div>
          </div>
          <div className="lg:col-span-1">
            <AnomalyList anomalies={metrics.anomalies} />
          </div>
        </div>
      </div>
    </div>
  );
}

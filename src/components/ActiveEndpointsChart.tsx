
import { useState } from "react";
import { MetricData } from "@/services/apiMonitorService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, AlertTriangle, Activity } from "lucide-react";

interface ActiveEndpointsChartProps {
  metric: MetricData;
}

export function ActiveEndpointsChart({ metric }: ActiveEndpointsChartProps) {
  const [view, setView] = useState<'active' | 'latency' | 'errors'>('active');
  
  // Generate sample endpoint data for demonstration
  const endpointData = [
    { name: '/api/users', active: 12, latency: 95, errors: 1.2 },
    { name: '/api/products', active: 8, latency: 120, errors: 0.5 },
    { name: '/api/orders', active: 15, latency: 85, errors: 0.8 },
    { name: '/api/payments', active: 5, latency: 150, errors: 2.5 },
    { name: '/api/analytics', active: 3, latency: 200, errors: 0.2 },
    { name: '/api/auth', active: 18, latency: 65, errors: 0.4 },
  ];
  
  const getBarColor = (value: number, type: 'active' | 'latency' | 'errors') => {
    if (type === 'active') return value > 10 ? '#8B5CF6' : '#A78BFA';
    if (type === 'latency') return value > 100 ? '#F97316' : '#FDBA74';
    return value > 1 ? '#EF4444' : '#FCA5A5';
  };
  
  const getValue = (item: any) => {
    if (view === 'active') return item.active;
    if (view === 'latency') return item.latency;
    return item.errors;
  };
  
  const getIcon = () => {
    if (view === 'active') return <Globe className="h-5 w-5" />;
    if (view === 'latency') return <Activity className="h-5 w-5" />;
    return <AlertTriangle className="h-5 w-5" />;
  };
  
  const getTitle = () => {
    if (view === 'active') return "Active Requests";
    if (view === 'latency') return "Latency (ms)";
    return "Error Rate (%)";
  };
  
  return (
    <Card className="bg-dashboard-card border-gray-700 shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-white flex items-center">
            {getIcon()}
            <span className="ml-2">Endpoint Analysis</span>
          </CardTitle>
          <CardDescription className="text-gray-400">
            Detailed endpoint performance metrics
          </CardDescription>
        </div>
        <Tabs defaultValue="active" className="w-[260px]" onValueChange={(v) => setView(v as any)}>
          <TabsList className="grid grid-cols-3 bg-gray-800">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="latency">Latency</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={endpointData}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="name" 
                stroke="#999" 
                tick={{ fill: '#999' }}
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis stroke="#999" tick={{ fill: '#999' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#333', color: '#fff' }}
                labelStyle={{ color: '#fff' }}
                formatter={(value: any) => [value, getTitle()]}
              />
              <Bar dataKey={() => view === 'active' ? 'active' : view === 'latency' ? 'latency' : 'errors'}>
                {endpointData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getBarColor(getValue(entry), view)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}


import { useState, useMemo } from "react";
import { MetricData } from "@/services/apiMonitorService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, AlertTriangle, Activity, PieChart, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ActiveEndpointsChartProps {
  metric: MetricData;
}

export function ActiveEndpointsChart({ metric }: ActiveEndpointsChartProps) {
  const [view, setView] = useState<'active' | 'latency' | 'errors'>('active');
  
  // Generate sample endpoint data for demonstration with more detail
  const endpointData = useMemo(() => [
    { name: '/api/users', active: 12, latency: 95, errors: 1.2, status: 'healthy', category: 'user-management' },
    { name: '/api/products', active: 8, latency: 120, errors: 0.5, status: 'healthy', category: 'inventory' },
    { name: '/api/orders', active: 15, latency: 85, errors: 0.8, status: 'healthy', category: 'transactions' },
    { name: '/api/payments', active: 5, latency: 150, errors: 2.5, status: 'warning', category: 'transactions' },
    { name: '/api/analytics', active: 3, latency: 200, errors: 0.2, status: 'healthy', category: 'reporting' },
    { name: '/api/auth', active: 18, latency: 65, errors: 0.4, status: 'healthy', category: 'security' },
    { name: '/api/webhooks', active: 10, latency: 110, errors: 1.8, status: 'warning', category: 'integrations' },
    { name: '/api/notifications', active: 7, latency: 130, errors: 0.6, status: 'healthy', category: 'communications' },
  ], []);
  
  const getBarColor = (value: number, type: 'active' | 'latency' | 'errors', status: string) => {
    if (status === 'warning') return type === 'errors' ? '#EF4444' : '#F59E0B';
    
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
    if (view === 'active') return <Globe className="h-5 w-5 text-purple-500" />;
    if (view === 'latency') return <Activity className="h-5 w-5 text-orange-500" />;
    return <AlertTriangle className="h-5 w-5 text-red-500" />;
  };
  
  const getTitle = () => {
    if (view === 'active') return "Active Requests";
    if (view === 'latency') return "Latency (ms)";
    return "Error Rate (%)";
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'user-management': return '#8B5CF6';
      case 'inventory': return '#2DD4BF';
      case 'transactions': return '#F97316';
      case 'reporting': return '#3B82F6';
      case 'security': return '#10B981';
      case 'integrations': return '#EC4899';
      case 'communications': return '#F59E0B';
      default: return '#6B7280';
    }
  };
  
  const getStatusBadge = (status: string) => {
    if (status === 'healthy') return (
      <Badge className="bg-green-500/20 text-green-500 border-green-500/50">Healthy</Badge>
    );
    return (
      <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/50">Warning</Badge>
    );
  };

  const getConfidenceIndicator = (value: number, type: 'active' | 'latency' | 'errors') => {
    let color = 'bg-green-500';
    let confidence = 'High';
    
    if (type === 'active') {
      if (value > 15) { color = 'bg-yellow-500'; confidence = 'Medium'; }
      if (value > 20) { color = 'bg-red-500'; confidence = 'Low'; }
    } else if (type === 'latency') {
      if (value > 100) { color = 'bg-yellow-500'; confidence = 'Medium'; }
      if (value > 150) { color = 'bg-red-500'; confidence = 'Low'; }
    } else {
      if (value > 1) { color = 'bg-yellow-500'; confidence = 'Medium'; }
      if (value > 2) { color = 'bg-red-500'; confidence = 'Low'; }
    }
    
    return (
      <div className="flex items-center">
        <div className={`w-2 h-2 rounded-full ${color} mr-2`}></div>
        <span className="text-xs">{confidence} Confidence</span>
      </div>
    );
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
            Detailed endpoint performance metrics and health status
          </CardDescription>
        </div>
        <Tabs defaultValue="active" className="w-[260px]" onValueChange={(v) => setView(v as any)}>
          <TabsList className="grid grid-cols-3 bg-gray-800">
            <TabsTrigger value="active" className="data-[state=active]:bg-purple-600/20 data-[state=active]:text-purple-400">Active</TabsTrigger>
            <TabsTrigger value="latency" className="data-[state=active]:bg-orange-600/20 data-[state=active]:text-orange-400">Latency</TabsTrigger>
            <TabsTrigger value="errors" className="data-[state=active]:bg-red-600/20 data-[state=active]:text-red-400">Errors</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4 bg-gray-800/50 p-3 rounded-md">
          <div className="flex items-center">
            <Info className="h-4 w-4 text-gray-400 mr-2" />
            <span className="text-sm text-gray-300">Showing {endpointData.length} endpoints</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
              <span className="text-xs text-gray-300">Healthy</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
              <span className="text-xs text-gray-300">Warning</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
              <span className="text-xs text-gray-300">Critical</span>
            </div>
          </div>
        </div>
        
        <div className="h-[300px] w-full mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={endpointData}
              margin={{ top: 20, right: 30, left: 5, bottom: 70 }}
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
              <Legend 
                formatter={(value) => <span style={{ color: '#999' }}>{value}</span>}
                payload={
                  endpointData.map(item => ({
                    value: item.category,
                    type: 'circle',
                    id: item.category,
                    color: getCategoryColor(item.category)
                  }))
                  .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
                }
              />
              <Bar dataKey={() => view === 'active' ? 'active' : view === 'latency' ? 'latency' : 'errors'}>
                {endpointData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getBarColor(getValue(entry), view, entry.status)}
                    stroke={getCategoryColor(entry.category)}
                    strokeWidth={2}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {endpointData.slice(0, 4).map((endpoint, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                <div className="font-medium text-white">{endpoint.name}</div>
                {getStatusBadge(endpoint.status)}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-gray-400">Active</div>
                  <div className="text-purple-400 font-medium">{endpoint.active}</div>
                </div>
                <div>
                  <div className="text-gray-400">Latency</div>
                  <div className="text-orange-400 font-medium">{endpoint.latency} ms</div>
                </div>
                <div>
                  <div className="text-gray-400">Errors</div>
                  <div className="text-red-400 font-medium">{endpoint.errors}%</div>
                </div>
                <div>
                  <div className="text-gray-400">Category</div>
                  <div className="text-gray-300 font-medium">{endpoint.category}</div>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-700">
                {getConfidenceIndicator(endpoint[view], view)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightLeft, Users, Activity } from "lucide-react";

export function BlockchainMetrics() {
  // Generate sample blockchain metrics data
  const generateBlockchainData = (length: number) => {
    return Array.from({ length }).map((_, i) => {
      return {
        name: `Block ${24600 + i}`,
        transactions: Math.floor(Math.random() * 500) + 200,
        users: Math.floor(Math.random() * 100) + 200,
        latency: Math.floor(Math.random() * 30) + 70,
      };
    });
  };
  
  const blockchainData = generateBlockchainData(24);
  
  return (
    <Card className="bg-dashboard-card border-gray-700 shadow-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center">
          <Activity className="h-5 w-5 mr-2 text-dashboard-blue" />
          Blockchain Performance Metrics
        </CardTitle>
        <CardDescription className="text-gray-400">
          Real-time metrics from your private blockchain infrastructure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList className="grid grid-cols-3 max-w-md bg-gray-800">
            <TabsTrigger value="transactions">
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Active Users
            </TabsTrigger>
            <TabsTrigger value="latency">
              <Activity className="h-4 w-4 mr-2" />
              Block Latency
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" className="space-y-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={blockchainData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#999" tick={{ fill: '#999' }} />
                  <YAxis stroke="#999" tick={{ fill: '#999' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#333', color: '#fff' }}
                    formatter={(value: any) => [`${value} txs`, 'Transactions']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="transactions" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    dot={{ r: 1 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={blockchainData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#999" tick={{ fill: '#999' }} />
                  <YAxis stroke="#999" tick={{ fill: '#999' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#333', color: '#fff' }}
                    formatter={(value: any) => [`${value} users`, 'Active Users']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#0EA5E9" 
                    strokeWidth={2}
                    dot={{ r: 1 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="latency" className="space-y-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={blockchainData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#999" tick={{ fill: '#999' }} />
                  <YAxis stroke="#999" tick={{ fill: '#999' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#333', color: '#fff' }}
                    formatter={(value: any) => [`${value} ms`, 'Block Latency']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="latency" 
                    stroke="#F97316" 
                    strokeWidth={2}
                    dot={{ r: 1 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}


import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ShieldAlert, 
  AlertTriangle, 
  AlertCircle, 
  Eye, 
  Shield, 
  Lock, 
  Search,
  Filter,
  ArrowUpRight
} from "lucide-react";

interface Threat {
  id: string;
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  source: string;
  timestamp: string;
  description: string;
  status: 'active' | 'mitigated' | 'investigating';
  impact: string;
  recommendation: string;
}

export function ThreatAnalysis() {
  const [threatFilter, setThreatFilter] = useState<string>("all");
  
  const threats: Threat[] = [
    {
      id: "T-1001",
      type: "Consensus Attack",
      severity: "critical",
      source: "External Network",
      timestamp: "2023-04-10 14:32:45",
      description: "Detected attempt to manipulate consensus mechanism through a coordinated 51% attack simulation.",
      status: "mitigated",
      impact: "Could potentially lead to transaction reversals and double-spending if successful.",
      recommendation: "Implement additional consensus validation nodes and increase confirmation thresholds."
    },
    {
      id: "T-1002",
      type: "Key Exposure",
      severity: "high",
      source: "Internal System",
      timestamp: "2023-04-10 09:14:22",
      description: "Potential private key exposure detected from node #12 in the staging environment.",
      status: "investigating",
      impact: "Could compromise transaction signing and enable unauthorized fund transfers.",
      recommendation: "Rotate all affected keys immediately and audit key management procedures."
    },
    {
      id: "T-1003",
      type: "Smart Contract Vulnerability",
      severity: "high",
      source: "Contract Audit",
      timestamp: "2023-04-09 22:45:11",
      description: "Integer overflow vulnerability detected in payment processing contract.",
      status: "active",
      impact: "Could allow attackers to execute transactions with manipulated values.",
      recommendation: "Apply SafeMath library and implement additional input validation checks."
    },
    {
      id: "T-1004",
      type: "Unusual Transaction Pattern",
      severity: "medium",
      source: "Transaction Monitor",
      timestamp: "2023-04-09 18:22:37",
      description: "Unusual high-volume transaction pattern detected from address 0x7a3b...",
      status: "investigating",
      impact: "Potential attempt to congest the network or obfuscate other transactions.",
      recommendation: "Monitor the address and implement rate limiting if pattern continues."
    },
    {
      id: "T-1005",
      type: "Network Segmentation",
      severity: "low",
      source: "Network Monitor",
      timestamp: "2023-04-08 11:32:17",
      description: "Temporary network partition detected between nodes in US-East and EU-West regions.",
      status: "mitigated",
      impact: "Could lead to temporary consensus delays and increased block propagation times.",
      recommendation: "Review network infrastructure and implement additional redundancy paths."
    }
  ];
  
  const filteredThreats = threatFilter === "all" 
    ? threats 
    : threats.filter(t => t.severity === threatFilter);
  
  const getSeverityColor = (severity: Threat['severity']) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'low': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
    }
  };
  
  const getStatusColor = (status: Threat['status']) => {
    switch (status) {
      case 'active': return 'text-red-500 bg-red-500/10';
      case 'investigating': return 'text-yellow-400 bg-yellow-400/10';
      case 'mitigated': return 'text-green-500 bg-green-500/10';
    }
  };
  
  const getStatusIcon = (status: Threat['status']) => {
    switch (status) {
      case 'active': return <AlertCircle className="h-3 w-3 mr-1" />;
      case 'investigating': return <Search className="h-3 w-3 mr-1" />;
      case 'mitigated': return <Shield className="h-3 w-3 mr-1" />;
    }
  };
  
  const threatsByCategory = {
    consensus: threats.filter(t => t.type.includes('Consensus')).length,
    contract: threats.filter(t => t.type.includes('Contract')).length,
    network: threats.filter(t => t.type.includes('Network')).length,
    key: threats.filter(t => t.type.includes('Key')).length,
    transaction: threats.filter(t => t.type.includes('Transaction')).length,
  };
  
  const totalThreats = threats.length;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card className="bg-dashboard-card border-gray-700 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center">
              <ShieldAlert className="h-5 w-5 mr-2 text-dashboard-orange" />
              Threat Summary
            </CardTitle>
            <CardDescription className="text-gray-400">
              Overall threat statistics and insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Protection Status</span>
                  <span className="text-green-500 font-medium">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Last Scan</span>
                  <span className="text-gray-300">10 minutes ago</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Threat Intelligence</span>
                  <span className="text-gray-300">Up to date</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <h4 className="text-sm font-medium text-white mb-3">Threat Categories</h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Consensus Attacks</span>
                      <span className="text-gray-300">{threatsByCategory.consensus}</span>
                    </div>
                    <Progress value={(threatsByCategory.consensus / totalThreats) * 100} className="h-1 bg-gray-700" indicatorClassName="bg-red-500" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Smart Contract Vulnerabilities</span>
                      <span className="text-gray-300">{threatsByCategory.contract}</span>
                    </div>
                    <Progress value={(threatsByCategory.contract / totalThreats) * 100} className="h-1 bg-gray-700" indicatorClassName="bg-orange-500" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Network Issues</span>
                      <span className="text-gray-300">{threatsByCategory.network}</span>
                    </div>
                    <Progress value={(threatsByCategory.network / totalThreats) * 100} className="h-1 bg-gray-700" indicatorClassName="bg-blue-500" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Key Management</span>
                      <span className="text-gray-300">{threatsByCategory.key}</span>
                    </div>
                    <Progress value={(threatsByCategory.key / totalThreats) * 100} className="h-1 bg-gray-700" indicatorClassName="bg-purple-500" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Transaction Anomalies</span>
                      <span className="text-gray-300">{threatsByCategory.transaction}</span>
                    </div>
                    <Progress value={(threatsByCategory.transaction / totalThreats) * 100} className="h-1 bg-gray-700" indicatorClassName="bg-yellow-500" />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-700">
                <h4 className="text-sm font-medium text-white mb-3">Security Metrics</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-red-500">2</div>
                    <div className="text-xs text-gray-400 mt-1">Critical/High</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-yellow-400">1</div>
                    <div className="text-xs text-gray-400 mt-1">Medium</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-400">1</div>
                    <div className="text-xs text-gray-400 mt-1">Low</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-500">2</div>
                    <div className="text-xs text-gray-400 mt-1">Mitigated</div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-dashboard-purple hover:bg-dashboard-purple/90">
                <Lock className="h-4 w-4 mr-2" />
                Run Security Scan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-2">
        <Card className="bg-dashboard-card border-gray-700 shadow-xl">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-dashboard-orange" />
                Active Threats
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-dashboard-card border-gray-600 text-gray-300">
                  {filteredThreats.length} Detected
                </Badge>
                <Button variant="outline" size="sm" className="h-8 gap-1 text-gray-300 border-gray-700 bg-gray-800">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter</span>
                </Button>
              </div>
            </div>
            <CardDescription className="text-gray-400">
              Security threats detected in your blockchain network
            </CardDescription>
            <div className="flex gap-2 mt-2">
              <Button 
                variant={threatFilter === "all" ? "default" : "outline"} 
                size="sm" 
                className={threatFilter === "all" ? "bg-dashboard-purple hover:bg-dashboard-purple/90" : "border-gray-700 text-gray-300 hover:bg-gray-800"} 
                onClick={() => setThreatFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={threatFilter === "critical" ? "default" : "outline"} 
                size="sm" 
                className={threatFilter === "critical" ? "bg-red-500 hover:bg-red-600" : "border-gray-700 text-gray-300 hover:bg-gray-800"} 
                onClick={() => setThreatFilter("critical")}
              >
                Critical
              </Button>
              <Button 
                variant={threatFilter === "high" ? "default" : "outline"} 
                size="sm" 
                className={threatFilter === "high" ? "bg-orange-500 hover:bg-orange-600" : "border-gray-700 text-gray-300 hover:bg-gray-800"} 
                onClick={() => setThreatFilter("high")}
              >
                High
              </Button>
              <Button 
                variant={threatFilter === "medium" ? "default" : "outline"} 
                size="sm" 
                className={threatFilter === "medium" ? "bg-yellow-500 hover:bg-yellow-600" : "border-gray-700 text-gray-300 hover:bg-gray-800"} 
                onClick={() => setThreatFilter("medium")}
              >
                Medium
              </Button>
              <Button 
                variant={threatFilter === "low" ? "default" : "outline"} 
                size="sm" 
                className={threatFilter === "low" ? "bg-blue-500 hover:bg-blue-600" : "border-gray-700 text-gray-300 hover:bg-gray-800"} 
                onClick={() => setThreatFilter("low")}
              >
                Low
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-2">
              {filteredThreats.map((threat) => (
                <Card key={threat.id} className="bg-gray-800 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${getSeverityColor(threat.severity)}`}>
                        {threat.severity === 'critical' ? (
                          <AlertCircle className="h-5 w-5" />
                        ) : threat.severity === 'high' ? (
                          <AlertTriangle className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium text-white">{threat.type}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className={`${getSeverityColor(threat.severity)} text-xs font-normal`}>
                                {threat.severity}
                              </Badge>
                              <Badge variant="outline" className={`${getStatusColor(threat.status)} text-xs font-normal flex items-center`}>
                                {getStatusIcon(threat.status)}
                                <span>{threat.status}</span>
                              </Badge>
                              <span className="text-xs text-gray-400">{threat.id}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <p className="text-sm text-gray-300 mt-2">{threat.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                          <div>
                            <p className="text-gray-400">Source</p>
                            <p className="text-gray-300">{threat.source}</p>
                          </div>
                          <div>
                            <p className="text-gray-400">Detected</p>
                            <p className="text-gray-300">{threat.timestamp}</p>
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-gray-700">
                          <Tabs defaultValue="impact" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 bg-gray-900">
                              <TabsTrigger value="impact">Impact</TabsTrigger>
                              <TabsTrigger value="recommendation">Recommendation</TabsTrigger>
                            </TabsList>
                            <TabsContent value="impact" className="p-2 text-sm text-gray-300 mt-2">
                              {threat.impact}
                            </TabsContent>
                            <TabsContent value="recommendation" className="p-2 text-sm text-gray-300 mt-2">
                              {threat.recommendation}
                            </TabsContent>
                          </Tabs>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

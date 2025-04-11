
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  ShieldAlert, 
  Settings, 
  Lock, 
  Key, 
  Bitcoin, 
  FileText, 
  Users, 
  Activity, 
  ArrowRightLeft
} from "lucide-react";
import { ThreatAnalysis } from "./ThreatAnalysis";
import { BlockchainMetrics } from "./BlockchainMetrics";
import { RuleEngine } from "./RuleEngine";
import { BlockchainNavbar } from "./BlockchainNavbar";

export function BlockchainDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div className="min-h-screen bg-dashboard-background p-6 overflow-auto">
      <BlockchainNavbar />
      
      <div className="max-w-7xl mx-auto mt-8">
        <div className="flex items-center mb-6">
          <Shield className="h-8 w-8 mr-3 text-dashboard-purple" />
          <div>
            <h1 className="text-2xl font-bold text-white">Blockchain Privacy & Security Center</h1>
            <p className="text-gray-400 text-sm mt-1">
              Enterprise-grade privacy infrastructure with advanced threat detection
            </p>
          </div>
        </div>
        
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-3 w-full max-w-3xl mx-auto bg-dashboard-card">
            <TabsTrigger value="overview" className="data-[state=active]:bg-dashboard-purple/20">
              <Bitcoin className="h-4 w-4 mr-2" />
              Blockchain Overview
            </TabsTrigger>
            <TabsTrigger value="threats" className="data-[state=active]:bg-dashboard-orange/20">
              <ShieldAlert className="h-4 w-4 mr-2" />
              Threat Analysis
            </TabsTrigger>
            <TabsTrigger value="rules" className="data-[state=active]:bg-dashboard-blue/20">
              <Settings className="h-4 w-4 mr-2" />
              Rule Engine
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-dashboard-card border-purple-500/20 shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center">
                    <Lock className="h-5 w-5 mr-2 text-dashboard-purple" />
                    Privacy Status
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Blockchain privacy infrastructure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-6">
                    <div className="w-24 h-24 rounded-full bg-green-500/10 border-4 border-green-500 flex items-center justify-center">
                      <span className="text-2xl font-bold text-green-500">98%</span>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Data Encryption</span>
                      <span className="text-green-500">Active</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Zero-Knowledge Proofs</span>
                      <span className="text-green-500">Enabled</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Private Transactions</span>
                      <span className="text-green-500">100%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-dashboard-card border-blue-500/20 shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center">
                    <Key className="h-5 w-5 mr-2 text-dashboard-blue" />
                    Key Management
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Cryptographic key infrastructure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-6">
                    <div className="w-24 h-24 rounded-full bg-blue-500/10 border-4 border-blue-500 flex items-center justify-center">
                      <span className="text-2xl font-bold text-blue-500">7</span>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Active Keys</span>
                      <span className="text-white">7 / 10</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Key Rotation</span>
                      <span className="text-yellow-400">3 days ago</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">HSM Integration</span>
                      <span className="text-green-500">Connected</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-dashboard-card border-orange-500/20 shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-dashboard-orange" />
                    Compliance
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Regulatory compliance status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-6">
                    <div className="w-24 h-24 rounded-full bg-orange-500/10 border-4 border-orange-500 flex items-center justify-center">
                      <span className="text-2xl font-bold text-orange-500">100%</span>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">GDPR Compliance</span>
                      <span className="text-green-500">Compliant</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Audit Logs</span>
                      <span className="text-green-500">Up to date</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Reporting</span>
                      <span className="text-green-500">Automated</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <BlockchainMetrics />
          </TabsContent>
          
          <TabsContent value="threats">
            <ThreatAnalysis />
          </TabsContent>
          
          <TabsContent value="rules">
            <RuleEngine />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

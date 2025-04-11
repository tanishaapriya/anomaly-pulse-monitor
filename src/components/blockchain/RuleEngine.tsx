
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Plus,
  Code,
  Save,
  Edit,
  Trash2,
  Play,
  Pause,
  AlertTriangle,
  Info,
  Search,
  SlidersHorizontal
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Rule {
  id: string;
  name: string;
  description: string;
  condition: string;
  action: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'inactive' | 'draft';
  lastModified: string;
  createdBy: string;
}

export function RuleEngine() {
  const [rules, setRules] = useState<Rule[]>([
    {
      id: "R001",
      name: "High Transaction Value Alert",
      description: "Triggers an alert when a transaction exceeds 10 ETH",
      condition: "transaction.value > 10",
      action: "alert('High value transaction detected', 'high')",
      category: "transaction",
      priority: "high",
      status: "active",
      lastModified: "2023-04-10",
      createdBy: "John Doe"
    },
    {
      id: "R002",
      name: "New Contract Deployment Review",
      description: "Flags new smart contract deployments for security review",
      condition: "transaction.to === null && transaction.input.length > 500",
      action: "flag('New contract deployment', 'medium'); notifyTeam('security')",
      category: "smart-contract",
      priority: "medium",
      status: "active",
      lastModified: "2023-04-09",
      createdBy: "Alice Smith"
    },
    {
      id: "R003",
      name: "Suspicious Address Filter",
      description: "Blocks transactions from known suspicious addresses",
      condition: "suspiciousAddresses.includes(transaction.from)",
      action: "blockTransaction(); logSecurity('Blocked suspicious transaction')",
      category: "security",
      priority: "high",
      status: "active",
      lastModified: "2023-04-08",
      createdBy: "Bob Johnson"
    },
    {
      id: "R004",
      name: "Gas Price Optimization",
      description: "Adjusts gas price based on network congestion",
      condition: "network.congestion > 80",
      action: "adjustGasPrice(1.5); notifyUser('Gas price adjusted due to network congestion')",
      category: "optimization",
      priority: "low",
      status: "inactive",
      lastModified: "2023-04-07",
      createdBy: "Alice Smith"
    },
    {
      id: "R005",
      name: "Transaction Rate Limiting",
      description: "Limits transactions per minute from a single address",
      condition: "getTransactionCount(address, '10m') > 20",
      action: "rateLimit(address, '10m', 20); notifyUser('Rate limit applied')",
      category: "security",
      priority: "medium",
      status: "draft",
      lastModified: "2023-04-06",
      createdBy: "John Doe"
    }
  ]);
  
  const [filter, setFilter] = useState<string>("all");
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  const filteredRules = filter === "all" 
    ? rules 
    : rules.filter(rule => rule.category === filter || rule.status === filter || rule.priority === filter);
  
  const getPriorityColor = (priority: Rule['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'low': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
    }
  };
  
  const getStatusColor = (status: Rule['status']) => {
    switch (status) {
      case 'active': return 'text-green-500 bg-green-500/10 border-green-500/30';
      case 'inactive': return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
      case 'draft': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
    }
  };
  
  const handleRuleToggle = (id: string) => {
    setRules(rules.map(rule => {
      if (rule.id === id) {
        const newStatus = rule.status === 'active' ? 'inactive' : 'active';
        return { ...rule, status: newStatus };
      }
      return rule;
    }));
  };
  
  const selectRule = (rule: Rule) => {
    setSelectedRule(rule);
    setIsEditing(false);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card className="bg-dashboard-card border-gray-700 shadow-xl h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center">
              <Settings className="h-5 w-5 mr-2 text-dashboard-blue" />
              Rule Engine
            </CardTitle>
            <CardDescription className="text-gray-400">
              Define and manage custom security rules
            </CardDescription>
            <div className="flex items-center mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Search rules..." 
                  className="pl-9 h-9 bg-gray-800 border-gray-700 text-gray-300 focus:border-dashboard-blue focus:ring-dashboard-blue"
                />
              </div>
              <Button size="sm" className="ml-2 bg-dashboard-blue hover:bg-dashboard-blue/90">
                <Plus className="h-4 w-4 mr-1" />
                New
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <Button 
                variant={filter === "all" ? "default" : "outline"} 
                size="sm" 
                className={filter === "all" ? "bg-dashboard-blue hover:bg-dashboard-blue/90" : "border-gray-700 text-gray-300"} 
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={filter === "security" ? "default" : "outline"} 
                size="sm" 
                className={filter === "security" ? "bg-dashboard-purple hover:bg-dashboard-purple/90" : "border-gray-700 text-gray-300"} 
                onClick={() => setFilter("security")}
              >
                Security
              </Button>
              <Button 
                variant={filter === "transaction" ? "default" : "outline"} 
                size="sm" 
                className={filter === "transaction" ? "bg-dashboard-orange hover:bg-dashboard-orange/90" : "border-gray-700 text-gray-300"} 
                onClick={() => setFilter("transaction")}
              >
                Transaction
              </Button>
              <Button 
                variant={filter === "active" ? "default" : "outline"} 
                size="sm" 
                className={filter === "active" ? "bg-green-500 hover:bg-green-600" : "border-gray-700 text-gray-300"} 
                onClick={() => setFilter("active")}
              >
                Active
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-2">
                {filteredRules.map((rule) => (
                  <div 
                    key={rule.id}
                    onClick={() => selectRule(rule)}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedRule?.id === rule.id 
                        ? 'bg-dashboard-blue/10 border-dashboard-blue/50' 
                        : 'bg-gray-800 border-gray-700 hover:bg-gray-800/70'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-white">{rule.name}</h3>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{rule.description}</p>
                      </div>
                      <Switch 
                        checked={rule.status === 'active'} 
                        onCheckedChange={() => handleRuleToggle(rule.id)}
                        className="data-[state=checked]:bg-dashboard-blue"
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className={getPriorityColor(rule.priority)}>
                        {rule.priority}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(rule.status)}>
                        {rule.status}
                      </Badge>
                      <Badge variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600">
                        {rule.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      
      <div className="lg:col-span-2">
        {selectedRule ? (
          <Card className="bg-dashboard-card border-gray-700 shadow-xl">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white flex items-center">
                    <Code className="h-5 w-5 mr-2 text-dashboard-purple" />
                    {isEditing ? "Edit Rule" : "Rule Details"}
                  </CardTitle>
                  <CardDescription className="text-gray-400 mt-1">
                    ID: {selectedRule.id} • Created by {selectedRule.createdBy} • Last modified: {selectedRule.lastModified}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" size="sm" className="border-gray-700 text-gray-300" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button size="sm" className="bg-dashboard-blue hover:bg-dashboard-blue/90">
                        <Save className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                      <Button size="sm" className="bg-dashboard-purple hover:bg-dashboard-purple/90" onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Rule Name</Label>
                    <Input 
                      id="name" 
                      defaultValue={selectedRule.name} 
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-300">Description</Label>
                    <Input 
                      id="description" 
                      defaultValue={selectedRule.description} 
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-gray-300">Category</Label>
                      <Select defaultValue={selectedRule.category}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="security">Security</SelectItem>
                          <SelectItem value="transaction">Transaction</SelectItem>
                          <SelectItem value="smart-contract">Smart Contract</SelectItem>
                          <SelectItem value="optimization">Optimization</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="priority" className="text-gray-300">Priority</Label>
                      <Select defaultValue={selectedRule.priority}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-gray-300">Status</Label>
                      <Select defaultValue={selectedRule.status}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="condition" className="text-gray-300">Condition</Label>
                    <div className="relative">
                      <div className="absolute top-0 left-0 p-3 text-gray-400">if (</div>
                      <Input 
                        id="condition" 
                        defaultValue={selectedRule.condition} 
                        className="bg-gray-800 border-gray-700 text-white pl-10 font-mono"
                      />
                      <div className="absolute top-0 right-0 p-3 text-gray-400">)</div>
                    </div>
                    <p className="text-xs text-gray-400">
                      <Info className="h-3 w-3 inline mr-1" />
                      JavaScript condition that determines when the rule should be triggered
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="action" className="text-gray-300">Action</Label>
                    <Input 
                      id="action" 
                      defaultValue={selectedRule.action} 
                      className="bg-gray-800 border-gray-700 text-white font-mono"
                    />
                    <p className="text-xs text-gray-400">
                      <Info className="h-3 w-3 inline mr-1" />
                      JavaScript code that executes when the condition is met
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm text-gray-400 mb-1">Name</h3>
                        <p className="text-white">{selectedRule.name}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm text-gray-400 mb-1">Description</h3>
                        <p className="text-white">{selectedRule.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div>
                          <h3 className="text-sm text-gray-400 mb-1">Category</h3>
                          <Badge variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600">
                            {selectedRule.category}
                          </Badge>
                        </div>
                        
                        <div>
                          <h3 className="text-sm text-gray-400 mb-1">Priority</h3>
                          <Badge variant="outline" className={getPriorityColor(selectedRule.priority)}>
                            {selectedRule.priority}
                          </Badge>
                        </div>
                        
                        <div>
                          <h3 className="text-sm text-gray-400 mb-1">Status</h3>
                          <Badge variant="outline" className={getStatusColor(selectedRule.status)}>
                            {selectedRule.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm text-white font-medium">Rule Definition</h3>
                    
                    <Card className="bg-gray-800 border-gray-700">
                      <Tabs defaultValue="condition">
                        <TabsList className="bg-gray-900 border-b border-gray-700">
                          <TabsTrigger value="condition">Condition</TabsTrigger>
                          <TabsTrigger value="action">Action</TabsTrigger>
                        </TabsList>
                        <TabsContent value="condition" className="p-4">
                          <div className="bg-gray-900 rounded p-3 font-mono text-sm">
                            <span className="text-blue-400">if</span> <span className="text-gray-400">(</span>
                            <span className="text-green-300">{selectedRule.condition}</span>
                            <span className="text-gray-400">)</span> <span className="text-gray-400">{'{'}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-2">
                            <Info className="h-3 w-3 inline mr-1" />
                            This condition is evaluated for each transaction or event
                          </p>
                        </TabsContent>
                        <TabsContent value="action" className="p-4">
                          <div className="bg-gray-900 rounded p-3 font-mono text-sm">
                            <span className="text-yellow-300">{selectedRule.action}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-2">
                            <Info className="h-3 w-3 inline mr-1" />
                            This code executes when the condition evaluates to true
                          </p>
                        </TabsContent>
                      </Tabs>
                    </Card>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm text-white font-medium">Execution History</h3>
                    <Table>
                      <TableHeader className="bg-gray-800">
                        <TableRow className="border-gray-700">
                          <TableHead className="text-gray-400">Time</TableHead>
                          <TableHead className="text-gray-400">Trigger</TableHead>
                          <TableHead className="text-gray-400">Result</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="border-gray-700 hover:bg-gray-800/50">
                          <TableCell className="text-gray-300 text-sm">2023-04-10 15:32:18</TableCell>
                          <TableCell className="text-gray-300 text-sm">Transaction 0x7a3b...</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-gray-700 hover:bg-gray-800/50">
                          <TableCell className="text-gray-300 text-sm">2023-04-10 12:18:45</TableCell>
                          <TableCell className="text-gray-300 text-sm">Transaction 0x9c2f...</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500 hover:bg-green-600">Success</Badge>
                          </TableCell>
                        </TableRow>
                        <TableRow className="border-gray-700 hover:bg-gray-800/50">
                          <TableCell className="text-gray-300 text-sm">2023-04-09 22:05:11</TableCell>
                          <TableCell className="text-gray-300 text-sm">Transaction 0x3e8d...</TableCell>
                          <TableCell>
                            <Badge className="bg-red-500 hover:bg-red-600">Failed</Badge>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between pt-2 border-t border-gray-700">
              <div className="flex items-center text-xs text-gray-400">
                <SlidersHorizontal className="h-3 w-3 mr-1" />
                <span>Execution mode: Automatic</span>
              </div>
              
              {!isEditing && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                    <Play className="h-4 w-4 mr-1" />
                    Test Rule
                  </Button>
                  {selectedRule.status === 'active' ? (
                    <Button variant="outline" size="sm" className="border-gray-700 text-yellow-400">
                      <Pause className="h-4 w-4 mr-1" />
                      Pause
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="border-gray-700 text-green-500">
                      <Play className="h-4 w-4 mr-1" />
                      Activate
                    </Button>
                  )}
                </div>
              )}
            </CardFooter>
          </Card>
        ) : (
          <Card className="bg-dashboard-card border-gray-700 shadow-xl h-full">
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <div className="bg-gray-800 rounded-full p-4 inline-flex mx-auto mb-4">
                  <Settings className="h-10 w-10 text-dashboard-blue" />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">Rule Engine Configuration</h3>
                <p className="text-gray-400 mb-6 max-w-md">
                  Create and manage custom security rules to monitor your blockchain infrastructure and automate security responses.
                </p>
                <Button className="bg-dashboard-blue hover:bg-dashboard-blue/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Rule
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

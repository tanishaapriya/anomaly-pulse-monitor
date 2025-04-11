
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BarChart4, 
  Shield, 
  Settings, 
  Bell, 
  User,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function BlockchainNavbar() {
  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex items-center">
        <Shield className="h-8 w-8 text-dashboard-purple mr-2" />
        <span className="text-xl font-bold text-white mr-10">SecureBlock</span>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="flex items-center text-gray-300 hover:text-white">
            <BarChart4 className="h-5 w-5 mr-2" />
            <span>API Dashboard</span>
          </Link>
          <Link to="/blockchain-privacy" className="flex items-center text-dashboard-purple hover:text-white">
            <Shield className="h-5 w-5 mr-2" />
            <span>Privacy Center</span>
          </Link>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" className="text-gray-300 border-gray-700 hover:bg-gray-800">
          <Bell className="h-4 w-4" />
        </Button>
        
        <Button variant="outline" size="icon" className="text-gray-300 border-gray-700 hover:bg-gray-800">
          <Settings className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-800">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-xs">
                <span className="text-white">John Doe</span>
                <span className="text-gray-400">Admin</span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2 bg-dashboard-card border-gray-700">
            <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:text-white focus:text-white">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="text-red-400 hover:text-red-300 focus:text-red-300">
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

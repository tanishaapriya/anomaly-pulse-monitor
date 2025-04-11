
import { IssueDetails as IssueDetailsType } from "@/services/apiMonitorService";
import { AlertTriangleIcon, WrenchIcon, PieChartIcon } from "lucide-react";

interface IssueDetailsProps {
  issues: IssueDetailsType[];
  metricName: string;
}

export function IssueDetails({ issues, metricName }: IssueDetailsProps) {
  if (!issues || issues.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-3 space-y-2">
      <h4 className="text-sm font-medium text-gray-300 flex items-center">
        <AlertTriangleIcon className="h-4 w-4 mr-1 text-dashboard-orange" />
        Detected Issues
      </h4>
      <div className="space-y-2">
        {issues.map((issue, index) => (
          <div key={index} className="bg-gray-800 bg-opacity-50 rounded-md p-2 border border-gray-700">
            <div className="flex justify-between items-center">
              <div className="font-medium text-xs text-dashboard-purple">{issue.type}</div>
              <div className="flex items-center text-xs text-gray-400">
                <PieChartIcon size={12} className="mr-1" />
                {issue.confidence ? `${(issue.confidence * 100).toFixed(0)}% confidence` : 'No confidence data'}
              </div>
            </div>
            <p className="text-xs text-gray-300 mt-1">{issue.description}</p>
            {issue.solution && (
              <div className="flex items-start mt-2 text-xs text-gray-400">
                <WrenchIcon size={12} className="mr-1 mt-0.5 shrink-0 text-dashboard-orange" />
                <span>{issue.solution}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

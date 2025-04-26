
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Incident } from "../types/incident";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

const severityColors = {
  Low: "bg-green-100 text-green-800",
  Medium: "bg-orange-100 text-orange-800",
  High: "bg-red-100 text-red-800"
};

interface IncidentCardProps {
  incident: Incident;
}

export const IncidentCard = ({ incident }: IncidentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="mb-4 transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <span className={`px-2 py-1 rounded-full text-sm font-medium ${severityColors[incident.severity]}`}>
              {incident.severity}
            </span>
            <h3 className="text-lg font-semibold">{incident.title}</h3>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Reported: {format(new Date(incident.reported_at), "MMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-2"
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>
      {isExpanded && (
        <CardContent className="p-4 pt-0">
          <p className="text-gray-700">{incident.description}</p>
        </CardContent>
      )}
    </Card>
  );
};

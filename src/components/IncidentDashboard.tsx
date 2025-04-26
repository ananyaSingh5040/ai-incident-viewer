
import { useState } from "react";
import { mockIncidents } from "../data/mockIncidents";
import { Incident, Severity } from "../types/incident";
import { IncidentCard } from "./IncidentCard";
import { NewIncidentForm } from "./NewIncidentForm";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export const IncidentDashboard = () => {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [severityFilter, setSeverityFilter] = useState<"All" | Severity>("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const handleNewIncident = (incidentData: Omit<Incident, "id" | "reported_at">) => {
    const newIncident: Incident = {
      ...incidentData,
      id: Math.max(...incidents.map(i => i.id)) + 1,
      reported_at: new Date().toISOString()
    };
    setIncidents([newIncident, ...incidents]);
  };

  const filteredAndSortedIncidents = incidents
    .filter(incident => severityFilter === "All" || incident.severity === severityFilter)
    .sort((a, b) => {
      const dateA = new Date(a.reported_at).getTime();
      const dateB = new Date(b.reported_at).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">AI Safety Incident Dashboard</h1>
      
      <NewIncidentForm onSubmit={handleNewIncident} />

      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Filter by Severity</label>
            <Select value={severityFilter} onValueChange={(value: typeof severityFilter) => setSeverityFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Severities</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Sort by Date</label>
            <div className="flex gap-2">
              <Button
                variant={sortOrder === "newest" ? "default" : "outline"}
                onClick={() => setSortOrder("newest")}
                className="flex-1"
              >
                Newest First
              </Button>
              <Button
                variant={sortOrder === "oldest" ? "default" : "outline"}
                onClick={() => setSortOrder("oldest")}
                className="flex-1"
              >
                Oldest First
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {filteredAndSortedIncidents.map(incident => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
      </div>
    </div>
  );
};

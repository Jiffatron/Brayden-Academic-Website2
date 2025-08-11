import { Link } from "react-router-dom";
import { getConnectedEntries, getPreviousEntry, getNextEntry, getTimelineEntry } from "@/lib/timeline";

interface TimelineNavigationProps {
  projectId: string;
}

export default function TimelineNavigation({ projectId }: TimelineNavigationProps) {
  // Map project route IDs to timeline IDs
  const routeToTimelineId: Record<string, string> = {
    "market-microstructure": "market-microstructure-model",
    "bond-dashboard": "public-market-dashboard",
    "risk-engine": "risk-modeling-engine",
    "mandelbrot-excel": "mandelbrot-excel",
    "boeing": "equity-research-boeing"
  };

  const timelineId = routeToTimelineId[projectId];
  if (!timelineId) return null;

  const connectedEntries = getConnectedEntries(timelineId);
  const previousEntry = getPreviousEntry(timelineId);
  const nextEntry = getNextEntry(timelineId);

  return (
    <div className="mt-12 pt-8 border-t border-border space-y-8">
      {/* How this connects */}
      {connectedEntries.length > 0 && (
        <div>
          <h3 className="text-xl font-medium mb-3">How this connects</h3>
          <div className="space-y-2">
            {connectedEntries.map((entry) => (
              <p key={entry.id} className="text-muted-foreground">
                This project connects to{" "}
                <Link 
                  to={entry.href} 
                  className="text-primary hover:underline font-medium"
                >
                  {entry.title}
                </Link>
                {entry.description !== `Add your description here for the ${entry.title.toLowerCase()}.` && 
                 entry.description !== `Add your description here for the ${entry.title.toLowerCase()} project.` && 
                 entry.description !== `Add your description here for the ${entry.title.toLowerCase()} research.` && (
                  <span> - {entry.description}</span>
                )}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Timeline Navigation */}
      {(previousEntry || nextEntry) && (
        <div>
          <h3 className="text-xl font-medium mb-4">Timeline Navigation</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            {previousEntry ? (
              <Link
                to={previousEntry.href}
                className="flex-1 p-4 bg-card border border-border rounded-lg hover:border-primary/40 transition-colors group"
              >
                <div className="text-sm text-muted-foreground mb-1">← Previous</div>
                <div className="font-medium group-hover:text-primary transition-colors">
                  {previousEntry.title}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {previousEntry.date}
                </div>
              </Link>
            ) : (
              <div className="flex-1"></div>
            )}

            {nextEntry ? (
              <Link
                to={nextEntry.href}
                className="flex-1 p-4 bg-card border border-border rounded-lg hover:border-primary/40 transition-colors group text-right"
              >
                <div className="text-sm text-muted-foreground mb-1">Next →</div>
                <div className="font-medium group-hover:text-primary transition-colors">
                  {nextEntry.title}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {nextEntry.date}
                </div>
              </Link>
            ) : (
              <div className="flex-1"></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

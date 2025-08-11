import { Link } from "react-router-dom";
import { timelineEntries } from "@/lib/timeline";

export default function ProjectTimeline() {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">
          Project Timeline
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A chronological journey through my projects and research, showing how each builds upon the last.
        </p>
      </div>

      {/* Horizontal scrolling timeline for all screen sizes */}
      <div className="relative">
        {/* Timeline line - positioned behind cards */}
        <div className="absolute top-4 left-8 right-8 h-0.5 bg-border -z-10 hidden md:block"></div>

        <div
          className="w-full overflow-x-auto scroll-smooth timeline-scrollbar"
          style={{ scrollSnapType: 'x mandatory', scrollPadding: '0 2rem' }}
        >
          <div className="flex gap-8 pb-4 px-4 min-w-max">
            {timelineEntries.map((entry, index) => (
              <div key={entry.id} className="flex flex-col items-center group" style={{ scrollSnapAlign: 'start' }}>
                {/* Timeline dot */}
                <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg mb-6 group-hover:scale-110 transition-transform duration-200 z-20 relative"></div>

                {/* Timeline card */}
                <Link
                  to={entry.href}
                  className="bg-card border border-border rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:border-primary/40 cursor-pointer group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:z-10 relative w-72 md:w-80 lg:w-84 min-h-[280px] flex flex-col"
                  aria-label={`Open ${entry.title} project`}
                  role="link"
                >
                  <div className="text-sm text-muted-foreground mb-2">
                    {entry.date}
                  </div>
                  <h3 className="font-semibold text-base mb-3 line-clamp-2 leading-tight">
                    {entry.title}
                  </h3>
                  {entry.contextLine && (
                    <p className="text-sm text-primary/80 mb-4 italic">
                      {entry.contextLine}
                    </p>
                  )}
                  {entry.description && !entry.description.startsWith("Add your description here") && (
                    <p className="text-sm text-muted-foreground line-clamp-3 group-hover:line-clamp-none transition-all duration-300 flex-grow">
                      {entry.description}
                    </p>
                  )}

                  {/* View project link - appears on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-4 pt-3 border-t border-border">
                    <span className="text-sm text-primary font-medium">
                      View project →
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>



    </section>
  );
}

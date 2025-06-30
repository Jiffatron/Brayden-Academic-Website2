interface LastUpdatedProps {
  date?: string;
  className?: string;
}

const LastUpdated = ({ date = "6/29/25", className = "" }: LastUpdatedProps) => {
  return (
    <div className={`flex items-center text-sm text-muted-foreground ${className}`}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="mr-1"
      >
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12,6 12,12 16,14"/>
      </svg>
      Last updated {date}
    </div>
  );
};

export default LastUpdated;

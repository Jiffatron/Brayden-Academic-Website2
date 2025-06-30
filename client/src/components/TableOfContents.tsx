import { useState, useEffect } from 'react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  sections: TocItem[];
  className?: string;
}

const TableOfContents = ({ sections, className = "" }: TableOfContentsProps) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for navbar

      // Find the current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active section
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  if (sections.length === 0) {
    return null; // Don't render if no sections
  }

  return (
    <div className={`hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 w-64 z-30 ${className}`}>
      <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg">
        <h3 className="text-sm font-semibold text-foreground mb-3 border-b border-border pb-2">
          Table of Contents
        </h3>
        <nav className="space-y-1 max-h-96 overflow-y-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`block w-full text-left text-sm py-2 px-2 rounded transition-colors ${
                activeSection === section.id
                  ? 'text-primary bg-primary/10 font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              } ${section.level > 1 ? 'ml-4' : ''}`}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TableOfContents;

import { useEffect, useRef, useState } from 'react';

interface GiscusCommentsProps {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping?: string;
  strict?: string;
  reactionsEnabled?: string;
  emitMetadata?: string;
  inputPosition?: 'top' | 'bottom';
  theme?: string;
  lang?: string;
  loading?: 'lazy' | 'eager';
}

/**
 * Giscus Comments Component for GitHub Discussions integration
 * Properly handles React lifecycle and theme changes
 */
const GiscusComments: React.FC<GiscusCommentsProps> = ({
  repo,
  repoId,
  category,
  categoryId,
  mapping = 'pathname',
  strict = '0',
  reactionsEnabled = '1',
  emitMetadata = '0',
  inputPosition = 'bottom',
  theme = 'preferred_color_scheme',
  lang = 'en',
  loading = 'lazy'
}) => {
  const commentsRef = useRef<HTMLDivElement>(null);
  const [currentTheme, setCurrentTheme] = useState(theme);

  // Listen for theme changes
  useEffect(() => {
    const handleThemeChange = () => {
      const isDark = document.documentElement.classList.contains('dark');
      const newTheme = theme === 'preferred_color_scheme'
        ? (isDark ? 'dark' : 'light')
        : theme;

      if (newTheme !== currentTheme) {
        setCurrentTheme(newTheme);
      }
    };

    // Initial theme detection
    handleThemeChange();

    // Watch for theme changes
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [theme, currentTheme]);

  useEffect(() => {
    // Clear any existing Giscus content
    if (commentsRef.current) {
      commentsRef.current.innerHTML = '';
    }

    // Create and configure the script element
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', mapping);
    script.setAttribute('data-strict', strict);
    script.setAttribute('data-reactions-enabled', reactionsEnabled);
    script.setAttribute('data-emit-metadata', emitMetadata);
    script.setAttribute('data-input-position', inputPosition);
    script.setAttribute('data-theme', currentTheme);
    script.setAttribute('data-lang', lang);
    script.setAttribute('data-loading', loading);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    // Append script to the comments container
    if (commentsRef.current) {
      commentsRef.current.appendChild(script);
    }

    // Cleanup function
    return () => {
      if (commentsRef.current) {
        commentsRef.current.innerHTML = '';
      }
    };
  }, [repo, repoId, category, categoryId, mapping, strict, reactionsEnabled, emitMetadata, inputPosition, currentTheme, lang, loading]);

  return (
    <div className="giscus-comments mt-8 pt-8 border-t border-border">
      <h3 className="text-xl font-semibold mb-4 text-foreground">Comments & Discussion</h3>
      <div 
        ref={commentsRef}
        className="giscus-container"
        style={{ minHeight: '200px' }}
      />
    </div>
  );
};

export default GiscusComments;

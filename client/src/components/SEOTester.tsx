import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO Testing Component - Development tool to verify SEO implementation
 * Remove this component in production or hide behind a dev flag
 */
const SEOTester: React.FC = () => {
  const location = useLocation();
  const [seoData, setSeoData] = useState<any>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (import.meta.env.DEV) {
      // Extract current SEO data from document
      const extractSEOData = () => {
        const data = {
          title: document.title,
          description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
          canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
          ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
          ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
          ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content'),
          ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute('content'),
          twitterCard: document.querySelector('meta[name="twitter:card"]')?.getAttribute('content'),
          twitterTitle: document.querySelector('meta[name="twitter:title"]')?.getAttribute('content'),
          favicon: document.querySelector('link[rel="icon"]')?.getAttribute('href'),
          manifest: document.querySelector('link[rel="manifest"]')?.getAttribute('href'),
          structuredData: Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map(
            script => {
              try {
                return JSON.parse(script.textContent || '');
              } catch {
                return null;
              }
            }
          ).filter(Boolean)
        };
        setSeoData(data);
      };

      // Extract data after a short delay to ensure react-helmet has updated
      setTimeout(extractSEOData, 100);
    }
  }, [location.pathname]);

  if (!import.meta.env.DEV) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-sm"
      >
        SEO Debug
      </button>
      
      {isVisible && (
        <div className="absolute bottom-12 right-0 w-96 max-h-96 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-xl p-4 text-xs">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-sm">SEO Debug Info</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2">
            <div>
              <strong>Route:</strong> {location.pathname}
            </div>
            
            <div>
              <strong>Title:</strong> {seoData.title || 'Missing'}
            </div>
            
            <div>
              <strong>Description:</strong> 
              <div className="text-gray-600 dark:text-gray-400 mt-1">
                {seoData.description || 'Missing'}
              </div>
            </div>
            
            <div>
              <strong>Canonical:</strong> {seoData.canonical || 'Missing'}
            </div>
            
            <div>
              <strong>OG Title:</strong> {seoData.ogTitle || 'Missing'}
            </div>
            
            <div>
              <strong>OG Image:</strong> {seoData.ogImage || 'Missing'}
            </div>
            
            <div>
              <strong>Twitter Card:</strong> {seoData.twitterCard || 'Missing'}
            </div>
            
            <div>
              <strong>Favicon:</strong> {seoData.favicon || 'Missing'}
            </div>
            
            <div>
              <strong>Manifest:</strong> {seoData.manifest || 'Missing'}
            </div>
            
            <div>
              <strong>Structured Data:</strong> {seoData.structuredData?.length || 0} schemas
            </div>
            
            <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
              <strong>Quick Tests:</strong>
              <div className="mt-1 space-y-1">
                <a 
                  href={`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline"
                >
                  🔗 Facebook Debugger
                </a>
                <a 
                  href={`https://cards-dev.twitter.com/validator`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline"
                >
                  🔗 Twitter Card Validator
                </a>
                <a 
                  href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline"
                >
                  🔗 Rich Results Test
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SEOTester;

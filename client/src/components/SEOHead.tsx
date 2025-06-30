import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

/**
 * Comprehensive SEO Head component for optimal search engine and social media optimization
 * Includes Open Graph, Twitter Cards, and structured data
 */
const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Brayden Swavey - Financial Analyst & Developer Portfolio",
  description = "Financial analyst and developer specializing in Monte Carlo simulations, bond tracking, equity research, and data-driven investment tools. Explore my projects in Python, Excel modeling, and financial analysis.",
  keywords = "Brayden Swavey, financial analyst, developer, Monte Carlo simulation, bond tracking, equity research, Python, financial modeling, portfolio, investment analysis",
  image = "https://braydenswavey.com/brayden-profile.jpg",
  url = "https://braydenswavey.com",
  type = "website",
  author = "Brayden Swavey",
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) => {
  // Construct full URL if relative path provided
  const fullUrl = url.startsWith('http') ? url : `https://braydenswavey.com${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `https://braydenswavey.com${image}`;
  
  // Combine default and custom keywords
  const allKeywords = [
    ...keywords.split(',').map(k => k.trim()),
    ...tags
  ].filter(Boolean).join(', ');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${author} - Professional headshot`} />
      <meta property="og:site_name" content="Brayden Swavey Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article-specific Open Graph tags */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={`${author} - Professional headshot`} />
      <meta name="twitter:creator" content="@braydenswavey" />
      <meta name="twitter:site" content="@braydenswavey" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Favicon Links */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Structured Data - JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Brayden Swavey",
          "url": "https://braydenswavey.com",
          "image": fullImageUrl,
          "sameAs": [
            "https://linkedin.com/in/braydenswavey",
            "https://github.com/jiffatron"
          ],
          "jobTitle": "Financial Analyst & Developer",
          "worksFor": {
            "@type": "Organization",
            "name": "Independent"
          },
          "knowsAbout": [
            "Financial Analysis",
            "Monte Carlo Simulation",
            "Bond Analysis",
            "Equity Research",
            "Python Programming",
            "Financial Modeling",
            "Data Analysis"
          ],
          "description": description,
          "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "University"
          }
        })}
      </script>
      
      {/* Website Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Brayden Swavey Portfolio",
          "url": "https://braydenswavey.com",
          "description": description,
          "author": {
            "@type": "Person",
            "name": "Brayden Swavey"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://braydenswavey.com/?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;

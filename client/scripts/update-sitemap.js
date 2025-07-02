/**
 * Dynamic Sitemap Generator for Brayden Swavey Portfolio
 * 
 * This script automatically updates the sitemap.xml with current projects and blog posts
 * Run with: node scripts/update-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import project data (you'll need to adjust this path based on your setup)
// For now, we'll define the projects manually, but you can import from your data file

const staticRoutes = [
  {
    url: 'https://braydenswavey.com/',
    priority: '1.0',
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: 'https://braydenswavey.com/projects',
    priority: '0.9',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: 'https://braydenswavey.com/blog',
    priority: '0.9',
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: 'https://braydenswavey.com/contact',
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  }
];

// Project routes (add these as you create individual project pages)
const projectRoutes = [
  {
    url: 'https://braydenswavey.com/projects/PythonMonteCarloBasic',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: 'https://braydenswavey.com/projects/BondTracker',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: 'https://braydenswavey.com/projects/mandelbrot-excel',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: 'https://braydenswavey.com/projects/boeing',
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  }
];

// Blog routes (add these as you create blog posts)
const blogRoutes = [
  // Example blog posts - add real ones as you create them
  // {
  //   url: 'https://braydenswavey.com/blog/monte-carlo-explained',
  //   priority: '0.7',
  //   changefreq: 'yearly',
  //   lastmod: '2024-01-15'
  // }
];

function generateSitemap() {
  const allRoutes = [...staticRoutes, ...projectRoutes, ...blogRoutes];
  
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${route.url}</loc>
    <priority>${route.priority}</priority>
    <changefreq>${route.changefreq}</changefreq>
    <lastmod>${route.lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapContent);
  
  console.log('✅ Sitemap updated successfully!');
  console.log(`📄 Generated ${allRoutes.length} URLs:`);
  allRoutes.forEach(route => {
    console.log(`   - ${route.url} (${route.priority})`);
  });
}

// Function to add a new blog post to sitemap
function addBlogPost(slug, publishDate = new Date().toISOString().split('T')[0]) {
  const newRoute = {
    url: `https://braydenswavey.com/blog/${slug}`,
    priority: '0.7',
    changefreq: 'yearly',
    lastmod: publishDate
  };

  blogRoutes.push(newRoute);
  generateSitemap();
  console.log(`✅ Added blog post: ${slug}`);
}

// Function to add a new project to sitemap
function addProject(projectId, lastModified = new Date().toISOString().split('T')[0]) {
  const newRoute = {
    url: `https://braydenswavey.com/projects/${projectId}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: lastModified
  };

  projectRoutes.push(newRoute);
  generateSitemap();
  console.log(`✅ Added project: ${projectId}`);
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}

export { generateSitemap, addBlogPost, addProject };

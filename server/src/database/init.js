const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../data/portfolio.db');

// Create database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('📁 Connected to SQLite database');
  }
});

// Initialize database tables
const initDatabase = () => {
  // Analytics table for view counts
  db.run(`
    CREATE TABLE IF NOT EXISTS analytics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id TEXT NOT NULL,
      view_count INTEGER DEFAULT 0,
      unique_visitors INTEGER DEFAULT 0,
      last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating analytics table:', err.message);
    } else {
      console.log('✅ Analytics table ready');
    }
  });

  // Reactions table for article reactions
  db.run(`
    CREATE TABLE IF NOT EXISTS reactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id TEXT NOT NULL,
      reaction_type TEXT NOT NULL,
      count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating reactions table:', err.message);
    } else {
      console.log('✅ Reactions table ready');
    }
  });

  // Page views table for detailed analytics
  db.run(`
    CREATE TABLE IF NOT EXISTS page_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id TEXT NOT NULL,
      ip_hash TEXT,
      user_agent TEXT,
      referrer TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating page_views table:', err.message);
    } else {
      console.log('✅ Page views table ready');
    }
  });

  // Initialize default data
  initializeDefaultData();
};

// Initialize default analytics data
const initializeDefaultData = () => {
  const defaultProjects = [
    { project_id: 'monte-carlo', view_count: 58, unique_visitors: 42 },
    { project_id: 'BondTracker', view_count: 23, unique_visitors: 18 }
  ];

  defaultProjects.forEach(project => {
    db.run(`
      INSERT OR IGNORE INTO analytics (project_id, view_count, unique_visitors)
      VALUES (?, ?, ?)
    `, [project.project_id, project.view_count, project.unique_visitors]);
  });

  // Initialize default reactions
  const defaultReactions = [
    { project_id: 'monte-carlo', reaction_type: 'like', count: 12 },
    { project_id: 'monte-carlo', reaction_type: 'helpful', count: 8 },
    { project_id: 'monte-carlo', reaction_type: 'insightful', count: 5 },
    { project_id: 'BondTracker', reaction_type: 'like', count: 6 },
    { project_id: 'BondTracker', reaction_type: 'helpful', count: 4 }
  ];

  defaultReactions.forEach(reaction => {
    db.run(`
      INSERT OR IGNORE INTO reactions (project_id, reaction_type, count)
      VALUES (?, ?, ?)
    `, [reaction.project_id, reaction.reaction_type, reaction.count]);
  });
};

// Initialize database on startup
initDatabase();

module.exports = db;

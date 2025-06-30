const express = require('express');
const crypto = require('crypto');
const db = require('../database/init');

const router = express.Router();

// Get view count for a specific project
router.get('/views/:projectId', (req, res) => {
  const { projectId } = req.params;
  
  db.get(
    'SELECT view_count, unique_visitors FROM analytics WHERE project_id = ?',
    [projectId],
    (err, row) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      if (!row) {
        // Return default values if project not found
        return res.json({ view_count: 0, unique_visitors: 0 });
      }
      
      res.json({
        project_id: projectId,
        view_count: row.view_count,
        unique_visitors: row.unique_visitors
      });
    }
  );
});

// Record a page view
router.post('/views/:projectId', (req, res) => {
  const { projectId } = req.params;
  const userAgent = req.get('User-Agent') || '';
  const referrer = req.get('Referer') || '';
  const clientIP = req.ip || req.connection.remoteAddress;
  
  // Create a hash of IP for privacy
  const ipHash = crypto.createHash('sha256').update(clientIP).digest('hex');
  
  // Record the page view
  db.run(
    'INSERT INTO page_views (project_id, ip_hash, user_agent, referrer) VALUES (?, ?, ?, ?)',
    [projectId, ipHash, userAgent, referrer],
    function(err) {
      if (err) {
        console.error('Error recording page view:', err);
        return res.status(500).json({ error: 'Failed to record view' });
      }
      
      // Update analytics count
      updateAnalytics(projectId, ipHash, (updateErr, newCount) => {
        if (updateErr) {
          console.error('Error updating analytics:', updateErr);
          return res.status(500).json({ error: 'Failed to update analytics' });
        }
        
        res.json({ 
          success: true, 
          view_count: newCount.view_count,
          unique_visitors: newCount.unique_visitors
        });
      });
    }
  );
});

// Get all analytics data
router.get('/summary', (req, res) => {
  db.all(
    'SELECT project_id, view_count, unique_visitors, last_updated FROM analytics ORDER BY view_count DESC',
    [],
    (err, rows) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      res.json({ analytics: rows });
    }
  );
});

// Helper function to update analytics
function updateAnalytics(projectId, ipHash, callback) {
  // Check if this IP has viewed this project before
  db.get(
    'SELECT COUNT(*) as count FROM page_views WHERE project_id = ? AND ip_hash = ?',
    [projectId, ipHash],
    (err, row) => {
      if (err) return callback(err);
      
      const isUniqueVisitor = row.count === 1; // First time viewing
      
      // Update or insert analytics
      db.run(
        `INSERT INTO analytics (project_id, view_count, unique_visitors)
         VALUES (?, 1, ?)
         ON CONFLICT(project_id) DO UPDATE SET
         view_count = view_count + 1,
         unique_visitors = unique_visitors + ?,
         last_updated = CURRENT_TIMESTAMP`,
        [projectId, isUniqueVisitor ? 1 : 0, isUniqueVisitor ? 1 : 0],
        function(updateErr) {
          if (updateErr) return callback(updateErr);
          
          // Get updated counts
          db.get(
            'SELECT view_count, unique_visitors FROM analytics WHERE project_id = ?',
            [projectId],
            (getErr, updatedRow) => {
              if (getErr) return callback(getErr);
              callback(null, updatedRow);
            }
          );
        }
      );
    }
  );
}

module.exports = router;

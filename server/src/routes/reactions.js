const express = require('express');
const db = require('../database/init');

const router = express.Router();

// Valid reaction types
const VALID_REACTIONS = ['like', 'helpful', 'insightful', 'love', 'wow'];

// Get all reactions for a project
router.get('/:projectId', (req, res) => {
  const { projectId } = req.params;
  
  db.all(
    'SELECT reaction_type, count FROM reactions WHERE project_id = ? ORDER BY count DESC',
    [projectId],
    (err, rows) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      // Convert to object format
      const reactions = {};
      rows.forEach(row => {
        reactions[row.reaction_type] = row.count;
      });
      
      res.json({
        project_id: projectId,
        reactions: reactions,
        total: rows.reduce((sum, row) => sum + row.count, 0)
      });
    }
  );
});

// Add a reaction to a project
router.post('/:projectId/:reactionType', (req, res) => {
  const { projectId, reactionType } = req.params;
  
  // Validate reaction type
  if (!VALID_REACTIONS.includes(reactionType)) {
    return res.status(400).json({ 
      error: 'Invalid reaction type',
      valid_types: VALID_REACTIONS
    });
  }
  
  // Update or insert reaction
  db.run(
    `INSERT INTO reactions (project_id, reaction_type, count)
     VALUES (?, ?, 1)
     ON CONFLICT(project_id, reaction_type) DO UPDATE SET
     count = count + 1,
     updated_at = CURRENT_TIMESTAMP`,
    [projectId, reactionType],
    function(err) {
      if (err) {
        console.error('Error adding reaction:', err);
        return res.status(500).json({ error: 'Failed to add reaction' });
      }
      
      // Get updated count
      db.get(
        'SELECT count FROM reactions WHERE project_id = ? AND reaction_type = ?',
        [projectId, reactionType],
        (getErr, row) => {
          if (getErr) {
            console.error('Error getting updated count:', getErr);
            return res.status(500).json({ error: 'Failed to get updated count' });
          }
          
          res.json({
            success: true,
            project_id: projectId,
            reaction_type: reactionType,
            new_count: row ? row.count : 1
          });
        }
      );
    }
  );
});

// Get reaction summary for all projects
router.get('/', (req, res) => {
  db.all(
    `SELECT project_id, reaction_type, count 
     FROM reactions 
     ORDER BY project_id, count DESC`,
    [],
    (err, rows) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      
      // Group by project
      const summary = {};
      rows.forEach(row => {
        if (!summary[row.project_id]) {
          summary[row.project_id] = {};
        }
        summary[row.project_id][row.reaction_type] = row.count;
      });
      
      res.json({ reactions_summary: summary });
    }
  );
});

// Remove a reaction (for moderation)
router.delete('/:projectId/:reactionType', (req, res) => {
  const { projectId, reactionType } = req.params;
  
  if (!VALID_REACTIONS.includes(reactionType)) {
    return res.status(400).json({ 
      error: 'Invalid reaction type',
      valid_types: VALID_REACTIONS
    });
  }
  
  db.run(
    `UPDATE reactions 
     SET count = CASE 
       WHEN count > 0 THEN count - 1 
       ELSE 0 
     END,
     updated_at = CURRENT_TIMESTAMP
     WHERE project_id = ? AND reaction_type = ?`,
    [projectId, reactionType],
    function(err) {
      if (err) {
        console.error('Error removing reaction:', err);
        return res.status(500).json({ error: 'Failed to remove reaction' });
      }
      
      // Get updated count
      db.get(
        'SELECT count FROM reactions WHERE project_id = ? AND reaction_type = ?',
        [projectId, reactionType],
        (getErr, row) => {
          if (getErr) {
            console.error('Error getting updated count:', getErr);
            return res.status(500).json({ error: 'Failed to get updated count' });
          }
          
          res.json({
            success: true,
            project_id: projectId,
            reaction_type: reactionType,
            new_count: row ? row.count : 0
          });
        }
      );
    }
  );
});

module.exports = router;

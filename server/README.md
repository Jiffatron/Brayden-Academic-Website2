# Portfolio Backend API

A lightweight Node.js/Express backend for Brayden's portfolio website, providing analytics and user interaction features.

## Features

### 📊 Analytics System
- **Live View Counts**: Track page views and unique visitors
- **Privacy-Focused**: IP addresses are hashed for privacy
- **Real-time Updates**: View counts update immediately

### 👍 Reactions System
- **Article Reactions**: Like, helpful, insightful, love, wow
- **Real-time Feedback**: Instant reaction updates
- **Moderation Support**: Admin endpoints for managing reactions

## Quick Start

### Installation
```bash
cd server
npm install
```

### Configuration
```bash
cp .env.example .env
# Edit .env with your configuration
```

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

### Analytics
- `GET /api/analytics/views/:projectId` - Get view count for project
- `POST /api/analytics/views/:projectId` - Record a page view
- `GET /api/analytics/summary` - Get all analytics data

### Reactions
- `GET /api/reactions/:projectId` - Get reactions for project
- `POST /api/reactions/:projectId/:reactionType` - Add reaction
- `DELETE /api/reactions/:projectId/:reactionType` - Remove reaction
- `GET /api/reactions` - Get all reactions summary

### Health Check
- `GET /api/health` - Server health status

## Database Schema

### Analytics Table
- `project_id` - Project identifier
- `view_count` - Total page views
- `unique_visitors` - Unique visitor count
- `last_updated` - Last update timestamp

### Reactions Table
- `project_id` - Project identifier
- `reaction_type` - Type of reaction (like, helpful, etc.)
- `count` - Number of reactions
- `updated_at` - Last update timestamp

### Page Views Table
- `project_id` - Project identifier
- `ip_hash` - Hashed IP address (privacy)
- `user_agent` - Browser information
- `referrer` - Referring page
- `timestamp` - View timestamp

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configured for frontend domain
- **Helmet Security**: Security headers enabled
- **IP Hashing**: Privacy-focused analytics
- **Input Validation**: Sanitized inputs

## Future Enhancements

- User authentication for personalized features
- Comment system for articles
- Email notifications for new reactions
- Advanced analytics dashboard
- Export functionality for data
- Integration with Google Analytics

## Development Notes

- Uses SQLite for simplicity (easily upgradeable to PostgreSQL)
- Modular route structure for easy expansion
- Error handling and logging included
- Ready for deployment to services like Railway, Heroku, or Vercel

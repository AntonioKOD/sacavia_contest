# Sacavia Contest App

A dedicated contest and voting platform built for the Sacavia community, running under the domain `vote.sacavia.com`.

## Overview

The Contest App is a separate Next.js application that integrates with the main Sacavia web app's API and database. It provides a focused experience for users to participate in contests, vote for entries, and discover talented creators.

## Features

- 🏆 **Contest Management**: Create, manage, and participate in various contests
- 🗳️ **Voting System**: Secure voting mechanism with real-time results
- 👥 **User Profiles**: Contest-specific user profiles and achievements
- 📊 **Leaderboards**: Real-time rankings and statistics
- 🎨 **Media Support**: Support for images and videos in contest entries
- 🔐 **Authentication**: Seamless integration with main app's auth system
- 📱 **Responsive Design**: Mobile-first design for all devices
- 🌙 **Dark Mode**: Full dark mode support

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **UI Components**: Radix UI
- **State Management**: React Hooks + SWR
- **API Integration**: Axios with interceptors
- **Authentication**: JWT-based auth (shared with main app)

## Project Structure

```
contest-app/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (proxied to main app)
│   ├── contest/           # Contest-specific pages
│   ├── leaderboard/       # Leaderboard pages
│   ├── profile/           # User profile pages
│   ├── admin/             # Admin panel pages
│   ├── components/        # Page-specific components
│   ├── globals/           # Global components
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/             # Reusable components
│   ├── ui/                # Base UI components
│   ├── contest/           # Contest-specific components
│   ├── forms/             # Form components
│   ├── layout/            # Layout components
│   └── shared/            # Shared components
├── lib/                   # Utility libraries
│   ├── api/               # API integration layer
│   ├── utils/             # Utility functions
│   ├── constants/         # App constants
│   └── validation/        # Validation schemas
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── styles/                # Additional styles
├── public/                # Static assets
├── scripts/               # Build and deployment scripts
└── config/                # Configuration files
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Access to the main Sacavia app's API
- MongoDB database (shared with main app)

### Installation

1. **Clone the repository**
   ```bash
   cd contest-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Development**
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:3001`

### Environment Variables

Key environment variables to configure:

- `NEXT_PUBLIC_MAIN_APP_URL`: Main Sacavia app URL
- `NEXT_PUBLIC_CONTEST_APP_URL`: Contest app URL
- `NEXT_PUBLIC_API_BASE_URL`: Main app's API base URL
- `DATABASE_URL`: MongoDB connection string
- `PAYLOAD_SECRET`: Payload CMS secret

## API Integration

The Contest App integrates with the main Sacavia app through:

- **Shared Database**: Uses the same MongoDB instance
- **API Proxy**: Forwards API requests to the main app
- **Authentication**: Shares JWT tokens and user sessions
- **Media Storage**: Uses the same Vercel Blob storage

### API Endpoints

The app proxies these endpoints to the main app:
- `/api/contests/*` - Contest management
- `/api/auth/*` - Authentication
- `/api/users/*` - User management
- `/api/entries/*` - Contest entries
- `/api/votes/*` - Voting system

## Development

### Available Scripts

- `npm run dev` - Start development server (port 3001)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Code Style

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Implement responsive design patterns
- Follow Next.js 15 conventions
- Use proper error handling and loading states

## Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Configure custom domain: `vote.sacavia.com`
4. Deploy automatically on push to main branch

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Database Schema

The Contest App extends the main app's database with:

- **Contests Collection**: Contest definitions and metadata
- **Entries Collection**: User submissions to contests
- **Votes Collection**: User votes on entries
- **UserStats Collection**: Contest-specific user statistics

## Security Considerations

- JWT token validation
- Rate limiting on voting endpoints
- Input validation and sanitization
- CORS configuration for cross-domain requests
- Secure headers and CSP policies

## Performance

- Image optimization with Next.js Image component
- Lazy loading for contest entries
- SWR for efficient data fetching
- Optimized bundle splitting
- CDN integration for static assets

## Monitoring & Analytics

- Error tracking with Sentry
- Performance monitoring
- User analytics
- Contest engagement metrics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is part of the Sacavia platform and follows the same licensing terms.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the main Sacavia documentation

## Roadmap

- [ ] Real-time voting updates
- [ ] Advanced contest types
- [ ] Social sharing integration
- [ ] Mobile app version
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
# sacavia_contest

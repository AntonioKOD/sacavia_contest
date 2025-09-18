# Contest App Production Deployment Guide

## 🚀 Production Environment Variables

Set these environment variables in your production environment:

### Required Variables

```bash
# Main App Configuration
NEXT_PUBLIC_MAIN_APP_URL=https://sacavia.com
NEXT_PUBLIC_CONTEST_APP_URL=https://vote.sacavia.com
NEXT_PUBLIC_API_BASE_URL=https://sacavia.com/api

# Database Configuration (MUST match main app)
PAYLOAD_SECRET=2aeeb82f322df83fd68a3740

# Session Management
SESSION_PASSWORD=your-super-secure-session-password-at-least-32-characters-long

# SSO Configuration (MUST match main app)
SSO_JWT_SECRET=2aeeb82f322df83fd68a3740
SSO_ISSUER=sacavia-core
SSO_AUDIENCE=sacavia-contest

# Feature Flags
NEXT_PUBLIC_ENABLE_CONTEST_CREATION=true
NEXT_PUBLIC_ENABLE_VOTING=true
NEXT_PUBLIC_ENABLE_REAL_TIME_UPDATES=true
```

### Optional Variables

```bash
# External Services
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

## 🔐 SSO Authentication Flow

The contest app uses Payload CMS JWT authentication for SSO:

1. **User logs into main app** → Gets JWT token in `payload-token` cookie
2. **User visits contest app** → Contest app reads JWT token from cookie
3. **Contest app verifies JWT** → Using shared `PAYLOAD_SECRET`
4. **User is authenticated** → Can vote and interact with contest features

## 🌐 Domain Configuration

For SSO to work properly, ensure:

- **Main app**: `sacavia.com`
- **Contest app**: `vote.sacavia.com` (subdomain of main app)
- **Cookie sharing**: Both apps share the same root domain for cookie access

## 📦 Deployment Steps

1. **Set environment variables** in your hosting platform
2. **Deploy the contest app** to `vote.sacavia.com`
3. **Verify SSO** by logging into main app and visiting contest app
4. **Test voting functionality** to ensure authentication works

## 🔧 Troubleshooting

### Authentication Issues

- **Check `PAYLOAD_SECRET`**: Must be identical to main app
- **Check domain setup**: Contest app must be subdomain of main app
- **Check cookie settings**: Ensure cookies are shared between domains

### Voting Issues

- **Check user existence**: Ensure user exists in main app database
- **Check experience data**: Ensure contest entries exist and are eligible
- **Check API connectivity**: Ensure contest app can reach main app API

## ✅ Production Checklist

- [ ] Environment variables set correctly
- [ ] Domain configured as subdomain of main app
- [ ] SSO authentication working
- [ ] Voting functionality tested
- [ ] API connectivity verified
- [ ] Error handling working
- [ ] Performance optimized

## 🚨 Security Notes

- **Never expose `PAYLOAD_SECRET`** in client-side code
- **Use HTTPS** for all production domains
- **Set secure cookie flags** for production
- **Monitor authentication logs** for suspicious activity

## 📊 Monitoring

Monitor these endpoints for health:

- `GET /api/auth/me` - Authentication status
- `GET /api/contest/stats` - Contest statistics
- `GET /api/contest/entries` - Contest entries
- `POST /api/contest/upvote` - Voting functionality

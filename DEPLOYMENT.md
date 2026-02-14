# Deployment Guide

## Pre-Deployment Checklist

- [ ] Supabase project created and SQL schema executed
- [ ] Environment variables ready
- [ ] Code tested locally
- [ ] Git repository created

## Vercel Deployment (Recommended)

### Step 1: Prepare Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/linkpe.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

### Step 3: Add Environment Variables

In Vercel project settings, add:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 4: Update Supabase URLs

In Supabase Dashboard > Authentication > URL Configuration:

**Site URL:**
```
https://your-app.vercel.app
```

**Redirect URLs:**
```
https://your-app.vercel.app/api/auth/callback
```

### Step 5: Deploy

Click "Deploy" and wait for build to complete.

## Custom Domain Setup

### In Vercel:
1. Go to Project Settings > Domains
2. Add your custom domain (e.g., `linkpe.com`)
3. Add DNS records as instructed

### Update Supabase:
Update Site URL and Redirect URLs to use your custom domain.

## Environment Variables for Production

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...

# Optional (for future features)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=your_secret_key
```

## Post-Deployment Steps

1. **Test Authentication Flow**
   - Visit /login
   - Request magic link
   - Verify email delivery
   - Complete login

2. **Test Profile Creation**
   - Create username
   - Upload avatar
   - Add links
   - View public profile

3. **Test Public Profiles**
   - Visit /[username]
   - Click links
   - Verify click tracking

4. **Monitor Errors**
   - Check Vercel logs
   - Check Supabase logs
   - Monitor Sentry (if integrated)

## Performance Optimization

### Enable Edge Functions
In `next.config.js`:
```javascript
module.exports = {
  experimental: {
    runtime: 'edge',
  },
}
```

### Image Optimization
Already configured for Supabase images in `next.config.js`.

### Caching
Consider adding:
```javascript
export const revalidate = 60 // Revalidate every 60 seconds
```
to profile pages for better performance.

## Backup & Recovery

### Database Backups
Supabase automatically backs up your database. Configure backup frequency in Supabase settings.

### Code Backups
Use Git for version control and push regularly to GitHub.

## Monitoring

### Vercel Analytics
Enable in Vercel dashboard for:
- Page views
- User sessions
- Performance metrics

### Supabase Monitoring
Check:
- Database usage
- Storage usage
- Auth activity
- API requests

## Security Checklist

- [x] Row Level Security (RLS) enabled
- [x] Environment variables secured
- [x] HTTPS enforced (automatic with Vercel)
- [ ] Rate limiting (consider adding)
- [ ] CORS configured (if needed)
- [ ] Input validation on all forms

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild locally
rm -rf .next
npm run build
```

### Auth Not Working
1. Check Supabase URL configuration
2. Verify redirect URLs match exactly
3. Check email delivery settings

### Images Not Loading
1. Verify Supabase storage bucket is public
2. Check RLS policies on storage
3. Verify `next.config.js` image domains

### Database Errors
1. Check RLS policies
2. Verify table permissions
3. Check Supabase logs

## Scaling Considerations

### For High Traffic:
1. Upgrade Supabase plan
2. Enable Vercel Pro for better performance
3. Add Redis for caching (future feature)
4. Implement CDN for static assets

### Database Optimization:
- Indexes already created in schema
- Consider partitioning for 100k+ users
- Monitor slow queries in Supabase

## Cost Estimation

**Free Tier (Good for testing):**
- Vercel: Free (Hobby plan)
- Supabase: Free (500MB database, 1GB storage)
- Total: $0/month

**Small Scale (1-1000 users):**
- Vercel: Free or $20/month
- Supabase: Free tier sufficient
- Total: $0-20/month

**Medium Scale (1000-10000 users):**
- Vercel: $20/month (Pro)
- Supabase: $25/month (Pro)
- Total: $45/month

## Support Resources

- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Issues: (your repo)/issues

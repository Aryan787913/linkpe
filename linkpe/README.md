# LinkPe - Linktree Clone

A modern, production-ready SaaS application built with Next.js 14, Supabase, and Razorpay.

## Features

✨ **Authentication**
- Magic link email login via Supabase Auth
- Protected dashboard routes
- Public profile pages

🎨 **Profile Management**
- Custom username
- Avatar upload to Supabase Storage
- Bio editing
- Profile analytics (total clicks)

🔗 **Link Management**
- Add unlimited links (Pro users)
- Free users: 3 links maximum
- Drag-and-drop reordering
- Click tracking per link
- Delete links

💎 **Pro Features**
- Razorpay subscription integration
- Unlimited links for Pro users
- Feature gating based on subscription status

📊 **Analytics**
- Total click count across all links
- Individual link click tracking

🎯 **Public Profiles**
- Clean, Apple-inspired design
- Mobile-first responsive layout
- Premium gradient backgrounds
- Smooth animations

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Supabase (Auth, Database, Storage, RLS)
- **Payments:** Razorpay
- **Deployment:** Vercel-ready

## Quick Start

### 1. Prerequisites

- Node.js 18+ installed
- Supabase account (https://supabase.com)
- Razorpay account (optional, for payments)

### 2. Supabase Setup

1. Create a new project at https://supabase.com
2. Go to **SQL Editor** and run the contents of `SUPABASE_SETUP.sql`
3. Go to **Authentication** > **URL Configuration** and add:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/api/auth/callback`
4. Go to **Storage** and verify the `avatars` bucket was created
5. Get your credentials from **Settings** > **API**:
   - Project URL
   - Anon/Public Key

### 3. Installation

```bash
# Clone or extract the project
cd linkpe

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local

# Edit .env.local and add your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 5. First User Setup

1. Go to `/login`
2. Enter your email
3. Check email for magic link
4. Click link to authenticate
5. Choose a username
6. Start adding links!

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Update Supabase Auth URLs:
   - Site URL: `https://your-domain.vercel.app`
   - Redirect URLs: `https://your-domain.vercel.app/api/auth/callback`
5. Deploy!

## Project Structure

```
linkpe/
├── app/
│   ├── api/auth/callback/     # Auth callback handler
│   ├── dashboard/             # Protected dashboard
│   ├── login/                 # Login page
│   ├── setup/                 # Initial profile setup
│   ├── [username]/            # Public profile pages
│   ├── page.tsx               # Landing page
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/
│   └── AvatarUpload.tsx       # Avatar upload component
├── lib/
│   └── supabase.ts            # Supabase client & types
├── SUPABASE_SETUP.sql         # Database schema
├── package.json               # Dependencies
├── tailwind.config.ts         # Tailwind configuration
└── tsconfig.json              # TypeScript config
```

## Database Schema

### profiles
- `id` (uuid, primary key) - References auth.users
- `username` (text, unique) - User's unique username
- `bio` (text, nullable) - User bio
- `avatar_url` (text, nullable) - Avatar image URL
- `is_pro` (boolean) - Pro subscription status
- `created_at` (timestamp) - Account creation date

### links
- `id` (uuid, primary key) - Auto-generated
- `user_id` (uuid) - References profiles.id
- `title` (text) - Link title
- `url` (text) - Link URL
- `position` (integer) - Display order
- `clicks` (integer) - Click count
- `created_at` (timestamp) - Link creation date

## Razorpay Integration

The app includes a payment link to upgrade to Pro:
```
https://rzp.io/rzp/WP29Eiw
```

To manually activate Pro for testing:
```sql
UPDATE profiles 
SET is_pro = true 
WHERE username = 'your-username';
```

For production, implement a webhook to automatically update `is_pro` after successful payment.

## Features to Add

- Custom themes/colors
- Link scheduling
- Social media icons
- Link expiration
- QR code generation
- SEO meta tags customization
- Link categories
- Analytics dashboard with charts
- Email notifications

## Support

For issues or questions:
- Check Supabase logs for auth/database errors
- Check browser console for client-side errors
- Verify environment variables are set correctly

## License

MIT License - feel free to use this for your own projects!

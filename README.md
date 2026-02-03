# Marketing ROI Dashboard - Frontend

**Status:** ✅ 85% Complete (Feb 3, 2026)  
**Stack:** Next.js 14, React, TypeScript, TailwindCSS, tRPC, Recharts  
**Deployment:** Vercel

---

## 📋 Project Overview

Frontend application for the Marketing ROI Dashboard - a SaaS platform that consolidates marketing data from Google Ads, Meta, and Shopify with AI-powered insights.

### Key Features ✅

- **Authentication:** Sign in/up with email or Google OAuth
- **Dashboard:** Real-time metrics, charts, and campaign performance
- **Integrations:** Connect Google Ads, Meta Ads, Shopify
- **Reports:** AI-powered insights with PDF export
- **Settings:** Profile, billing, team management, API keys

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│    marketing-dashboard-web (THIS)               │
│           Next.js 14 Frontend                   │
│                                                  │
│  Pages:                                         │
│  ├── / (landing)                                │
│  ├── /auth/signin                               │
│  ├── /auth/signup                               │
│  ├── /dashboard (overview)                      │
│  ├── /integrations                              │
│  ├── /reports                                   │
│  └── /settings                                  │
│                                                  │
│  Components:                                    │
│  ├── Layout (nav + header)                      │
│  ├── DashboardStats (metrics cards)             │
│  ├── CampaignTable (data table)                 │
│  ├── PerformanceChart (Recharts)                │
│  └── ... (more)                                 │
└──────────────────┬──────────────────────────────┘
                   │ tRPC (type-safe API calls)
                   ▼
         ┌─────────────────────┐
         │ marketing-dashboard-│
         │        api          │
         │  (Backend + DB)     │
         └─────────────────────┘
```

---

## 🛠️ Tech Stack

### Core
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS

### Data Fetching & State
- **tRPC** - End-to-end typesafe APIs
- **@tanstack/react-query** - Server state management
- **NextAuth.js** - Authentication (client)

### UI Components & Icons
- **Lucide React** - Icon library
- **Recharts** - Data visualization
- **TailwindCSS** - Styling

### Forms & Validation
- **React Hook Form** - Form handling (planned)
- **Zod** - Schema validation (planned)

---

## 📁 Project Structure

```
marketing-dashboard-web/
├── app/
│   ├── (dashboard)/              # Dashboard layout group
│   │   ├── layout.tsx           # Shared layout (nav + header)
│   │   ├── dashboard/           
│   │   │   └── page.tsx         # Dashboard overview
│   │   ├── integrations/
│   │   │   └── page.tsx         # Integrations management
│   │   ├── reports/
│   │   │   └── page.tsx         # Reports & AI insights
│   │   └── settings/
│   │       └── page.tsx         # Settings (5 tabs)
│   ├── auth/
│   │   ├── signin/
│   │   │   └── page.tsx         # Sign in page
│   │   └── signup/
│   │       └── page.tsx         # Sign up page
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/
│   ├── layout/
│   │   ├── DashboardNav.tsx     # Sidebar navigation
│   │   └── DashboardHeader.tsx  # Top header
│   ├── dashboard/
│   │   ├── DashboardStats.tsx   # Metrics cards
│   │   └── CampaignTable.tsx    # Campaign list
│   ├── charts/
│   │   └── PerformanceChart.tsx # Line chart
│   └── ui/                      # Reusable UI components
├── lib/
│   └── trpc/
│       ├── client.ts            # tRPC client setup
│       └── Provider.tsx         # tRPC React Provider
├── public/                      # Static assets
├── styles/
│   └── globals.css             # Global styles
├── .env.local                  # Environment variables
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:3001`

### Installation

```bash
# Clone the repository
git clone https://github.com/ClawdyAssistant/marketing-dashboard-web.git
cd marketing-dashboard-web

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your values
# NEXT_PUBLIC_API_URL=http://localhost:3001
# NEXTAUTH_URL=http://localhost:3000
# NEXTAUTH_SECRET=your-secret-key
```

### Development

```bash
# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build optimized bundle
npm run build

# Start production server
npm start
```

---

## 📄 Pages Overview

### 🔐 Authentication (`/auth`)

**Sign In** (`/auth/signin`)
- Email/password login
- Google OAuth button
- "Remember me" checkbox
- Link to sign up

**Sign Up** (`/auth/signup`)
- Email, password, name fields
- Real-time validation
- tRPC integration
- Google OAuth button
- Link to sign in

### 📊 Dashboard (`/dashboard`)

**Overview Page**
- 4 metric cards (Spend, Revenue, ROAS, Conversions)
- Performance chart (30-day trend)
- Campaign table with top performers
- Loading states & skeletons

**Features:**
- Real-time data from tRPC
- Date range filtering (planned)
- Export to CSV (planned)

### 🔗 Integrations (`/integrations`)

**Features:**
- Connected integrations list
- Available integrations (Google Ads, Meta, Shopify)
- Connect/disconnect buttons
- Sync status indicators
- Manual sync trigger

**OAuth Flow:**
- Google Ads: OAuth 2.0 (planned)
- Meta: OAuth 2.0 (planned)
- Shopify: OAuth 2.0 (planned)

### 📄 Reports (`/reports`)

**Features:**
- Reports list with metadata
- Generate new report button
- AI insights display (planned)
- Download PDF (planned)
- Share reports (planned)

### ⚙️ Settings (`/settings`)

**5 Tabs:**

1. **Profile** - Name, email, company
2. **Billing** - Plan, payment method, invoices
3. **Team** - Invite members, manage roles
4. **API Keys** - Generate & manage API keys
5. **Notifications** - Email preferences

---

## 🎨 Design System

### Colors

```css
/* Primary */
--primary: #3b82f6;      /* Blue 500 */
--primary-dark: #2563eb; /* Blue 600 */

/* Success */
--success: #10b981;      /* Green 500 */

/* Error */
--error: #ef4444;        /* Red 500 */

/* Gray Scale */
--gray-50: #f9fafb;
--gray-100: #f3f4f6;
--gray-500: #6b7280;
--gray-900: #111827;
```

### Typography

- **Font:** System font stack (SF Pro, Segoe UI, Roboto)
- **Headings:** Bold, gray-900
- **Body:** Regular, gray-700
- **Captions:** Small, gray-500

### Components

- **Buttons:** Rounded corners, shadow-sm
- **Cards:** White background, border, rounded-lg
- **Inputs:** Border, focus ring, rounded-md
- **Tables:** Striped rows, hover states

---

## 🔌 tRPC Integration

### Setup

```typescript
// lib/trpc/client.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../marketing-dashboard-api/lib/server';

export const trpc = createTRPCReact<AppRouter>();
```

### Usage in Components

```typescript
'use client';

import { trpc } from '@/lib/trpc/client';

export function DashboardStats() {
  const { data, isLoading } = trpc.dashboard.overview.useQuery({
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      end: new Date().toISOString(),
    }
  });

  if (isLoading) return <Loading />;
  
  return (
    <div>
      <p>Total Revenue: ${data.totalRevenue}</p>
      <p>ROAS: {data.averageRoas.toFixed(2)}x</p>
    </div>
  );
}
```

### Mutations

```typescript
const mutation = trpc.reports.generate.useMutation();

async function handleGenerate() {
  await mutation.mutateAsync({
    name: 'Monthly Report',
    dateRange: { start: '...', end: '...' }
  });
}
```

---

## 🧪 Testing

**Status:** Not yet implemented

**Planned:**
- Unit tests (Jest + React Testing Library)
- E2E tests (Playwright)
- Visual regression tests (Chromatic)

---

## 📦 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

Required for production:

```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

## 🔧 Configuration

### Next.js Config

```javascript
// next.config.js
module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};
```

### Tailwind Config

```javascript
// tailwind.config.ts
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
      },
    },
  },
};
```

---

## 📝 Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm start         # Start production server
npm run lint      # Run ESLint
npm run type-check # TypeScript type checking
```

---

## 🐛 Known Issues

None at the moment! 🎉

---

## 🗺️ Roadmap

**Current Sprint (Feb 2026):**
- [ ] Connect OAuth flows for integrations
- [ ] Implement AI insights display
- [ ] Add Stripe billing integration
- [ ] PDF report generation
- [ ] Mobile responsiveness improvements

**Next Sprint (Mar 2026):**
- [ ] Advanced filtering & search
- [ ] Custom date ranges
- [ ] Email notifications
- [ ] Team collaboration features
- [ ] API documentation page

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/)

---

## 👨‍💻 Development Team

**Developer:** Clawdy (AI Agent)  
**Owner:** Ahmed Alaa (@Ahmedki1l)  
**Repository:** https://github.com/ClawdyAssistant/marketing-dashboard-web

---

**Questions?** Check the [API Documentation](../marketing-dashboard-api/API-DOCS.md) or [Integration Guide](../INTEGRATION_GUIDE.md)

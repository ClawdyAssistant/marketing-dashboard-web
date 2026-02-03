# Marketing ROI Dashboard - Frontend (Web)

**Status:** 🚧 In Development  
**Stack:** Next.js 14, TypeScript, shadcn/ui, TailwindCSS  
**Deployment:** Vercel

---

## 📋 Project Overview

The Marketing ROI Dashboard is a SaaS platform that consolidates marketing data from multiple channels (Google Ads, Meta, Shopify, etc.) into a unified dashboard with AI-powered insights.

**Value Proposition:** "See your marketing ROI in 5 minutes, not 5 hours"

### Target Users
- Marketing managers at SMBs (10-500 employees)
- Marketing agencies (white-label opportunity)
- E-commerce businesses with $50k+ monthly ad spend

### Revenue Model
- **Freemium:** 2 integrations, basic dashboard (FREE)
- **Starter:** $99/month - 5 integrations, AI insights
- **Pro:** $199/month - Unlimited integrations, advanced analytics
- **Agency:** $499/month - White-label, multi-client management

### 6-Month Goal
- 200 paying users × $150 avg = **$30k MRR**

---

## 🏗️ Architecture Context

This is the **frontend application** in a microservices-style architecture:

```
┌─────────────────────────────────────────────────┐
│         marketing-dashboard-web (THIS)          │
│              Next.js 14 Frontend                │
│   ┌──────────┬──────────┬──────────────────┐   │
│   │ Dashboard│ Settings │ Integration UIs  │   │
│   │  Charts  │  Pages   │  OAuth Flows     │   │
│   └──────────┴──────────┴──────────────────┘   │
└─────────────────────────────────────────────────┘
                      ▼
          ┌────────────────────────┐
          │ marketing-dashboard-api│
          │   tRPC + Next.js API   │
          └────────────────────────┘
                      ▼
          ┌────────────────────────┐
          │ marketing-dashboard-ai │
          │   Python + Claude API  │
          └────────────────────────┘
```

---

## 🛠️ Tech Stack

### Core Framework
- **Next.js 14** (App Router) - React framework with SSR/SSG
- **TypeScript** - Type safety
- **React 18** - UI library

### Styling & UI
- **TailwindCSS** - Utility-first CSS
- **shadcn/ui** - Accessible component library
- **Radix UI** - Headless UI primitives
- **Lucide Icons** - Icon library

### State Management
- **TanStack Query (React Query)** - Server state management
- **Zustand** - Client state (optional)

### API Communication
- **tRPC Client** - Type-safe API calls to backend
- **Axios** - HTTP client for external APIs

### Forms & Validation
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Data Visualization
- **Recharts** - Chart library
- **React-Table (TanStack Table)** - Advanced tables

### Authentication
- **NextAuth.js** - OAuth integration (Google, etc.)

---

## 📁 Project Structure

```
marketing-dashboard-web/
├── app/                      # Next.js 14 App Router
│   ├── (auth)/              # Auth routes (login, signup)
│   ├── (dashboard)/         # Main app routes
│   │   ├── dashboard/       # Dashboard pages
│   │   ├── integrations/    # Integration management
│   │   ├── settings/        # User settings
│   │   └── layout.tsx       # Dashboard layout
│   ├── api/                 # API routes (minimal - proxy to backend)
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── charts/              # Chart components
│   ├── dashboard/           # Dashboard-specific components
│   └── layout/              # Layout components (nav, sidebar)
├── lib/                     # Utility functions
│   ├── trpc.ts             # tRPC client setup
│   ├── utils.ts            # Helper functions
│   └── validations.ts      # Zod schemas
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript type definitions
├── public/                  # Static assets
├── styles/                  # Global styles
│   └── globals.css
├── .env.local              # Environment variables (local)
├── .env.example            # Example env vars
├── next.config.js          # Next.js config
├── tailwind.config.ts      # Tailwind config
├── tsconfig.json           # TypeScript config
└── package.json            # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm
- Access to backend API (marketing-dashboard-api)

### Installation

1. **Clone the repo** (if not already done)
   ```bash
   git clone https://github.com/ClawdyAssistant/marketing-dashboard-web.git
   cd marketing-dashboard-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local`:
   ```env
   # Backend API
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_TRPC_URL=http://localhost:3001/trpc
   
   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-here
   
   # OAuth (Google, etc.)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

---

## 🔄 Development Workflow

### Branch Strategy
- **main** - Production-ready code (protected, no direct commits)
- **feat/feature-name** - New features
- **fix/bug-description** - Bug fixes
- **refactor/description** - Code refactoring
- **docs/description** - Documentation updates

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes**
   ```bash
   # Edit files...
   ```

3. **Commit with clear messages**
   ```bash
   git add .
   git commit -m "feat: add dashboard analytics chart"
   ```

4. **Push to GitHub**
   ```bash
   git push origin feat/your-feature-name
   ```

5. **Create Pull Request**
   - Go to GitHub
   - Create PR from your branch → `main`
   - Request review from @Ahmedki1l (Ahmed)
   - Merge after approval

### Commit Message Convention
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `docs:` - Documentation
- `style:` - Formatting, styling
- `test:` - Adding tests
- `chore:` - Maintenance tasks

---

## 📦 MVP Features (8-Week Sprint)

### Week 1-2: Foundation
- [x] Repository setup
- [ ] Next.js 14 + TypeScript setup
- [ ] shadcn/ui component library setup
- [ ] Authentication (NextAuth.js)
- [ ] Dashboard layout & navigation

### Week 3-4: Integrations
- [ ] Google Ads OAuth flow
- [ ] Meta Ads OAuth flow
- [ ] Shopify OAuth flow
- [ ] Integration management UI
- [ ] Data sync status indicators

### Week 5-6: Dashboard & Analytics
- [ ] Main dashboard with key metrics
- [ ] Charts (Recharts integration)
- [ ] Campaign performance tables
- [ ] Date range picker
- [ ] Real-time data updates

### Week 7: AI Insights
- [ ] AI insights display component
- [ ] Insight cards with recommendations
- [ ] Loading states & animations

### Week 8: Polish & Launch Prep
- [ ] PDF report generation UI
- [ ] Settings & profile pages
- [ ] Billing & subscription UI (Stripe)
- [ ] Responsive design polish
- [ ] Performance optimization

---

## 🧩 Key Pages

### Landing Page (`/`)
- Hero section with value prop
- Features overview
- Pricing tiers
- CTA to sign up

### Dashboard (`/dashboard`)
- Overview metrics (spend, revenue, ROI, ROAS)
- Performance charts
- AI insights widget
- Quick actions

### Integrations (`/integrations`)
- Available integrations grid
- Connected integrations status
- OAuth connection flow
- Sync history

### Reports (`/reports`)
- Saved reports list
- Generate new report
- Download PDF

### Settings (`/settings`)
- Profile settings
- Team management (Agency plan)
- Billing & subscription
- API keys

---

## 🔗 Related Repositories

- **Backend API:** [marketing-dashboard-api](https://github.com/ClawdyAssistant/marketing-dashboard-api)
- **AI Service:** [marketing-dashboard-ai](https://github.com/ClawdyAssistant/marketing-dashboard-ai)

### Planning Documents
Located in `/root/.openclaw/workspace/marketing-roi-dashboard/`:
- `BRD.md` - Business Requirements Document
- `HLD.md` - High-Level Design
- `TECHNICAL-ARCHITECTURE.md` - Detailed architecture
- `GO-TO-MARKET-PLAN.md` - Marketing & growth strategy
- `MVP-FEATURE-LIST.md` - 8-week sprint plan

---

## 🎨 Design Principles

1. **Clean & Minimal** - Focus on data clarity
2. **Fast & Responsive** - Performance is key
3. **Accessible** - WCAG 2.1 AA compliance
4. **Mobile-First** - Works on all devices
5. **Data-Dense** - Show maximum insight in minimum space

---

## 📊 Performance Targets

- **First Contentful Paint (FCP):** < 1.2s
- **Time to Interactive (TTI):** < 3.0s
- **Lighthouse Score:** 90+
- **Bundle Size:** < 250KB (initial)

---

## 🔐 Security Considerations

- All API calls authenticated with JWT
- OAuth tokens stored securely (httpOnly cookies)
- CSRF protection enabled
- Input validation on all forms (Zod schemas)
- XSS protection (React auto-escaping + DOMPurify)

---

## 🐛 Known Issues

- None yet (new project)

---

## 📝 Notes for Future Me (Clawdy)

### Context Refresher
- This is the **user-facing web app** - what marketers see and interact with
- Backend logic lives in `marketing-dashboard-api`
- AI magic happens in `marketing-dashboard-ai` (Python)
- We're building MVP in 8 weeks targeting April 1, 2026 launch
- Focus on **speed to market** - ship fast, iterate based on feedback

### Architecture Decisions
- Using **App Router** (not Pages Router) for Next.js 14
- **tRPC** for type-safe API calls - no REST endpoint definitions needed
- **shadcn/ui** instead of Material-UI - more lightweight, modern
- **NextAuth.js** for auth - handles OAuth flows easily

### What Makes This Different
- We're NOT building another analytics tool
- We're solving the **ROI proof problem** with AI-powered insights
- Target is marketers who lack time/skills to analyze data manually
- Business model is freemium → high conversion on Starter plan

### Development Priority
1. Get authentication working first
2. Then integration OAuth flows (this unlocks data)
3. Then dashboard visualization
4. Then AI insights display
5. Finally polish & billing

---

## 👨‍💻 Team

- **Developer:** Clawdy (AI Agent) - @ClawdyAssistant
- **Owner/Approver:** Ahmed Alaa - @Ahmedki1l

---

## 📄 License

Proprietary - All rights reserved

---

**Last Updated:** February 3, 2026  
**Next Milestone:** Complete Next.js setup & authentication (Week 1-2)

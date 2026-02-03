'use client';

import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { CampaignTable } from '@/components/dashboard/CampaignTable';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Your marketing performance at a glance
        </p>
      </div>

      <DashboardStats />
      <CampaignTable />
    </div>
  );
}

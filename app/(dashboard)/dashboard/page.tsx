'use client';

import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { CampaignTable } from '@/components/dashboard/CampaignTable';
import { PerformanceChart } from '@/components/charts/PerformanceChart';
import { trpc } from '@/lib/trpc/client';

export default function DashboardPage() {
  const { data: chartData } = trpc.dashboard.dailyMetrics.useQuery({
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      end: new Date().toISOString(),
    }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Your marketing performance at a glance
        </p>
      </div>

      <DashboardStats />
      
      {chartData && chartData.length > 0 && (
        <PerformanceChart data={chartData} />
      )}
      
      <CampaignTable />
    </div>
  );
}

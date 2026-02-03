'use client';

import { trpc } from '@/lib/trpc/client';
import { DollarSign, TrendingUp, MousePointer, ShoppingCart } from 'lucide-react';

export function DashboardStats() {
  const { data, isLoading } = trpc.dashboard.overview.useQuery({
    dateRange: {
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      end: new Date().toISOString(),
    }
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse rounded-lg bg-gray-200 h-32" />
        ))}
      </div>
    );
  }

  const stats = [
    { 
      name: 'Total Spend', 
      value: `$${data?.totalSpend.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '+12.5%', 
      changeType: 'positive' as const,
      icon: DollarSign 
    },
    { 
      name: 'Revenue', 
      value: `$${data?.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '+18.2%', 
      changeType: 'positive' as const,
      icon: TrendingUp 
    },
    { 
      name: 'ROAS', 
      value: `${data?.averageRoas.toFixed(2)}x`,
      change: '+5.1%', 
      changeType: 'positive' as const,
      icon: MousePointer 
    },
    { 
      name: 'Conversions', 
      value: data?.totalConversions.toLocaleString() || '0',
      change: '-3.2%', 
      changeType: 'negative' as const,
      icon: ShoppingCart 
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 shadow sm:px-6 sm:pt-6"
        >
          <dt>
            <div className="absolute rounded-md bg-blue-500 p-3">
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              {stat.name}
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.change}
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
}

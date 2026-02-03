'use client';

import { DollarSign, TrendingUp, MousePointer, ShoppingCart } from 'lucide-react';

const stats = [
  { 
    name: 'Total Spend', 
    value: '$12,345', 
    change: '+12.5%', 
    changeType: 'positive',
    icon: DollarSign 
  },
  { 
    name: 'Revenue', 
    value: '$34,567', 
    change: '+18.2%', 
    changeType: 'positive',
    icon: TrendingUp 
  },
  { 
    name: 'ROAS', 
    value: '2.8x', 
    change: '+5.1%', 
    changeType: 'positive',
    icon: MousePointer 
  },
  { 
    name: 'Conversions', 
    value: '1,234', 
    change: '-3.2%', 
    changeType: 'negative',
    icon: ShoppingCart 
  },
];

export function DashboardStats() {
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

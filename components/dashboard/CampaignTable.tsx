'use client';

const campaigns = [
  { 
    name: 'Winter Sale Campaign', 
    platform: 'Google Ads', 
    spend: '$2,450',
    revenue: '$7,350',
    roas: '3.0x',
    status: 'active'
  },
  { 
    name: 'Product Launch', 
    platform: 'Meta Ads', 
    spend: '$1,850',
    revenue: '$4,625',
    roas: '2.5x',
    status: 'active'
  },
  { 
    name: 'Brand Awareness', 
    platform: 'Google Ads', 
    spend: '$3,200',
    revenue: '$5,120',
    roas: '1.6x',
    status: 'active'
  },
  { 
    name: 'Retargeting Campaign', 
    platform: 'Meta Ads', 
    spend: '$980',
    revenue: '$3,920',
    roas: '4.0x',
    status: 'active'
  },
];

export function CampaignTable() {
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          Recent Campaigns
        </h3>
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Campaign
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Platform
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Spend
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Revenue
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      ROAS
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.name}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {campaign.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {campaign.platform}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {campaign.spend}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {campaign.revenue}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-green-600">
                        {campaign.roas}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          {campaign.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

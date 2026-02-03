'use client';

import { useState, useEffect } from 'react';
import { trpc } from '@/lib/trpc/client';
import { Plus, RefreshCw, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const availableIntegrations = [
  {
    id: 'google-ads',
    name: 'Google Ads',
    description: 'Connect your Google Ads account to track campaign performance',
    icon: '🔍',
    color: 'blue',
  },
  {
    id: 'meta',
    name: 'Meta Ads',
    description: 'Sync Facebook and Instagram ad campaigns',
    icon: '📘',
    color: 'indigo',
  },
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'Track e-commerce sales and product performance',
    icon: '🛍️',
    color: 'green',
  },
];

export default function IntegrationsPage() {
  const searchParams = useSearchParams();
  const [shopDomain, setShopDomain] = useState('');
  const [showShopifyInput, setShowShopifyInput] = useState(false);
  const [connecting, setConnecting] = useState<string | null>(null);
  
  const { data: integrations, isLoading, refetch } = trpc.integrations.list.useQuery();
  const initiateOAuthMutation = trpc.integrations.initiateOAuth.useMutation();
  const disconnectMutation = trpc.integrations.disconnect.useMutation({
    onSuccess: () => refetch(),
  });
  const syncMutation = trpc.integrations.sync.useMutation({
    onSuccess: () => refetch(),
  });

  // Check for OAuth success/error
  useEffect(() => {
    const success = searchParams.get('success');
    const error = searchParams.get('error');
    
    if (success) {
      alert(`Successfully connected ${success}!`);
      refetch();
      // Clear params
      window.history.replaceState({}, '', '/integrations');
    }
    
    if (error) {
      alert(`Failed to connect: ${error}`);
      // Clear params
      window.history.replaceState({}, '', '/integrations');
    }
  }, [searchParams, refetch]);

  const handleConnect = async (platform: 'google-ads' | 'meta' | 'shopify') => {
    if (platform === 'shopify') {
      setShowShopifyInput(true);
      return;
    }

    setConnecting(platform);
    
    try {
      const result = await initiateOAuthMutation.mutateAsync({ platform });
      // Redirect to OAuth URL
      window.location.href = result.authUrl;
    } catch (error) {
      console.error('Failed to initiate OAuth:', error);
      alert('Failed to start connection process');
      setConnecting(null);
    }
  };

  const handleShopifyConnect = async () => {
    if (!shopDomain) {
      alert('Please enter your Shopify domain');
      return;
    }

    setConnecting('shopify');
    
    try {
      const result = await initiateOAuthMutation.mutateAsync({
        platform: 'shopify',
        shopDomain: shopDomain.replace('.myshopify.com', '') + '.myshopify.com',
      });
      // Redirect to OAuth URL
      window.location.href = result.authUrl;
    } catch (error) {
      console.error('Failed to initiate Shopify OAuth:', error);
      alert('Failed to start connection process');
      setConnecting(null);
    }
  };

  const handleDisconnect = async (id: string) => {
    if (!confirm('Are you sure you want to disconnect this integration?')) {
      return;
    }

    await disconnectMutation.mutateAsync({ id });
  };

  const handleSync = async (id: string) => {
    await syncMutation.mutateAsync({ id });
  };

  const connectedPlatforms = new Set(integrations?.map(i => i.platform) || []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
        <p className="mt-1 text-sm text-gray-500">
          Connect your marketing platforms to track performance
        </p>
      </div>

      {/* Connected Integrations */}
      {integrations && integrations.length > 0 && (
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900 mb-4">
              Connected Integrations
            </h3>
            <div className="space-y-4">
              {integrations.map((integration) => (
                <div
                  key={integration.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">
                      {availableIntegrations.find(i => i.id === integration.platform)?.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {integration.accountName || integration.platform}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Last synced: {integration.lastSync ? new Date(integration.lastSync).toLocaleDateString() : 'Never'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {integration.isActive ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        <CheckCircle className="h-3 w-3" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
                        <XCircle className="h-3 w-3" />
                        Inactive
                      </span>
                    )}
                    <button
                      onClick={() => handleSync(integration.id)}
                      disabled={syncMutation.isLoading || integration.syncStatus === 'syncing'}
                      className="p-2 text-gray-400 hover:text-blue-600 disabled:opacity-50"
                      title="Refresh data"
                    >
                      <RefreshCw className={`h-4 w-4 ${integration.syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                      onClick={() => handleDisconnect(integration.id)}
                      disabled={disconnectMutation.isLoading}
                      className="p-2 text-gray-400 hover:text-red-600 disabled:opacity-50"
                      title="Disconnect"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Available Integrations */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-base font-semibold leading-6 text-gray-900 mb-4">
            Available Integrations
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {availableIntegrations.map((integration) => {
              const isConnected = connectedPlatforms.has(integration.id);
              const isConnecting = connecting === integration.id;
              
              return (
                <div
                  key={integration.id}
                  className="relative flex flex-col gap-4 rounded-lg border border-gray-200 p-6 hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{integration.icon}</div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {integration.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                  
                  {integration.id === 'shopify' && showShopifyInput && !isConnected ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="your-store.myshopify.com"
                        value={shopDomain}
                        onChange={(e) => setShopDomain(e.target.value)}
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleShopifyConnect}
                          disabled={isConnecting || !shopDomain}
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                          {isConnecting ? 'Connecting...' : 'Connect'}
                        </button>
                        <button
                          onClick={() => setShowShopifyInput(false)}
                          className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleConnect(integration.id as any)}
                      disabled={isConnected || isConnecting}
                      className={`
                        inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold
                        ${isConnected
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                        }
                      `}
                    >
                      {isConnecting ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Connecting...
                        </>
                      ) : isConnected ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Connected
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          Connect
                        </>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

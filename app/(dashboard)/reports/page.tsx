'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc/client';
import { FileText, Download, Sparkles, Calendar, Eye } from 'lucide-react';
import { AIInsightsCard } from '@/components/reports/AIInsightsCard';

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const { data: reports, isLoading, refetch } = trpc.reports.list.useQuery();
  const { data: reportDetails } = trpc.reports.getById.useQuery(
    { id: selectedReport! },
    { enabled: !!selectedReport }
  );
  
  const generateMutation = trpc.reports.generate.useMutation({
    onSuccess: () => {
      refetch();
    }
  });

  const handleGenerateReport = async () => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    await generateMutation.mutateAsync({
      name: `Report - ${now.toLocaleDateString()}`,
      dateRange: {
        start: thirtyDaysAgo.toISOString(),
        end: now.toISOString(),
      }
    });
  };

  const parseInsights = (insightsJson: string | null) => {
    if (!insightsJson) return null;
    try {
      return JSON.parse(insightsJson);
    } catch {
      return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="mt-1 text-sm text-gray-500">
            AI-powered insights and downloadable reports
          </p>
        </div>
        <button
          onClick={handleGenerateReport}
          disabled={generateMutation.isLoading}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          {generateMutation.isLoading ? 'Generating...' : 'Generate New Report'}
        </button>
      </div>

      {/* Show selected report details */}
      {reportDetails && (
        <AIInsightsCard insights={parseInsights(reportDetails.insights as string | null)} />
      )}

      {/* Reports List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 bg-gray-200 rounded" />
              ))}
            </div>
          ) : reports && reports.length > 0 ? (
            <div className="space-y-4">
              {reports.map((report) => {
                const hasInsights = !!report.insights;
                return (
                  <div
                    key={report.id}
                    className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                      selectedReport === report.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-500'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`rounded-lg p-3 ${hasInsights ? 'bg-blue-50' : 'bg-gray-50'}`}>
                        <FileText className={`h-6 w-6 ${hasInsights ? 'text-blue-600' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {report.name}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(report.createdAt).toLocaleDateString()}
                        </p>
                        {hasInsights && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mt-1">
                            <Sparkles className="h-3 w-3" />
                            AI Insights Available
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {report.pdfUrl && (
                        <button className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                          <Download className="h-4 w-4" />
                          Download PDF
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedReport(selectedReport === report.id ? null : report.id)}
                        className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${
                          selectedReport === report.id
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        <Eye className="h-4 w-4" />
                        {selectedReport === report.id ? 'Hide' : 'View'} Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No reports yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Generate your first AI-powered report to get started
              </p>
              <div className="mt-6">
                <button
                  onClick={handleGenerateReport}
                  disabled={generateMutation.isLoading}
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  <Sparkles className="h-4 w-4" />
                  Generate Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

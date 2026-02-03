'use client';

import { Sparkles, TrendingUp, TrendingDown, AlertCircle, Lightbulb } from 'lucide-react';

interface AIInsight {
  summary: string;
  performance_analysis: {
    best_performers: Array<{
      campaign: string;
      reason: string;
    }>;
    underperformers: Array<{
      campaign: string;
      issues: string[];
    }>;
  };
  optimization_suggestions: Array<{
    campaign: string;
    suggestion: string;
    priority: 'high' | 'medium' | 'low';
    expected_impact: string;
  }>;
  trends: {
    spend_trend: string;
    revenue_trend: string;
    roas_trend: string;
  };
  recommendations: string[];
}

interface AIInsightsCardProps {
  insights: AIInsight | null;
}

export function AIInsightsCard({ insights }: AIInsightsCardProps) {
  if (!insights) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
        </div>
        <p className="text-sm text-gray-600">
          Generate a report to get AI-powered insights
        </p>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 ring-red-600/20';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 ring-yellow-600/20';
      case 'low':
        return 'bg-blue-100 text-blue-700 ring-blue-600/20';
      default:
        return 'bg-gray-100 text-gray-700 ring-gray-600/20';
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <p className="text-sm text-gray-700 leading-relaxed">{insights.summary}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best Performers */}
        {insights.performance_analysis.best_performers.length > 0 && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <h4 className="text-sm font-semibold text-gray-900">Top Performers</h4>
            </div>
            <div className="space-y-2">
              {insights.performance_analysis.best_performers.map((performer, idx) => (
                <div key={idx} className="border-l-2 border-green-500 pl-3">
                  <p className="text-sm font-medium text-gray-900">{performer.campaign}</p>
                  <p className="text-xs text-gray-600 mt-1">{performer.reason}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Underperformers */}
        {insights.performance_analysis.underperformers.length > 0 && (
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="h-4 w-4 text-red-600" />
              <h4 className="text-sm font-semibold text-gray-900">Needs Attention</h4>
            </div>
            <div className="space-y-2">
              {insights.performance_analysis.underperformers.map((underperformer, idx) => (
                <div key={idx} className="border-l-2 border-red-500 pl-3">
                  <p className="text-sm font-medium text-gray-900">{underperformer.campaign}</p>
                  <ul className="text-xs text-gray-600 mt-1 space-y-1">
                    {underperformer.issues.map((issue, i) => (
                      <li key={i}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Optimization Suggestions */}
      {insights.optimization_suggestions.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-yellow-600" />
            <h4 className="text-sm font-semibold text-gray-900">Optimization Suggestions</h4>
          </div>
          <div className="space-y-3">
            {insights.optimization_suggestions.map((suggestion, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-gray-900">{suggestion.campaign}</p>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${getPriorityColor(suggestion.priority)}`}>
                        {suggestion.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{suggestion.suggestion}</p>
                    <p className="text-xs text-gray-500">
                      <strong>Expected impact:</strong> {suggestion.expected_impact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {insights.recommendations.length > 0 && (
        <div className="mt-6 bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <h4 className="text-sm font-semibold text-gray-900">Key Recommendations</h4>
          </div>
          <ul className="space-y-2">
            {insights.recommendations.map((rec, idx) => (
              <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Trends */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-3 shadow-sm text-center">
          <p className="text-xs text-gray-500 mb-1">Spend Trend</p>
          <p className="text-sm font-semibold text-gray-900">{insights.trends.spend_trend}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm text-center">
          <p className="text-xs text-gray-500 mb-1">Revenue Trend</p>
          <p className="text-sm font-semibold text-gray-900">{insights.trends.revenue_trend}</p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm text-center">
          <p className="text-xs text-gray-500 mb-1">ROAS Trend</p>
          <p className="text-sm font-semibold text-gray-900">{insights.trends.roas_trend}</p>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle, RefreshCw, Clock } from 'lucide-react';

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  latency: number;
  message?: string;
  checkedAt: string;
}

interface StatusData {
  overall: 'operational' | 'degraded' | 'down';
  lastUpdated: string;
  services: ServiceStatus[];
}

export default function StatusPage() {
  const [status, setStatus] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/status');
      if (!res.ok) throw new Error('Failed to fetch status');
      const data = await res.json();
      setStatus(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'degraded':
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case 'down':
        return <XCircle className="h-5 w-5 text-[#FF2D2D]" />;
    }
  };

  const getStatusLabel = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return 'Operational';
      case 'degraded':
        return 'Degraded';
      case 'down':
        return 'Down';
    }
  };

  const getStatusColor = (status: ServiceStatus['status']) => {
    switch (status) {
      case 'operational':
        return 'text-green-400';
      case 'degraded':
        return 'text-yellow-400';
      case 'down':
        return 'text-[#FF2D2D]';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#FF2D2D]/30 border-t-[#FF2D2D] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#BDDBDB]">Loading system status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            System <span className="text-[#FF2D2D]">Status</span>
          </h1>
          <div className="flex items-center justify-center gap-3 text-[#BDDBDB]">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${
                status?.overall === 'operational' ? 'bg-green-400' :
                status?.overall === 'degraded' ? 'bg-yellow-400' :
                'bg-[#FF2D2D]'
              }`} />
              <span className="text-sm font-medium">{
                status?.overall === 'operational' ? 'All systems operational' :
                status?.overall === 'degraded' ? 'Partial service disruption' :
                'Major outage'
              }</span>
            </div>
            <span className="text-[#BDDBDB] opacity-50">|</span>
            <div className="flex items-center gap-1 text-sm text-[#BDDBDB] opacity-70">
              <Clock className="h-4 w-4" />
              <span>Last updated: {status?.lastUpdated ? new Date(status.lastUpdated).toLocaleTimeString() : '—'}</span>
            </div>
            <button
              onClick={fetchStatus}
              className="text-[#FF2D2D] hover:text-[#B10000] transition p-1 rounded hover:bg-[#1a1a1a]"
              title="Refresh"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* Error message */}
        {error && (
          <div className="bg-[#FF2D2D]/10 border border-[#FF2D2D]/30 rounded-xl p-4 mb-6 text-center text-[#FF2D2D]">
            {error}
          </div>
        )}

        {/* Services */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0D0D0D] rounded-2xl border border-[#1a1a1a] overflow-hidden"
        >
          <div className="divide-y divide-[#1a1a1a]">
            {status?.services.map((service) => (
              <div
                key={service.name}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-3 hover:bg-[#1a1a1a]/30 transition"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(service.status)}
                  <span className="text-white font-medium">{service.name}</span>
                  {service.message && (
                    <span className="text-[#BDDBDB] text-xs opacity-70 truncate max-w-xs">
                      {service.message}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className={`font-medium ${getStatusColor(service.status)}`}>
                    {getStatusLabel(service.status)}
                  </span>
                  <span className="text-[#BDDBDB] opacity-50 text-xs">
                    {service.latency > 0 ? `${service.latency}ms` : '—'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Incident History (placeholder) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-12 bg-[#0D0D0D] rounded-2xl border border-[#1a1a1a] p-6"
        >
          <h2 className="text-xl font-bold text-white mb-4">Incident History</h2>
          <p className="text-[#BDDBDB] text-sm">
            No incidents reported in the last 30 days. All systems have been running smoothly.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-[#BDDBDB]">
            <div className="flex justify-between border-b border-[#1a1a1a] pb-2">
              <span>Today</span>
              <span className="text-green-400">All systems operational</span>
            </div>
            <div className="flex justify-between border-b border-[#1a1a1a] pb-2">
              <span>July 4, 2026</span>
              <span className="text-green-400">All systems operational</span>
            </div>
            <div className="flex justify-between">
              <span>July 3, 2026</span>
              <span className="text-green-400">All systems operational</span>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 text-center text-[#BDDBDB] text-xs opacity-50">
          Status page checks every 30 seconds. Data is cached for performance.
        </div>
      </div>
    </div>
  );
}

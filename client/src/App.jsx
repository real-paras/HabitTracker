import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle, Flame, Calendar, RefreshCw } from 'lucide-react';
import api from './services/api';

export default function App() {
  const [serverHealth, setServerHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/health');
      setServerHealth(response.data);
    } catch (err) {
      setError(err.message || 'Could not reach backend API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-slate-200">
      <div className="max-w-md w-full bg-[#161b22] border border-[#30363d] rounded-xl p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Habit Tracker</h1>
            <p className="text-xs text-slate-400">PWA Client • Step 1.3 Online</p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Backend Connection
            </span>
            <button
              onClick={checkHealth}
              disabled={loading}
              className="p-1 text-slate-400 hover:text-white transition disabled:opacity-50"
              title="Refresh status"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {loading && (
            <p className="text-sm text-slate-400">Connecting to API server...</p>
          )}

          {error && (
            <div className="text-xs bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded">
              <p className="font-semibold">Connection Failed</p>
              <p>{error}</p>
              <p className="mt-1 text-[11px] text-slate-500">Ensure the backend is running on port 5000.</p>
            </div>
          )}

          {serverHealth && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                <span>Express + MongoDB Active</span>
              </div>
              <div className="text-xs text-slate-400 space-y-1 pl-6">
                <div>Uptime: {serverHealth.uptimeSeconds}s</div>
                <div>Status: {serverHealth.status}</div>
              </div>
            </div>
          )}
        </div>

        {/* Visual Heatmap Preview Mock */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 font-medium">Grid Engine Preview</span>
            <span className="text-[10px] text-slate-500">52-week mockup</span>
          </div>
          <div className="grid grid-flow-col grid-rows-4 gap-1 overflow-x-auto p-2 bg-[#0d1117] border border-[#30363d] rounded-lg">
            {Array.from({ length: 32 }).map((_, i) => {
              const shades = ['bg-gh-empty', 'bg-gh-l1', 'bg-gh-l2', 'bg-gh-l3', 'bg-gh-l4'];
              const randomShade = shades[i % shades.length];
              return (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-sm ${randomShade} border border-[#21262d]/50`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
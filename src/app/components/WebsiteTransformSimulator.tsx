"use client";

import { useRef } from "react";
import {
  Globe,
  Search,
  TrendingUp,
  BarChart3,
  Activity,
  Code2,
  ArrowUp,
  CheckCircle2,
  Wifi,
  Bell,
  Share2,
  Heart,
  MessageCircle,
  Eye,
  Cpu,
  Database,
  Lock,
  Layers,
} from "lucide-react";

type Stage = "site" | "seo" | "marketing" | "monitoring" | "software" | string | null;

export function WebsiteTransformSimulator({ stage, children }: { stage: Stage; children?: React.ReactNode }) {
  const prevStageRef = useRef<Stage>(null);

  if (prevStageRef.current !== stage) {
    prevStageRef.current = stage;
  }

  const urlMap: Record<string, string> = {
    site: "yourbusiness.co.uk",
    seo: "google.com/search",
    marketing: "dashboard.ads",
    monitoring: "status.yourbusiness.co.uk",
    software: "app.yourbusiness.co.uk",
  };

  const urlText = stage ? urlMap[stage] || "Search or enter website" : "Search or enter website";
  const isActive = stage && stage in urlMap;

  return (
    <div className="relative mx-auto w-[260px] lg:w-auto lg:max-w-[17rem]">
      {/* Phone Frame */}
      <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-zinc-900 dark:border-zinc-700 bg-zinc-900 dark:bg-zinc-800 shadow-2xl shadow-zinc-900/40 dark:shadow-black/50">

        {/* Notch / Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 w-24 h-6 bg-zinc-900 dark:bg-zinc-700 rounded-b-2xl" />

        {/* Status Bar */}
        <div className="relative bg-zinc-900 dark:bg-zinc-800 px-6 pt-2 pb-1 flex items-end justify-between z-40">
          <span className="text-[9px] font-semibold text-white/70">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-[2px]">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-[3px] rounded-full bg-white/70" style={{ height: `${i * 2 + 2}px` }} />
              ))}
            </div>
            <div className="h-2.5 w-5 rounded-sm border border-white/70 flex items-center justify-end pr-[1px] ml-1">
              <div className="h-1.5 w-3 rounded-[1px] bg-emerald-400" />
            </div>
          </div>
        </div>

        {/* Safari-style URL bar */}
        <div className="bg-zinc-900 dark:bg-zinc-800 px-3 pb-2">
          <div className="h-7 rounded-xl bg-zinc-800 dark:bg-zinc-700 flex items-center justify-center gap-1.5 px-3">
            <div>
              {isActive ? (
                <Globe className="h-3 w-3 text-emerald-400 shrink-0" />
              ) : (
                <Search className="h-3 w-3 text-zinc-500 shrink-0" />
              )}
            </div>
            <span className={`text-[10px] font-medium url-text-fade ${isActive ? "text-white/90" : "text-zinc-500"}`}>
              {urlText}
            </span>
          </div>
        </div>

        {/* Screen Content */}
        <div className="relative bg-zinc-50 dark:bg-zinc-900 h-[380px] max-h-[calc(100svh-280px)] lg:h-[420px] lg:max-h-none overflow-hidden">

          {/* ====== SITE ====== */}
          <div
            className="absolute inset-0 sim-stage"
            style={{ opacity: stage === "site" ? 1 : 0, pointerEvents: stage === "site" ? "auto" : "none" }}
          >
            {/* Nav */}
            <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="h-4 w-4 rounded bg-coral-600" />
                  <span className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200">YourBrand</span>
                </div>
                <div className="h-5 w-14 bg-coral-600 rounded-md flex items-center justify-center">
                  <span className="text-[7px] text-white font-bold">Contact</span>
                </div>
              </div>
            </div>

            <div className="p-3">
              {/* Hero section */}
              <div className="bg-gradient-to-br from-coral-50 dark:from-coral-950/40 to-pink-50 dark:to-pink-950/40 rounded-xl p-4 mb-2.5">
                <div className="space-y-1.5 mb-2.5">
                  <div className="h-2.5 w-3/4 rounded bg-zinc-800 dark:bg-zinc-200" />
                  <div className="h-2.5 w-1/2 rounded bg-coral-600" />
                </div>
                <div className="space-y-1 mb-2.5">
                  <div className="h-1.5 w-full rounded bg-zinc-300 dark:bg-zinc-600" />
                  <div className="h-1.5 w-4/5 rounded bg-zinc-300 dark:bg-zinc-600" />
                </div>
                <div className="h-6 w-16 rounded-lg bg-coral-600 flex items-center justify-center">
                  <span className="text-[7px] text-white font-bold">Get Started</span>
                </div>
              </div>

              {/* Feature cards */}
              <div className="grid grid-cols-3 gap-1.5 mb-2.5">
                {[
                  { icon: Activity, label: "Fast", color: "text-coral-500" },
                  { icon: Layers, label: "Modern", color: "text-pink-500" },
                  { icon: TrendingUp, label: "Converts", color: "text-emerald-500" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 p-2 text-center">
                    <item.icon className={`h-4 w-4 mx-auto mb-1 ${item.color}`} />
                    <div className="text-[7px] font-bold text-zinc-600 dark:text-zinc-300">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 p-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-5 w-5 rounded-full bg-coral-100 dark:bg-coral-900" />
                  <div className="flex gap-[2px]">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-2 w-2 rounded-full bg-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
                  <div className="h-1.5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
                </div>
              </div>
            </div>

            {/* Performance badge */}
            <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 p-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">Performance</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">0.6s</p>
                  <p className="text-[7px] text-emerald-600/70">Load time</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">100</p>
                  <p className="text-[7px] text-emerald-600/70">Lighthouse</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">A+</p>
                  <p className="text-[7px] text-emerald-600/70">Security</p>
                </div>
              </div>
            </div>
          </div>

          {/* ====== SEO ====== */}
          <div
            className="absolute inset-0 sim-stage"
            style={{ opacity: stage === "seo" ? 1 : 0, pointerEvents: stage === "seo" ? "auto" : "none" }}
          >
            {/* Google-style search bar */}
            <div className="px-3 pt-3 pb-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
                <Search className="h-3 w-3 text-zinc-400 shrink-0" />
                <span className="text-[9px] text-zinc-700 dark:text-zinc-300 font-medium">plumber near me</span>
              </div>
              <div className="flex gap-3 px-2 mt-2">
                <span className="text-[8px] font-bold text-coral-600 border-b-2 border-coral-600 pb-1">All</span>
                <span className="text-[8px] text-zinc-400 pb-1">Maps</span>
                <span className="text-[8px] text-zinc-400 pb-1">Images</span>
              </div>
            </div>

            <div className="px-3 space-y-2.5">
              {/* #1 Result - YOUR SITE (highlighted) */}
              <div className="rounded-lg bg-coral-50/60 dark:bg-coral-950/30 border border-coral-200 dark:border-coral-800 p-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="h-3.5 w-3.5 rounded bg-coral-600 flex items-center justify-center">
                    <span className="text-[6px] text-white font-bold">Y</span>
                  </div>
                  <span className="text-[8px] text-zinc-500 dark:text-zinc-400">yourbusiness.co.uk</span>
                </div>
                <p className="text-[10px] font-bold text-blue-700 dark:text-blue-400 mb-0.5">YourBusiness | Trusted Local Plumber</p>
                <p className="text-[8px] text-zinc-500 dark:text-zinc-400 leading-relaxed">5-star rated. Fast response times. Free quotes for all plumbing & heating...</p>
                <div className="flex items-center gap-1 mt-1.5">
                  <div className="flex gap-[1px]">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    ))}
                  </div>
                  <span className="text-[7px] text-zinc-400">4.9 (127 reviews)</span>
                </div>
              </div>

              {/* #2 Result */}
              <div className="rounded-lg p-2.5 opacity-50">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="h-3.5 w-3.5 rounded bg-zinc-300 dark:bg-zinc-600" />
                  <span className="text-[8px] text-zinc-400">competitor-one.com</span>
                </div>
                <div className="h-2 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700 mb-1" />
                <div className="h-1.5 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
              </div>

              {/* #3 Result */}
              <div className="rounded-lg p-2.5 opacity-30">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="h-3.5 w-3.5 rounded bg-zinc-300 dark:bg-zinc-600" />
                  <span className="text-[8px] text-zinc-400">another-plumber.co.uk</span>
                </div>
                <div className="h-2 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700 mb-1" />
                <div className="h-1.5 w-full rounded bg-zinc-100 dark:bg-zinc-800" />
              </div>
            </div>

            {/* Rankings badge */}
            <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 p-3">
              <div className="flex items-center gap-2 mb-2">
                <ArrowUp className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <p className="text-[10px] font-bold text-blue-700 dark:text-blue-300">Ranking improvements</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-[11px] font-bold text-blue-700 dark:text-blue-300">#1</p>
                  <p className="text-[7px] text-blue-600/70">Local rank</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-blue-700 dark:text-blue-300">+340%</p>
                  <p className="text-[7px] text-blue-600/70">Organic traffic</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-blue-700 dark:text-blue-300">28</p>
                  <p className="text-[7px] text-blue-600/70">Keywords pg.1</p>
                </div>
              </div>
            </div>
          </div>

          {/* ====== MARKETING ====== */}
          <div
            className="absolute inset-0 sim-stage"
            style={{ opacity: stage === "marketing" ? 1 : 0, pointerEvents: stage === "marketing" ? "auto" : "none" }}
          >
            {/* Dashboard header */}
            <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200">Campaign Dashboard</span>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[8px] text-emerald-600 dark:text-emerald-400 font-medium">Live</span>
                </div>
              </div>
            </div>

            <div className="p-3 space-y-2">
              {/* Engagement chart mockup */}
              <div className="rounded-lg bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 p-2.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[8px] font-bold text-zinc-600 dark:text-zinc-300">Reach & Engagement</span>
                  <span className="text-[7px] text-emerald-500 font-bold">+67% this week</span>
                </div>
                {/* Mini bar chart */}
                <div className="flex items-end gap-[3px] h-12">
                  {[35, 45, 30, 55, 40, 70, 85, 60, 75, 90, 65, 95].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm ${i >= 9 ? "bg-coral-500" : "bg-coral-200 dark:bg-coral-800"}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Platform stats */}
              <div className="grid grid-cols-2 gap-1.5">
                <div className="rounded-lg bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 p-2">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Share2 className="h-3 w-3 text-blue-500" />
                    <span className="text-[7px] font-bold text-zinc-500">Social</span>
                  </div>
                  <p className="text-[12px] font-bold text-zinc-800 dark:text-zinc-200">12.4k</p>
                  <p className="text-[7px] text-emerald-500 font-medium">+23% reach</p>
                </div>
                <div className="rounded-lg bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 p-2">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Eye className="h-3 w-3 text-purple-500" />
                    <span className="text-[7px] font-bold text-zinc-500">Impressions</span>
                  </div>
                  <p className="text-[12px] font-bold text-zinc-800 dark:text-zinc-200">48.2k</p>
                  <p className="text-[7px] text-emerald-500 font-medium">+41% monthly</p>
                </div>
              </div>

              {/* Engagement metrics */}
              <div className="rounded-lg bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 p-2.5">
                <span className="text-[8px] font-bold text-zinc-600 dark:text-zinc-300 mb-2 block">Top performing content</span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded bg-gradient-to-br from-coral-400 to-pink-500" />
                      <div>
                        <div className="h-1.5 w-16 rounded bg-zinc-300 dark:bg-zinc-600" />
                        <div className="h-1 w-10 rounded bg-zinc-200 dark:bg-zinc-700 mt-0.5" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        <Heart className="h-2.5 w-2.5 text-red-400" />
                        <span className="text-[7px] text-zinc-500">342</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <MessageCircle className="h-2.5 w-2.5 text-zinc-400" />
                        <span className="text-[7px] text-zinc-500">28</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-400 to-indigo-500" />
                      <div>
                        <div className="h-1.5 w-14 rounded bg-zinc-300 dark:bg-zinc-600" />
                        <div className="h-1 w-8 rounded bg-zinc-200 dark:bg-zinc-700 mt-0.5" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        <Heart className="h-2.5 w-2.5 text-red-400" />
                        <span className="text-[7px] text-zinc-500">218</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <MessageCircle className="h-2.5 w-2.5 text-zinc-400" />
                        <span className="text-[7px] text-zinc-500">15</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ROI badge */}
            <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 p-3">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <p className="text-[10px] font-bold text-purple-700 dark:text-purple-300">Campaign ROI</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-[11px] font-bold text-purple-700 dark:text-purple-300">4.2x</p>
                  <p className="text-[7px] text-purple-600/70">Return</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-purple-700 dark:text-purple-300">+67%</p>
                  <p className="text-[7px] text-purple-600/70">Engagement</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-purple-700 dark:text-purple-300">3.2k</p>
                  <p className="text-[7px] text-purple-600/70">Leads/mo</p>
                </div>
              </div>
            </div>
          </div>

          {/* ====== MONITORING ====== */}
          <div
            className="absolute inset-0 sim-stage"
            style={{ opacity: stage === "monitoring" ? 1 : 0, pointerEvents: stage === "monitoring" ? "auto" : "none" }}
          >
            {/* Dashboard header */}
            <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200">Status Monitor</span>
                <div className="flex items-center gap-1.5">
                  <Bell className="h-3 w-3 text-zinc-400" />
                  <Wifi className="h-3 w-3 text-emerald-500" />
                </div>
              </div>
            </div>

            <div className="p-3 space-y-2">
              {/* Uptime header */}
              <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-2.5 text-center">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">All Systems Operational</p>
                <p className="text-[8px] text-emerald-600/70 mt-0.5">Last checked 12s ago</p>
              </div>

              {/* Service statuses */}
              <div className="rounded-lg bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 p-2.5 space-y-2">
                {[
                  { name: "Website", status: "Operational", ms: "142ms", ok: true },
                  { name: "API", status: "Operational", ms: "89ms", ok: true },
                  { name: "Database", status: "Operational", ms: "23ms", ok: true },
                  { name: "CDN", status: "Operational", ms: "12ms", ok: true },
                ].map((service) => (
                  <div key={service.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className={`h-1.5 w-1.5 rounded-full ${service.ok ? "bg-emerald-400" : "bg-red-400"}`} />
                      <span className="text-[9px] font-medium text-zinc-700 dark:text-zinc-300">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[7px] text-zinc-400 font-mono">{service.ms}</span>
                      <span className={`text-[7px] font-medium ${service.ok ? "text-emerald-500" : "text-red-500"}`}>
                        {service.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Uptime bars */}
              <div className="rounded-lg bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 p-2.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[8px] font-bold text-zinc-600 dark:text-zinc-300">90-day uptime</span>
                  <span className="text-[8px] font-bold text-emerald-500">99.98%</span>
                </div>
                <div className="flex gap-[1px]">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-4 rounded-[1px] ${i === 18 ? "bg-amber-400" : "bg-emerald-400"}`}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[6px] text-zinc-400">90 days ago</span>
                  <span className="text-[6px] text-zinc-400">Today</span>
                </div>
              </div>
            </div>

            {/* Alerts badge */}
            <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 p-3">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">Monitoring stats</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">99.98%</p>
                  <p className="text-[7px] text-emerald-600/70">Uptime</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">&lt;200ms</p>
                  <p className="text-[7px] text-emerald-600/70">Avg response</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300">24/7</p>
                  <p className="text-[7px] text-emerald-600/70">Alerting</p>
                </div>
              </div>
            </div>
          </div>

          {/* ====== SOFTWARE ====== */}
          <div
            className="absolute inset-0 sim-stage"
            style={{ opacity: stage === "software" ? 1 : 0, pointerEvents: stage === "software" ? "auto" : "none" }}
          >
            {/* App header */}
            <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Code2 className="h-3.5 w-3.5 text-coral-600" />
                  <span className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200">Custom App</span>
                </div>
                <div className="flex items-center gap-1">
                  <Lock className="h-3 w-3 text-emerald-500" />
                </div>
              </div>
            </div>

            <div className="p-3 space-y-2">
              {/* Dashboard overview */}
              <div className="grid grid-cols-2 gap-1.5">
                <div className="rounded-lg bg-gradient-to-br from-coral-500 to-pink-600 p-2.5 text-white">
                  <Cpu className="h-3.5 w-3.5 mb-1 opacity-80" />
                  <p className="text-[12px] font-bold">1,247</p>
                  <p className="text-[7px] opacity-70">Active users</p>
                </div>
                <div className="rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 text-white">
                  <Database className="h-3.5 w-3.5 mb-1 opacity-80" />
                  <p className="text-[12px] font-bold">98.4%</p>
                  <p className="text-[7px] opacity-70">Efficiency</p>
                </div>
              </div>

              {/* Data table */}
              <div className="rounded-lg bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 p-2.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[8px] font-bold text-zinc-600 dark:text-zinc-300">Recent Activity</span>
                  <span className="text-[7px] text-coral-500 font-medium">View all</span>
                </div>
                <div className="space-y-1.5">
                  {[
                    { action: "Order #4821 processed", time: "2m ago", color: "bg-emerald-400" },
                    { action: "New user registered", time: "5m ago", color: "bg-blue-400" },
                    { action: "Report generated", time: "12m ago", color: "bg-purple-400" },
                    { action: "Payment received", time: "18m ago", color: "bg-amber-400" },
                  ].map((item) => (
                    <div key={item.action} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className={`h-1.5 w-1.5 rounded-full ${item.color}`} />
                        <span className="text-[8px] text-zinc-600 dark:text-zinc-400">{item.action}</span>
                      </div>
                      <span className="text-[7px] text-zinc-400">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workflow visual */}
              <div className="rounded-lg bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 p-2.5">
                <span className="text-[8px] font-bold text-zinc-600 dark:text-zinc-300 mb-2 block">Workflow</span>
                <div className="flex items-center justify-between">
                  {["Input", "Process", "Output"].map((step, i) => (
                    <div key={step} className="flex items-center gap-1">
                      <div className={`h-6 w-12 rounded flex items-center justify-center text-[6px] font-bold text-white ${
                        i === 0 ? "bg-coral-500" : i === 1 ? "bg-blue-500" : "bg-emerald-500"
                      }`}>
                        {step}
                      </div>
                      {i < 2 && <div className="h-[1px] w-3 bg-zinc-300 dark:bg-zinc-600" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Built for you badge */}
            <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-coral-50 dark:bg-coral-950/50 border border-coral-200 dark:border-coral-800 p-3">
              <div className="flex items-center gap-2 mb-2">
                <Code2 className="h-4 w-4 text-coral-600 dark:text-coral-400 shrink-0" />
                <p className="text-[10px] font-bold text-coral-700 dark:text-coral-300">Built for your business</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-[11px] font-bold text-coral-700 dark:text-coral-300">Custom</p>
                  <p className="text-[7px] text-coral-600/70">No templates</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-coral-700 dark:text-coral-300">Scalable</p>
                  <p className="text-[7px] text-coral-600/70">Grows with you</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-coral-700 dark:text-coral-300">Owned</p>
                  <p className="text-[7px] text-coral-600/70">100% yours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Home indicator bar */}
        <div className="bg-zinc-900 dark:bg-zinc-800 py-2 flex justify-center">
          <div className="h-1 w-28 rounded-full bg-white/30" />
        </div>
      </div>

      {/* Children overlay */}
      {children && (
        <div className="absolute bottom-8 inset-x-2 z-30">
          {children}
        </div>
      )}
    </div>
  );
}

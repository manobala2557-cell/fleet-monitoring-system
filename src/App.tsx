import { useState } from 'react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const VEHICLES = [
  { id: 'VH-001', name: 'Truck Alpha', driver: 'Marcus Webb', status: 'active', fuel: 78, location: 'I-95 North, Exit 42', speed: 62, mileage: 48320 },
  { id: 'VH-002', name: 'Van Beta', driver: 'Lena Torres', status: 'active', fuel: 45, location: 'Route 9, Woodbridge', speed: 38, mileage: 31540 },
  { id: 'VH-003', name: 'Truck Gamma', driver: 'Jamal Reid', status: 'idle', fuel: 91, location: 'Depot — Bay 3', speed: 0, mileage: 72100 },
  { id: 'VH-004', name: 'Van Delta', driver: 'Sofia Park', status: 'active', fuel: 23, location: 'Garden State Pkwy', speed: 71, mileage: 19870 },
  { id: 'VH-005', name: 'Sedan Epsilon', driver: 'Ryan Osei', status: 'alert', fuel: 12, location: 'Turnpike MM 127', speed: 0, mileage: 58430 },
]

const ALERTS = [
  { id: 1, vehicle: 'VH-005', type: 'Low Fuel', detail: 'Below 15% threshold', time: '3 min ago', severity: 'critical' },
  { id: 2, vehicle: 'VH-004', type: 'Low Fuel', detail: 'Below 25% threshold', time: '11 min ago', severity: 'warning' },
  { id: 3, vehicle: 'VH-002', type: 'Speed Limit', detail: 'Exceeded zone limit by 8 mph', time: '24 min ago', severity: 'warning' },
  { id: 4, vehicle: 'VH-001', type: 'Scheduled Service', detail: 'Oil change due in 340 mi', time: '1 hr ago', severity: 'info' },
]

const HISTORY = [
  { id: 'T-1041', vehicle: 'VH-001', driver: 'Marcus Webb', date: 'Aug 9, 2026', start: '07:14', end: '14:32', distance: '218 mi', avgSpeed: '54 mph', fuelUsed: '9.2 gal', status: 'completed' },
  { id: 'T-1040', vehicle: 'VH-002', driver: 'Lena Torres', date: 'Aug 9, 2026', start: '08:00', end: '—', distance: '87 mi', avgSpeed: '41 mph', fuelUsed: '3.4 gal', status: 'in-progress' },
  { id: 'T-1039', vehicle: 'VH-003', driver: 'Jamal Reid', date: 'Aug 8, 2026', start: '06:50', end: '15:10', distance: '302 mi', avgSpeed: '61 mph', fuelUsed: '12.8 gal', status: 'completed' },
  { id: 'T-1038', vehicle: 'VH-004', driver: 'Sofia Park', date: 'Aug 8, 2026', start: '09:30', end: '17:45', distance: '194 mi', avgSpeed: '48 mph', fuelUsed: '8.1 gal', status: 'completed' },
  { id: 'T-1037', vehicle: 'VH-005', driver: 'Ryan Osei', date: 'Aug 7, 2026', start: '07:00', end: '13:20', distance: '141 mi', avgSpeed: '52 mph', fuelUsed: '6.0 gal', status: 'completed' },
  { id: 'T-1036', vehicle: 'VH-001', driver: 'Marcus Webb', date: 'Aug 7, 2026', start: '06:30', end: '14:00', distance: '261 mi', avgSpeed: '57 mph', fuelUsed: '10.9 gal', status: 'completed' },
]

const REPORT_WEEKLY = [
  { day: 'Mon', distance: 312, fuel: 14.2, trips: 5 },
  { day: 'Tue', distance: 287, fuel: 12.8, trips: 4 },
  { day: 'Wed', distance: 401, fuel: 18.1, trips: 7 },
  { day: 'Thu', distance: 358, fuel: 16.4, trips: 6 },
  { day: 'Fri', distance: 290, fuel: 13.0, trips: 4 },
  { day: 'Sat', distance: 142, fuel: 6.6, trips: 2 },
  { day: 'Sun', distance: 98, fuel: 4.5, trips: 1 },
]

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: GridIcon },
  { id: 'tracking', label: 'Live Tracking', icon: MapPinIcon },
  { id: 'history', label: 'History', icon: ClockIcon },
  { id: 'reports', label: 'Reports', icon: ChartIcon },
  { id: 'settings', label: 'Settings', icon: GearIcon },
]

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeNav, setActiveNav] = useState('dashboard')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (email === 'admin@fleetview.io' && password === 'demo1234') {
      setIsLoggedIn(true)
      setLoginError('')
    } else {
      setLoginError('Invalid credentials. Try admin@fleetview.io / demo1234')
    }
  }

  const activeVehicles = VEHICLES.filter(v => v.status === 'active').length
  const totalAlerts = ALERTS.length
  const criticalAlerts = ALERTS.filter(a => a.severity === 'critical').length

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-slate-900 text-slate-100">

      {/* ── Login Modal ── */}
      {!isLoggedIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm">
          <div className="w-full max-w-sm mx-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
                <TruckIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-lg font-semibold text-white tracking-tight">FleetView</div>
                <div className="text-xs text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Fleet Intelligence Platform</div>
              </div>
            </div>
            <div className="bg-slate-800 border border-slate-700/60 rounded-2xl p-8 shadow-2xl">
              <h1 style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-2xl font-semibold text-white mb-1">Sign in</h1>
              <p className="text-sm text-slate-400 mb-6">Access your fleet dashboard</p>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@fleetview.io"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all" />
                </div>
                {loginError && <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/50 rounded-lg px-3 py-2">{loginError}</p>}
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-lg py-2.5 transition-colors mt-2">Sign in</button>
              </form>
              <div className="mt-5 pt-5 border-t border-slate-700/50">
                <p className="text-xs text-slate-500 text-center">Demo: admin@fleetview.io / demo1234</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── App Shell ── */}
      <div className="flex h-screen overflow-hidden">

        {/* Sidebar */}
        <aside className="w-56 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
          <div className="px-5 pt-6 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center shrink-0">
                <TruckIcon className="w-4 h-4 text-white" />
              </div>
              <span style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-base font-semibold text-white tracking-tight">FleetView</span>
            </div>
          </div>

          {isLoggedIn && (
            <div className="mx-4 mb-4 px-3 py-2 rounded-lg bg-emerald-950/50 border border-emerald-900/40 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs text-emerald-400 font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>LIVE</span>
              <span className="text-xs text-emerald-600 ml-auto">{activeVehicles} online</span>
            </div>
          )}

          <nav className="flex-1 px-3 space-y-0.5">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon
              const active = activeNav === item.id
              return (
                <button key={item.id} onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left ${active ? 'bg-blue-600/20 text-blue-400 font-medium' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}>
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-blue-400' : ''}`} />
                  {item.label}
                  {item.id === 'tracking' && <span className="ml-auto text-xs bg-blue-600/30 text-blue-400 px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{activeVehicles}</span>}
                  {item.id === 'reports' && totalAlerts > 0 && <span className="ml-auto text-xs bg-amber-600/20 text-amber-400 px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{totalAlerts}</span>}
                </button>
              )
            })}
          </nav>

          <div className="p-3 border-t border-slate-800">
            <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors group">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xs font-semibold text-white shrink-0">AD</div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-200 truncate">Admin User</div>
                <div className="text-xs text-slate-500 truncate">admin@fleetview.io</div>
              </div>
              <button onClick={() => setIsLoggedIn(false)} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-red-400" title="Sign out">
                <LogoutIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-950 overflow-hidden">
          {/* Topbar */}
          <header className="h-14 border-b border-slate-800 flex items-center px-6 gap-4 shrink-0">
            <h2 style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-base font-semibold text-white">
              {NAV_ITEMS.find(n => n.id === activeNav)?.label}
            </h2>
            <div className="ml-auto flex items-center gap-3">
              <div className="relative">
                <input type="text" placeholder="Search vehicles…"
                  className="bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500/60 w-44 transition-all" />
                <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              </div>
              <div className="relative">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-slate-200 transition-all">
                  <BellIcon className="w-4 h-4" />
                </button>
                {totalAlerts > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">{totalAlerts}</span>}
              </div>
              <div className="text-xs text-slate-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </header>

          {/* Tab views */}
          <div className="flex-1 overflow-y-auto">
            {activeNav === 'dashboard' && <DashboardView />}
            {activeNav === 'tracking' && <TrackingView />}
            {activeNav === 'history' && <HistoryView />}
            {activeNav === 'reports' && <ReportsView />}
            {activeNav === 'settings' && <SettingsView />}
          </div>
        </main>
      </div>
    </div>
  )
}

// ─── Dashboard View ────────────────────────────────────────────────────────────

function DashboardView() {
  const activeVehicles = VEHICLES.filter(v => v.status === 'active').length
  const avgFuel = Math.round(VEHICLES.reduce((s, v) => s + v.fuel, 0) / VEHICLES.length)
  const criticalAlerts = ALERTS.filter(a => a.severity === 'critical').length
  const totalAlerts = ALERTS.length
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null)
  const [mapDot, setMapDot] = useState({ x: 0, y: 0, visible: false })

  return (
    <div className="p-6 space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Active Vehicles" value={`${activeVehicles} / ${VEHICLES.length}`} sub="3 in transit · 1 idle · 1 alert" icon={<TruckIcon className="w-4 h-4" />} accent="blue" />
        <StatCard label="Avg Fuel Level" value={`${avgFuel}%`} sub="1 vehicle critical" icon={<FuelIcon className="w-4 h-4" />} accent="emerald" gauge={avgFuel} />
        <StatCard label="Total Alerts" value={String(totalAlerts)} sub={`${criticalAlerts} critical · ${totalAlerts - criticalAlerts} warnings`} icon={<BellIcon className="w-4 h-4" />} accent="amber" />
        <StatCard label="Today's Distance" value="1,284 mi" sub="Cumulative across fleet" icon={<RouteIcon className="w-4 h-4" />} accent="violet" />
      </div>

      {/* Map + Alerts */}
      <div className="grid grid-cols-3 gap-4">
        <MapPanel
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          mapDot={mapDot}
          setMapDot={setMapDot}
          compact
        />
        <div className="bg-slate-900 border border-slate-800 rounded-xl flex flex-col" style={{ height: 380 }}>
          <div className="px-4 py-3 border-b border-slate-800 flex items-center gap-2">
            <BellIcon className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-slate-200">Recent Alerts</span>
            <span className="ml-auto text-xs bg-red-900/40 text-red-400 border border-red-900/40 px-2 py-0.5 rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{criticalAlerts} critical</span>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {ALERTS.map(alert => (
              <div key={alert.id} className="px-4 py-3 hover:bg-slate-800/40 transition-colors">
                <div className="flex items-start gap-2.5">
                  <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${alert.severity === 'critical' ? 'bg-red-500' : alert.severity === 'warning' ? 'bg-amber-400' : 'bg-blue-400'}`} />
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-slate-200">{alert.type}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{alert.vehicle} · {alert.detail}</div>
                    <div className="text-xs text-slate-600 mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{alert.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fleet table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center gap-3">
          <TruckIcon className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-200">Fleet Status</span>
          <span className="text-xs text-slate-500">{VEHICLES.length} vehicles</span>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-800">
              {['Vehicle', 'Driver', 'Status', 'Location', 'Speed', 'Fuel'].map(h => (
                <th key={h} className="px-5 py-2.5 text-left text-slate-500 font-medium uppercase tracking-wider text-[10px]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {VEHICLES.map((v, i) => (
              <tr key={v.id} className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${i === VEHICLES.length - 1 ? 'border-0' : ''}`}>
                <td className="px-5 py-3">
                  <div className="font-medium text-slate-200">{v.name}</div>
                  <div className="text-slate-600 mt-0.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{v.id}</div>
                </td>
                <td className="px-5 py-3 text-slate-400">{v.driver}</td>
                <td className="px-5 py-3"><StatusBadge status={v.status} /></td>
                <td className="px-5 py-3 text-slate-400 max-w-[160px] truncate">{v.location}</td>
                <td className="px-5 py-3 text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{v.speed > 0 ? `${v.speed} mph` : '—'}</td>
                <td className="px-5 py-3"><FuelBar pct={v.fuel} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Live Tracking View ────────────────────────────────────────────────────────

function TrackingView() {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(VEHICLES[0].id)
  const [mapDot, setMapDot] = useState({ x: 0, y: 0, visible: false })
  const selected = VEHICLES.find(v => v.id === selectedVehicle) ?? null

  return (
    <div className="flex h-full">
      {/* Vehicle list sidebar */}
      <div className="w-64 border-r border-slate-800 flex flex-col bg-slate-900 shrink-0">
        <div className="px-4 py-3 border-b border-slate-800">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">All Vehicles</span>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
          {VEHICLES.map(v => {
            const color = v.status === 'active' ? '#22c55e' : v.status === 'alert' ? '#ef4444' : '#94a3b8'
            return (
              <button key={v.id} onClick={() => setSelectedVehicle(v.id)}
                className={`w-full text-left px-4 py-3.5 hover:bg-slate-800/60 transition-colors ${selectedVehicle === v.id ? 'bg-blue-600/10 border-l-2 border-blue-500' : 'border-l-2 border-transparent'}`}>
                <div className="flex items-center gap-2.5 mb-1">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
                  <span className="text-sm font-medium text-slate-200">{v.name}</span>
                </div>
                <div className="text-xs text-slate-500 ml-4.5">{v.driver}</div>
                <div className="text-xs text-slate-600 mt-0.5 ml-4.5 truncate">{v.location}</div>
                {v.speed > 0 && <div className="text-xs text-blue-400 mt-0.5 ml-4.5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{v.speed} mph</div>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Map full */}
      <div className="flex-1 flex flex-col">
        <MapPanel
          selectedVehicle={selectedVehicle}
          setSelectedVehicle={setSelectedVehicle}
          mapDot={mapDot}
          setMapDot={setMapDot}
          fullHeight
        />

        {/* Detail strip */}
        {selected && (
          <div className="h-28 border-t border-slate-800 bg-slate-900 flex items-center px-6 gap-8 shrink-0">
            <div>
              <div className="text-xs text-slate-500 mb-0.5 uppercase tracking-wider">Vehicle</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-sm font-semibold text-white">{selected.name}</div>
              <div className="text-xs text-slate-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{selected.id}</div>
            </div>
            <div className="h-12 w-px bg-slate-800" />
            <div>
              <div className="text-xs text-slate-500 mb-0.5 uppercase tracking-wider">Driver</div>
              <div className="text-sm font-medium text-slate-200">{selected.driver}</div>
            </div>
            <div className="h-12 w-px bg-slate-800" />
            <div>
              <div className="text-xs text-slate-500 mb-0.5 uppercase tracking-wider">Status</div>
              <StatusBadge status={selected.status} />
            </div>
            <div className="h-12 w-px bg-slate-800" />
            <div>
              <div className="text-xs text-slate-500 mb-0.5 uppercase tracking-wider">Speed</div>
              <div className="text-sm font-medium text-slate-200" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{selected.speed > 0 ? `${selected.speed} mph` : 'Stopped'}</div>
            </div>
            <div className="h-12 w-px bg-slate-800" />
            <div>
              <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Fuel</div>
              <FuelBar pct={selected.fuel} />
            </div>
            <div className="h-12 w-px bg-slate-800" />
            <div>
              <div className="text-xs text-slate-500 mb-0.5 uppercase tracking-wider">Location</div>
              <div className="text-sm text-slate-300 max-w-[200px]">{selected.location}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Map Panel (shared) ────────────────────────────────────────────────────────

function MapPanel({ selectedVehicle, setSelectedVehicle, mapDot, setMapDot, compact, fullHeight }: {
  selectedVehicle: string | null
  setSelectedVehicle: (id: string | null) => void
  mapDot: { x: number; y: number; visible: boolean }
  setMapDot: (d: { x: number; y: number; visible: boolean }) => void
  compact?: boolean
  fullHeight?: boolean
}) {
  return (
    <div
      className={`${compact ? 'col-span-2' : 'flex-1'} rounded-xl border border-slate-800 overflow-hidden relative bg-slate-900`}
      style={compact ? { height: 380 } : fullHeight ? { flex: 1 } : {}}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect()
        setMapDot({ x: e.clientX - r.left, y: e.clientY - r.top, visible: true })
      }}
      onMouseLeave={() => setMapDot({ ...mapDot, visible: false })}
    >
      {/* Grid background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(30,58,138,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,138,0.15) 1px, transparent 1px), linear-gradient(rgba(30,58,138,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,138,0.06) 1px, transparent 1px)`,
        backgroundSize: '80px 80px, 80px 80px, 20px 20px, 20px 20px'
      }} />
      {/* Roads */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 700 420" preserveAspectRatio="none">
        <path d="M 0 210 Q 175 195 350 210 Q 525 225 700 200" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="8 4" />
        <path d="M 0 310 Q 230 295 460 315 Q 580 325 700 310" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="6 3" />
        <path d="M 210 0 Q 220 110 215 210 Q 210 315 215 420" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="6 3" />
        <path d="M 490 0 Q 500 140 495 210 Q 490 310 495 420" stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="6 3" />
        <path d="M 0 90 Q 350 75 700 95" stroke="#1d4ed8" strokeWidth="1.5" fill="none" />
      </svg>

      {/* Vehicle dots */}
      {VEHICLES.map((v, i) => {
        const x = 90 + i * 120
        const y = 70 + (i % 3) * 100
        const color = v.status === 'active' ? '#22c55e' : v.status === 'alert' ? '#ef4444' : '#94a3b8'
        const sel = selectedVehicle === v.id
        return (
          <button key={v.id} onClick={() => setSelectedVehicle(sel ? null : v.id)}
            className="absolute transition-transform hover:scale-125 z-10"
            style={{ left: x - 10, top: y - 10 }}>
            <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center"
              style={{ background: color + '25', borderColor: color, boxShadow: sel ? `0 0 0 5px ${color}25, 0 0 12px ${color}50` : undefined }}>
              <div className="w-2 h-2 rounded-full" style={{ background: color }} />
            </div>
            {sel && (
              <div className="absolute left-6 top-0 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-xs whitespace-nowrap z-20 shadow-xl">
                <div className="font-semibold text-slate-100">{v.name} <span className="text-slate-500 font-normal">· {v.id}</span></div>
                <div className="text-slate-400">{v.driver}</div>
                <div className="text-slate-500 mt-0.5">{v.location}</div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-blue-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{v.speed > 0 ? `${v.speed} mph` : 'Stopped'}</span>
                  <FuelBar pct={v.fuel} />
                </div>
              </div>
            )}
          </button>
        )
      })}

      {/* Cursor dot */}
      {mapDot.visible && (
        <div className="absolute pointer-events-none w-5 h-5 rounded-full border border-blue-400/30 -translate-x-1/2 -translate-y-1/2"
          style={{ left: mapDot.x, top: mapDot.y }} />
      )}

      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-slate-900/90 to-transparent flex items-center px-4 gap-3">
        <MapPinIcon className="w-4 h-4 text-blue-400" />
        <span className="text-sm font-medium text-slate-200">Live Map — NJ Corridor</span>
        <div className="ml-auto flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />Active</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />Alert</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-500 inline-block" />Idle</span>
        </div>
      </div>

      {/* Zoom */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1">
        <button className="w-7 h-7 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-slate-200 flex items-center justify-center text-sm hover:bg-slate-700 transition-colors">+</button>
        <button className="w-7 h-7 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-slate-200 flex items-center justify-center text-sm hover:bg-slate-700 transition-colors">−</button>
      </div>
    </div>
  )
}

// ─── History View ──────────────────────────────────────────────────────────────

function HistoryView() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = HISTORY.filter(t => {
    if (filter !== 'all' && t.status !== filter) return false
    if (search && !t.vehicle.toLowerCase().includes(search.toLowerCase()) && !t.driver.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="p-6 space-y-5">
      {/* Controls */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search trips…"
            className="bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-blue-500/60 w-52 transition-all" />
          <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
        </div>
        <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1">
          {['all', 'completed', 'in-progress'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors capitalize ${filter === f ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
              {f === 'in-progress' ? 'In Progress' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="ml-auto text-xs text-slate-500">{filtered.length} trip{filtered.length !== 1 ? 's' : ''}</div>
      </div>

      {/* Trip log */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-800">
              {['Trip ID', 'Vehicle', 'Driver', 'Date', 'Departure', 'Return', 'Distance', 'Avg Speed', 'Fuel Used', 'Status'].map(h => (
                <th key={h} className="px-4 py-2.5 text-left text-slate-500 font-medium uppercase tracking-wider text-[10px]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => (
              <tr key={t.id} className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${i === filtered.length - 1 ? 'border-0' : ''}`}>
                <td className="px-4 py-3 text-blue-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{t.id}</td>
                <td className="px-4 py-3 font-medium text-slate-200">{t.vehicle}</td>
                <td className="px-4 py-3 text-slate-400">{t.driver}</td>
                <td className="px-4 py-3 text-slate-400">{t.date}</td>
                <td className="px-4 py-3 text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{t.start}</td>
                <td className="px-4 py-3 text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{t.end}</td>
                <td className="px-4 py-3 text-slate-300">{t.distance}</td>
                <td className="px-4 py-3 text-slate-400">{t.avgSpeed}</td>
                <td className="px-4 py-3 text-slate-400">{t.fuelUsed}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border uppercase tracking-wider ${t.status === 'completed' ? 'bg-emerald-950/60 text-emerald-400 border-emerald-900/40' : 'bg-blue-950/60 text-blue-400 border-blue-900/40'}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    <span className={`w-1.5 h-1.5 rounded-full ${t.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-400'}`} />
                    {t.status === 'completed' ? 'Done' : 'Active'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center text-slate-500 text-sm">No trips match this filter.</div>
        )}
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Trips" value={String(HISTORY.length)} sub="Last 7 days" icon={<RouteIcon className="w-4 h-4" />} accent="blue" />
        <StatCard label="Total Distance" value="1,203 mi" sub="Across all vehicles" icon={<MapPinIcon className="w-4 h-4" />} accent="violet" />
        <StatCard label="Total Fuel" value="55.5 gal" sub="Fleet consumption" icon={<FuelIcon className="w-4 h-4" />} accent="emerald" />
        <StatCard label="Avg Trip Length" value="200 mi" sub="Per trip average" icon={<ChartIcon className="w-4 h-4" />} accent="amber" />
      </div>
    </div>
  )
}

// ─── Reports View ──────────────────────────────────────────────────────────────

function ReportsView() {
  const [reportTab, setReportTab] = useState<'weekly' | 'vehicles' | 'alerts'>('weekly')
  const maxDist = Math.max(...REPORT_WEEKLY.map(d => d.distance))

  return (
    <div className="p-6 space-y-5">
      {/* Tab pills */}
      <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1 w-fit">
        {([['weekly', 'Weekly Summary'], ['vehicles', 'By Vehicle'], ['alerts', 'Alert Log']] as const).map(([id, label]) => (
          <button key={id} onClick={() => setReportTab(id)}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-colors ${reportTab === id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Weekly Summary */}
      {reportTab === 'weekly' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <StatCard label="Weekly Distance" value="1,888 mi" sub="+12% vs last week" icon={<RouteIcon className="w-4 h-4" />} accent="blue" />
            <StatCard label="Fuel Consumed" value="85.6 gal" sub="Fleet total" icon={<FuelIcon className="w-4 h-4" />} accent="emerald" />
            <StatCard label="Total Trips" value="29" sub="Across 5 vehicles" icon={<TruckIcon className="w-4 h-4" />} accent="violet" />
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <span className="text-sm font-medium text-slate-200">Distance per Day (miles)</span>
              <span className="text-xs text-slate-500">Aug 3 – Aug 9, 2026</span>
            </div>
            <div className="flex items-end gap-3 h-48">
              {REPORT_WEEKLY.map(day => (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-xs text-slate-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{day.distance}</span>
                  <div className="w-full rounded-t-sm bg-blue-600/20 hover:bg-blue-600/40 transition-colors relative overflow-hidden cursor-pointer group"
                    style={{ height: `${(day.distance / maxDist) * 160}px` }}>
                    <div className="absolute bottom-0 left-0 right-0 bg-blue-600 rounded-t-sm transition-all" style={{ height: '100%' }} />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-slate-900 text-xs text-slate-200 px-2 py-1 rounded shadow-lg whitespace-nowrap" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {day.trips} trips · {day.fuel} gal
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{day.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* By Vehicle */}
      {reportTab === 'vehicles' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-800">
            <span className="text-sm font-medium text-slate-200">Vehicle Performance — Aug 2026</span>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-800">
                {['Vehicle', 'Driver', 'Trips', 'Distance', 'Fuel Used', 'Efficiency', 'Alerts', 'Status'].map(h => (
                  <th key={h} className="px-5 py-2.5 text-left text-slate-500 font-medium uppercase tracking-wider text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { ...VEHICLES[0], trips: 8, dist: '568 mi', fuel: '23.8 gal', eff: '23.9 mpg', alerts: 1 },
                { ...VEHICLES[1], trips: 5, dist: '391 mi', fuel: '16.2 gal', eff: '24.1 mpg', alerts: 1 },
                { ...VEHICLES[2], trips: 6, dist: '484 mi', fuel: '20.4 gal', eff: '23.7 mpg', alerts: 0 },
                { ...VEHICLES[3], trips: 7, dist: '329 mi', fuel: '14.0 gal', eff: '23.5 mpg', alerts: 1 },
                { ...VEHICLES[4], trips: 3, dist: '202 mi', fuel: '8.7 gal', eff: '23.2 mpg', alerts: 1 },
              ].map((v, i) => (
                <tr key={v.id} className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${i === 4 ? 'border-0' : ''}`}>
                  <td className="px-5 py-3">
                    <div className="font-medium text-slate-200">{v.name}</div>
                    <div className="text-slate-600" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{v.id}</div>
                  </td>
                  <td className="px-5 py-3 text-slate-400">{v.driver}</td>
                  <td className="px-5 py-3 text-slate-300" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{v.trips}</td>
                  <td className="px-5 py-3 text-slate-300">{v.dist}</td>
                  <td className="px-5 py-3 text-slate-400">{v.fuel}</td>
                  <td className="px-5 py-3 text-emerald-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{v.eff}</td>
                  <td className="px-5 py-3">
                    {v.alerts > 0
                      ? <span className="text-amber-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{v.alerts}</span>
                      : <span className="text-slate-600">—</span>}
                  </td>
                  <td className="px-5 py-3"><StatusBadge status={v.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Alert Log */}
      {reportTab === 'alerts' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-800 flex items-center gap-3">
            <BellIcon className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-slate-200">Alert Log</span>
            <span className="text-xs text-slate-500">{ALERTS.length} alerts this session</span>
          </div>
          <div className="divide-y divide-slate-800/60">
            {ALERTS.map(alert => (
              <div key={alert.id} className="px-5 py-4 hover:bg-slate-800/30 transition-colors flex items-start gap-4">
                <div className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${alert.severity === 'critical' ? 'bg-red-500' : alert.severity === 'warning' ? 'bg-amber-400' : 'bg-blue-400'}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-200">{alert.type}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border uppercase tracking-wider font-medium ${alert.severity === 'critical' ? 'bg-red-950/50 text-red-400 border-red-900/40' : alert.severity === 'warning' ? 'bg-amber-950/50 text-amber-400 border-amber-900/40' : 'bg-blue-950/50 text-blue-400 border-blue-900/40'}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {alert.severity}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{alert.detail}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{alert.vehicle}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{alert.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Settings View ─────────────────────────────────────────────────────────────

function SettingsView() {
  const [settingsTab, setSettingsTab] = useState<'profile' | 'notifications' | 'fleet' | 'security'>('profile')
  const [notifs, setNotifs] = useState({ lowFuel: true, speedAlert: true, maintenance: false, dailyReport: true })
  const [fuelThreshold, setFuelThreshold] = useState(20)
  const [speedLimit, setSpeedLimit] = useState(75)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-6 flex gap-6">
      {/* Settings sidebar */}
      <div className="w-48 shrink-0">
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          {([['profile', 'Profile', UserIcon], ['notifications', 'Notifications', BellIcon], ['fleet', 'Fleet Config', TruckIcon], ['security', 'Security', ShieldIcon]] as const).map(([id, label, Icon]) => (
            <button key={id} onClick={() => setSettingsTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b border-slate-800 last:border-0 ${settingsTab === id ? 'bg-blue-600/15 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Settings content */}
      <div className="flex-1 space-y-4">
        {settingsTab === 'profile' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
            <h3 style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-base font-semibold text-white">Profile Settings</h3>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xl font-bold text-white">AD</div>
              <div>
                <div className="text-sm font-medium text-slate-200">Admin User</div>
                <div className="text-xs text-slate-500">Fleet Administrator</div>
                <button className="text-xs text-blue-400 hover:text-blue-300 mt-1 transition-colors">Change photo</button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[['Full Name', 'Admin User'], ['Email', 'admin@fleetview.io'], ['Phone', '+1 (555) 820-4001'], ['Organization', 'FleetView Corp.']].map(([label, val]) => (
                <div key={label}>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">{label}</label>
                  <input defaultValue={val} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-all" />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Role</label>
              <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-all">
                <option>Fleet Administrator</option>
                <option>Fleet Manager</option>
                <option>Dispatcher</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button onClick={handleSave} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${saved ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}

        {settingsTab === 'notifications' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
            <h3 style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-base font-semibold text-white">Notification Preferences</h3>
            <div className="space-y-3">
              {([
                ['lowFuel', 'Low Fuel Alert', 'Notify when vehicle fuel drops below threshold'],
                ['speedAlert', 'Speed Violations', 'Notify when driver exceeds speed limit'],
                ['maintenance', 'Maintenance Due', 'Notify when scheduled service is approaching'],
                ['dailyReport', 'Daily Report', 'Receive end-of-day fleet summary email'],
              ] as const).map(([key, label, desc]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-800">
                  <div>
                    <div className="text-sm font-medium text-slate-200">{label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
                  </div>
                  <button onClick={() => setNotifs(n => ({ ...n, [key]: !n[key] }))}
                    className={`w-10 h-5 rounded-full transition-colors relative ${notifs[key] ? 'bg-blue-600' : 'bg-slate-700'}`}>
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${notifs[key] ? 'left-5' : 'left-0.5'}`} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button onClick={handleSave} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${saved ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}

        {settingsTab === 'fleet' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
            <h3 style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-base font-semibold text-white">Fleet Configuration</h3>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Fuel Alert Threshold: <span className="text-blue-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{fuelThreshold}%</span></label>
              <input type="range" min={5} max={50} value={fuelThreshold} onChange={e => setFuelThreshold(Number(e.target.value))}
                className="w-full accent-blue-500" />
              <div className="flex justify-between text-xs text-slate-600 mt-1"><span>5%</span><span>50%</span></div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Speed Limit: <span className="text-blue-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{speedLimit} mph</span></label>
              <input type="range" min={45} max={90} value={speedLimit} onChange={e => setSpeedLimit(Number(e.target.value))}
                className="w-full accent-blue-500" />
              <div className="flex justify-between text-xs text-slate-600 mt-1"><span>45 mph</span><span>90 mph</span></div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Default Region</label>
              <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-all">
                <option>New Jersey Corridor</option>
                <option>New York Metro</option>
                <option>Northeast USA</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">GPS Refresh Rate</label>
              <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-all">
                <option>Every 30 seconds</option>
                <option>Every 1 minute</option>
                <option>Every 5 minutes</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button onClick={handleSave} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${saved ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        )}

        {settingsTab === 'security' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
            <h3 style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-base font-semibold text-white">Security</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-all" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Confirm New Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-all" />
              </div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-200">Two-Factor Authentication</div>
                <div className="text-xs text-slate-500 mt-0.5">Adds an extra layer of security to your account</div>
              </div>
              <span className="text-xs text-emerald-400 bg-emerald-950/50 border border-emerald-900/40 px-2 py-0.5 rounded-full">Enabled</span>
            </div>
            <div className="flex justify-end">
              <button onClick={handleSave} className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${saved ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
                {saved ? 'Saved!' : 'Update Password'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Shared Components ─────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon, accent, gauge }: {
  label: string; value: string; sub: string; icon: React.ReactNode
  accent: 'blue' | 'emerald' | 'amber' | 'violet'; gauge?: number
}) {
  const colors = {
    blue: { bg: 'bg-blue-600/10', border: 'border-blue-900/40', icon: 'text-blue-400', bar: '#3b82f6' },
    emerald: { bg: 'bg-emerald-600/10', border: 'border-emerald-900/40', icon: 'text-emerald-400', bar: '#10b981' },
    amber: { bg: 'bg-amber-600/10', border: 'border-amber-900/40', icon: 'text-amber-400', bar: '#f59e0b' },
    violet: { bg: 'bg-violet-600/10', border: 'border-violet-900/40', icon: 'text-violet-400', bar: '#8b5cf6' },
  }[accent]
  return (
    <div className={`bg-slate-900 border ${colors.border} rounded-xl px-5 py-4`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">{label}</span>
        <div className={`${colors.bg} ${colors.icon} p-1.5 rounded-lg`}>{icon}</div>
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-2xl font-semibold text-white mb-1">{value}</div>
      {gauge !== undefined && (
        <div className="h-1 bg-slate-800 rounded-full mb-2 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${gauge}%`, background: colors.bar }} />
        </div>
      )}
      <div className="text-xs text-slate-500">{sub}</div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const cfg = {
    active: 'bg-emerald-950/60 text-emerald-400 border-emerald-900/40',
    idle: 'bg-slate-800 text-slate-400 border-slate-700',
    alert: 'bg-red-950/60 text-red-400 border-red-900/40',
  }[status] ?? 'bg-slate-800 text-slate-400 border-slate-700'
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border uppercase tracking-wider ${cfg}`} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-emerald-500' : status === 'alert' ? 'bg-red-500' : 'bg-slate-500'}`} />
      {status}
    </span>
  )
}

function FuelBar({ pct }: { pct: number }) {
  const color = pct < 20 ? '#ef4444' : pct < 40 ? '#f59e0b' : '#10b981'
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-slate-400" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{pct}%</span>
    </div>
  )
}

// ─── Icons ─────────────────────────────────────────────────────────────────────

function TruckIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M1 1h11l3 10H1V1z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 1h4l3 5v5h-7V1z" /></svg>
}
function GridIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
}
function MapPinIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z" /><circle cx="12" cy="8" r="2" /></svg>
}
function ClockIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="9" /><path strokeLinecap="round" d="M12 7v5l3 3" /></svg>
}
function ChartIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 20h18M5 20V10m4 10V4m4 16v-7m4 7v-3" /></svg>
}
function GearIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
}
function BellIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
}
function SearchIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="11" cy="11" r="7" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" /></svg>
}
function FuelIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 22V6a2 2 0 012-2h8a2 2 0 012 2v16M3 22h14M13 10h2a2 2 0 012 2v2a2 2 0 002 2h0a2 2 0 002-2V8l-3-4" /></svg>
}
function RouteIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 17V9a6 6 0 016-6h0a6 6 0 016 6v8" /></svg>
}
function LogoutIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" /></svg>
}
function UserIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
}
function ShieldIcon({ className }: { className?: string }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
}

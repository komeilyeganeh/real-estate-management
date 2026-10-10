
import { NavLink } from "react-router";
import {
  AppstoreOutlined,
  BankOutlined,
  BuildOutlined,
  TeamOutlined,
  FileTextOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Properties",
    path: "/properties",
    icon: <BankOutlined />,
  },
  {
    label: "Units",
    path: "/units",
    icon: <BuildOutlined />,
  },
  {
    label: "Tenants",
    path: "/tenants",
    icon: <TeamOutlined />,
  },
  {
    label: "Leases",
    path: "/leases",
    icon: <FileTextOutlined />,
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-slate-950 text-white">
      {/* Logo */}
      <div className="flex h-[76px] shrink-0 items-center gap-3 border-b border-white/10 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500 text-xl">
          <HomeOutlined />
        </div>

        <div>
          <h1 className="text-base font-bold tracking-wide">
            EstatePro
          </h1>
          <p className="mt-0.5 text-xs text-slate-400">
            Management System
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          Workspace
        </p>

        <div className="space-y-1.5">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30"
                    : "text-slate-400 hover:bg-white/5 hover:text-white",
                ].join(" ")
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        <p className="mb-3 mt-9 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          Preferences
        </p>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            [
              "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
              isActive
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white",
            ].join(" ")
          }
        >
          <SettingOutlined className="text-lg" />
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* Bottom section */}
      <div className="shrink-0 border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-sm font-bold text-blue-300">
            EP
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              Estate Manager
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Management Panel
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
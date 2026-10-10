
import { useLocation } from "react-router";
import {
  BellOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Input } from "antd";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/properties": "Properties",
  "/units": "Units",
  "/tenants": "Tenants",
  "/leases": "Leases",
  "/settings": "Settings",
};

export default function Header() {
  const { pathname } = useLocation();

  const pageTitle = pageTitles[pathname] ?? "Real Estate Management";

  return (
    <header className="z-10 flex h-[76px] shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 sm:px-8">
      {/* Page title */}
      <div className="min-w-0">
        <h2 className="truncate text-xl font-bold text-slate-800">
          {pageTitle}
        </h2>
        <p className="mt-1 hidden text-xs text-slate-500 sm:block">
          Welcome to your management workspace
        </p>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-3 sm:gap-5">
        <Input
          prefix={
            <SearchOutlined className="text-slate-400" />
          }
          placeholder="Search..."
          className="!hidden !h-10 !w-56 !rounded-xl sm:!flex"
        />

        <button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-lg text-slate-600 transition-colors hover:bg-slate-100"
        >
          <Badge dot>
            <BellOutlined />
          </Badge>
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-3 sm:pl-5">
          <Avatar
            size={40}
            className="!bg-blue-100 !font-semibold !text-blue-700"
          >
            EM
          </Avatar>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              Estate Manager
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
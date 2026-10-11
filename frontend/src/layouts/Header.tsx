import { useLocation } from "react-router";
import {
  BellOutlined,
  MenuOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Input } from "antd";
import { LogoutButton } from "../features/auth/components/LogoutButton";

interface HeaderProps {
  onMenuClick?: () => void;
}

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/properties": "Properties",
  "/units": "Units",
  "/tenants": "Tenants",
  "/leases": "Leases",
  "/settings": "Settings",
};

export default function Header({ onMenuClick }: HeaderProps) {
  const { pathname } = useLocation();
  const pageTitle = pageTitles[pathname] ?? "Real Estate Management";

  return (
    <header className="sticky top-0 z-30 flex min-h-[76px] shrink-0 items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 sm:gap-4 sm:px-5 lg:px-8">
      {/* Left: Menu + Page Title */}
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={onMenuClick}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl text-slate-600 transition hover:bg-slate-100 lg:hidden"
        >
          <MenuOutlined />
        </button>

        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold text-slate-800 sm:text-xl">
            {pageTitle}
          </h2>

          <p className="mt-1 hidden text-xs text-slate-500 md:block">
            Welcome to your management workspace
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3 lg:gap-5">
        <Input
          prefix={<SearchOutlined className="text-slate-400" />}
          placeholder="Search..."
          aria-label="Search"
          className="!hidden !h-10 !w-40 !rounded-xl md:!flex lg:!w-56"
        />

        <button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-9 shrink-0 items-center justify-center rounded-xl text-lg text-slate-600 transition-colors hover:bg-slate-100 sm:w-10"
        >
          <Badge dot>
            <BellOutlined />
          </Badge>
        </button>

        <div className="hidden items-center gap-3 border-l border-slate-200 pl-3 md:flex lg:pl-5">
          <Avatar
            size={40}
            className="!bg-blue-100 !font-semibold !text-blue-700"
          >
            EM
          </Avatar>

          <div className="hidden xl:block">
            <p className="text-sm font-semibold text-slate-800">
              Estate Manager
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Administrator
            </p>
          </div>
        </div>

        <LogoutButton />
      </div>
    </header>
  );
}
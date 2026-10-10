import {
  HomeOutlined,
  AppstoreOutlined,
  TeamOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import StatCard from "./StatCard";
import { useDashboard } from "../hooks/useDashboard";

export default function DashboardStats() {
  const { data, isPending, isError, refetch } = useDashboard();

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-40 animate-pulse rounded-2xl border border-slate-200 bg-white"
          />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
        <p className="text-sm text-rose-700">
         Retrieving dashboard statistics failed.
        </p>
        <button
          onClick={() => void refetch()}
          className="mt-3 text-sm font-semibold text-rose-700 underline"
        >
         try again
        </button>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Properties",
      value: data.totalProperties,
      change: "Live",
      description: "Real-time data",
      icon: <HomeOutlined />,
      iconClass: "bg-blue-50 text-blue-600",
      positive: true,
    },
    {
      title: "Total Units",
      value: data.totalUnits,
      change: "Live",
      description: "Real-time data",
      icon: <AppstoreOutlined />,
      iconClass: "bg-violet-50 text-violet-600",
      positive: true,
    },
    {
      title: "Total Tenants",
      value: data.totalTenants,
      change: "Live",
      description: "Real-time data",
      icon: <TeamOutlined />,
      iconClass: "bg-emerald-50 text-emerald-600",
      positive: true,
    },
    {
      title: "Active Leases",
      value: data.activeLeases,
      change: "Live",
      description: "Real-time data",
      icon: <FileTextOutlined />,
      iconClass: "bg-amber-50 text-amber-600",
      positive: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
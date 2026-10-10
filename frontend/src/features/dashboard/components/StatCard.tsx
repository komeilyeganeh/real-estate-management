
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";

export interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  description: string;
  icon: React.ReactNode;
  iconClass: string;
  positive: boolean;
}

export default function StatCard({
  title,
  value,
  change,
  description,
  icon,
  iconClass,
  positive,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
        <span
          className={`inline-flex items-center gap-1 rounded-md px-2 py-1 font-semibold ${
            positive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {positive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          {change}
        </span>

        <span className="text-slate-400">{description}</span>
      </div>
    </div>
  );
}
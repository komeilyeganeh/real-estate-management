
import {
  ArrowRightOutlined,
  BankOutlined,
  TeamOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Link } from "react-router";

const actions = [
  {
    title: "Manage Properties",
    description: "View your properties",
    to: "/properties",
    icon: <BankOutlined />,
    iconClass: "bg-blue-50 text-blue-600",
    hoverClass: "hover:border-blue-300 hover:bg-blue-50",
  },
  {
    title: "Manage Tenants",
    description: "View registered tenants",
    to: "/tenants",
    icon: <TeamOutlined />,
    iconClass: "bg-emerald-50 text-emerald-600",
    hoverClass: "hover:border-emerald-300 hover:bg-emerald-50",
  },
  {
    title: "Manage Leases",
    description: "Review lease records",
    to: "/leases",
    icon: <FileTextOutlined />,
    iconClass: "bg-violet-50 text-violet-600",
    hoverClass: "hover:border-violet-300 hover:bg-violet-50",
  },
];

export default function QuickActions() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="font-semibold text-slate-900">Quick Actions</h2>
      <p className="mt-1 text-sm text-slate-500">
        Common management tasks
      </p>

      <div className="mt-5 space-y-3">
        {actions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className={`flex items-center justify-between rounded-xl border border-slate-200 p-4 transition-colors ${action.hoverClass}`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg ${action.iconClass}`}
              >
                {action.icon}
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {action.title}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {action.description}
                </p>
              </div>
            </div>

            <ArrowRightOutlined className="text-slate-400" />
          </Link>
        ))}
      </div>
    </section>
  );
}
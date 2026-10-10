import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router";

import DashboardStats from "../../features/dashboard/components/DashboardStats";
import PortfolioOverview from "../../features/dashboard/components/PortfolioOverview";
import QuickActions from "../../features/dashboard/components/QuickActions";
import RecentLeases from "../../features/dashboard/components/RecentLeases";

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Here is what's happening with your properties today.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to="/properties">
            <Button type="primary" size="large" icon={<PlusOutlined />}>
              Add Property
            </Button>
          </Link>

          <Link to="/tenants">
            <Button size="large">View Tenants</Button>
          </Link>
        </div>
      </section>

      <DashboardStats />

      <section className="grid grid-cols-1 items-stretch gap-6 xl:grid-cols-2">
        <div className="min-w-0">
          <PortfolioOverview />
        </div>

        <div className="min-w-0">
          <QuickActions />
        </div>
      </section>

      <RecentLeases />
    </div>
  );
}

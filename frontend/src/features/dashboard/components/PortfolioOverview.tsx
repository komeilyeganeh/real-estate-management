import { Progress, Tag } from "antd";
import { useDashboard } from "../hooks/useDashboard";

export default function PortfolioOverview() {
  const { data, isPending, isError, refetch } = useDashboard();

  if (isPending) {
    return (
      <div className="h-72 animate-pulse rounded-2xl border border-slate-200 bg-white" />
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-white p-6">
        <p className="text-sm text-rose-600">
         Retrieving the status of the units failed.
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

  return (
    <section className="h-full w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Portfolio Overview
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Current unit occupancy
          </p>
        </div>
        <Tag color="blue">Live data</Tag>
      </div>

      <div className="mt-8">
        <div className="flex items-end justify-between">
          <span className="text-sm text-slate-500">Occupancy rate</span>
          <span className="text-3xl font-bold text-slate-900">
            {data.occupancyRate}%
          </span>
        </div>

        <Progress
          className="mt-3"
          percent={data.occupancyRate}
          showInfo={false}
          strokeColor="#2563eb"
          trailColor="#e2e8f0"
          size={{ height: 10 }}
        />
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-blue-600" />
            <span className="text-sm text-slate-600">Rented units</span>
          </div>
          <span className="font-semibold text-slate-900">
            {data.rentedUnits}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            <span className="text-sm text-slate-600">Available units</span>
          </div>
          <span className="font-semibold text-slate-900">
            {data.availableUnits}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rounded-full bg-amber-500" />
            <span className="text-sm text-slate-600">Maintenance</span>
          </div>
          <span className="font-semibold text-slate-900">
            {data.maintenanceUnits}
          </span>
        </div>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Total units</span>
          <span className="font-semibold text-slate-900">
            {data.totalUnits}
          </span>
        </div>
      </div>
    </section>
  );
}
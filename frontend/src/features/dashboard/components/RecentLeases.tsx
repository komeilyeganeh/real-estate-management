
import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Tag } from "antd";
import { Link } from "react-router";

const recentLeases = [
  {
    tenant: "Olivia Martin",
    property: "Skyline Residence",
    unit: "Unit 204",
    date: "Oct 02, 2026",
    status: "Active",
  },
  {
    tenant: "James Wilson",
    property: "Green Park Apartments",
    unit: "Unit 108",
    date: "Oct 01, 2026",
    status: "Active",
  },
  {
    tenant: "Sophia Anderson",
    property: "Central Tower",
    unit: "Unit 315",
    date: "Sep 29, 2026",
    status: "Pending",
  },
  {
    tenant: "William Brown",
    property: "Riverside Complex",
    unit: "Unit 022",
    date: "Sep 27, 2026",
    status: "Expired",
  },
];

export default function RecentLeases() {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-semibold text-slate-900">Recent Leases</h2>
          <p className="mt-1 text-sm text-slate-500">
            Latest lease activity across your portfolio
          </p>
        </div>

        <Link to="/leases">
          <Button type="link" icon={<ArrowRightOutlined />}>
            View all leases
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-6 py-4 font-semibold">Tenant</th>
              <th className="px-6 py-4 font-semibold">Property</th>
              <th className="px-6 py-4 font-semibold">Unit</th>
              <th className="px-6 py-4 font-semibold">Start Date</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {recentLeases.map((lease) => (
              <tr
                key={`${lease.tenant}-${lease.unit}`}
                className="transition-colors hover:bg-slate-50"
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-800">
                  {lease.tenant}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                  {lease.property}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                  {lease.unit}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                  {lease.date}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Tag
                    color={
                      lease.status === "Active"
                        ? "success"
                        : lease.status === "Pending"
                          ? "warning"
                          : "default"
                    }
                  >
                    {lease.status}
                  </Tag>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
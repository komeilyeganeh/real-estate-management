import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <main className="min-h-screen bg-white lg:grid lg:grid-cols-[1.1fr_0.9fr]">
      {/* Visual */}
      <section className="relative hidden overflow-hidden bg-[#111827] text-white lg:flex">
        <div className="absolute inset-0">
          <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>

        <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 font-bold">
              R
            </div>

            <span className="text-lg font-semibold">RealEstate</span>
          </div>

          {/* Main text */}
          <div className="max-w-xl">
            <p className="mb-5 text-sm font-medium text-blue-400">
              PROPERTY MANAGEMENT
            </p>

            <h1 className="text-5xl font-semibold leading-[1.1] tracking-tight xl:text-6xl">
              Everything you need
              <span className="block text-slate-400">
                to manage your properties.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-7 text-slate-400">
              A simple workspace for managing properties, units, tenants and
              leases efficiently.
            </p>
          </div>

          {/* Bottom */}
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="h-px w-8 bg-slate-700" />
            Built for modern property management
          </div>
        </div>

        {/* Curved divider */}
        <div className="absolute -right-px top-0 z-20 h-full w-20 overflow-hidden xl:w-28">
          <svg
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path
              d="M100 0H45C75 120 75 250 55 370C35 490 20 610 45 730C65 830 75 920 45 1000H100V0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Form */}
      <section className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-105">
          <Outlet />
        </div>
      </section>
    </main>
  );
}

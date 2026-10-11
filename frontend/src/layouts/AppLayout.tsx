import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen min-w-0 bg-slate-50">
      {/* Desktop Sidebar */}
      <div className="hidden shrink-0 lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            className="absolute inset-0 h-full w-full bg-slate-950/50"
            onClick={closeSidebar}
          />

          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl">
            <Sidebar onNavigate={closeSidebar} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Header
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
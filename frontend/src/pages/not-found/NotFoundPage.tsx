import { Link } from "react-router";
import {
  ArrowLeftOutlined,
  HomeOutlined,
  SearchOutlined,
} from "@ant-design/icons";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-3 py-10 sm:px-6">
      <div className="w-full max-w-2xl text-center">
        {/* Illustration */}
        <div className="relative mx-auto mb-8 flex h-44 w-44 items-center justify-center sm:h-56 sm:w-56">
          <div className="absolute inset-0 rounded-full bg-blue-100/70" />
          <div className="absolute inset-4 rounded-full border border-blue-200" />

          <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-blue-100 bg-white text-blue-600 shadow-xl shadow-blue-100/70 sm:h-36 sm:w-36">
            <HomeOutlined className="text-5xl sm:text-6xl" />
          </div>

          <span className="absolute right-2 top-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-200 sm:right-0 sm:top-5">
            ?
          </span>

          <span className="absolute bottom-5 left-1 text-5xl font-black text-blue-200 sm:bottom-7 sm:left-0">
            404
          </span>
        </div>

        {/* Text */}
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
          Page not found
        </p>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Oops! Lost in the property market?
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to your workspace.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
          >
            <HomeOutlined />
            Back to Dashboard
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeftOutlined />
            Go Back
          </button>
        </div>

        {/* Footer hint */}
        <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-500">
          <SearchOutlined />
          <span>Check the URL or return to your dashboard.</span>
        </div>
      </div>
    </div>
  );
}
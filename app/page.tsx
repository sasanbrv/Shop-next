import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
            Sasy Shop
          </span>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Welcome to Sasy Shop
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Explore our store, manage products from the dashboard, and
            authenticate securely through the login system.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Store */}
          <Link
            href="/store"
            className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/40 transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl transition-colors group-hover:bg-blue-100">
              🛍️
            </div>

            <h2 className="mt-6 text-2xl font-black text-slate-900">
              Store
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Browse all available products and explore their details. Click
              on any product to open its details page and add it to your
              shopping cart.
            </p>

            <div className="mt-6 text-sm font-bold text-blue-600">
              Explore Store →
            </div>
          </Link>

          {/* Dashboard */}
          <Link
            href="/dashboard"
            className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/40 transition-all duration-200 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/50"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-2xl transition-colors group-hover:bg-purple-100">
              📊
            </div>

            <h2 className="mt-6 text-2xl font-black text-slate-900">
              Dashboard
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Access the dashboard after logging in. From there, you can
              manage the store and add new products.
            </p>

            <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-sm">
              <p className="font-bold text-slate-700">
                Username:{" "}
                <span className="font-normal text-slate-500">admin</span>
              </p>

              <p className="mt-1 font-bold text-slate-700">
                Password:{" "}
                <span className="font-normal text-slate-500">1234</span>
              </p>
            </div>

            <div className="mt-5 text-sm font-bold text-purple-600">
              Open Dashboard →
            </div>
          </Link>

          {/* Login */}
          <Link
            href="/login"
            className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/40 transition-all duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-100/50"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-2xl transition-colors group-hover:bg-green-100">
              🔐
            </div>

            <h2 className="mt-6 text-2xl font-black text-slate-900">
              Login
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Sign in to your account to access protected areas of the
              application. Your authentication session is securely stored in a
              cookie.
            </p>

            <div className="mt-6 text-sm font-bold text-green-600">
              Login to Account →
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-400">
            © 2026 Sasy Shop. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
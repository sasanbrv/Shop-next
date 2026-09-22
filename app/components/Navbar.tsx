
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    {
      id: 1,
      href: "/",
      title: "Home",
    },
    {
      id: 2,
      href: "/store",
      title: "Store",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-sky-500 via-blue-600 to-indigo-600 text-lg font-black text-white shadow-lg shadow-blue-500/25 transition duration-300 group-hover:scale-105 group-hover:shadow-blue-500/40">
            S
          </div>

          <div className="hidden sm:block">
            <h1 className="text-xl font-black tracking-tight text-slate-900">
              Sasy<span className="text-blue-600"> Shop</span>
            </h1>

            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-slate-400">
              Everything you need
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50/80 p-1.5 shadow-sm">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`relative rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-white text-blue-600 shadow-md shadow-slate-200/70"
                    : "text-slate-500 hover:bg-white/70 hover:text-slate-900"
                }`}
              >
                {item.title}

                {isActive && (
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-blue-600" />
                )}
              </Link>
            );
          })}
        </div>

        <Link
          href="/cart"
          className="group relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/10"
          aria-label="Shopping Cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437m0 0L6.75 15.75h10.5l2.25-8.25H5.106ZM6.75 15.75l-.75 2.25h12.75M9 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm9 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>

          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white shadow-sm">
            0
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

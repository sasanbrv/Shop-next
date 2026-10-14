
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useShoppingCartContext } from "../context/ShoppingCartContext";

type User = {
  id: string;
  name: string;
  username: string;
};

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { cartTotalQty, isInitialized } = useShoppingCartContext();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let active = true;

    const loadUser = async () => {
      try {
        const response = await axios.get("/api/auth/me");

        if (active) {
          setUser(response.data.user ?? null);
        }
      } catch {
        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    void loadUser();

    return () => {
      active = false;
    };
  }, [pathname]);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await axios.post("/api/auth/logout");
      setUser(null);
      router.replace("/login");
      router.refresh();
    } catch {
      window.alert("Could not log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const mainLinks = [
    { href: "/", label: "Home" },
    { href: "/store", label: "Store" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:flex-nowrap lg:px-8"
      >
        {/* Brand */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-black text-white shadow-lg shadow-blue-500/20">
            S
          </div>

          <div>
            <div className="text-lg font-black tracking-tight text-slate-900">
              Sasy <span className="text-blue-600">Shop</span>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Shop smarter
            </p>
          </div>
        </Link>

        {/* Main navigation */}
        <div className="order-3 flex w-full items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200/80 bg-slate-50 p-1 sm:w-auto lg:order-2 lg:mx-auto">
          {mainLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                isActive(item.href)
                  ? "bg-white text-blue-600 shadow-sm ring-1 ring-slate-200/70"
                  : "text-slate-500 hover:bg-white/70 hover:text-slate-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Account and cart */}
        <div className="order-2 ml-auto flex shrink-0 items-center gap-2 lg:order-3">
          {!isLoading && !user && (
            <>
              <Link
                href="/login"
                className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  pathname === "/login"
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}

          {!isLoading && user && (
            <>
              <div className="hidden items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                  {user.name.trim().charAt(0).toUpperCase() || "U"}
                </div>
                <span className="max-w-32 truncate text-sm font-semibold text-slate-700">
                  Hi, {user.name}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </>
          )}

          {/* Cart */}
          <Link
            href="/cart"
            aria-label={`Shopping Cart${isInitialized ? `, ${cartTotalQty} items` : ""}`}
            className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>

            {isInitialized && cartTotalQty > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {cartTotalQty > 99 ? "99+" : cartTotalQty}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

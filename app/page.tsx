
import Link from "next/link";

const Home = () => {
  const cards = [
    {
      title: "Store",
      description:
        "Browse available products, explore product details, and add your favorite items to the shopping cart.",
      href: "/store",
      icon: "🛍️",
      action: "Explore Store",
      color:
        "border-blue-200 hover:border-blue-300 hover:shadow-blue-100/70",
      iconColor: "bg-blue-50 group-hover:bg-blue-100",
      actionColor: "text-blue-600",
    },
    {
      title: "Dashboard",
      description:
        "Open your dashboard to add new products and manage the store after signing in.",
      href: "/dashboard",
      icon: "📊",
      action: "Open Dashboard",
      color:
        "border-purple-200 hover:border-purple-300 hover:shadow-purple-100/70",
      iconColor: "bg-purple-50 group-hover:bg-purple-100",
      actionColor: "text-purple-600",
    },
    {
      title: "Login",
      description:
        "Sign in to your account to access your dashboard and manage your products.",
      href: "/login",
      icon: "🔐",
      action: "Login to Account",
      color:
        "border-green-200 hover:border-green-300 hover:shadow-green-100/70",
      iconColor: "bg-green-50 group-hover:bg-green-100",
      actionColor: "text-green-600",
    },
    {
      title: "Register",
      description:
        "Create a new account to get started and access your personalized dashboard.",
      href: "/register",
      icon: "👤",
      action: "Create Account",
      color:
        "border-orange-200 hover:border-orange-300 hover:shadow-orange-100/70",
      iconColor: "bg-orange-50 group-hover:bg-orange-100",
      actionColor: "text-orange-600",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600">
            Sasy Shop
          </span>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Welcome to Sasy Shop
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Discover products, manage your store, and access your account
            through a simple and secure shopping experience.
          </p>
        </header>

        <section
          aria-label="Shop navigation"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className={`group flex flex-col rounded-3xl border bg-white p-7 shadow-lg shadow-slate-200/40 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${card.color}`}
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-colors ${card.iconColor}`}
              >
                {card.icon}
              </div>

              <h2 className="mt-6 text-2xl font-black text-slate-900">
                {card.title}
              </h2>

              <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">
                {card.description}
              </p>

              <div className={`mt-6 text-sm font-bold ${card.actionColor}`}>
                {card.action} →
              </div>
            </Link>
          ))}
        </section>

        <footer className="mt-12 text-center">
          <p className="text-xs text-slate-400">
            © 2026 Sasy Shop. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Home;

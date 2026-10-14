
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import DashboardForm from "./DashboardForm";

export const runtime = "nodejs";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome, {session.name}. You can add a new product here.
        </p>
      </div>

      <DashboardForm />
    </div>
  );
}

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  async function signOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">歡迎回來！</h1>
      <p className="mt-4">你的登入 Email: {user.email}</p>

      <form action={signOut} className="mt-8">
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          登出
        </button>
      </form>
    </div>
  );
}

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import AvatarUpload from "@/components/AvatarUpload";

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

  const { data: todos } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  //server Action: 新增代辦事項
  async function addTodo(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const supabase = await createClient();
    await supabase.from("todos").insert({ title });
    revalidatePath("/dashboard");
  }

  // Server Action: 刪除代辦事項
  async function deleteTodo(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    const supabase = await createClient();
    await supabase.from("todos").delete().eq("id", id);
    revalidatePath("/dashboard");
  }
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* 頁首：標題、Email、登出按鈕 */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">你的代辦事項</h1>
          <p className="text-gray-500 mt-1">登入 Email：{user.email}</p>
        </div>
        <form action={signOut}>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            登出
          </button>
        </form>
      </div>

      {/*頭像上傳*/}

      <div className="mb-8">
        <AvatarUpload userId={user.id} />
      </div>

      {/* 新增表單 */}
      <form action={addTodo} className="flex gap-2 mb-8">
        <input
          name="title"
          required
          placeholder="新增任務..."
          className="border p-2 rounded flex-1"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          新增
        </button>
      </form>

      {/* 列表渲染 */}
      <ul className="space-y-4">
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-4 border rounded bg-white shadow-sm"
          >
            <span>{todo.title}</span>
            <form action={deleteTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <button type="submit" className="text-red-500">
                刪除
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}

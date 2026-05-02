"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect(`/login?message=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: signupData, error } = await supabase.auth.signUp(data);
  if (error) {
    redirect(`/login?message=${encodeURIComponent(error.message)}`);
  }

  if (!signupData.session) {
    redirect(
      `/login?message=${encodeURIComponent(
        "註冊成功，請先到信箱完成驗證後再登入。"
      )}`
    );
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

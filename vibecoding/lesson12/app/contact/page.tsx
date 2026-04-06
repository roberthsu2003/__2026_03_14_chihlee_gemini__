"use client";
import { useActionState, userActionState } from "react"
import { submitContact } from "./actions"

export default function Contact(){
    const [result, formAction] = useActionState(submitContact, null)

    return (
    <main className="p-8 max-w-md">
      <h1 className="text-2xl font-bold">聯絡我們</h1>
      <form action={formAction} className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium">姓名</label>
          <input name="name" type="text" className="mt-1 block w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">留言</label>
          <textarea name="message" rows={3} className="mt-1 block w-full rounded border px-3 py-2" />
        </div>
        <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          送出
        </button>
      </form>
      {result?.success && <p className="mt-4 text-green-600">{result.message}</p>}
    </main>
  );
}

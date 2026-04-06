"use server"

export async function submitContact(
    _prevState: { success: boolean; message: string} | null,
    formData: FormData
){
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;

    console.log("收到:", name, message)
    return {success: true, message:"感謝你的留言!"}
}
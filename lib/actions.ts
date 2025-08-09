"use server";
import fetcher from "@/lib/fetcher";
import { revalidatePath } from "next/cache";

export async function sendChat(values: { body: string }) {
  await fetcher("chats", {
    method: "POST",
    body: JSON.stringify({ ...values, sender: "user" }),
  });
  revalidatePath("/");
}

"use server";
import { supabase } from "@/lib/supabaseClient";

export async function addCompany(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const industry = formData.get("industry") as string;
  const seller = formData.get("seller") as string;
  const image = formData.get("image") as string;

  const { error } = await supabase.from("companies").insert([
    { name, description, price, industry, seller, image },
  ]);

  if (error) {
    throw new Error(error.message);
  }
}


export async function registerInterest(userId: string, companyId: string) {
  const { error } = await supabase.from("interests").insert([
    {
      user_id: userId,
      company_id: companyId,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }
}

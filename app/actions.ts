"use server";
import { supabase } from "@/lib/supabaseClient";

export async function registerInterest(companyId: string) {
	try {
	  const { data, error } = await supabase.auth.getUser();
	  if (error || !data?.user) {
		throw new Error("User not authenticated");
	  }
  
	  const userId = data.user.id;
	  const userEmail = data.user.email; 
  
	  const { error: insertError } = await supabase
		.from("interests")
		.insert([{ user_id: userId, company_id: companyId, user_email:userEmail}]); 
  
	  if (insertError) throw new Error(insertError.message);
  
	  return { success: true, message: "Interest registered successfully!", email: userEmail };
	} catch (error) {
	  if (error instanceof Error) {
		return { success: false, message: error.message };
	  }
	  return { success: false, message: "An unexpected error occurred." };
	}
  }

export async function getInterestedBuyers(sellerEmail: string) {
  try {
    const { data: sellerCompanies, error: companyError } = await supabase
      .from("companies")
      .select("id, name")
      .eq("seller", sellerEmail);

    if (companyError) {
      throw new Error(companyError.message);
    }

    if (!sellerCompanies.length) {
      return [];
    }

    const companyIds = sellerCompanies.map((company) => company.id);

    const { data: interests, error: interestError } = await supabase
      .from("interests")
      .select("user_id, company_id")
      .in("company_id", companyIds);

    if (interestError) {
      throw new Error(interestError.message);
    }

    if (!interests.length) {
      return [];
    }

    const userIds = interests.map((interest) => interest.user_id);
    const { data: users, error: userError } = await supabase
      .from("profiles")
      .select("id, email")
      .in("id", userIds);

    if (userError) {
      throw new Error(userError.message);
    }

    const buyersList = interests.map((interest) => {
      const user = users.find((u) => u.id === interest.user_id);
      const company = sellerCompanies.find((c) => c.id === interest.company_id);
      return {
        email: user?.email || "Unknown Email",
        companyName: company?.name || "Unknown Company",
      };
    });

    return buyersList;
  } catch (error) {
    console.error("Error fetching interested buyers:", error);
    return [];
  }
}

"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import InterestedBuyersList from "@/components/InterestedBuyersList";

interface Buyer {
  email: string;
  companyName: string;
}

const SellerDashboard: React.FC = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInterestedBuyers = async () => {
      setLoading(true);

      // Get the logged-in user (seller)
      const { data: session, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        console.error("Error getting session:", sessionError);
        setLoading(false);
        return;
      }

      const sellerEmail = session?.session?.user?.email;

      if (!sellerEmail) {
        console.error("No logged-in user found.");
        setLoading(false);
        return;
      }

      // 1️⃣ Get companies owned by the seller
      const { data: sellerCompanies, error: companyError } = await supabase
        .from("companies")
        .select("id, name")
        .eq("seller", sellerEmail);

      if (companyError) {
        console.error("Error fetching companies:", companyError);
        setLoading(false);
        return;
      }

      if (!sellerCompanies || sellerCompanies.length === 0) {
        console.warn("No companies found for this seller.");
        setLoading(false);
        return;
      }

      const companyIds = sellerCompanies.map((company) => company.id);

      // 2️⃣ Get interests related to these companies
      const { data: interests, error: interestError } = await supabase
        .from("interests")
        .select("user_id, company_id")
        .in("company_id", companyIds);

      if (interestError) {
        console.error("Error fetching interests:", interestError);
        setLoading(false);
        return;
      }

      if (!interests || interests.length === 0) {
        console.warn("No interests found.");
        setLoading(false);
        return;
      }

      console.log("FETCHING INTERESTS FROM PROFILE", interests);

      const userIds = interests.map((interest) => interest.user_id);

      // 3️⃣ Fetch user details from `profiles`
      const { data: users, error: userError } = await supabase
        .from("profiles") // Query custom `profiles` table
        .select("id, email") // Assume the column in `profiles` is `user_id`
        .in("id", userIds);

      if (userError) {
        console.error("Error fetching users:", userError);
        setLoading(false);
        return;
      }

      console.log("FETCHING USERS FROM PROFILE", users);

      if (!users || users.length === 0) {
        console.warn("No users found matching the user_ids.");
        setLoading(false);
        return;
      }

      console.log("Users data:", users);

      // 4️⃣ Match users with interests & companies
      const buyersList: Buyer[] = interests.map((interest) => {
        const user = users.find((u) => u.id === interest.user_id);
        const company = sellerCompanies.find(
          (c) => c.id === interest.company_id
        );

        return {
          email: user?.email || "Unknown Email",
          companyName: company?.name || "Unknown Company",
        };
      });

      console.log("Mapped buyers list:", buyersList);
      setBuyers(buyersList);
      setLoading(false);
    };

    fetchInterestedBuyers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Interested Buyers</h2>
      {loading ? (
        <p>Loading...</p>
      ) : buyers.length > 0 ? (
        <InterestedBuyersList buyers={buyers} />
      ) : (
        <p>No interested buyers yet.</p>
      )}
    </div>
  );
};

export default SellerDashboard;

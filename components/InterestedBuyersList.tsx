"use client";
import { useEffect, useState } from "react";
import { getInterestedBuyers } from "@/app/actions";
import { useAuth } from "@/context/authContext";

interface Buyer {
  email: string;
  companyName: string;
}

const InterestedBuyersList = () => {
  const { user } = useAuth();
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      setError("User not authenticated.");
      return;
    }

    const fetchBuyers = async () => {
      setLoading(true);
      setError(null);
      try {
        const buyersData = await getInterestedBuyers(user.email!);
        setBuyers(buyersData);
      } catch (err) {
        console.error("Error fetching buyers:", err);
        setError("Failed to fetch interested buyers.");
      }
      setLoading(false);
    };

    fetchBuyers();
  }, [user]);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold">Interested Buyers</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && buyers.length === 0 && <p>No interested buyers yet.</p>}

      <ul className="mt-2 divide-y divide-gray-200">
        {buyers.map((buyer, index) => (
          <li key={index} className="py-2 flex justify-between">
            <span>{buyer.email}</span>
            <span className="text-gray-500">{buyer.companyName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InterestedBuyersList;

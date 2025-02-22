import React, { useEffect, useState } from "react";
import { Company } from "@/lib/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAuth } from "@/context/authContext";
import { supabase } from "@/lib/supabaseClient";
import { companies as staticCompanies } from "@/lib/data";
import Link from "next/link";
import { registerInterest } from "@/app/actions";

interface CompaniesListProps {
  companies: Company[];
}

const CompaniesList: React.FC<CompaniesListProps> = () => {
  const { user } = useAuth();
  const [companyData, setCompanyData] = useState<Company[]>(staticCompanies);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("companies").select("*");
        console.log("Supabase Error: ", error);

        if (error) {
          throw error;
        }

        setCompanyData((prevData) => [...prevData, ...(data || [])]);
      } catch (err) {
        setError("Error fetching companies");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const uniqueCompanies = companyData.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.name === value.name)
  );

  const handleInterestClick = async (companyName: string) => {
    if (!user?.email) {
      setFeedback("You need to be logged in to express interest.");
      return;
    }

    const response = await registerInterest(user.email, companyName);
    setFeedback(response.message);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {uniqueCompanies.map((company) => (
        <div
          key={company.name}
          className="border p-4 rounded-lg shadow-sm flex flex-col"
        >
          <Image
            src={company.image}
            alt={company.name}
            width={300}
            height={300}
            className="w-full h-40 object-cover rounded-md mb-2"
          />
          <h2 className="font-bold">{company.name}</h2>
          <p>{company.description}</p>

          <span className="inline-block w-fit border border-[#aacae6] text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mt-3 mb-2">
            {company.industry}
          </span>

          <div className="flex justify-between mt-auto">
            <span className="text-gray-600">{company.seller}</span>
            <span className="text-gray-600 align-middle font-bold">
              ${company.price.toLocaleString()}
            </span>
          </div>
          <div className="flex flex-col mt-auto">
            {user ? (
              <>
                <Button className="mt-10 mb-4 text-md bg-[#aacae6] hover:bg-[#EBF6FB] hover:border-[##EBF6FB] text-black">
                  {" "}
                  Buy
                </Button>
                <Button
                  onClick={() => handleInterestClick(company.name)}
                  className="text-md border-1 border-[#aacae6] hover:border-2"
                >
                  {" "}
                  I&apos;m interested
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button className="mt-10 mb-4 w-full text-md bg-[#aacae6] hover:bg-[#EBF6FB] hover:border-[##EBF6FB] text-black">
                  {" "}
                  Log in to buy or express interest.
                </Button>
              </Link>
            )}
          </div>
        </div>
      ))}
      {feedback && (
        <p className="mt-4 text-center text-sm text-gray-700">{feedback}</p>
      )}
    </div>
  );
};

export default CompaniesList;

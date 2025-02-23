"use client";
import { useState, useEffect } from "react";
import CompaniesList from "./CompaniesList";
import { Separator } from "@/components/ui/separator";
import { companies } from "@/lib/data";
import FilterBar from "./FilterBar";
import { supabase } from "@/lib/supabaseClient";

function CompaniesContainer() {
  const [filteredCompanies, setFilteredCompanies] = useState(companies);
  const [companyData, setCompanyData] = useState(companies);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("companies").select("*");
        console.log("Supabase Error: ", error);

        if (error) {
          throw error;
        }

        const uniqueSupabaseCompanies = data?.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.name === value.name)
        );

        const combinedData = [...companies, ...(uniqueSupabaseCompanies || [])];

        setCompanyData(combinedData);
        setFilteredCompanies(combinedData);
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

  const handleFilter = (filterType: string, value: string | null) => {
    if (filterType === "reset" || !value) {
      setFilteredCompanies(companyData);
      return;
    }

    let updatedCompanies = [...companyData];

    if (filterType === "price") {
      updatedCompanies.sort((a, b) =>
        value === "low-to-high" ? a.price - b.price : b.price - a.price
      );
    }

    if (filterType === "industry") {
      updatedCompanies = filteredCompanies.filter(
        (company) => company.industry === value
      );
    }

    if (filterType === "keyword" && value) {
      updatedCompanies = filteredCompanies.filter(
        (company) =>
          company.name.toLowerCase().includes(value.toLowerCase()) ||
          company.description.toLowerCase().includes(value.toLowerCase())
      );
    }

    setFilteredCompanies(updatedCompanies);
    console.log(filterType, value, updatedCompanies);
  };

  return (
    <>
      <section className="mt-32">
        <Separator className="mt-4" />

        <FilterBar onFilter={handleFilter} />
        <div className="flex justify-between items-center mt-4"></div>
        <div>
          {filteredCompanies.length === 0 ? (
            <h5 className="text-2xl mt-16">
              Sorry, no products matched your search...
            </h5>
          ) : (
            <CompaniesList companies={filteredCompanies} />
          )}
        </div>
      </section>
    </>
  );
}

export default CompaniesContainer;

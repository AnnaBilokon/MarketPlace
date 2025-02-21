import CompaniesList from "./CompaniesList";
import { Separator } from "@/components/ui/separator";
import { companies } from "@/lib/data";

// {}: { layout: string; search: string }
async function CompaniesContainer() {
  const totalCompanies = companies.length;
  //   const searchTerm = search ? `&search=${search}` : "";
  return (
    <>
      <section className="mt-32">
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg">
            {totalCompanies} product{totalCompanies > 1 && "s"}
          </h4>
        </div>
        <Separator className="mt-4" />
      </section>
      <div>
        {totalCompanies === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : (
          <CompaniesList companies={companies} />
        )}
      </div>
    </>
  );
}
export default CompaniesContainer;

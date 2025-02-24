import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

const CompanyListingForm = ({ closeModal }: { closeModal: () => void }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [company, setCompany] = useState({
    name: "",
    description: "",
    price: 0,
    industry: "",
    seller: user?.email || "",
    image: "",
  });

  //   const modalRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompany((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from("companies").insert([
        {
          name: company.name,
          description: company.description,
          price: company.price,
          industry: company.industry,
          seller: user?.email,
          image: company.image || "",
        },
      ]);

      if (error) {
        throw error;
      }

      toast("Company has been listed.");

      closeModal();
      window.location.reload();

      router.push("/");
    } catch (err) {
      console.error("Error listing company:", err);
    }
  };

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 p-6 border rounded shadow"
    >
      <h1 className="text-2xl font-bold mb-4">List Your Company</h1>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium">
          Company Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={company.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <input
          id="description"
          name="description"
          type="text"
          value={company.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium">
          Price
        </label>
        <input
          id="price"
          name="price"
          type="number"
          value={company.price}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="industry" className="block text-sm font-medium">
          Industry
        </label>
        <input
          id="industry"
          name="industry"
          type="text"
          value={company.industry}
          onChange={handleChange}
          required
          className="mt-1 block w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium">
          Image URL
        </label>
        <input
          id="image"
          name="image"
          type="text"
          value={company.image}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-[#aacae6] text-black p-2 rounded"
      >
        List Company
      </button>
      <button
        type="submit"
        onClick={closeModal}
        className="mt-4 w-full border border-[#aacae6] bg-white text-black p-2 rounded"
      >
        Close
      </button>
    </form>
  );
};

export default CompanyListingForm;

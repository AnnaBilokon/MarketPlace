interface Buyer {
  email: string;
  companyName: string;
}

interface BuyerCardProps {
  buyer: Buyer;
}

const BuyerCard: React.FC<BuyerCardProps> = ({ buyer }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <p className="text-lg font-semibold">{buyer.email}</p>
      <p className="text-gray-600">Interested in: {buyer.companyName}</p>
    </div>
  );
};

export default BuyerCard;

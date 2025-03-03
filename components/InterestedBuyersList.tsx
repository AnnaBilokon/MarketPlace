import BuyerCard from "./BuyerCard";

interface Buyer {
  email: string;
  companyName: string;
}

interface InterestedBuyersListProps {
  buyers: Buyer[];
}

const InterestedBuyersList: React.FC<InterestedBuyersListProps> = ({
  buyers,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {buyers.length > 0 ? (
        buyers.map((buyer, index) => <BuyerCard key={index} buyer={buyer} />)
      ) : (
        <p>No interested buyers yet.</p>
      )}
    </div>
  );
};

export default InterestedBuyersList;

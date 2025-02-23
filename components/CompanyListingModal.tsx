import CompanyListingForm from "./CompanyListingForm";

interface CompanyListingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompanyListingModal: React.FC<CompanyListingModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full sm:w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600"
        >
          &times;
        </button>
        <CompanyListingForm closeModal={onClose} />
      </div>
    </div>
  );
};

export default CompanyListingModal;

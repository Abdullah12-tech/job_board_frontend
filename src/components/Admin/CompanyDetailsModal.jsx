import { useEffect, useState } from 'react';
import { FiX, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useAdmin } from '../../context/AdminContext';

const CompanyDetailsModal = ({ companyId, onClose }) => {
  const { fetchCompanyById, approveCompany, rejectCompany } = useAdmin();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCompany = async () => {
      const companyData = await fetchCompanyById(companyId);
      setCompany(companyData);
    };
    loadCompany();
  }, [companyId, fetchCompanyById]);

  const handleApprove = async () => {
    setLoading(true);
    try {
      await approveCompany(companyId);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (window.confirm('Are you sure you want to reject this company?')) {
      setLoading(true);
      try {
        await rejectCompany(companyId);
        onClose();
      } finally {
        setLoading(false);
      }
    }
  };

  if (!company) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Company Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FiX size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold">{company.companyName}</h3>
              <p className="text-gray-500">{company.companyEmail}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Website</p>
              <a href={company.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                {company.companyWebsite}
              </a>
            </div>

            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{company.location}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Industry</p>
              <p className="font-medium">{company.industry}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Company Size</p>
              <p className="font-medium">{company.companySize}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="font-medium mt-1 whitespace-pre-line">{company.companyDescription}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={handleReject}
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              <FiXCircle className="inline mr-2" />
              Reject
            </button>
            <button
              onClick={handleApprove}
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              <FiCheckCircle className="inline mr-2" />
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsModal;
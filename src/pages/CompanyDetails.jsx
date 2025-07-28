import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiArrowLeft, FiExternalLink, FiPhone, FiMail, FiUsers, FiMapPin, FiBriefcase } from "react-icons/fi";
import JobCard from "../components/JobCard";
import { Link } from "react-router-dom";

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchCompany = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/users/employers/${id}`);
      if (!response.ok) throw new Error('Failed to fetch company');
      const { data } = await response.json();
      setCompany(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [id]);

  if (loading && !company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-red-500">Error: {error}</p>
        <button 
          onClick={fetchCompany}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Company not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Link 
          to="/companies" 
          className="flex items-center text-blue-500 mb-6 hover:underline"
        >
          <FiArrowLeft className="mr-2" /> Back to Companies
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4 flex flex-col items-center">
              <img 
                src={company.logo || '/default-company.png'} 
                alt={company.name} 
                className="w-32 h-32 object-contain rounded-full border border-gray-200 mb-4"
              />
              {company.isVerified && (
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-4">
                  Verified Company
                </span>
              )}
            </div>

            <div className="w-full md:w-3/4">
              <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
              <p className="text-gray-600 mb-6">{company.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <FiMapPin className="mr-2" />
                  <span>{company.location || 'Not specified'}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FiBriefcase className="mr-2" />
                  <span>{company.industry || 'Not specified'}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <FiUsers className="mr-2" />
                  <span>{company.companySize || 'Not specified'}</span>
                </div>
                {company.website && (
                  <div className="flex items-center text-blue-500 hover:underline">
                    <FiExternalLink className="mr-2" />
                    <a href={company.website} target="_blank" rel="noopener noreferrer">
                      Website
                    </a>
                  </div>
                )}
                {company.linkedin && (
                  <div className="flex items-center text-blue-500 hover:underline">
                    <FiExternalLink className="mr-2" />
                    <a href={company.linkedin} target="_blank" rel="noopener noreferrer">
                      LinkedIn
                    </a>
                  </div>
                )}
                {company.phone && (
                  <div className="flex items-center text-gray-700">
                    <FiPhone className="mr-2" />
                    <span>{company.phone}</span>
                  </div>
                )}
                {company.email && (
                  <div className="flex items-center text-gray-700">
                    <FiMail className="mr-2" />
                    <span>{company.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Open Positions ({company.jobs.length})</h2>
          
          {company.jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {company.jobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-gray-600">This company currently has no open positions.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
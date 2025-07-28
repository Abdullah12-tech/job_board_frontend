import { useEffect, useState } from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import CompanyCard from "../components/PublicCompanyCard";

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/users/employers`);
      if (!response.ok) throw new Error('Failed to fetch companies');
      const { data } = await response.json();
      setCompanies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter(company => {
    const term = searchTerm.toLowerCase();
    return (
      company?.name?.toLowerCase().includes(term) ||
      company?.location?.toLowerCase().includes(term) ||
      company?.industry?.toLowerCase().includes(term)
    );
  });

  if (loading && companies.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchCompanies}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6">Find Companies</h1>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search companies by name, location, or industry"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <FiFilter />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {loading && companies.length > 0 && (
          <div className="mb-4 text-center">Loading more companies...</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map(company => (
              <CompanyCard key={company._id} company={company} />
            ))
          ) : (
            <div className="col-span-full bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-gray-600">No companies match your search. Try different keywords.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Companies;
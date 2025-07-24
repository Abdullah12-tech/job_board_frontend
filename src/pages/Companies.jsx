import { useState, useEffect } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import CompanyCard from '../components/CompanyCard';

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/employers`);
        if (!response.ok) throw new Error('Failed to fetch companies');
        const data = await response.json();
        
        // Transform API data to match our frontend structure
        const formattedCompanies = data.data.map((item) => ({
          id: item.employer._id,
          name: item.employer.userId.name,
          logo: item.employer.companyLogo || 'https://via.placeholder.com/80',
          jobs: item.jobs.length,
          location: item.employer.companyLocation,
          industry: item.employer.industry,
          description: item.employer.companyDescription
        }));
        
        setCompanies(formattedCompanies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;

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
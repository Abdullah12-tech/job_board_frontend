import { useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import CompanyCard from '../components/CompanyCard';

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([
    // Sample company data - replace with API call
    {
      id: 1,
      name: 'TechCorp',
      logo: 'https://via.placeholder.com/80',
      jobs: 12,
      location: 'San Francisco, CA',
      industry: 'Software Development',
      description: 'Building innovative software solutions for modern businesses.',
    },
    // Add more companies
  ]);

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Search and Filter Bar */}
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

        {/* Companies List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))
          ) : (
            <div className="col-span-full bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-gray-600">No companies match your search. Try different keywords.</p>
            </div>
          )}
        </div>

        {/* Pagination would go here */}
      </div>
    </div>
  );
};

export default Companies;
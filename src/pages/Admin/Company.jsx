// CompaniesManagement.jsx
import { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';
import SearchBar from '../../components/Admin/SearchBar';
import CompanyTable from '../../components/Admin/CompanyTable';
import CompanyDetailsModal from '../../components/Admin/CompanyDetailsModal';

const CompaniesManagement = () => {
  const { companies, fetchAllCompanies, loading, error } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  useEffect(() => {
    fetchAllCompanies();
  }, [fetchAllCompanies]);

  const filteredCompanies = companies.filter(company => 
    company.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.companyEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-xl font-bold">Company Management</h2>
          <SearchBar 
            placeholder="Search companies..." 
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {loading && !companies.length ? (
          <div>Loading companies...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <CompanyTable 
            companies={filteredCompanies} 
            onSelectCompany={setSelectedCompanyId}
          />
        )}
      </div>

      {selectedCompanyId && (
        <CompanyDetailsModal 
          companyId={selectedCompanyId}
          onClose={() => setSelectedCompanyId(null)}
        />
      )}
    </div>
  );
};

export default CompaniesManagement;
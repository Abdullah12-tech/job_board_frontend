import { useState } from 'react';
import { FiSearch, FiFilter, FiMapPin, FiBriefcase, FiAward } from 'react-icons/fi';

const Candidates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [candidates, setCandidates] = useState([
    // Sample candidate data - replace with API call
    {
      id: 1,
      name: 'John Doe',
      title: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
      experience: '5+ years',
      education: 'Computer Science, Stanford University',
      avatar: 'https://via.placeholder.com/80',
    },
    // Add more candidates
  ]);

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold mb-6">Find Candidates</h1>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search candidates by name, skills, or title"
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

        {/* Candidates List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map(candidate => (
              <div key={candidate.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  <img src={candidate.avatar} alt={candidate.name} className="w-20 h-20 rounded-full object-cover" />
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
                      <div>
                        <h2 className="text-xl font-bold">{candidate.name}</h2>
                        <h3 className="text-primary">{candidate.title}</h3>
                      </div>
                      <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-accent transition-colors self-start md:self-auto">
                        View Profile
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <FiMapPin className="mr-2" />
                        <span>{candidate.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FiBriefcase className="mr-2" />
                        <span>{candidate.experience} experience</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FiAward className="mr-2" />
                        <span>{candidate.education}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-gray-600">No candidates match your search. Try different keywords.</p>
            </div>
          )}
        </div>

        {/* Pagination would go here */}
      </div>
    </div>
  );
};

export default Candidates;
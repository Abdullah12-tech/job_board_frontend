import { useState, useEffect } from 'react';
import { FiSearch, FiFilter, FiMapPin, FiBriefcase, FiAward } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Candidates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    experience: '',
    skills: []
  });
  const [showFilters, setShowFilters] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/candidates`);
        if (!response.ok) throw new Error('Failed to fetch candidates');
        const data = await response.json();
        
        const formattedCandidates = data.data.map((item) => ({
          id: item._id,
          userId: item.userId._id,
          name: item.userId.name,
          title: item.professionalTitle || 'Candidate',
          location: item.preferredLocations?.[0] || 'Not specified',
          skills: item.skills || [],
          experience: item.experience?.[0]?.title 
            ? `${item.experience[0].title} (${calculateExperience(item.experience)})`
            : 'Not specified',
          education: item.education?.[0]?.degree || 'Not specified',
          avatar: item.userId.profilePicture || 'https://via.placeholder.com/80',
          status: item.status || 'active'
        }));
        
        setCandidates(formattedCandidates);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const calculateExperience = (experienceArray) => {
    if (!experienceArray || experienceArray.length === 0) return '0 years';
    
    let totalMonths = 0;
    
    experienceArray.forEach(exp => {
      const startDate = new Date(exp.startDate);
      const endDate = exp.current ? new Date() : new Date(exp.endDate);
      const diffMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                        (endDate.getMonth() - startDate.getMonth());
      totalMonths += diffMonths;
    });
    
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    return years > 0 ? `${years} year${years > 1 ? 's' : ''}` : `${months} month${months > 1 ? 's' : ''}`;
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilters = 
      (filters.location === '' || candidate.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.experience === '' || candidate.experience.toLowerCase().includes(filters.experience.toLowerCase())) &&
      (filters.skills.length === 0 || filters.skills.every(filterSkill => 
        candidate.skills.some(candidateSkill => 
          candidateSkill.toLowerCase().includes(filterSkill.toLowerCase())
        )
      ));
    
    return matchesSearch && matchesFilters;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillFilter = (skill) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      experience: '',
      skills: []
    });
    setSearchTerm('');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className='w-64 m-auto p-6 shadow-md'>
        <h1 className='text-xl text-center'>Something went wrong</h1>
        <button 
          onClick={() => window.location.reload()} 
          className='text-white text-sm text-center flex items-center inline-block p-2 bg-blue-700 rounded mt-2'
        >
          Retry
        </button>
      </div>
    </div>
  );

  // Extract unique skills for filter options
  const allSkills = Array.from(new Set(candidates.flatMap(c => c.skills))).sort();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
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
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter />
              <span>Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Filter by location"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={filters.location}
                    onChange={handleFilterChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    placeholder="Filter by experience"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={filters.experience}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="flex items-end">
                  <button 
                    onClick={resetFilters}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                <div className="flex flex-wrap gap-2">
                  {allSkills.slice(0, 10).map(skill => (
                    <button
                      key={skill}
                      onClick={() => handleSkillFilter(skill)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        filters.skills.includes(skill)
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map(candidate => (
              <div key={candidate.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  <img 
                    src={candidate.avatar} 
                    alt={candidate.name} 
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200" 
                  />
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
                      <div>
                        <h2 className="text-xl font-bold">{candidate.name}</h2>
                        <h3 className="text-primary">{candidate.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          candidate.status === 'active' ? 'bg-green-100 text-green-800' :
                          candidate.status === 'searching' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {candidate.status}
                        </span>
                      </div>
                      <Link 
                        to={`/candidates/${candidate.userId}`}
                        className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-accent transition-colors self-start md:self-auto"
                      >
                        View Profile
                      </Link>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <FiMapPin className="mr-2" />
                        <span>{candidate.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FiBriefcase className="mr-2" />
                        <span>{candidate.experience}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FiAward className="mr-2" />
                        <span>{candidate.education}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.slice(0, 5).map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                      {candidate.skills.length > 5 && (
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                          +{candidate.skills.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-gray-600">No candidates match your search. Try different keywords.</p>
              <button 
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Candidates;
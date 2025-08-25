import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  FiMapPin, 
  FiBriefcase, 
  FiAward, 
  FiMail, 
  FiLink, 
  FiGithub, 
  FiLinkedin,
  FiClock,
  FiDollarSign,
  FiUser
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CandidateDetails = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/candidates/${id}`);
        if (!response.ok) throw new Error('Failed to fetch candidate');
        const data = await response.json();
        
        const formattedCandidate = {
          id: data.data._id,
          userId: data.data.userId._id,
          name: data.data.userId.name,
          email: data.data.userId.email,
          title: data.data.professionalTitle || 'Candidate',
          location: data.data.preferredLocations?.[0] || 'Not specified',
          skills: data.data.skills || [],
          experience: data.data.experience || [],
          education: data.data.education || [],
          avatar: data.data.userId.profilePicture || 'https://via.placeholder.com/150',
          status: data.data.status || 'active',
          portfolio: data.data.portfolio,
          linkedin: data.data.linkedin,
          github: data.data.github,
          resume: data.data.resume?.url,
          salaryExpectation: data.data.salaryExpectation,
          preferredJobTypes: data.data.preferredJobTypes || [],
          about: data.data.headline || 'No description provided'
        };
        
        setCandidate(formattedCandidate);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [id]);

  const calculateExperienceDuration = (startDate, endDate, isCurrent) => {
    const start = new Date(startDate);
    const end = isCurrent ? new Date() : new Date(endDate);
    
    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + 
                      (end.getMonth() - start.getMonth());
    
    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;
    
    return years > 0 ? `${years} year${years > 1 ? 's' : ''}` : `${months} month${months > 1 ? 's' : ''}`;
  };

  const formatSalary = (salary) => {
    if (!salary || !salary.amount) return 'Not specified';
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: salary.currency || 'USD'
    });
    
    const amount = formatter.format(salary.amount);
    const period = salary.period === 'hourly' ? '/hr' : 
                   salary.period === 'monthly' ? '/mo' : '/yr';
    
    return `${amount}${period}`;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className='w-64 m-auto p-6 shadow-md'>
        <h1 className='text-3xl text-center'>Something went wrong</h1>
        <Link 
          to="/candidates" 
          className='block text-center mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent'
        >
          Back to Candidates
        </Link>
      </div>
    </div>
  );

  if (!candidate) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className='w-64 m-auto p-6 shadow-md text-center'>
        <h1 className='text-3xl'>Candidate not found</h1>
        <Link 
          to="/candidates" 
          className='inline-block mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent'
        >
          Back to Candidates
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link 
            to="/candidates" 
            className="text-primary hover:underline flex items-center"
          >
            ← Back to candidates
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <img 
                src={candidate.avatar} 
                alt={candidate.name} 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md" 
              />
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">{candidate.name}</h1>
                    <h2 className="text-xl text-primary">{candidate.title}</h2>
                    <div className="flex items-center mt-2 text-gray-600">
                      <FiMapPin className="mr-2" />
                      <span>{candidate.location ? `${candidate.location}` : "Nigeria"}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {candidate.resume && (
                      <a 
                        href={candidate.resume} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                      >
                        Download Resume
                      </a>
                    )}
                    <a href={`mailto:${candidate.email}&subject=Direct Application from JobFuse`}>
                      <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-accent transition-colors">
                        Contact Candidate
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              {/* About Section */}
              <section className="mb-8">
                <h3 className="text-xl font-bold mb-4 border-b pb-2">About</h3>
                <p className="text-gray-700 whitespace-pre-line">{candidate.about}</p>
              </section>
              
              {/* Experience Section */}
              {/*<section className="mb-8">
                <h3 className="text-xl font-bold mb-4 border-b pb-2">Experience</h3>
                {candidate.experience.length > 0 ? (
                  <div className="space-y-6">
                    {candidate.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-primary pl-4">
                        <div className="flex justify-between flex-wrap">
                          <h4 className="text-lg font-semibold">{exp.title}</h4>
                          <span className="text-gray-500">
                            {new Date(exp.startDate).toLocaleDateString()} -{' '}
                            {exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString()} •{' '}
                            {calculateExperienceDuration(exp.startDate, exp.endDate, exp.current)}
                          </span>
                        </div>
                        <p className="text-gray-600 font-medium">{exp.company}</p>
                        {exp.location && (
                          <p className="text-gray-500 flex items-center">
                            <FiMapPin className="mr-1" size={14} /> {exp.location}
                          </p>
                        )}
                        {exp.description && (
                          <p className="mt-2 text-gray-700 whitespace-pre-line">{exp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No experience information provided</p>
                )}
              </section>*/}
              
              {/* Education Section */}
              {/*<section className="mb-8">
                <h3 className="text-xl font-bold mb-4 border-b pb-2">Education</h3>
                {candidate.education.length > 0 ? (
                  <div className="space-y-6">
                    {candidate.education.map((edu, index) => (
                      <div key={index} className="border-l-2 border-primary pl-4">
                        <div className="flex justify-between flex-wrap">
                          <h4 className="text-lg font-semibold">{edu.degree}</h4>
                          <span className="text-gray-500">
                            {edu.startYear} - {edu.endYear || 'Present'}
                          </span>
                        </div>
                        <p className="text-gray-600 font-medium">{edu.institution}</p>
                        {edu.fieldOfStudy && (
                          <p className="text-gray-600">Field of Study: {edu.fieldOfStudy}</p>
                        )}
                        {edu.description && (
                          <p className="mt-2 text-gray-700 whitespace-pre-line">{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No education information provided</p>
                )}
              </section>*/}
            </div>
            
            {/* Right Column */}
            <div>
              {/* Details Card */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 border-b pb-2">Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FiUser className="text-gray-500 mr-3" size={18} />
                    <span className="text-gray-700">
                      Status: <span className="font-medium capitalize">{candidate.status}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <FiMail className="text-gray-500 mr-3" size={18} />
                    <a 
                      href={`mailto:${candidate.email}`} 
                      className="text-primary hover:underline"
                    >
                      {candidate.email}
                    </a>
                  </div>
                  
                  {candidate.salaryExpectation?.amount && (
                    <div className="flex items-center">
                      <FiDollarSign className="text-gray-500 mr-3" size={18} />
                      <span className="text-gray-700">
                        Salary Expectation: <span className="font-medium">{formatSalary(candidate.salaryExpectation)}</span>
                      </span>
                    </div>
                  )}
                  
                  {candidate.preferredJobTypes?.length > 0 && (
                    <div>
                      <div className="flex items-center mb-2">
                        <FiBriefcase className="text-gray-500 mr-3" size={18} />
                        <span className="text-gray-700 font-medium">Preferred Job Types:</span>
                      </div>
                      <div className="flex flex-wrap gap-2 ml-9">
                        {candidate.preferredJobTypes.map((type, index) => (
                          <span key={index} className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Skills Card */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 border-b pb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <span key={index} className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Links Card */}
              {(candidate.portfolio || candidate.linkedin || candidate.github) && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 border-b pb-2">Links</h3>
                  <div className="space-y-3">
                    {candidate.portfolio && (
                      <a 
                        href={candidate.portfolio} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-primary hover:underline"
                      >
                        <FiLink className="mr-2" /> Portfolio
                      </a>
                    )}
                    {candidate.linkedin && (
                      <a 
                        href={candidate.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-primary hover:underline"
                      >
                        <FiLinkedin className="mr-2" /> LinkedIn
                      </a>
                    )}
                    {candidate.github && (
                      <a 
                        href={candidate.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-primary hover:underline"
                      >
                        <FiGithub className="mr-2" /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;
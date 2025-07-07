import { useParams } from 'react-router-dom';
import { FiMapPin, FiGlobe, FiUsers, FiBriefcase, FiClock, FiLinkedin, FiTwitter, FiFacebook } from 'react-icons/fi';
import JobCard from '../components/JobCard';

const CompanyDetails = () => {
  const { id } = useParams();
  
  // In a real app, this would come from an API call
  const company = {
    id: 1,
    name: 'TechCorp',
    logo: 'https://via.placeholder.com/150',
    coverImage: 'https://via.placeholder.com/1200x300',
    about: 'TechCorp is a leading software development company specializing in innovative web and mobile solutions. We help businesses transform their ideas into reality through cutting-edge technology.',
    website: 'https://techcorp.com',
    size: '201-500 employees',
    founded: 2010,
    locations: ['San Francisco, CA', 'New York, NY', 'Remote'],
    industry: 'Software Development',
    jobs: [
      {
        id: 1,
        title: 'Senior Frontend Developer',
        location: 'San Francisco, CA or Remote',
        salary: '$120,000 - $150,000',
        type: 'Full-time',
        posted: '2 days ago',
      },
      // Add more jobs
    ],
    benefits: [
      'Competitive salary and equity',
      'Health, dental, and vision insurance',
      '401(k) matching',
      'Flexible work hours',
      'Remote work options',
      'Professional development budget'
    ],
    techStack: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Kubernetes'],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Company Header */}
      <div className="bg-white shadow-sm">
        <div className="relative">
          <img src={company.coverImage} alt={company.name} className="w-full h-48 object-cover" />
          <div className="absolute -bottom-16 left-8">
            <img src={company.logo} alt={company.name} className="w-32 h-32 object-contain border-4 border-white rounded-lg bg-white" />
          </div>
        </div>
        
        <div className="pt-20 pb-6 px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">{company.name}</h1>
              <p className="text-gray-600 text-lg">{company.industry}</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-accent transition-colors">
                Follow
              </button>
              <button className="px-6 py-2 bg-white border border-primary text-primary rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Visit Website
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">About {company.name}</h2>
              <p className="text-gray-700 mb-6">{company.about}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-2">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {company.techStack.map((tech, index) => (
                      <span key={index} className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold mb-2">Company Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <FiUsers className="mr-3" />
                      <span>{company.size}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiClock className="mr-3" />
                      <span>Founded in {company.founded}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiGlobe className="mr-3" />
                      <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {company.website}
                      </a>
                    </div>
                    <div className="flex items-start text-gray-600">
                      <FiMapPin className="mr-3 mt-1" />
                      <div>
                        {company.locations.map((loc, idx) => (
                          <div key={idx}>{loc}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Benefits Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Benefits at {company.name}</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {company.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Social Links */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-bold mb-4">Follow {company.name}</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-primary">
                  <FiLinkedin size={24} />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary">
                  <FiTwitter size={24} />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary">
                  <FiFacebook size={24} />
                </a>
              </div>
            </div>
            
            {/* Similar Companies */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-bold mb-4">Similar Companies</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img src="https://via.placeholder.com/40" alt="Company" className="w-10 h-10 object-contain" />
                  <div>
                    <h4 className="font-medium">DevSolutions</h4>
                    <p className="text-gray-600 text-sm">Software Development</p>
                  </div>
                </div>
                {/* More similar companies */}
              </div>
            </div>
          </div>
        </div>
        
        {/* Jobs Section */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Open Positions at {company.name}</h2>
            <p className="text-gray-600">{company.jobs.length} jobs</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {company.jobs.length > 0 ? (
              company.jobs.map(job => (
                <JobCard key={job.id} job={{ ...job, company: company.name, logo: company.logo }} />
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-600">No open positions at the moment. Check back later!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
import { useParams } from 'react-router-dom';
import { FiMapPin, FiDollarSign, FiBriefcase, FiClock, FiGlobe, FiLinkedin, FiTwitter, FiFacebook } from 'react-icons/fi';

const JobDetails = () => {
  const { id } = useParams();
  
  // In a real app, this would come from an API call
  const job = {
    id: 1,
    title: 'Senior Frontend Developer',
    company: {
      name: 'TechCorp',
      logo: 'https://via.placeholder.com/100',
      about: 'TechCorp is a leading software development company specializing in innovative web and mobile solutions.',
      website: 'https://techcorp.com',
      size: '201-500 employees',
      founded: 2010,
      locations: ['San Francisco, CA', 'New York, NY', 'Remote'],
    },
    location: 'San Francisco, CA or Remote',
    salary: '$120,000 - $150,000',
    type: 'Full-time',
    remote: true,
    posted: '2 days ago',
    description: `
      <p>We're looking for an experienced Frontend Developer to join our growing team. You'll work on building and maintaining our core products using modern technologies.</p>
      <h3>Responsibilities:</h3>
      <ul>
        <li>Develop new user-facing features using React.js</li>
        <li>Build reusable components and front-end libraries</li>
        <li>Optimize applications for maximum performance</li>
        <li>Collaborate with designers and backend developers</li>
        <li>Participate in code reviews and team meetings</li>
      </ul>
      <h3>Requirements:</h3>
      <ul>
        <li>5+ years of experience with JavaScript and React</li>
        <li>Strong proficiency in TypeScript</li>
        <li>Experience with modern CSS frameworks (Tailwind, styled-components)</li>
        <li>Familiarity with RESTful APIs and GraphQL</li>
        <li>Knowledge of modern authorization mechanisms</li>
      </ul>
    `,
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'REST APIs'],
    benefits: [
      'Competitive salary and equity',
      'Health, dental, and vision insurance',
      '401(k) matching',
      'Flexible work hours',
      'Remote work options',
      'Professional development budget'
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Job Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <img src={job.company.logo} alt={job.company.name} className="w-20 h-20 object-contain border border-gray-200 rounded-lg" />
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                <h2 className="text-xl text-primary mb-4">{job.company.name}</h2>
                
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <FiMapPin className="mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiDollarSign className="mr-2" />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiBriefcase className="mr-2" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiClock className="mr-2" />
                    <span>Posted {job.posted}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-accent transition-colors">
                  Apply Now
                </button>
                <button className="px-6 py-3 bg-white border border-primary text-primary rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Save Job
                </button>
              </div>
            </div>
          </div>
          
          {/* Job Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold mb-4">Job Description</h3>
                <div 
                  className="prose max-w-none" 
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
                
                <h3 className="text-xl font-bold mt-8 mb-4">Benefits</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-4">About {job.company.name}</h3>
                  <p className="text-gray-600 mb-4">{job.company.about}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <FiBriefcase className="mr-3" />
                      <span>{job.company.size}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiClock className="mr-3" />
                      <span>Founded in {job.company.founded}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiMapPin className="mr-3" />
                      <div>
                        {job.company.locations.map((loc, idx) => (
                          <div key={idx}>{loc}</div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiGlobe className="mr-3" />
                      <a href={job.company.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {job.company.website}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-500 hover:text-primary">
                      <FiLinkedin size={20} />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-primary">
                      <FiTwitter size={20} />
                    </a>
                    <a href="#" className="text-gray-500 hover:text-primary">
                      <FiFacebook size={20} />
                    </a>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-4">Similar Jobs</h3>
                  {/* Similar jobs list would go here */}
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                      <h4 className="font-medium">Frontend Developer</h4>
                      <p className="text-gray-600 text-sm">Another Company • San Francisco, CA</p>
                    </div>
                    {/* More similar jobs */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
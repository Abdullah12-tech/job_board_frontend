import { Link, useParams } from 'react-router-dom';
import { FiMapPin, FiDollarSign, FiBriefcase, FiClock, FiGlobe, FiLinkedin, FiTwitter, FiFacebook } from 'react-icons/fi';
import { useContext, useEffect } from 'react';
import { jobContext } from '../context/jobContext';

const JobDetails = () => {
  const { id } = useParams();

  // In a real app, this would come from an API call
  const { singleJob, isLoading, fetchSingleJob } = useContext(jobContext);
  useEffect(() => {
    fetchSingleJob(id);
  }, [id])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Job Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <img src={singleJob.postedBy} alt={singleJob.title} className="w-20 h-20 object-contain border border-gray-200 rounded-lg" />
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{singleJob.title}</h1>
                <h2 className="text-xl text-primary mb-4">{singleJob.createdAt}</h2>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <FiMapPin className="mr-2" />
                    <span>{singleJob.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiDollarSign className="mr-2" />
                    <div>
                      $ <span>{singleJob.salaryRange}</span>
                      $ <span>{singleJob.salaryRange}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiBriefcase className="mr-2" />
                    <span>{singleJob.type}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FiClock className="mr-2" />
                    <span>Posted {singleJob.posted}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {singleJob.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full md:w-auto">
                <Link to={`/apply/${singleJob._id}`}>
                  <button className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-accent transition-colors">
                    Apply Now
                  </button>
                </Link>
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
                  dangerouslySetInnerHTML={{ __html: singleJob.description }}
                />

                <h3 className="text-xl font-bold mt-8 mb-4">Benefits</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {singleJob.benefits.map((benefit, index) => (
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
                  <h3 className="text-lg font-bold mb-4">About {singleJob.postedBy}</h3>
                  <p className="text-gray-600 mb-4">{singleJob.postedBy}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <FiBriefcase className="mr-3" />
                      <span>{singleJob.postedBy}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiClock className="mr-3" />
                      <span>Founded in {singleJob.postedBy}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiMapPin className="mr-3" />
                      {/* <div>
                        {singleJob.postedBytions.map((loc, idx) => (
                          <div key={idx}>{loc}</div>
                        ))}
                      </div> */}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FiGlobe className="mr-3" />
                      <a href={singleJob.postedBy} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        {singleJob.postedBy}
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
import { useContext, useState } from 'react';
import { FiBriefcase, FiBookmark, FiUser, FiSettings, FiBell, FiMessageSquare } from 'react-icons/fi';
import { authContext } from '../context/AuthContext';

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const {currentUser} = useContext(authContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="static lg:sticky top-0 lg:w-64">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-bold mb-3">
                  {currentUser.name.charAt(0)}
                </div>
                <h2 className="text-xl font-bold">{currentUser.name}</h2>
                <p className="text-gray-600">{currentUser.title}</p>
              </div>
              
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'profile' ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiUser className="mr-3" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'applications' ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiBriefcase className="mr-3" />
                  <span>Applications</span>
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'saved' ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiBookmark className="mr-3" />
                  <span>Saved Jobs</span>
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'notifications' ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiBell className="mr-3" />
                  <span>Notifications</span>
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'messages' ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiMessageSquare className="mr-3" />
                  <span>Messages</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left px-4 py-2 rounded-lg flex items-center ${activeTab === 'settings' ? 'bg-blue-50 text-primary' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FiSettings className="mr-3" />
                  <span>Settings</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold mb-6">Profile</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Full Name</label>
                        <input
                          type="text"
                          value={currentUser.name}
                          onChange={(e) => setUser({...currentUser, name: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Email</label>
                        <input
                          type="email"
                          value={currentUser.email}
                          onChange={(e) => setUser({...currentUser, email: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Title</label>
                        <input
                          type="text"
                          value={currentUser.title}
                          onChange={(e) => setUser({...currentUser, title: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Location</label>
                        <input
                          type="text"
                          value={user.location}
                          onChange={(e) => setUser({...currentUser, location: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Skills</h2>
                    <div>
                      <label className="block text-gray-600 text-sm mb-1">Your Skills</label>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {currentUser.skills.map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm flex items-center">
                            {skill}
                            <button 
                              onClick={() => setUser({
                                ...user, 
                                skills: currentUser.skills.filter((_, i) => i !== index)
                              })}
                              className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Add a skill"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.target.value.trim()) {
                              setUser({
                                ...currentUser, 
                                skills: [...currentUser.skills, e.target.value.trim()]
                              });
                              e.target.value = '';
                            }
                          }}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <button 
                          onClick={(e) => {
                            const input = e.target.previousElementSibling;
                            if (input.value.trim()) {
                              setUser({
                                ...currentUser, 
                                skills: [...currentUser.skills, input.value.trim()]
                              });
                              input.value = '';
                            }
                          }}
                          className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-accent"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Experience Section */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Work Experience</h2>
                    <button className="text-primary font-medium hover:underline">
                      + Add Experience
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {currentUser.experience.map(exp => (
                      <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between">
                          <h3 className="font-bold">{exp.role} at {exp.company}</h3>
                          <div className="flex gap-2">
                            <button className="text-primary hover:text-accent">Edit</button>
                            <button className="text-red-500 hover:text-red-700">Delete</button>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{exp.duration}</p>
                        <p className="text-gray-700">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Education Section */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Education</h2>
                    <button className="text-primary font-medium hover:underline">
                      + Add Education
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {currentUser.education.map(edu => (
                      <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between">
                          <h3 className="font-bold">{edu.degree}</h3>
                          <div className="flex gap-2">
                            <button className="text-primary hover:text-accent">Edit</button>
                            <button className="text-red-500 hover:text-red-700">Delete</button>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{edu.institution}</p>
                        <p className="text-gray-700">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 text-right">
                  <button className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-accent">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'applications' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <h1 className="text-2xl font-bold p-6 border-b border-gray-200">Job Applications</h1>
                
                <div className="divide-y divide-gray-200">
                  {currentUser.applications.length > 0 ? (
                    currentUser.applications.map(app => (
                      <div key={app.id} className="p-6 hover:bg-gray-50">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <h2 className="font-bold text-lg">{app.jobTitle}</h2>
                            <p className="text-primary">{app.company}</p>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              app.status === 'Under Review' ? 'bg-blue-100 text-primary' :
                              app.status === 'Interview' ? 'bg-purple-100 text-purple-800' :
                              app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {app.status}
                            </span>
                            <span className="text-gray-500">Applied {app.applied}</span>
                            <button className="text-primary font-medium hover:underline">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-gray-600">You haven't applied to any jobs yet.</p>
                      <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-accent">
                        Browse Jobs
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'saved' && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <h1 className="text-2xl font-bold p-6 border-b border-gray-200">Saved Jobs</h1>
                
                <div className="divide-y divide-gray-200">
                  {currentUser.savedJobs.length > 0 ? (
                    currentUser.savedJobs.map(job => (
                      <div key={job.id} className="p-6 hover:bg-gray-50">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <h2 className="font-bold text-lg">{job.jobTitle}</h2>
                            <p className="text-primary">{job.company}</p>
                            <p className="text-gray-600">{job.location}</p>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <span className="text-gray-500">Saved {job.saved}</span>
                            <button className="px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-accent">
                              Apply Now
                            </button>
                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-gray-600">You haven't saved any jobs yet.</p>
                      <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-accent">
                        Browse Jobs
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Other tabs would be implemented similarly */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
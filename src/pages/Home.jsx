import { Link } from 'react-router-dom';
// import HeroImage from '../assets/hero-image.jpg'; // Add your own image

const Home = () => {
  const featuredJobs = [
    
  ];

  const featuredCompanies = [
    
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Find Your Dream Job Today</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of companies and candidates connecting on our platform</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/jobs" className="bg-white text-primary font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Browse Jobs
            </Link>
            <Link to="/post-job" className="bg-transparent border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white hover:text-primary transition-colors">
              Post a Job
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map(job => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-start mb-4">
                  <img src={job.logo} alt={job.company} className="w-12 h-12 object-contain mr-4" />
                  <div>
                    <h3 className="font-bold text-lg">{job.title}</h3>
                    <p className="text-gray-600">{job.company} • {job.location}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-blue-100 text-primary px-3 py-1 rounded-full text-sm">{job.type}</span>
                  <span className="bg-green-100 text-success px-3 py-1 rounded-full text-sm">{job.salary}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Posted {job.posted}</span>
                  <Link to={`/jobs/${job.id}`} className="text-primary font-medium hover:underline">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/jobs" className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-accent transition-colors">
              View All Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Companies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCompanies.map(company => (
              <div key={company.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center">
                <img src={company.logo} alt={company.name} className="w-20 h-20 mx-auto mb-4 object-contain" />
                <h3 className="font-bold text-lg mb-1">{company.name}</h3>
                <p className="text-gray-600 mb-2">{company.industry}</p>
                <p className="text-gray-500 text-sm mb-3">{company.location}</p>
                <Link to={`/companies/${company.id}`} className="text-primary font-medium hover:underline">
                  View {company.jobs} jobs
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/companies" className="px-6 py-3 bg-white border border-primary text-primary rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Browse All Companies
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to take the next step in your career?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Create a free profile and get matched with top companies</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/register" className="bg-white text-primary font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Sign Up Free
            </Link>
            <Link to="/jobs" className="bg-transparent border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white hover:text-primary transition-colors">
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">JobFuse</h3>
            <p className="text-gray-600">Connecting talent with opportunity</p>
          </div>
          <div>
            <h4 className="font-medium mb-4">For Job Seekers</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary">Browse Jobs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Companies</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Salary Calculator</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Career Advice</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">For Employers</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary">Post a Job</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Browse Candidates</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Recruiting Solutions</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} JobFuse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
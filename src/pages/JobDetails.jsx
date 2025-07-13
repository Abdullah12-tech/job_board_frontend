import { useParams, Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { jobContext } from '../context/jobContext';
import { FiMapPin, FiDollarSign, FiBriefcase, FiClock } from 'react-icons/fi';

const JobDetails = () => {
  const { id } = useParams();
  const { singleJob, isLoading, fetchSingleJob } = useContext(jobContext);

  useEffect(() => {
    fetchSingleJob(id);
  }, [id]);

  if (isLoading) return <div className="p-6">Loading job details...</div>;

  // const company = singleJob?.postedBy || {};

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row gap-6">
            <img src={singleJob.companyLogo} alt={singleJob.title} className="w-20 h-20 object-contain border border-gray-200 rounded-lg" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{singleJob.title}</h1>
              <p className="text-gray-600 mb-4">{singleJob.companyName}</p>

              <div className="flex flex-wrap gap-4 text-gray-600 text-sm">
                <div className="flex items-center gap-2"><FiMapPin /> {singleJob.location}</div>
                <div className="flex items-center gap-2">
                  <FiDollarSign />
                  {singleJob.salaryRange
                    ? `${singleJob.salaryRange.currency} ${singleJob.salaryRange.min} - ${singleJob.salaryRange.max}`
                    : 'Not specified'}
                </div>
                <div className="flex items-center gap-2"><FiBriefcase /> {singleJob.type}</div>
                <div className="flex items-center gap-2"><FiClock /> Posted {singleJob.createdAt?.slice(0, 10)}</div>
              </div>

              <div className="mt-4">
                <Link to={`/apply/${singleJob._id}`} className="bg-primary text-white px-6 py-2 rounded hover:bg-accent">Apply Now</Link>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-bold mb-2">Description</h3>
            <div className="prose" dangerouslySetInnerHTML={{ __html: singleJob.description }} />

            {singleJob.benefits?.length > 0 && (
              <>
                <h3 className="text-lg font-bold mt-6 mb-2">Benefits</h3>
                <ul className="list-disc pl-6">
                  {singleJob.benefits.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;

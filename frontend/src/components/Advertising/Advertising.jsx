import CampaignIcon from "@mui/icons-material/Campaign";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GroupsIcon from "@mui/icons-material/Groups";

const Advertising = () => {
  return (
    <section className="px-6 md:px-16 py-14 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-2">
            <CampaignIcon fontSize="large" />
            Advertise on Clarify
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Reach students, developers, and learners by promoting your product,
            course, or service on Clarify.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <TrendingUpIcon className="text-yellow-500" />
            <h3 className="text-gray-800 mt-4 font-semibold text-lg">
              High Engagement
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Your ads appear alongside high-quality questions and answers,
              ensuring maximum visibility.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <GroupsIcon className="text-yellow-500" />
            <h3 className="text-gray-800 mt-4 font-semibold text-lg">
              Targeted Audience
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Reach students, freshers, and developers interested in tech,
              careers, and learning.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <CampaignIcon className="text-yellow-500" />
            <h3 className="text-gray-800 mt-4 font-semibold text-lg">
              Simple & Transparent
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Easy ad setup, clear pricing, and performance insights with no
              hidden costs.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
            Start Advertising
          </button>
        </div>

      </div>
    </section>
  );
};

export default Advertising;

import GroupIcon from "@mui/icons-material/Group";
import ArticleIcon from "@mui/icons-material/Article";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const stats = [
  {
    title: "Total Users",
    value: "1,248",
    icon: <GroupIcon className="text-blue-500" />,
  },
  {
    title: "Total Posts",
    value: "342",
    icon: <ArticleIcon className="text-green-500" />,
  },
  {
    title: "Total Views",
    value: "18.4K",
    icon: <VisibilityIcon className="text-purple-500" />,
  },
  {
    title: "Engagement",
    value: "76%",
    icon: <TrendingUpIcon className="text-orange-500" />,
  },
];

const DashboardAnalytics = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          Analytics Overview
        </h1>
        <p className="text-sm text-gray-500">
          Track platform performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4"
          >
            <div className="p-3 bg-gray-100 rounded-lg text-2xl">
              {item.icon}
            </div>

            <div>
              <p className="text-xs md:text-sm text-gray-500">
                {item.title}
              </p>
              <h2 className="text-lg md:text-xl font-bold text-gray-800">
                {item.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        {/* Chart Placeholder */}
        <div className="md:col-span-2 bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Weekly Activity
          </h3>
          <div className="h-48 flex items-center justify-center text-gray-400 text-sm">
            Chart goes here
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Recent Activity
          </h3>

          <ul className="space-y-3 text-sm">
            <li className="flex justify-between text-gray-600">
              <span>New user joined</span>
              <span>2m ago</span>
            </li>
            <li className="flex justify-between text-gray-600">
              <span>Post created</span>
              <span>10m ago</span>
            </li>
            <li className="flex justify-between text-gray-600">
              <span>Comment added</span>
              <span>1h ago</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default DashboardAnalytics;

import DashboardCard from "../../component/dashboarList";
import reviewCvImage from "../../assets/dashboardImages/reviewCV.svg";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { username } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const dashboardItems = [
    {
      id: 1,
      label: "CV Review",
      description: "Get AI-powered feedback on your resume",
      images: null,
      url: "/cv-review",
      available: true,
      color: "from-blue-500 to-purple-600",
      icon: "📄"
    },
    {
      id: 2,
      label: "Template Builder",
      description: "Create stunning resume templates",
      images: null,
      url: "#",
      available: false,
      color: "from-green-500 to-teal-600",
      icon: "🎨"
    },
    {
      id: 3,
      label: "Cover Letter",
      description: "Generate professional cover letters",
      images: null,
      url: "#",
      available: false,
      color: "from-orange-500 to-red-600",
      icon: "✉️"
    },
    {
      id: 4,
      label: "Interview Prep",
      description: "Practice with AI interview questions",
      images: null,
      url: "#",
      available: false,
      color: "from-purple-500 to-pink-600",
      icon: "🎤"
    },
    {
      id: 5,
      label: "Job Tracker",
      description: "Track your job applications",
      images: null,
      url: "#",
      available: false,
      color: "from-indigo-500 to-blue-600",
      icon: "📊"
    },
    {
      id: 6,
      label: "Analytics",
      description: "View your profile performance",
      images: null,
      url: "#",
      available: false,
      color: "from-gray-500 to-gray-700",
      icon: "📈"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                  {getGreeting()}, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{username}!</span>
                </h1>
                <p className="text-lg text-gray-600 mb-2">Ready to take your career to the next level?</p>
                <p className="text-sm text-gray-500">
                  {currentTime.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="flex space-x-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
                    1
                  </div>
                  <p className="text-sm text-gray-600">Tools Available</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
                    5
                  </div>
                  <p className="text-sm text-gray-600">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Career Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardItems.map((item) => (
                <DashboardCard
                  key={item.id}
                  label={item.label}
                  description={item.description}
                  images={item.images}
                  url={item.url}
                  available={item.available}
                  color={item.color}
                  icon={item.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

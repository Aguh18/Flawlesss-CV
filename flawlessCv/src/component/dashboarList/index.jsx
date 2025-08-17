import { useNavigate } from "react-router-dom";

const DashboardCard = ({ label, description, images, url, available = true, color = "from-blue-500 to-purple-600", icon = "🔧" }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (available && url && url !== "#") {
            navigate(url);
        }
    };

    return (
        <div className={`group ${available ? 'cursor-pointer' : 'cursor-not-allowed'} transition-all duration-300 transform hover:scale-105`}>
            <div className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden ${available ? 'hover:border-blue-200' : 'opacity-75'
                }`}>

                {/* Header with gradient */}
                <div className={`h-32 bg-gradient-to-br ${color} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-4 right-4">
                        {available ? (
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        ) : (
                            <div className="px-2 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                                <span className="text-xs text-white font-medium">Soon</span>
                            </div>
                        )}
                    </div>

                    {/* Icon container */}
                    <div className="absolute bottom-4 left-4">
                        <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                            <span className="text-2xl">{icon}</span>
                        </div>
                    </div>

                    {/* Additional small image icon for CV Review */}
                    {images && label === "CV Review" && (
                        <div className="absolute top-4 left-4">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                                <img
                                    src={images}
                                    alt={label}
                                    className="w-5 h-5 object-contain filter brightness-0 invert"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className={`text-lg font-bold mb-2 ${available ? 'text-gray-800' : 'text-gray-500'}`}>
                        {label}
                    </h3>
                    <p className={`text-sm mb-4 ${available ? 'text-gray-600' : 'text-gray-400'}`}>
                        {description}
                    </p>

                    {/* Action button */}
                    <button
                        onClick={handleClick}
                        disabled={!available}
                        className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${available
                            ? `bg-gradient-to-r ${color} text-white hover:shadow-lg transform hover:scale-105 active:scale-95`
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {available ? 'Open Tool' : 'Coming Soon'}
                    </button>
                </div>

                {/* Hover effect overlay */}
                {available && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                )}

                {/* Lock icon for unavailable items */}
                {!available && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
                        <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardCard;
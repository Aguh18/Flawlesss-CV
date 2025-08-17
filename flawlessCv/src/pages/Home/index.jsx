
import image from "../../assets/home/Group.svg";
import { Footer } from "../../layout";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center p-8 text-center bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300">
    <div className="p-3 mb-4 rounded-full bg-blue-50">{icon}</div>
    <h2 className="mb-3 text-xl font-bold text-gray-800">{title}</h2>
    <p className="text-gray-600">{desc}</p>
  </div>
);

const StatCard = ({ number, label }) => (
  <div className="flex flex-col items-center p-6 bg-white shadow-sm rounded-xl hover:shadow-md transition-shadow duration-300">
    <span className="mb-1 text-3xl font-bold text-blue-600">{number}</span>
    <span className="text-sm text-gray-500">{label}</span>
  </div>
);

const ProcessStep = ({ number, title, desc }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
      {number}
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{desc}</p>
  </div>
);

const TestimonialCard = ({ quote, author, role }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <div className="mb-4">
      <svg className="w-8 h-8 text-blue-600 mb-2" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
      </svg>
    </div>
    <p className="text-gray-700 italic mb-4">"{quote}"</p>
    <div className="border-t pt-4">
      <p className="font-semibold text-gray-800">{author}</p>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  </div>
);

const Home = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="w-full px-4 py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="flex flex-col-reverse items-center max-w-6xl gap-12 mx-auto md:flex-row">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 md:text-6xl leading-tight">
              Build Your <span className="text-blue-600">Perfect CV</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Transform your career with AI-powered CV analysis. Get expert feedback, ATS optimization, and stand out to recruiters with a flawless resume.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {token ? (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Go to Dashboard
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Get Started Free
                </button>
              )}
              <button
                onClick={() => navigate("/cv-review")}
                className="px-8 py-4 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="flex justify-center flex-1">
            <img src={image} alt="FlawlessCV Hero" className="w-full max-w-lg drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full px-4 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Professionals Worldwide</h2>
            <p className="text-lg text-gray-600">Join thousands of successful job seekers</p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <StatCard number="25K+" label="CVs Reviewed" />
            <StatCard number="95%" label="Success Rate" />
            <StatCard number="24/7" label="AI Support" />
            <StatCard number="150+" label="Job Categories" />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full px-4 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Simple steps to create your perfect CV</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <ProcessStep
              number="1"
              title="Upload Your CV"
              desc="Simply upload your current CV in PDF or Word format"
            />
            <ProcessStep
              number="2"
              title="AI Analysis"
              desc="Our advanced AI analyzes your CV for content, format, and ATS compatibility"
            />
            <ProcessStep
              number="3"
              title="Get Feedback"
              desc="Receive detailed feedback and actionable recommendations"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full px-4 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FlawlessCV?</h2>
            <p className="text-lg text-gray-600">Powerful features to boost your job search</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              title="Smart CV Analysis"
              desc="Get instant feedback on your CV with our AI-powered analysis. Improve content, format, and ATS compatibility."
            />
            <FeatureCard
              icon={<svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
              title="Industry Insights"
              desc="Access expert tips and industry-specific recommendations to make your CV stand out in your field."
            />
            <FeatureCard
              icon={<svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
              title="ATS Optimization"
              desc="Ensure your CV passes through Applicant Tracking Systems with our optimization tools."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full px-4 py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600">Success stories from professionals like you</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <TestimonialCard
              quote="FlawlessCV helped me land my dream job at Google. The AI feedback was incredibly detailed and actionable."
              author="Sarah Johnson"
              role="Software Engineer at Google"
            />
            <TestimonialCard
              quote="The ATS optimization feature made all the difference. I started getting interview calls within a week!"
              author="Michael Chen"
              role="Marketing Manager"
            />
            <TestimonialCard
              quote="Professional, easy to use, and most importantly - it works! Highly recommended for job seekers."
              author="Emily Rodriguez"
              role="Data Scientist"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have successfully landed their dream jobs
          </p>
          {token ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="px-10 py-4 text-lg font-semibold text-blue-600 bg-white rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start Improving Your CV
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-10 py-4 text-lg font-semibold text-blue-600 bg-white rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Get Started Today
            </button>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

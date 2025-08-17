import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const BASE_API_URL = import.meta.env.VITE_BASE_ACCOUNT_SERVICE_API_URL;

const Signup = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setusername] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);


  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setErrorStatus(null);

    try {
      const response = await fetch(`${BASE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error(response.status);
      }

      console.log("register  successful");
      navigate("/login");
    } catch (err) {
      setErrorStatus(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="relative w-full max-w-4xl mx-4">
        {/* Background Decorations */}
        <div className="absolute w-64 h-64 bg-blue-200 rounded-full -top-12 -left-12 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute w-64 h-64 bg-purple-200 rounded-full -bottom-8 -right-8 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute w-64 h-64 bg-pink-200 rounded-full -bottom-8 left-20 mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* Main Card */}
        <div className="relative flex flex-col overflow-hidden border shadow-2xl bg-white/80 backdrop-blur-xl border-white/20 md:flex-row rounded-3xl signup-card">
          {/* Left Side - Welcome */}
          <div className="flex-col items-center justify-center hidden w-1/2 p-12 bg-gradient-to-br from-blue-500 to-blue-700 md:flex">
            <div className="w-full max-w-sm text-white">
              <h2 className="mb-6 text-4xl font-bold leading-tight">Join FlawlessCV Today</h2>
              <p className="mb-8 text-lg text-blue-100">Create your account and start your journey towards career excellence.</p>
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="flex flex-col justify-center w-full gap-6 px-8 py-12 md:w-1/2 md:px-12">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold text-gray-900">Create Account</h3>
              <p className="mt-2 text-gray-600">Sign up to get started with FlawlessCV</p>
            </div>

            {errorStatus && (
              <div className="p-4 text-sm text-red-700 bg-red-100 border-l-4 border-red-500 rounded-r-lg animate-shake">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>
                    {errorStatus === "400"
                      ? "Password must be 8 characters or more"
                      : errorStatus === "500"
                        ? "Email or username already exists"
                        : "Registration failed"}
                  </span>
                </div>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Username</label>
                <div className="relative form-input-group">
                  <input
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    type="text"
                    className="w-full p-4 pl-12 text-gray-700 placeholder-gray-400 transition-all duration-200 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Choose your username"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none form-input-icon">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative form-input-group">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full p-4 pl-12 text-gray-700 placeholder-gray-400 transition-all duration-200 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="you@example.com"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none form-input-icon">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative form-input-group">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="w-full p-4 pl-12 text-gray-700 placeholder-gray-400 transition-all duration-200 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Create a strong password"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none form-input-icon">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="relative w-full p-4 text-lg font-semibold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed submit-button"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-3 -ml-1 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

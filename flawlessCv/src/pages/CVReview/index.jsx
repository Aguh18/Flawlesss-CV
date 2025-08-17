import { CvReviewArticle } from "../../component";
import { Footer } from "../../layout";
import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import flashLogo from "../../assets/cvReview/Auto Flash.svg";
import peopleIcon from "../../assets/cvReview/people.svg";
import loopIcon from "../../assets/cvReview/loop.svg";
import safetyIcon from "../../assets/cvReview/safety.svg";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const CVReview = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [positionTarget, setPositionTarget] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [response, setResponse] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfError, setPdfError] = useState('');

  const TextFormatter = ({ text }) => {
    const formatText = (text) => {
      if (!text) return null;

      const regex = /\*\*(.*?)\*\*/g;
      const parts = text.split(regex);

      let currentSection = [];
      const sections = [];

      parts.forEach((part, index) => {
        if (index % 2 === 1) {
          // This is a header
          if (currentSection.length > 0) {
            sections.push(currentSection);
            currentSection = [];
          }
          currentSection.push({ type: 'header', content: part });
        } else if (part.trim()) {
          // This is content
          currentSection.push({ type: 'content', content: part.trim() });
        }
      });

      if (currentSection.length > 0) {
        sections.push(currentSection);
      }

      return sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
          {section.map((item, itemIndex) => {
            if (item.type === 'header') {
              return (
                <div key={itemIndex} className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">{sectionIndex + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{item.content}</h3>
                </div>
              );
            } else {
              return (
                <div key={itemIndex} className="text-gray-700 leading-relaxed pl-11">
                  {item.content.split('\n').map((line, lineIndex) => {
                    if (line.trim()) {
                      return (
                        <p key={lineIndex} className="mb-2">
                          {line.startsWith('•') || line.startsWith('-') ? (
                            <span className="flex items-start">
                              <span className="text-blue-500 mr-2 mt-1">•</span>
                              <span>{line.replace(/^[•-]\s*/, '')}</span>
                            </span>
                          ) : (
                            line
                          )}
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
              );
            }
          })}
        </div>
      ));
    };

    return <div>{formatText(text)}</div>;
  };

  TextFormatter.propTypes = {
    text: PropTypes.string
  };

  const allowedFiles = ['application/pdf'];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCvFile(file);

      if (allowedFiles.includes(file.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
          setPdfError('');
          setPdfFile(e.target.result);
        }
      } else {
        setPdfError('Please select only PDF files');
        setPdfFile('');
        setCvFile(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cvFile) {
      alert("Please upload your CV!");
      return;
    }

    if (!positionTarget.trim()) {
      alert("Please enter your target position!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("destination", positionTarget);
    formData.append("file", cvFile);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_CV_REVIEW_API_URL}/get-cv`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResponse(response.data.data);
      setIsSuccess(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error uploading CV:", error);
      alert("Error analyzing CV. Please try again.");
    }
  };

  const resetAnalysis = () => {
    setIsSuccess(false);
    setResponse(null);
    setCvFile(null);
    setPdfFile(null);
    setPositionTarget("");
    setPdfError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {isSuccess ? (
        // Results View
        <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                CV Analysis Complete!
              </h1>
              <p className="text-lg text-gray-600 mb-6">Your CV has been analyzed by our AI. Here are the insights and recommendations.</p>
              <div className="flex justify-center">
                <button
                  onClick={resetAnalysis}
                  className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium"
                >
                  ← Analyze Another CV
                </button>
              </div>
            </div>

            {/* Results Content */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* PDF Viewer */}
              <div className="xl:col-span-1">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-24">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Your CV
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="border rounded-lg overflow-hidden bg-gray-50" style={{ height: '500px' }}>
                      {pdfFile ? (
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                          <Viewer
                            fileUrl={pdfFile}
                            plugins={[defaultLayoutPluginInstance]}
                          />
                        </Worker>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                          <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p>PDF preview not available</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Analysis Results */}
              <div className="xl:col-span-2">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      AI Analysis & Recommendations
                    </h3>
                    <p className="text-purple-100 mt-2">Detailed insights to improve your CV&apos;s impact</p>
                  </div>
                  <div className="p-6">
                    <div className="max-h-screen overflow-y-auto">
                      <TextFormatter text={response} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100">Analysis</p>
                    <p className="text-2xl font-bold">Complete</p>
                  </div>
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Target Position</p>
                    <p className="text-lg font-bold truncate">{positionTarget}</p>
                  </div>
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Recommendations</p>
                    <p className="text-2xl font-bold">Ready</p>
                  </div>
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Upload Form View
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                AI-Powered CV Review
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get instant, professional feedback on your resume. Our AI analyzes your CV for ATS compatibility,
                content quality, and provides actionable recommendations to improve your job prospects.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Upload Form */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Your CV</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Position Target Input */}
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                      Target Position
                    </label>
                    <input
                      id="position"
                      type="text"
                      value={positionTarget}
                      onChange={(e) => setPositionTarget(e.target.value)}
                      placeholder="e.g., Software Engineer, Marketing Manager"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label htmlFor="cv-file" className="block text-sm font-medium text-gray-700 mb-2">
                      CV File (PDF only)
                    </label>
                    <div className="relative">
                      <input
                        id="cv-file"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                    {pdfError && (
                      <p className="mt-2 text-sm text-red-600">{pdfError}</p>
                    )}
                    {cvFile && (
                      <p className="mt-2 text-sm text-green-600">✓ {cvFile.name} uploaded successfully</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || !cvFile || !positionTarget.trim()}
                    className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? "Analyzing CV..." : "Analyze My CV"}
                  </button>

                  {/* Security Note */}
                  <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                    <span className="text-green-600">🔒</span>
                    <span>Your data is secure. No personal information is stored from your document.</span>
                  </div>
                </form>
              </div>

              {/* Features Grid */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Our AI Review?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <CvReviewArticle
                    text="Our AI reviews your CV for ATS compatibility, structure, and content, offering clear, actionable feedback to enhance your resume."
                    title="AI-Powered Analysis"
                    images={flashLogo}
                  />
                  <CvReviewArticle
                    text="Get a straightforward analysis of your CV. Our AI ensures it meets ATS standards, helping you present a professional, tailored resume."
                    title="ATS Optimization"
                    images={loopIcon}
                  />
                  <CvReviewArticle
                    text="Upload your CV and receive focused suggestions to improve its format, clarity, and relevance for better job application results."
                    title="Instant Feedback"
                    images={peopleIcon}
                  />
                  <CvReviewArticle
                    text="Our AI provides a balanced evaluation of your CV, helping you identify improvements while ensuring it aligns with recruiter expectations."
                    title="Professional Standards"
                    images={safetyIcon}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Analyzing Your CV</h3>
            <p className="text-gray-600">This may take a few moments...</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CVReview;

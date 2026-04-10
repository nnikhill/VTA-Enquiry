import { useLocation, Link } from "react-router-dom";

export default function SuccessPage() {
  const location = useLocation();

  const enquiryId = location.state?.enquiryId || "N/A";
  const name = location.state?.name || "Student";

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-purple-800 overflow-hidden px-4">

      {/* 🔮 Background Vector Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-white opacity-20 rounded-full blur-3xl"></div>

      {/* SVG Wave */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#ffffff"
          fillOpacity="0.1"
          d="M0,192L60,176C120,160,240,128,360,128C480,128,600,160,720,176C840,192,960,192,1080,176C1200,160,1320,128,1380,112L1440,96V320H0Z"
        ></path>
      </svg>

      {/* 💎 Card */}
      <div className="relative backdrop-blur-lg bg-white/90 shadow-2xl rounded-2xl p-6 sm:p-8 max-w-md w-full text-center">

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-purple-100 text-purple-600 p-4 rounded-full text-3xl shadow-md">
            ✓
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-xl sm:text-2xl font-bold text-purple-700 mb-2">
          Thank You, {name}!
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-sm sm:text-base mb-4">
          Your enquiry has been submitted successfully.
        </p>

        {/* Enquiry ID */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
          <p className="text-xs text-gray-500">Enquiry ID</p>
          <h2 className="text-md sm:text-lg font-semibold text-purple-700">
            {enquiryId}
          </h2>
        </div>

        {/* Info */}
        <p className="text-gray-500 text-xs sm:text-sm mb-6">
          Our counselling team will connect with you shortly.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-block w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition duration-300"
        >
          Submit Another Enquiry
        </Link>
      </div>
    </div>
  );
}
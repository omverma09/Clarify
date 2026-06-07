import { useNavigate } from "react-router-dom";

const Progresspage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white border border-gray-200 rounded-2xl p-10 max-w-md w-full text-center shadow-sm">

        {/* Illustration */}
        <div className="flex justify-center mb-7 animate-bounce">
          <svg viewBox="0 0 160 160" width="130" height="130">
            <circle cx="80" cy="80" r="72" fill="#fff5f2" stroke="#FFD4C2" strokeWidth="1.5" />
            <rect x="36" y="44" width="64" height="48" rx="6" fill="#fff" stroke="#e5e7eb" strokeWidth="1.5" />
            <rect x="42" y="52" width="44" height="5" rx="2.5" fill="#f3f4f6" />
            <rect x="42" y="62" width="36" height="5" rx="2.5" fill="#f3f4f6" />
            <rect x="42" y="72" width="28" height="5" rx="2.5" fill="#FFD4C2" />
            <rect x="42" y="82" width="40" height="5" rx="2.5" fill="#f3f4f6" />
            <circle cx="90" cy="50" r="10" fill="#fff5f2" stroke="#FF4500" strokeWidth="1.5" />
            <text x="90" y="54" textAnchor="middle" fontSize="11" fontWeight="700" fill="#FF4500">!</text>
            <circle cx="97" cy="112" r="20" fill="#FF4500" fillOpacity="0.1" stroke="#FF4500" strokeWidth="1.5" />
            <circle cx="97" cy="112" r="8" fill="#FF4500" fillOpacity="0.35" />
            <rect x="93" y="88" width="8" height="10" rx="2" fill="#FF4500" fillOpacity="0.7" />
            <rect x="93" y="126" width="8" height="10" rx="2" fill="#FF4500" fillOpacity="0.7" />
            <rect x="73" y="108" width="10" height="8" rx="2" fill="#FF4500" fillOpacity="0.7" />
            <rect x="111" y="108" width="10" height="8" rx="2" fill="#FF4500" fillOpacity="0.7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
          We're working on this
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          This page is under construction. We're building something great — check back soon!
        </p>

        <div className="flex justify-center items-center gap-1.5 mb-8">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: "0s" }} />
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }} />
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: "0.6s" }} />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-full transition-colors"
          >
            ← Go back to feed
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full py-2.5 bg-transparent hover:bg-gray-50 text-gray-500 text-sm border border-gray-200 rounded-full transition-colors"
          >
            Go back
          </button>
        </div>

      </div>
    </div>
  );
};

export default Progresspage;
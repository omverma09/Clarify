const HelpContact = () => {
  return (
    <section className="w-full bg-white px-6 md:px-16 py-20">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Still need help?
          </h2>
          <p className="mt-3 text-gray-600">
            Contact Clarify support and we’ll get back to you shortly.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-100 rounded-2xl shadow-lg p-8 md:p-10">
          <form className="space-y-6">

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none text-gray-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="text-gray-600 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Issue Type
              </label>
              <select className="text-gray-500 w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none">
                <option>Select an option</option>
                <option>Account Issue</option>
                <option>Posting a Question</option>
                <option>Answer / Comment Issue</option>
                <option>Bug Report</option>
                <option>Other</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Describe your issue..."
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-400 outline-none resize-none text-gray-600 "
              />
            </div>

            {/* Submit */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-black text-white px-10 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
              >
                Submit Request
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default HelpContact;

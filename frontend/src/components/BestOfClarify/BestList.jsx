const BestList = () => {
  return (
    <section className="px-6 md:px-16 py-12 space-y-12">

      {/* TOP QUESTIONS */}
      <div>
        <h2 className="text-gray-800 text-2xl font-bold mb-6">
          🔥 Top Questions
        </h2>

        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-gray-600 font-semibold text-lg">
                How to implement JWT authentication in MERN?
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                ⭐ 520 upvotes • 💬 42 answers
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TOP CONTRIBUTORS */}
      <div>
        <h2 className="text-gray-800 text-2xl font-bold mb-6">
          🏆 Top Contributors
        </h2>

        <div className="text-gray-600 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-yellow-400 mb-4 flex items-center justify-center">
                <img
                  src="https://i.pravatar.cc/40"
                  className="w-12 h-12 rounded-full"
                  alt="profile"
                />
              </div>              <h4 className="font-semibold">User {i}</h4>
              <p className="text-sm text-gray-500">
                🔥 120 helpful answers
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default BestList;
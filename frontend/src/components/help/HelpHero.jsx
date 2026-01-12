const HelpHero = () => {
  return (
    <section className="w-full bg-yellow-400 px-6 md:px-16 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

        {/* LEFT CONTENT */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
            How can we help <br /> you today?
          </h1>

          <p className="mt-4 text-lg text-black/80">
            Welcome to Clarify's Help Center
          </p>

          {/* SEARCH BAR */}
          <div className="mt-8 flex items-center bg-white rounded-full shadow-lg overflow-hidden max-w-xl">
            <div className="px-5 text-gray-400">
              🔍
            </div>
            <input
              type="text"
              placeholder="Search help articles"
              className="flex-1 py-4 outline-none text-gray-700"
            />
            <button className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition">
              Search
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center">
          <div className="bg-yellow-300 rounded-3xl p-6">
            <img
              src="../helpbot.png"
              alt="Help Bot"
              className="w-72 md:w-80 object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HelpHero;

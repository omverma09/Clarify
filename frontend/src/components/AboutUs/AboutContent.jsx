import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import BuildIcon from "@mui/icons-material/Build";
import GroupsIcon from "@mui/icons-material/Groups";
import BoltIcon from "@mui/icons-material/Bolt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School";

const AboutContent = () => {
  return (
    <section className="px-6 md:px-16 py-12 space-y-12">

      {/* WHAT IS CLARIFY */}
      <div>
        <h2 className="text-gray-800 text-2xl font-bold mb-4">
          <RocketLaunchIcon/>  What is Clarify?
        </h2>
        <p className="text-gray-700 max-w-3xl leading-relaxed">
          Clarify is a modern Q&A and discussion platform designed for students,
          developers, and curious minds. Users can Post something and ask questions, provide
          answers, and help others by sharing real-world knowledge and
          experiences.
        </p>
      </div>

      {/* WHY CLARIFY */}
      <div>
        <h2 className="text-gray-600 text-2xl font-bold mb-4">
          <LightbulbIcon/>  Why Clarify?
        </h2>

        <ul className="text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-6">
          <li className="bg-white p-6 rounded-xl shadow">
            <GroupsIcon/>  Community-driven learning
          </li>
          <li className="bg-white p-6 rounded-xl shadow">
            <BoltIcon/>  Fast and meaningful answers
          </li>
          <li className="bg-white p-6 rounded-xl shadow">
            <CheckCircleIcon/>  Focus on quality over noise
          </li>
          <li className="bg-white p-6 rounded-xl shadow">
            <SchoolIcon/>  Built for students & freshers
          </li>
        </ul>
      </div>

      {/* TECH STACK */}
      <div>
        <h2 className="text-gray-600 text-2xl font-bold mb-4">
          <BuildIcon/>  Tech Behind Clarify
        </h2>

        <div className="text-gray-600 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {["React", "Node.js", "Express", "MongoDB", "Tailwind"].map(
            (tech) => (
              <div
                key={tech}
                className="bg-gray-100 px-4 py-3 rounded-full text-center font-medium"
              >
                {tech}
              </div>
            )
          )}
        </div>
      </div>

    </section>
  );
};

export default AboutContent;
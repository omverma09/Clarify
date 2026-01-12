import { useState } from "react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdOutlineWhatsapp } from "react-icons/md";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="w-full">

      {/* CTA SECTION */}
      <section className="bg-yellow-400 px-6 md:px-16 py-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <h3 className="text-2xl md:text-3xl font-bold text-black max-w-3xl">
            I’m a Full Stack Web Developer skilled in the MERN stack, passionate
            about building clean, user-friendly, and scalable web applications.
          </h3>

          <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* FOOTER MAIN */}
      <div className="bg-white px-6 md:px-16 py-14 border-t">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* LINKS */}
          <div>
            <h4 className=" text-gray-900 font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-black cursor-pointer">Home</li>
              <li className="hover:text-black cursor-pointer">Services</li>
              <li className="hover:text-black cursor-pointer">Projects</li>
              <li className="hover:text-black cursor-pointer">Testimonials</li>
              <li className="hover:text-black cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className=" text-gray-900 font-semibold text-lg mb-4">Subscribe</h4>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-gray-600 flex-1 px-4 py-3 border rounded-full outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="text-gray-900 font-semibold text-lg mb-4">Follow Me</h4>
            <div className="flex">
              <div className="ml-auto flex  text-2xl text-gray-600 footer-icons">
                <span className="hover:text-black cursor-pointer"><FaInstagram /></span>
                <span className="hover:text-black cursor-pointer"><FaFacebook /></span>
                <span className="hover:text-black cursor-pointer"><FaSquareXTwitter /></span>
                <span className="hover:text-black cursor-pointer"><MdOutlineWhatsapp /></span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="bg-gray-100 py-4">
        <p className="text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Om Verma. All rights reserved.
        </p>
      </div>

    </footer>
  );
};

export default Footer;
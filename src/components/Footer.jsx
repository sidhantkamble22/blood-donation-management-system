import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold mb-1">
            Blood Donation Management System
          </h2>
          <p className="text-xs opacity-90">
            Donate Blood, Save Lives
          </p>
        </div>

        <div className="flex gap-4 text-xl text-white">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
            <FaTwitter />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">
            <FaFacebookF />
          </a>
        </div>

        <div className="text-center md:text-right">
          <p className="text-xs break-words">
            📧 Contact:{" "}
            <a href="mailto:sidhantkamble080@gmail.com"
              className="underline hover:text-gray-300">
               sidhantkamble080@gmail.com
            </a>
          </p>
          <p className="text-[10px] opacity-70 mt-2">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

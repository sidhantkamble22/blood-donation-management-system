import { Link } from "react-router-dom";
import logo from "../assets/icons/drop.jpg";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md px-4 sm:px-6 lg:px-10 py-3 border-b-2 border-gray-200 flex flex-wrap items-center justify-between">
      
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="logo h-10 w-10">
          <img src={logo} alt="logo" className="w-full h-full object-contain" />
        </div>
        <div className="flex flex-col leading-tight">
          <h2 className="text-xl font-bold tracking-wide text-red-600">
            BloodDonation Camp
          </h2>
          <p className="text-sm font-semibold text-black lowercase">
            management system
          </p>
        </div>
      </div>

      <div className="flex gap-5 sm:gap-7 mt-3 sm:mt-0 flex-wrap">
        <Link to="/" className="hover:text-red-700 transition font-bold">
          Home
        </Link>
        <Link to="/about" className="hover:text-red-700 transition font-bold">
          About
        </Link>
        <Link to="/contact" className="hover:text-red-700 transition font-bold">
          Contact
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;

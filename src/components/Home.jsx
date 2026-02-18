import bgImage from "../assets/icons/bg.jpg";
import hand from "../assets/icons/dropsection.png";
import request from "../assets/icons/request.png";
import total from "../assets/icons/total.png";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [totalDonors, setTotalDonors] = useState(0);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTotalDonors();
    fetchRequests();
  }, []);

  const fetchTotalDonors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/donors");
      setTotalDonors(res.data.length);
    } catch (error) {
      console.log("Error fetching donor count", error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/requests");
      setRequests(res.data);
    } catch (error) {
      console.log("Error fetching requests", error);
    }
  };

  return (
    <>
     
      <div className="relative">
        <div
          className="h-[85vh] bg-no-repeat bg-cover bg-top rounded-b-[70px]"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="h-full bg-black/20 pt-10 px-4 sm:px-10 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Save Blood,
            </h1>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Give Blood
            </h1>
            <h1 className="text-lg sm:text-xl text-white mt-3 mx-1">
              Become a Hero, Donate Blood Today!
            </h1>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                className="w-full sm:w-auto border border-red-800 bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition"
                onClick={() => navigate("/request-donor")}
              >
                Request Blood
              </button>

              <button
                className="w-full sm:w-auto border border-white bg-white text-black px-6 py-3 rounded-md hover:bg-gray-100 transition"
                onClick={() => navigate("/become-donor")}
              >
                Become a Donor
              </button>
            </div>
          </div>
        </div>

        {/* -------- Cards Section -------- */}
        <div className="absolute left-1/2 -bottom-24 -translate-x-1/2 w-full px-4 sm:px-10 flex flex-col md:flex-row gap-6 justify-center">
          {/* Recent Requests */}
          <div className="bg-white shadow-xl rounded-xl p-4 sm:p-6 flex items-center w-full md:w-1/3 gap-4">
            <img
              src={request}
              alt="requestDonor"
              className="h-20 w-20 sm:h-24 sm:w-24 object-contain"
            />
            <div className="text-left">
              <h3 className="text-lg sm:text-xl font-bold text-black mb-1">
                {requests.length}+ Recent Requests
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Urgent Requests
              </p>
            </div>
          </div>

         
          <div className="bg-white shadow-xl rounded-xl p-4 sm:p-6 flex items-center w-full md:w-1/3 gap-4">
            <img
              src={total}
              alt="totalDonors"
              className="h-20 w-20 sm:h-24 sm:w-24 object-contain"
            />
            <div className="text-left">
              <h3 className="text-lg sm:text-xl font-bold text-black mb-1">
                {totalDonors}+ Total Donors
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Registered Donors
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-32 md:h-40"></div>

      <div className="flex flex-col md:flex-row justify-around items-center px-4 sm:px-10 gap-6">
        <img
          src={hand}
          alt="Blood Drop"
          className="w-64 sm:w-80 h-20 sm:h-22 rounded-xl object-contain"
        />
        <div className="mx-2 sm:mx-5 border-red-700">
          <ul className="list-disc list-inside marker:text-red-600 cursor-pointer space-y-2 text-base sm:text-lg">
            <li>Learn More about Blood Donation</li>
            <li>How To Become A Donor</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;

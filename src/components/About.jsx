import React from "react";
import aboutBg from "../assets/icons/bg.jpg";
import feature1 from "../assets/icons/total.png";
import feature2 from "../assets/icons/request.png";
import feature3 from "../assets/icons/hand.png";

const About = () => {
  const features = [
    {
      icon: feature1,
      title: "Become a Donor",
      description:
        "Register as a blood donor easily and contribute to saving lives in your community.",
    },
    {
      icon: feature2,
      title: "Request Blood",
      description:
        "Patients and hospitals can request blood quickly and efficiently.",
    },
    {
      icon: feature3,
      title: "Emergency Response",
      description:
        "Highlight emergency requests for faster matching with available donors.",
    },
  ];

  const team = [
    {
      name: "Sidhant Kamble",
      role: "Frontend & Backend Developer",
    },
    {
      name: "Sidhant Kamble",
      role: "UI/UX Designer",
    },
    {
      name: "Sidhant Kamble",
      role: "Project Manager",
    },
  ];

  return (
    <div className="w-full">
     
      <div
        className="w-full h-80 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${aboutBg})` }}
      >
        <div className="bg-black/50 p-8 rounded-xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 mb-2">
            About Blood Donation System
          </h1>
          <p className="text-white text-lg md:text-xl">
            Donate Blood, Save Lives — Be a Hero Today!
          </p>
        </div>
      </div>

      {/* Slogan / Intro */}
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          Why Choose Our System?
        </h2>
        <p className="text-gray-700 text-lg md:text-xl">
          Our Blood Donation Management System connects donors and recipients
          in real-time, ensuring quick response during emergencies and saving lives.
        </p>
      </div>

     
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center hover:scale-105 transform transition"
            >
              <img src={f.icon} alt={f.title} className="h-24 w-24 mb-4" />
              <h3 className="text-xl font-bold text-red-600 mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-8">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-xl p-6 hover:scale-105 transform transition"
            >
              <div className="h-32 w-32 mx-auto bg-red-200 rounded-full mb-4 flex items-center justify-center text-red-600 text-xl font-bold">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h3 className="text-xl font-bold text-red-600">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      
      <div className="bg-red-600 py-12 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Become a Hero Today!
        </h2>
        <p className="text-lg md:text-xl mb-6">
          Register as a donor or request blood to save lives in your community.
        </p>
        <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
          Take Action
        </button>
      </div>
    </div>
  );
};

export default About;

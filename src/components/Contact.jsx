import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="w-full bg-slate-950 text-white">

  
      <div className="py-20 text-center px-4 bg-gradient-to-r from-red-700 to-red-900">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
          Contact Us
        </h1>
        <p className="text-lg opacity-90">
          We are here to help you save lives
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-slate-900 border border-red-700 rounded-xl p-6 text-center hover:scale-105 transition">
            <FaPhoneAlt className="text-red-600 text-3xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Call Us</h3>
            <p className="text-gray-400">+91 98765 43210</p>
          </div>

          <div className="bg-slate-900 border border-red-700 rounded-xl p-6 text-center hover:scale-105 transition">
            <FaEnvelope className="text-red-600 text-3xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p className="text-gray-400">support@blooddonation.com</p>
          </div>

          <div className="bg-slate-900 border border-red-700 rounded-xl p-6 text-center hover:scale-105 transition">
            <FaMapMarkerAlt className="text-red-600 text-3xl mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Location</h3>
            <p className="text-gray-400">Mumbai, Maharashtra</p>
          </div>

        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="bg-slate-900 border border-red-800 rounded-2xl p-8 md:p-12 shadow-xl">

          <h2 className="text-3xl font-bold text-center mb-8 text-red-600">
            Send Us a Message
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Your Name"
              className="bg-slate-800 border border-slate-700 p-3 rounded-lg focus:outline-none focus:border-red-600"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="bg-slate-800 border border-slate-700 p-3 rounded-lg focus:outline-none focus:border-red-600"
            />

            <input
              type="text"
              placeholder="Subject"
              className="bg-slate-800 border border-slate-700 p-3 rounded-lg md:col-span-2 focus:outline-none focus:border-red-600"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="bg-slate-800 border border-slate-700 p-3 rounded-lg md:col-span-2 focus:outline-none focus:border-red-600"
            ></textarea>

            <button
              type="button"
              className="md:col-span-2 bg-red-700 hover:bg-red-800 transition py-3 rounded-lg font-bold text-lg"
            >
              Send Message
            </button>

          </form>

        </div>
      </div>

      
      <div className="text-center pb-10 text-gray-400 text-sm">
        We usually respond within 24 hours.
      </div>

    </div>
  );
};

export default Contact;

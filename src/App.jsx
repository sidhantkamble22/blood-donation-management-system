import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BecomeDonor from "./components/BecomeDonor";
import RequestDonor from "./components/RequestDonor";




function App() {
  return (
    <>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
         <Navbar/>
      <div className="min-h-screen">
        <Routes>
    
          <Route path="/become-donor" element={<BecomeDonor />} />
          <Route path="/request-donor" element={<RequestDonor />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;

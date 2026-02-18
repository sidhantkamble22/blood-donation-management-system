import React, { useState, useEffect } from "react";
import bgImage from "../assets/icons/bg2.jpg"; 
import { toast } from "react-toastify";
import axios from "axios";

const BecomeDonor = () => {
  const [donor, setDonor] = useState(() => {
    const stored = localStorage.getItem("donors");
    return stored ? JSON.parse(stored) : [];
  });

  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    bloodGroup: "",
    age: "",
    phone: "",
    gender: "",
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/donors");
      setDonor(res.data);
    } catch (error) {
      console.log("Error fetching donors", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, bloodGroup, age, phone, gender } = formData;
    if (!fullName || !bloodGroup || !age || !phone || !gender) {
      alert("All fields are required!");
      return;
    }

    if (editId) {
      await axios.put(`http://localhost:5000/donors/${editId}`, formData);
      setDonor((prev) =>
        prev.map((d) => (d._id === editId ? { ...d, ...formData } : d))
      );
      setEditId(null);
    } else {
      const res = await axios.post("http://localhost:5000/donors", formData);
      setDonor((prev) => [...prev, { ...formData, _id: res.data.data.insertedId }]);
      toast.success("Donor Added successfully!");
    }

    setFormData({
      fullName: "",
      bloodGroup: "",
      age: "",
      phone: "",
      gender: "",
    });
  };

  const editDonor = (donor) => {
    setFormData({
      fullName: donor.fullName,
      bloodGroup: donor.bloodGroup,
      age: donor.age,
      phone: donor.phone,
      gender: donor.gender,
    });
    setEditId(donor._id);
  };

  const deleteDonor = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this donor?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:5000/donors/${id}`);
      setDonor((prev) => prev.filter((d) => d._id !== id));
      toast.success("Donor deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete donor");
    }
  };

  const filteredDonors = donor.filter(
    (d) =>
      (d.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
      (d.bloodGroup || "").toLowerCase().includes(search.toLowerCase()) ||
      (d.phone || "").includes(search)
  );

  return (
    <>
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-black/50 w-full min-h-screen">
          <div className="flex flex-col items-center py-10 gap-10 px-4 sm:px-6 lg:px-10">
            <form
              onSubmit={handleSubmit}
              className="bg-[#b6b2b205] backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-md w-full max-w-md flex flex-col gap-4"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-4 text-center">
                Become a Donor
              </h1>

              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                placeholder="Full Name"
                className="border border-gray-300 p-2 rounded w-full"
              />

              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>

              <input
                name="age"
                value={formData.age}
                onChange={handleChange}
                type="number"
                min="1"
                placeholder="Age"
                className="border border-gray-300 p-2 rounded w-full"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="Phone Number"
                maxLength={10}
                className="border border-gray-300 p-2 rounded w-full"
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded w-full"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <button className="bg-[#292626] text-white font-bold py-2 rounded flex items-center justify-center gap-2 hover:bg-red-700 transition w-full">
                <lord-icon
                  src="https://cdn.lordicon.com/vjgknpfx.json"
                  trigger="hover"
                />
                Add Donor
              </button>
            </form>

            <input
              type="text"
              placeholder="Search by name / blood group / phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4 p-2 w-full max-w-md border rounded"
            />

            {donor.length > 0 && (
              <div className="overflow-x-auto w-full max-w-6xl px-2 sm:px-4 max-h-[500px]">
                <table className="min-w-full bg-[#f3eeee33] shadow-md rounded-lg">
                  <thead>
                    <tr className="bg-[#b6b2b26e] text-slate-800">
                      <th className="py-2 px-2 sm:py-3 sm:px-4">Full Name</th>
                      <th className="py-2 px-2 sm:py-3 sm:px-4">Blood Group</th>
                      <th className="py-2 px-2 sm:py-3 sm:px-4">Age</th>
                      <th className="py-2 px-2 sm:py-3 sm:px-4">Phone</th>
                      <th className="py-2 px-2 sm:py-3 sm:px-4">Gender</th>
                      <th className="py-2 px-2 sm:py-3 sm:px-4">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredDonors.map((d) => (
                      <tr key={d._id} className="text-center border-b">
                        <td className="py-2 px-2 sm:py-3 sm:px-4">{d.fullName}</td>
                        <td className="py-2 px-2 sm:py-3 sm:px-4">{d.bloodGroup}</td>
                        <td className="py-2 px-2 sm:py-3 sm:px-4">{d.age}</td>
                        <td className="py-2 px-2 sm:py-3 sm:px-4">{d.phone}</td>
                        <td className="py-2 px-2 sm:py-3 sm:px-4">{d.gender}</td>
                        <td className="py-2 px-2 sm:py-3 sm:px-4 flex justify-center gap-3">
                          <button onClick={() => editDonor(d)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/fikcyfpp.json"
                              trigger="hover"
                            />
                          </button>
                          <button onClick={() => deleteDonor(d._id)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/jzinekkv.json"
                              trigger="hover"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeDonor;

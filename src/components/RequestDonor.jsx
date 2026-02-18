import React, { useState, useEffect } from "react";
import bgImage from "../assets/icons/bg2.jpg";
import { toast } from "react-toastify";
import axios from "axios";

const RequestDonor = () => {
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [requestForm, setRequestForm] = useState({
    patientName: "",
    bloodGroup: "",
    hospital: "",
    phone: "",
    urgency: "",
  });
  const [matchedDonorIds, setMatchedDonorIds] = useState([]);

  useEffect(() => {
    fetchDonors();
    fetchRequests();
  }, []);

  const fetchDonors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/donors");
      setDonors(res.data);
    } catch (error) {
      console.log("Error fetching donors", error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/requests");
      setRequests(res.data);
      const usedDonors = res.data
        .filter(r => r.matchedDonor)
        .map(r => r.matchedDonor._id);
      setMatchedDonorIds(usedDonors);
    } catch (error) {
      console.log("Error fetching requests", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestForm(prev => ({ ...prev, [name]: value }));
  };

  const matchDonor = (bloodGroup) => {
    const donor = donors.find(
      (d) => d.bloodGroup === bloodGroup && !matchedDonorIds.includes(d._id)
    );
    return donor || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { patientName, bloodGroup, hospital, phone, urgency } = requestForm;

    if (!patientName || !bloodGroup || !hospital || !phone || !urgency) {
      toast.error("All fields are required");
      return;
    }

    const newRequest = { ...requestForm, status: "Pending", approvedAt: null, matchedDonor: null };

    try {
      await axios.post("http://localhost:5000/requests", newRequest);
      toast.success("Blood request submitted");
      setRequestForm({ patientName: "", bloodGroup: "", hospital: "", phone: "", urgency: "" });
      fetchRequests();
    } catch (error) {
      toast.error("Failed to submit request");
    }
  };

  const approveRequest = async (id, bloodGroup) => {
    const donor = matchDonor(bloodGroup);
    const updatedData = {
      status: donor ? "Approved" : "Pending",
      approvedAt: donor ? new Date().toLocaleString() : null,
      matchedDonor: donor ? { fullName: donor.fullName, phone: donor.phone, _id: donor._id } : null,
    };

    try {
      await axios.put(`http://localhost:5000/requests/${id}`, updatedData);
      if (donor) setMatchedDonorIds(prev => [...prev, donor._id]);
      fetchRequests();
    } catch (error) {
      toast.error("Failed to approve request");
    }
  };

  const rejectRequest = async (id) => {
    try {
      await axios.put(`http://localhost:5000/requests/${id}`, { status: "Rejected" });
      fetchRequests();
    } catch (error) {
      toast.error("Failed to reject request");
    }
  };

  return (
    <div className="w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="bg-black/50 min-h-screen pt-28 px-4 sm:px-6 lg:px-10 flex flex-col items-center gap-10">

        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl w-full max-w-md flex flex-col gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-red-500 text-center">Request Blood</h2>

          <input name="patientName" value={requestForm.patientName} onChange={handleChange} placeholder="Patient Name" className="p-2 rounded w-full"/>
          <select name="bloodGroup" value={requestForm.bloodGroup} onChange={handleChange} className="p-2 rounded w-full">
            <option value="">Select Blood Group</option>
            <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
            <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
          </select>
          <input name="hospital" value={requestForm.hospital} onChange={handleChange} placeholder="Hospital Name" className="p-2 rounded w-full"/>
          <input name="phone" value={requestForm.phone} onChange={handleChange} placeholder="Contact Number" maxLength={10} className="p-2 rounded w-full"/>
          <select name="urgency" value={requestForm.urgency} onChange={handleChange} className="p-2 rounded w-full">
            <option value="">Urgency</option><option>Normal</option><option>Emergency</option>
          </select>

          <button className="bg-red-600 text-white py-2 rounded font-bold w-full">Submit Request</button>
        </form>

        {requests.length > 0 && (
          <div className="w-full max-w-6xl overflow-x-auto max-h-[500px]">
            <table className="w-full bg-white/20 rounded shadow">
              <thead>
                <tr className="bg-white/40">
                  <th className="p-2">Patient</th>
                  <th className="p-2">Blood</th>
                  <th className="p-2">Hospital</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Urgency</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Approved At</th>
                  <th className="p-2">Matching Donor</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r._id} className="text-center border-b">
                    <td className="p-2">{r.patientName}</td>
                    <td className="p-2">{r.bloodGroup}</td>
                    <td className="p-2">{r.hospital}</td>
                    <td className="p-2">{r.phone}</td>
                    <td className="p-2">
                      {r.urgency === "Emergency" ? (
                        <div className="inline-block bg-yellow-300 text-red-700 font-bold px-2 py-1 rounded-md text-sm">
                          {r.urgency}
                        </div>
                      ) : <span>{r.urgency}</span>}
                    </td>
                    <td className="p-2">{r.status}</td>
                    <td className="p-2">{r.approvedAt || "-"}</td>
                    <td className="p-2 text-left">
                      {r.matchedDonor ? (
                        <>
                          <div className="font-bold">{r.matchedDonor.fullName}</div>
                          <div className="text-sm">{r.matchedDonor.phone}</div>
                        </>
                      ) : (
                        <span className="text-red-600 font-bold">Pending</span>
                      )}
                    </td>
                    <td className="p-2 flex justify-center items-center gap-2 flex-wrap">
                      {r.status === "Pending" ? (
                        <>
                          <button onClick={() => approveRequest(r._id, r.bloodGroup)} className="bg-green-500 text-white px-3 py-1 rounded font-bold hover:bg-green-600 transition">Approve</button>
                          <button onClick={() => rejectRequest(r._id)} className="bg-red-500 text-white px-3 py-1 rounded font-bold hover:bg-red-600 transition">Reject</button>
                        </>
                      ) : (
                        <span className="font-bold">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestDonor;

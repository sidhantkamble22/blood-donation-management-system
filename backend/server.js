const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const MONGO_URL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(MONGO_URL);

// -------- Existing donors collection --------
let donorCollection;

// -------- NEW: requests collection --------
let requestCollection; // <-- NEW

async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB Connected");

    const db = client.db("blood_donation");
    donorCollection = db.collection("donors");
    requestCollection = db.collection("requests"); // <-- NEW
  } catch (error) {
    console.log("MongoDB Error:", error);
  }
}

connectDB();

// ======================= DONORS ENDPOINTS =======================

// Add donor
app.post("/donors", async (req, res) => {
  try {
    const donorData = req.body;
    const result = await donorCollection.insertOne(donorData);

    res.status(201).json({
      success: true,
      message: "Donor added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving donor",
    });
  }
});

// Get all donors
app.get("/donors", async (req, res) => {
  try {
    const donors = await donorCollection.find({}).toArray();
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donors" });
  }
});

// Update donor
app.put("/donors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    await donorCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    res.json({ success: true, message: "Donor updated" });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// Delete donor
app.delete("/donors/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await donorCollection.deleteOne({ _id: new ObjectId(id) });

    res.json({
      success: true,
      message: "Donor deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

// ======================= REQUESTS ENDPOINTS (NEW) =======================

// Add new blood request
app.post("/requests", async (req, res) => {
  try {
    const requestData = req.body;
    const result = await requestCollection.insertOne(requestData);

    res.status(201).json({
      success: true,
      message: "Request added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving request" });
  }
});

// Get all blood requests
app.get("/requests", async (req, res) => {
  try {
    const requests = await requestCollection.find({}).toArray();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching requests" });
  }
});

// Update request (approve/reject)
app.put("/requests/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    await requestCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );

    res.json({ success: true, message: "Request updated" });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

// ======================= SERVER =======================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error(" MONGODB_URI not found in .env file!");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log(" MongoDB Connected");

    const db = client.db("ai_model_inventory");
    const modelsCollection = db.collection("models");
    const purchaseCollection = db.collection("purchases");

    // Root route
    app.get("/", (req, res) => {
      res.send("AI Model Inventory Server Running...");
    });

   

    // 404 fallback
    app.use((req, res) => {
      res.status(404).json({ success: false, message: "Route not found" });
    });

    app.listen(port, () => console.log(` Server running on port ${port}`));
  } catch (err) {
    console.error(" MongoDB connection error:", err);
  }
}

run().catch(console.dir);

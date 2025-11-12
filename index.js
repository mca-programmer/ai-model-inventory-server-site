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



    app.listen(port, () => console.log(` Server running on port ${port}`));
  } catch (err) {
    console.error(" MongoDB connection error:", err);
  }
}

run().catch(console.dir);

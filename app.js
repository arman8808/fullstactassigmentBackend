import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./Db/connection.js";
import pollRoutes from "./route/Poll.route.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://fullstactassigment-frontend.vercel.app",
  "https://fullstactassigment-fron-git-17ea96-portfolios-projects-771db464.vercel.app",
  "https://fullstactassigment-frontend-hgo8m8so1.vercel.app",
  "http://localhost:3000",
];


const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

connectDB();

app.use("/api/v1/polls", pollRoutes);
app.get("/", async (req, res) => {
  res.status(200).json({ message: "Server is Live" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

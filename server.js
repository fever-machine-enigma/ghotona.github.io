const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3500;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Database Connection
const dbURL =
  "mongodb+srv://shafin:dolareurotaka01@ghotona-chitro.s2agi0n.mongodb.net/ghotona-chitro";
mongoose
  .connect(dbURL, {})
  .then((result) => {
    app.listen(3000);
    console.log("Server running on port 3000");
  })
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Ghotona-Chitro");
});
app.use(authRoutes);

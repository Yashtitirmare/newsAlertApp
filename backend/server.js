const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const cron = require("node-cron");
const fetchNewsAndSendEmails = require("./services/newsFetcher");

const app = express();
app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.PROD_CLIENT_URL],
    credentials: true,
  })
);
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.use("/api", require("./routes/auth"));
app.use("/api/alerts", require("./routes/alerts"));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Schedule to run every day at 9 AM
cron.schedule("0 9 * * *", () => {
  console.log("Fetching news and sending emails...");
  fetchNewsAndSendEmails();
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

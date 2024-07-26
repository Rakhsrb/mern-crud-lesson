const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Routes
const PostRoutes = require("./routes/post");

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/posts", PostRoutes);

async function startApp() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(process.env.PORT, () => {
      console.log(`server is running on http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

startApp();

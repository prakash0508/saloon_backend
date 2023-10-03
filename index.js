const express = require("express");
const app = express();
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./utils/db");
const userRoute = require("./routes/userRoute.js");
const productRoutes = require("./routes/productRoute.js");

dotenv.config();
connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const PORT = process.env.PORT || 5000;

//Routes
app.use("/user", userRoute);
app.use("/product", productRoutes);

//Error Handling
app.use((error, req, res, next) => {
  const errorMessage = error.message || "Something went wrong";
  const errorStatus = error.status || 500;

  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Woking Fine" });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`.gray.bold);
});

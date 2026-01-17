require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const complaintRoutes = require("./routes/complaint.routes");
const adminRoutes = require("./routes/admin.routes");
const officerRoutes = require("./routes/officer.routes");

const app = express();


connectDB();


app.use(cors({

 origin: function (origin, callback) {
    
    if (!origin) return callback(null, true);

    
    if (origin.match(/^http:\/\/localhost:\d+$/)) {
      return callback(null, true);
    }

    // Allow production domain
    if (origin === "https://bcrs-india.vercel.app") {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,             
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));


app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));


// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/officer", officerRoutes);


app.get("/", (req, res) => res.send("SGIMS Backend Running Successfully!"));


const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
  console.log(`Backend running on port:${PORT}`);
});

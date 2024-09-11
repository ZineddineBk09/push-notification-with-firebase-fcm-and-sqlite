import express from "express";
import cors from "cors";
import driverRoutes from "./routes/index.js";
import sequelize from "./db/sqlite3.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", driverRoutes);

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  cors({
    methods: ["GET", "POST", "PUT"],
  })
);

app.use(function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.get("/", (req, res) => {
  res.send("This is the FCM server");
});

sequelize
  .sync({
    sync: true, // true => This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
  })
  .then(() => {
    console.log("Database & tables created!");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error in sequalizer sync: ", err);
  });

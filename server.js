import express from "express";
import cors from "cors";
import driverRoutes from "./routes/driver.js";
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
  res.send("Hello World");
});

sequelize
  .sync({
    force: true, // true => to drop the table and recreate db
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

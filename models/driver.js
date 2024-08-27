import { DataTypes } from "sequelize";
import sequelize from "../db/sqlite3.js";

// Driver Notification Model
const DriverNotification = sequelize.define("DriverNotification", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  driverId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "FleetRun",
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Driver Model
const Driver = sequelize.define("Driver", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  driverId: { // API laravel
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  token: { // FCM token  
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export { DriverNotification, Driver };

import { DataTypes } from "sequelize";
import sequelize from "../db/sqlite3.js";

// Driver Notification Model
const PushNotification = sequelize.define("PushNotification", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  token: {
    // FCM token
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export { PushNotification };

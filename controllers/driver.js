import { Driver } from "../models/driver.js";
import { PushNotification } from "../models/notification.js";
import {
  createPushNotificationSchema,
  createDriverSchema,
  sendBatchNotificationSchema,
  updateDriverSchema,
} from "../validators/index.js";

// Create and Save a new Driver Notification
const createPushNotification = (req, res) => {
  const parsedData = createPushNotificationSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).send({ errors: parsedData.error.errors });
  }

  const { token, title, body, type } = parsedData.data;

  // Create a Driver Notification
  const pushNotification = { token, title, body, type };

  // Save Driver Notification in the database
  PushNotification.create(pushNotification)
    .then((data) => res.send(data))
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Driver Notification.",
      });
    });
};

// Send a batch of notifications
const sendBatchNotification = (req, res) => {
  const parsedData = sendBatchNotificationSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).send({ errors: parsedData.error.errors });
  }

  const { tokens, title, body, type } = parsedData.data;

  // Create notifications for each driver
  const notifications = tokens.map((token) => ({
    token,
    title,
    body,
    type,
  }));

  // Save all notifications in the database
  PushNotification.bulkCreate(notifications)
    .then((data) => res.send(data))
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the batch notifications.",
      });
    });
};

// Retrieve all Driver Notifications for a specific driver from the database
const findAllPushNotifications = (req, res) => {
  const driverId = parseInt(req.params.driverId, 10);

  if (isNaN(driverId) || driverId <= 0) {
    return res.status(400).send({
      message: "Driver ID must be a positive integer.",
    });
  }

  PushNotification.findAll({ where: { driverId } })
    .then((data) => res.send(data))
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving driver notifications.",
      });
    });
};

// Find all unread notifications for a specific driver
const findAllUnreadNotifications = (req, res) => {
  const driverId = parseInt(req.params.driverId, 10);

  if (isNaN(driverId) || driverId <= 0) {
    return res.status(400).send({
      message: "Driver ID must be a positive integer.",
    });
  }

  PushNotification.findAll({ where: { driverId, read: false } })
    .then((data) => res.send(data))
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving unread notifications.",
      });
    });
};

// Create and Save a new Driver
const createDriver = (req, res) => {
  const parsedData = createDriverSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).send({ errors: parsedData.error.errors });
  }

  const { driverId, token } = parsedData.data;

  // Create a Driver
  const driver = { driverId, token };

  // Save Driver in the database
  Driver.create(driver)
    .then((data) => res.send(data))
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Driver.",
      });
    });
};

// Update a Driver's token
const updateDriver = (req, res) => {
  const parsedData = updateDriverSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).send({ errors: parsedData.error.errors });
  }

  const { driverId, token } = parsedData.data;

  Driver.update({ token }, { where: { driverId } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Driver token was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update Driver with driverId=${driverId}. Maybe Driver was not found or request body is empty!`,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "Error updating Driver token with driverId=" + driverId,
      });
    });
};

export {
  createPushNotification,
  sendBatchNotification,
  findAllPushNotifications,
  findAllUnreadNotifications,
  createDriver,
  updateDriver,
};

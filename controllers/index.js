import { PushNotification } from "../models/index.js";
import {
  createPushNotificationSchema,
  sendBatchNotificationSchema,
  updatePushNotificationReadStatusSchema,
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
  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message:
        err.message ||
        "Some error occurred while creating the Driver Notification.",
    });
  }
};

// Send a batch of notifications
const sendBatchNotification = (req, res) => {
  const parsedData = sendBatchNotificationSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).send({ errors: parsedData.error.errors });
  }

  return res.status(200).send({ message: "Send batch notification executed" });

  const { tokens, title, body, type, notification_id, created_at } =
    parsedData.data;

  // Create notifications for each driver
  const notifications = tokens.map((token) => ({
    token,
    title,
    body,
    type,
  }));

  // Save all notifications in the database
  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message:
        err.message ||
        "Some error occurred while creating the batch notifications.",
    });
  }
};

// Retrieve all Driver Notifications for a specific driver from the database
const findAllPushNotifications = (req, res) => {
  const fcmToken = req.params.fcmToken;

  PushNotification.findAll({ where: { token: fcmToken } })
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
  const fcmToken = req.params.fcmToken;

  PushNotification.findAll({ where: { token: fcmToken, read: false } })
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

// Update a Notification's read status
const updatePushNotification = (req, res) => {
  const parsedData = updatePushNotificationReadStatusSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).send({ errors: parsedData.error.errors });
  }

  const { token, read } = parsedData.data;

  PushNotification.update({ read }, { where: { token } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Notification status was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update Notification with token=${token}. Maybe Notification was not found or request body is empty!`,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "Error updating Notification token with token=" + token,
      });
    });
};

export {
  createPushNotification,
  sendBatchNotification,
  findAllPushNotifications,
  findAllUnreadNotifications,
  updatePushNotification,
};

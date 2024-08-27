import {
  createPushNotificationSchema,
  sendBatchNotificationSchema,
} from "../validators/index.js";
import "../config/firebase.config.js";
import { getMessaging } from "firebase-admin/messaging";

const sendFCMNotificationMiddleware = async (req, res, next) => {
  const { token, title, body, type } = req.body;

  // Validate the request using Zod
  const parsedData = createPushNotificationSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).send({ errors: parsedData.error.errors });
  }

  try {
    // Send FCM notification
    const message = {
      notification: {
        title: title || "FleetRun",
        body: body || "",
        type: type || "",
      },
      token: token,
    };

    const response = await getMessaging().send(message);
    console.log("Successfully sent message:", response);
    return next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).send({
      message: "Failed to send FCM notification.",
      error: error.message,
    });
  }
};

// Middleware to send batch FCM notifications
const sendBatchFCMNotificationMiddleware = async (req, res, next) => {
  const { tokens, title, body, type } = req.body;

  console.log("Sending Notifications in Batch", req.body);

  // Validate the request using Zod
  const parsedData = sendBatchNotificationSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res.status(400).send({ errors: parsedData.error.errors });
  }

  try {
    if (tokens.length === 0) {
      return res.status(404).send({
        message: "Drivers not found.",
      });
    }

    const message = {
      notification: {
        title: title || "FleetRun",
        body: body || "",
        type: type || "",
      },
      tokens,
    };

    console.log("====================================");
    console.log(message);
    console.log("====================================");

    const response = await getMessaging().sendEachForMulticast(message);
    console.log("Successfully sent batch messages:", response);
    return next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.error("Error sending batch messages:", error);
    return res.status(500).send({
      message: "Failed to send batch FCM notifications.",
      error: error.message,
    });
  }
};

export { sendFCMNotificationMiddleware, sendBatchFCMNotificationMiddleware };

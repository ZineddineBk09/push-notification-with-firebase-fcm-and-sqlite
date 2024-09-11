import express from "express";
import {
  createPushNotification,
  sendBatchNotification,
  findAllPushNotifications,
  findAllUnreadNotifications,
  updatePushNotification,
} from "../controllers/index.js";
import { verifyToken } from "../middleware/authJwt.js";
import {
  sendBatchFCMNotificationMiddleware,
  sendFCMNotificationMiddleware,
} from "../middleware/fcm.js";

const router = express.Router();

// router.use(verifyToken);

// Push Notifications
// router.post(
//   "/notification",
//   sendFCMNotificationMiddleware,
//   createPushNotification
// );
router.post(
  "/notification",
  sendBatchFCMNotificationMiddleware,
  sendBatchNotification
);

// router.get("/notification/:fcmToken", findAllPushNotifications);
// router.get("/notification/unread/:fcmToken", findAllUnreadNotifications);
// router.put("/notification", updatePushNotification);

export default router;

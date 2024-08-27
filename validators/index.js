import { z } from "zod";

const createDriverNotificationSchema = z.object({
  token: z.string().min(1),
  title: z.string().optional().default("FleetRun"),
  body: z.string().min(1),
});

const createPushNotificationSchema = z.object({
  driverId: z.string().min(1),
  title: z.string().optional().default("FleetRun"),
  body: z.string().min(1),
  type: z.string().min(1),
});

const sendBatchNotificationSchema = z.object({
  tokens: z.array(z.string().min(1)).min(1),
  title: z.string().optional().default("FleetRun"),
  body: z.string().min(1),
  type: z.string().min(1),
});

const createDriverSchema = z.object({
  driverId: z.string().min(1),
  token: z.string().min(1),
});

const updateDriverSchema = z.object({
  driverId: z.string().min(1),
  token: z.string().min(1),
});

export {
  createPushNotificationSchema,
  createDriverNotificationSchema,
  sendBatchNotificationSchema,
  createDriverSchema,
  updateDriverSchema,
};

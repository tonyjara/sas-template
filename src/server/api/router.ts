import { createTRPCRouter } from "@/server/api/trpc";
import { usersRouter } from "./routers/users.routes";
import { supportRoutes } from "./routers/support.routes";
import { adminRouter } from "./routers/admin.routes";
import { telegramRouter } from "./routers/telegram.routes";
import { transcriptionRouter } from "./routers/transcription.routes";
import { chatGPTRouter } from "./routers/chatGPT.routes";
import { stripeRouter } from "./routers/stripe.routes";
import { couponsRouter } from "./routers/coupons.routes";
import { stripeUsageRouter } from "./routers/stripe-usage.routes";
import { authRouter } from "./routers/auth.routes";
import { magicLinksRouter } from "./routers/magicLinks.routes";
import { logsRouter } from "./routers/logs.routes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  admin: adminRouter,
  auth: authRouter,
  users: usersRouter,
  support: supportRoutes,
  telegram: telegramRouter,
  transcriptions: transcriptionRouter,
  magicLinks: magicLinksRouter,
  chatGPT: chatGPTRouter,
  stripe: stripeRouter,
  coupons: couponsRouter,
  stripeUsage: stripeUsageRouter,
  logs: logsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

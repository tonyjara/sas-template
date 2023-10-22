import { env } from "@/env.mjs";
import { appOptions } from "@/lib/Constants";
import { Telegraf } from "telegraf";

const bot = new Telegraf(env.TELEGRAM_BOT_TOKEN);
const isDevEnv = env.NODE_ENV === "development";

export const postToTelegramGroup = async (email: string, message: string) => {
  if (!appOptions.enableTelegramNotifications) return;
  try {
    if (isDevEnv) return;
    await bot.telegram.sendMessage(
      env.TELEGRAM_BOT_CHAT_ID,
      `${email} has ${message}`,
    );
  } catch (err) {
    console.error(err);
  }
};

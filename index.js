const TelegramBot = require("node-telegram-bot-api");

const token = "7553914064:AAHBysWfEGwJr0ElvJb9V52Ld7QLMUFmT8U";
const webAppUrl = "https://stately-semolina-b3b107.netlify.app/";
const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(chatId, "Ниже появится кнопка, заполни форму", {
      reply_markup: {
        keyboard: [[{ text: "Заполнить форму", web_app: { url: webAppUrl } }]],
      },
    });

    await bot.sendMessage(chatId, "Заходи в наш интернет-магазин по кнопке ниже", {
      reply_markup: {
        inline_keyboard: [[{ text: "Сделать заказ", web_app: { url: webAppUrl } }]],
      },
    });
  }
});

// bot._request("setChatMenuButton", {
//   menu_button: {
//     type: "web_app",
//     text: "Сайт", // Текст кнопки
//     web_app: {
//       url: webAppUrl, // Замените на нужный URL
//     },
//   },
// });

const TelegramBot = require("node-telegram-bot-api");

const token = "7553914064:AAHBysWfEGwJr0ElvJb9V52Ld7QLMUFmT8U";
const webAppUrl = "https://3140-135-125-151-37.ngrok-free.app";
const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(chatId, "Ниже появится кнопка, заполни форму", {
      reply_markup: {
        keyboard: [[{ text: "Заполнить форму", web_app: { url: webAppUrl+  "/form"  } }]],
      },
    });

    await bot.sendMessage(chatId, "Заходи в наш интернет-магазин по кнопке ниже", {
      reply_markup: {
        inline_keyboard: [[{ text: "Сделать заказ", web_app: { url: webAppUrl } }]],
      },
    });
  }

  if(msg?.web_app_data?.data) {
    try{
      const data = JSON.parse(msg?.web_app_data?.data)
      console.log(data)
      await bot.sendMessage(chatId,"Спасибо за обратную связь");
      await bot.sendMessage(chatId,"Ваша страна" + data?.country);
      await bot.sendMessage(chatId,"Ваша улица" + data?.street);

      setTimeout(async () => {
        await bot.sendMessage("Всю информацию вы найдете в этом чате")
      }, 3000)
    } catch (e) {
      console.log(e)
    }

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

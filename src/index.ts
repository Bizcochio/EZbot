import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
});

client.on(Events.MessageCreate, function (message) {
  if (message.author.bot) return;
  message.reply("Idi nahui").catch(function (error) {
    console.log(error);
  });
});
client
  .login(process.env.BOT_TOKEN)
  .then(function () {
    console.log("Bot online");
  })
  .catch(function (error) {
    console.error("Error", error);
  });

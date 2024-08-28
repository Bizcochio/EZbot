import "dotenv/config";
import {
  Client,
  Events,
  GatewayIntentBits,
  Message,
  TextChannel,
  MessageCollector,
} from "discord.js";

// Initialization of Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
});

// Prefix
const prefix = "-";

// Messages
client.on(Events.MessageCreate, (msg: Message) => {
  // Ignoring non-prefix messages
  if (msg.author.bot || !msg.content.startsWith(prefix)) return;

  // Separating the message from the prefix
  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift()?.toLowerCase();

  // Ping
  if (cmd === "ping") {
    // New answer in function creating
    const reply = `На папэй: ${Date.now() - msg.createdTimestamp} ms`;
    msg.reply(reply);

    // Random
  } else if (cmd === "random") {
    // Enter the number
    const question = "Введи число";
    msg.channel.send(question);

    // Collector
    const filter = (response: Message) => response.author.id === msg.author.id; // Check user
    const collector = new MessageCollector(msg.channel as TextChannel, {
      max: 1,
      filter,
    });

    // Set a time limit for the collector
    const timeout = setTimeout(function () {
      collector.stop("time");
      msg.channel.send("Поздно, теперь сдрыстни.");
    }, 3000); // 3 seconds to answer

    collector.on("collect", (response: Message) => {
      clearTimeout(timeout); // Clear timeout when valid response is collected
      const userInput = response.content;
      const num = parseInt(userInput, 10);

      if (!isNaN(num) && num > 0) {
        const randomNumber = Math.floor(Math.random() * num) + 1; // Generating random number 1 - num
        const reply = `Твоя мать от 1 до ${num}: \n${randomNumber}`;
        msg.channel.send(reply);
      } else {
        msg.channel.send("Шляпа, учись читать, писать и мб возвращайся");
      }
      collector.stop(); // Stopping the collector
    });

    collector.on("end", (collected, reason) => {
      if (reason === "time") {
        // No need to send the message here as it's already handled by the timeout
      }
    });
  } else {
    const rudeReply = `Юзай ${prefix}help, если долбоёб`;
    msg.reply(rudeReply);
  }
});

// Errors catching
client.on("error", (error: Error) => {
  console.error("Error:", error);
});

// Logging the bot into Discord
client
  .login(process.env.BOT_TOKEN)
  .then(() => {
    console.log("Работаем");
  })
  .catch((error: Error) => {
    console.error("Не работаем:", error);
  });

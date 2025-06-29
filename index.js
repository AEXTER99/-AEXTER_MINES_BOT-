require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { predictSafeTiles, verifyPrediction, addMemory } = require('./lib/ai');
const { initializeFirebase } = require('./lib/firebase');

const botToken = process.env.BOT_TOKEN;
const chatId = process.env.CHAT_ID;
const bot = new TelegramBot(botToken, { polling: true });

initializeFirebase();
console.log("🤖 Bot is running...");

bot.onText(/\/predict (.+)/, async (msg, match) => {
    const args = match[1].split(" ");
    if (args.length < 4) return bot.sendMessage(msg.chat.id, "Usage: /predict <serverSeed> <clientSeed> <nonce> <mineCount>");

    const [server, client, nonce, mineCount] = args;
    const prediction = await predictSafeTiles(server, client, nonce, parseInt(mineCount));
    bot.sendMessage(msg.chat.id, `🧠 AI Suggests:
${prediction.join(", ")}`);
});

bot.onText(/\/verify (.+)/, async (msg, match) => {
    const args = match[1].split(" ");
    if (args.length < 5) return bot.sendMessage(msg.chat.id, "Usage: /verify <server> <client> <nonce> <mines> <tiles>");

    const [server, client, nonce, minesStr, ...tileParts] = args;
    const predictionTiles = tileParts.join(" ").split(",");
    const mineCount = parseInt(minesStr);

    const result = verifyPrediction(server, client, nonce, mineCount, predictionTiles);
    addMemory(server, client, nonce, mineCount); // Store for AI memory
    bot.sendMessage(msg.chat.id, result ? "✅ Passed! No mine hit." : "❌ Failed! Mine was hit.");
});
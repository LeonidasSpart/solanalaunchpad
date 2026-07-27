// bot.js
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// ─── Welcome /start ──────────────────────────────────────────────
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `🧡 Welcome to ZRP Bot!

📊 Real-time Solana token data
🔍 Scan tokens for risks
📈 Track trending tokens
💚 35% of ZRP profits go to charity

Commands:
/price [address] – Get token price
/trending – Top trending tokens
/help – Show all commands`
  );
});

// ─── Price Command ──────────────────────────────────────────────
bot.onText(/\/price (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const address = match[1];

  try {
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${address}`
    );
    const data = await response.json();

    if (data.pairs && data.pairs.length > 0) {
      const pair = data.pairs[0];
      const message = `📊 Token: ${pair.baseToken.name} (${pair.baseToken.symbol})
💰 Price: $${pair.priceUsd}
📈 24h: ${pair.priceChange?.h24 || 0}%
📊 Volume: $${pair.volume?.h24 || 0}
💧 Liquidity: $${pair.liquidity?.usd || 0}
🔗 Chain: ${pair.chainId}`;
      bot.sendMessage(chatId, message);
    } else {
      bot.sendMessage(chatId, '❌ Token not found. Check the address.');
    }
  } catch (error) {
    bot.sendMessage(chatId, '❌ Error fetching token data.');
  }
});

// ─── Trending Command ────────────────────────────────────────────
bot.onText(/\/trending/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const response = await fetch(
      'https://api.dexscreener.com/latest/dex/tokens/trending'
    );
    const data = await response.json();

    let message = '🔥 Top Trending Tokens:\n\n';
    const tokens = data.tokens?.slice(0, 5) || [];
    tokens.forEach((t, i) => {
      message += `${i+1}. ${t.baseToken.name} (${t.baseToken.symbol})\n`;
      message += `   💰 $${t.priceUsd}\n`;
      message += `   📈 24h: ${t.priceChange?.h24 || 0}%\n\n`;
    });

    bot.sendMessage(chatId, message);
  } catch (error) {
    bot.sendMessage(chatId, '❌ Error fetching trending tokens.');
  }
});

// ─── Help Command ────────────────────────────────────────────────
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    `📋 ZRP Bot Commands:

/start – Welcome message
/price [address] – Get token price
/trending – Show trending tokens
/help – Show this message

🧡 Built with purpose.
35% of ZRP profits go to charity.

🌐 zrp.one`
  );
});

console.log('🤖 ZRP Bot is running...');

// bot.js – ZRP Telegram Bot (Complete Version)
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// ─── Helper Functions ────────────────────────────────────────────

function formatNumber(num) {
  if (!num) return '0';
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
}

function formatPrice(price) {
  if (!price) return '$0.00';
  if (price < 0.000001) return price.toExponential(6);
  if (price < 0.0001) return price.toFixed(8);
  if (price < 0.01) return price.toFixed(6);
  return price.toFixed(4);
}

function getTokenData(address) {
  return fetch(`https://api.dexscreener.com/latest/dex/tokens/${address}`)
    .then(res => res.json())
    .catch(() => null);
}

// ─── /start ──────────────────────────────────────────────────────

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '📊 Price', callback_data: 'price' }, { text: '🔥 Trending', callback_data: 'trending' }],
        [{ text: '📈 Top Gainers', callback_data: 'gainers' }, { text: '📉 Top Losers', callback_data: 'losers' }],
        [{ text: '🔍 Search', callback_data: 'search' }, { text: '🛡️ Rug Check', callback_data: 'rugcheck' }],
        [{ text: '💚 Charity', callback_data: 'charity' }, { text: '🤖 AI', callback_data: 'ai' }],
        [{ text: '📋 Help', callback_data: 'help' }]
      ]
    }
  };
  bot.sendMessage(
    chatId,
    `🧡 Welcome to ZRP Bot!

📊 Real-time Solana token data
🔍 Search tokens by name
📈 Top gainers & losers
🛡️ Rug check (Token Checker)
💚 35% of ZRP profits go to charity
🤖 AI Assistant
🌐 zrp.one

Select a button below 👇`,
    opts
  );
});

// ─── Callback Query Handler (Buttons) ──────────────────────────

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'price') {
    bot.sendMessage(chatId, '📊 Send /price [address] to get token price.');
  } else if (data === 'trending') {
    handleTrending(chatId);
  } else if (data === 'gainers') {
    handleGainers(chatId);
  } else if (data === 'losers') {
    handleLosers(chatId);
  } else if (data === 'search') {
    bot.sendMessage(chatId, '🔍 Send /search [name] to search tokens.');
  } else if (data === 'rugcheck') {
    bot.sendMessage(chatId, '🛡️ Send /rugcheck [address] to check token risks.');
  } else if (data === 'charity') {
    handleCharity(chatId);
  } else if (data === 'ai') {
    bot.sendMessage(chatId, '🤖 Send /ai [question] to ask ZRP AI Assistant.');
  } else if (data === 'help') {
    handleHelp(chatId);
  }

  bot.answerCallbackQuery(query.id);
});

// ─── /price ──────────────────────────────────────────────────────

bot.onText(/\/price (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const address = match[1];

  try {
    const data = await getTokenData(address);
    if (data?.pairs?.[0]) {
      const pair = data.pairs[0];
      const message = `📊 Token: ${pair.baseToken.name} (${pair.baseToken.symbol})
💰 Price: $${pair.priceUsd}
📈 24h: ${pair.priceChange?.h24 || 0}%
📊 Volume: $${pair.volume?.h24 || 0}
💧 Liquidity: $${pair.liquidity?.usd || 0}
🔗 Chain: ${pair.chainId}
🏦 DEX: ${pair.dexId}`;
      bot.sendMessage(chatId, message);
    } else {
      bot.sendMessage(chatId, '❌ Token not found. Check the address.');
    }
  } catch {
    bot.sendMessage(chatId, '❌ Error fetching token data.');
  }
});

// ─── /trending ──────────────────────────────────────────────────

bot.onText(/\/trending/, (msg) => {
  handleTrending(msg.chat.id);
});

async function handleTrending(chatId) {
  try {
    const response = await fetch('https://api.dexscreener.com/latest/dex/tokens/trending');
    const data = await response.json();
    const tokens = data.tokens?.slice(0, 5) || [];

    if (tokens.length === 0) {
      bot.sendMessage(chatId, '❌ No trending tokens found.');
      return;
    }

    let message = '🔥 Top Trending Tokens:\n\n';
    tokens.forEach((t, i) => {
      message += `${i+1}. ${t.baseToken.name} (${t.baseToken.symbol})\n`;
      message += `   💰 $${t.priceUsd}\n`;
      message += `   📈 24h: ${t.priceChange?.h24 || 0}%\n`;
      message += `   📊 Vol: $${t.volume?.h24 || 0}\n\n`;
    });
    bot.sendMessage(chatId, message);
  } catch {
    bot.sendMessage(chatId, '❌ Error fetching trending tokens.');
  }
}

// ─── /gainers ────────────────────────────────────────────────────

bot.onText(/\/gainers/, (msg) => {
  handleGainers(msg.chat.id);
});

async function handleGainers(chatId) {
  try {
    const response = await fetch('https://api.dexscreener.com/latest/dex/tokens/trending');
    const data = await response.json();
    const tokens = data.tokens?.slice(0, 10).sort((a, b) => (b.priceChange?.h24 || 0) - (a.priceChange?.h24 || 0)) || [];

    let message = '📈 Top Gainers (24h):\n\n';
    tokens.slice(0, 5).forEach((t, i) => {
      message += `${i+1}. ${t.baseToken.symbol}: +${t.priceChange?.h24 || 0}%\n`;
    });
    bot.sendMessage(chatId, message || '❌ No gainers found.');
  } catch {
    bot.sendMessage(chatId, '❌ Error fetching gainers.');
  }
}

// ─── /losers ────────────────────────────────────────────────────

bot.onText(/\/losers/, (msg) => {
  handleLosers(msg.chat.id);
});

async function handleLosers(chatId) {
  try {
    const response = await fetch('https://api.dexscreener.com/latest/dex/tokens/trending');
    const data = await response.json();
    const tokens = data.tokens?.slice(0, 10).sort((a, b) => (a.priceChange?.h24 || 0) - (b.priceChange?.h24 || 0)) || [];

    let message = '📉 Top Losers (24h):\n\n';
    tokens.slice(0, 5).forEach((t, i) => {
      message += `${i+1}. ${t.baseToken.symbol}: ${t.priceChange?.h24 || 0}%\n`;
    });
    bot.sendMessage(chatId, message || '❌ No losers found.');
  } catch {
    bot.sendMessage(chatId, '❌ Error fetching losers.');
  }
}

// ─── /search ────────────────────────────────────────────────────

bot.onText(/\/search (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[1];

  try {
    const response = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    const pairs = data.pairs?.slice(0, 5) || [];

    if (pairs.length === 0) {
      bot.sendMessage(chatId, '❌ No tokens found.');
      return;
    }

    let message = `🔍 Results for "${query}":\n\n`;
    pairs.forEach((p, i) => {
      message += `${i+1}. ${p.baseToken.name} (${p.baseToken.symbol})\n`;
      message += `   💰 $${p.priceUsd}\n`;
      message += `   📈 24h: ${p.priceChange?.h24 || 0}%\n`;
      message += `   🔗 ${p.chainId}\n\n`;
    });
    bot.sendMessage(chatId, message);
  } catch {
    bot.sendMessage(chatId, '❌ Error searching tokens.');
  }
});

// ─── /rugcheck ──────────────────────────────────────────────────

bot.onText(/\/rugcheck (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const address = match[1];

  try {
    const data = await getTokenData(address);
    if (!data?.pairs?.[0]) {
      bot.sendMessage(chatId, '❌ Token not found.');
      return;
    }

    const pair = data.pairs[0];
    const priceChange = pair.priceChange?.h24 || 0;
    const liquidity = pair.liquidity?.usd || 0;
    const volume = pair.volume?.h24 || 0;

    let riskLevel = '🟢 Low Risk';
    if (liquidity < 10000) riskLevel = '🔴 High Risk (Low Liquidity)';
    else if (priceChange < -50) riskLevel = '🟡 Medium Risk (High Volatility)';

    const message = `🛡️ Rug Check Report: ${pair.baseToken.name} (${pair.baseToken.symbol})

💰 Price: $${pair.priceUsd}
📈 24h Change: ${priceChange}%
📊 Volume: $${volume || 0}
💧 Liquidity: $${liquidity || 0}
🔗 Chain: ${pair.chainId}
🏦 DEX: ${pair.dexId}

Risk Level: ${riskLevel}

⚠️ Always DYOR before investing.`;
    bot.sendMessage(chatId, message);
  } catch {
    bot.sendMessage(chatId, '❌ Error checking token.');
  }
});

// ─── /charity ───────────────────────────────────────────────────

bot.onText(/\/charity/, (msg) => {
  handleCharity(msg.chat.id);
});

function handleCharity(chatId) {
  bot.sendMessage(
    chatId,
    `💚 ZRP Charity Initiative

📊 Current Charity Fund: $0 (coming soon)

🎯 35% of all ZRP profits go to:
🧸 Orphans
🏫 Schools
🏥 Hospitals
🌍 Climate Relief

🌐 Learn more: https://zrp.one/charity

No borders. No discrimination. Just help.`
  );
}

// ─── /ai ────────────────────────────────────────────────────────

bot.onText(/\/ai (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const question = match[1];

  try {
    const response = await fetch('https://zrp.one/api/ai/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: question })
    });
    const data = await response.json();
    const reply = data.reply || '❌ AI Assistant is temporarily unavailable. Please try again later.';
    bot.sendMessage(chatId, `🤖 ZRP AI:\n\n${reply}`);
  } catch {
    bot.sendMessage(chatId, '❌ AI Assistant is temporarily unavailable.');
  }
});

// ─── /help ──────────────────────────────────────────────────────

bot.onText(/\/help/, (msg) => {
  handleHelp(msg.chat.id);
});

function handleHelp(chatId) {
  bot.sendMessage(
    chatId,
    `📋 ZRP Bot Commands:

🔹 /start – Welcome message
🔹 /price [address] – Token price
🔹 /trending – Trending tokens
🔹 /gainers – Top gainers (24h)
🔹 /losers – Top losers (24h)
🔹 /search [name] – Search tokens
🔹 /rugcheck [address] – Token risk check
🔹 /charity – Charity fund info
🔹 /ai [question] – Ask ZRP AI
🔹 /help – Show this message

🧡 Built with purpose.
35% of ZRP profits go to charity.

🌐 zrp.one`
  );
}

// ─── Fallback ──────────────────────────────────────────────────

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text && !text.startsWith('/')) {
    bot.sendMessage(
      chatId,
      `❌ Unknown command. Type /help to see all available commands.`
    );
  }
});

console.log('🤖 ZRP Bot is running...');

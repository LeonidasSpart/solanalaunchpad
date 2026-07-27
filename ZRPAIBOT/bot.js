// bot.js – ZRP Telegram Bot (Without Token Creation)
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

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

// ─── Dexscreener API ─────────────────────────────────────────────

async function fetchTrending() {
  try {
    const res = await fetch('https://api.dexscreener.com/latest/dex/tokens/trending');
    if (!res.ok) throw new Error('Dexscreener failed');
    const data = await res.json();
    if (data.tokens && data.tokens.length > 0) return data.tokens;
    return null;
  } catch {
    return null;
  }
}

async function fetchToken(address) {
  try {
    const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${address}`);
    if (!res.ok) throw new Error('Dexscreener failed');
    const data = await res.json();
    if (data.pairs && data.pairs.length > 0) return data.pairs[0];
    return null;
  } catch {
    return null;
  }
}

async function searchTokens(query) {
  try {
    const res = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Dexscreener search failed');
    const data = await res.json();
    return data.pairs || [];
  } catch {
    return [];
  }
}

async function fetchMarketData() {
  try {
    const res = await fetch('https://api.dexscreener.com/latest/dex/tokens/trending');
    if (!res.ok) throw new Error('Dexscreener failed');
    const data = await res.json();
    if (data.tokens && data.tokens.length > 0) return data.tokens;
    return null;
  } catch {
    return null;
  }
}

// ─── Fallback Data ───────────────────────────────────────────────

const FALLBACK_DATA = [
  { baseToken: { name: 'Solana', symbol: 'SOL' }, priceUsd: '142.50', priceChange: { h24: -1.2 }, volume: { h24: 1500000000 }, liquidity: { usd: 50000000 }, chainId: 'solana', dexId: 'Raydium' },
  { baseToken: { name: 'Ethereum', symbol: 'ETH' }, priceUsd: '3200', priceChange: { h24: 0.5 }, volume: { h24: 1000000000 }, liquidity: { usd: 50000000 }, chainId: 'ethereum', dexId: 'Uniswap' },
  { baseToken: { name: 'BNB', symbol: 'BNB' }, priceUsd: '580', priceChange: { h24: 0.8 }, volume: { h24: 800000000 }, liquidity: { usd: 40000000 }, chainId: 'bsc', dexId: 'PancakeSwap' },
  { baseToken: { name: 'USDC', symbol: 'USDC' }, priceUsd: '1.00', priceChange: { h24: 0.01 }, volume: { h24: 50000000 }, liquidity: { usd: 10000000 }, chainId: 'solana', dexId: 'Raydium' },
  { baseToken: { name: 'Jito Staked SOL', symbol: 'jitoSOL' }, priceUsd: '150', priceChange: { h24: -1.3 }, volume: { h24: 15000000 }, liquidity: { usd: 8000000 }, chainId: 'solana', dexId: 'Raydium' },
];

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

// ─── Callback Query Handler ─────────────────────────────────────

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'price') {
    bot.sendMessage(chatId, '📊 Send /price [address] to get token price.\nExample: `/price So111...`');
  } else if (data === 'trending') {
    await handleTrending(chatId);
  } else if (data === 'gainers') {
    await handleGainers(chatId);
  } else if (data === 'losers') {
    await handleLosers(chatId);
  } else if (data === 'search') {
    bot.sendMessage(chatId, '🔍 Send /search [name] to search tokens.\nExample: `/search solana`');
  } else if (data === 'rugcheck') {
    bot.sendMessage(chatId, '🛡️ Send /rugcheck [address] to check token risks.\nExample: `/rugcheck So111...`');
  } else if (data === 'charity') {
    handleCharity(chatId);
  } else if (data === 'ai') {
    bot.sendMessage(chatId, '🤖 Send /ai [question] to ask ZRP AI Assistant.\nExample: `/ai What is Solana?`');
  } else if (data === 'help') {
    handleHelp(chatId);
  }

  bot.answerCallbackQuery(query.id);
});

// ─── /price ──────────────────────────────────────────────────────

bot.onText(/\/price(?:\s+(\S+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const address = match[1];

  if (!address) {
    bot.sendMessage(chatId, '❌ Please provide a token address.\nExample: `/price So11111111111111111111111111111111111111112`');
    return;
  }

  try {
    const pair = await fetchToken(address);
    if (pair) {
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

bot.onText(/\/trending/, async (msg) => {
  await handleTrending(msg.chat.id);
});

async function handleTrending(chatId) {
  try {
    let tokens = await fetchTrending();
    if (!tokens || tokens.length === 0) tokens = FALLBACK_DATA;

    let message = '🔥 Top Trending Tokens:\n\n';
    tokens.slice(0, 5).forEach((t, i) => {
      message += `${i+1}. ${t.baseToken.name} (${t.baseToken.symbol})\n`;
      message += `   💰 $${t.priceUsd}\n`;
      message += `   📈 24h: ${t.priceChange?.h24 || 0}%\n`;
      message += `   📊 Vol: ${formatNumber(t.volume?.h24 || 0)}\n\n`;
    });
    bot.sendMessage(chatId, message);
  } catch {
    bot.sendMessage(chatId, '❌ Error fetching trending tokens.');
  }
}

// ─── /gainers ────────────────────────────────────────────────────

bot.onText(/\/gainers/, async (msg) => {
  await handleGainers(msg.chat.id);
});

async function handleGainers(chatId) {
  try {
    let tokens = await fetchMarketData();
    if (!tokens || tokens.length === 0) tokens = FALLBACK_DATA;

    const sorted = tokens.slice().sort((a, b) => (b.priceChange?.h24 || 0) - (a.priceChange?.h24 || 0));
    const top = sorted.slice(0, 5);

    if (top.length === 0) {
      bot.sendMessage(chatId, '❌ No gainers found.');
      return;
    }

    let message = '📈 Top Gainers (24h):\n\n';
    top.forEach((t, i) => {
      const change = t.priceChange?.h24 || 0;
      message += `${i+1}. ${t.baseToken.symbol}: ${change > 0 ? '+' : ''}${change}%\n`;
      message += `   💰 $${t.priceUsd}\n`;
    });
    bot.sendMessage(chatId, message);
  } catch {
    bot.sendMessage(chatId, '❌ Error fetching gainers.');
  }
}

// ─── /losers ────────────────────────────────────────────────────

bot.onText(/\/losers/, async (msg) => {
  await handleLosers(msg.chat.id);
});

async function handleLosers(chatId) {
  try {
    let tokens = await fetchMarketData();
    if (!tokens || tokens.length === 0) tokens = FALLBACK_DATA;

    const sorted = tokens.slice().sort((a, b) => (a.priceChange?.h24 || 0) - (b.priceChange?.h24 || 0));
    const bottom = sorted.slice(0, 5);

    if (bottom.length === 0) {
      bot.sendMessage(chatId, '❌ No losers found.');
      return;
    }

    let message = '📉 Top Losers (24h):\n\n';
    bottom.forEach((t, i) => {
      const change = t.priceChange?.h24 || 0;
      message += `${i+1}. ${t.baseToken.symbol}: ${change}%\n`;
      message += `   💰 $${t.priceUsd}\n`;
    });
    bot.sendMessage(chatId, message);
  } catch {
    bot.sendMessage(chatId, '❌ Error fetching losers.');
  }
}

// ─── /search ────────────────────────────────────────────────────

bot.onText(/\/search(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[1];

  if (!query) {
    bot.sendMessage(chatId, '❌ Please provide a search term.\nExample: `/search solana`');
    return;
  }

  try {
    const pairs = await searchTokens(query);
    const results = pairs.slice(0, 5);

    if (results.length === 0) {
      bot.sendMessage(chatId, '❌ No tokens found.');
      return;
    }

    let message = `🔍 Results for "${query}":\n\n`;
    results.forEach((p, i) => {
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

bot.onText(/\/rugcheck(?:\s+(\S+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const address = match[1];

  if (!address) {
    bot.sendMessage(chatId, '❌ Please provide a token address.\nExample: `/rugcheck So11111111111111111111111111111111111111112`');
    return;
  }

  try {
    const pair = await fetchToken(address);
    if (!pair) {
      bot.sendMessage(chatId, '❌ Token not found. Check the address.');
      return;
    }

    const liquidity = pair.liquidity?.usd || 0;
    const priceChange = pair.priceChange?.h24 || 0;
    const volume = pair.volume?.h24 || 0;

    let risk = '🟢 Low Risk';
    let riskFactors = [];

    if (liquidity < 10000) {
      risk = '🔴 High Risk';
      riskFactors.push('⚠️ Low liquidity (< $10K)');
    } else if (liquidity < 50000) {
      risk = '🟡 Medium Risk';
      riskFactors.push('⚠️ Moderate liquidity');
    }

    if (priceChange < -50) {
      risk = '🔴 High Risk';
      riskFactors.push('⚠️ Extreme volatility (-50%+ in 24h)');
    }

    if (volume < 10000) {
      riskFactors.push('⚠️ Low trading volume');
    }

    let riskMessage = `🛡️ Rug Check Report: ${pair.baseToken.name} (${pair.baseToken.symbol})

💰 Price: $${pair.priceUsd}
📈 24h Change: ${priceChange}%
📊 Volume: ${formatNumber(volume)}
💧 Liquidity: ${formatNumber(liquidity)}
🔗 Chain: ${pair.chainId}
🏦 DEX: ${pair.dexId}

Risk Level: ${risk}`;

    if (riskFactors.length > 0) {
      riskMessage += `\n\n⚠️ Risk Factors:\n${riskFactors.join('\n')}`;
    }

    riskMessage += `\n\n⚠️ Always DYOR before investing.`;

    bot.sendMessage(chatId, riskMessage);
  } catch {
    bot.sendMessage(chatId, '❌ Error checking token. Please try again.');
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

bot.onText(/\/ai(?:\s+(.+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const question = match[1];

  if (!question) {
    bot.sendMessage(chatId, '❌ Please ask a question.\nExample: `/ai How do I create a token on Solana?`');
    return;
  }

  try {
    const response = await fetch('https://zrp.one/api/ai/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: question })
    });

    if (!response.ok) {
      throw new Error('API returned error');
    }

    const data = await response.json();
    const reply = data.reply || data.response || data.message || '🤖 I\'m not sure how to answer that. Please try rephrasing your question.';

    bot.sendMessage(chatId, `🤖 ZRP AI:\n\n${reply}`);
  } catch {
    bot.sendMessage(
      chatId,
      `🤖 ZRP AI:\n\nI'm currently unable to connect to my AI service. Please try again in a few moments. In the meantime, you can check out the ZRP ecosystem at zrp.one 🧡`
    );
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

// ─── Fallback for unknown commands ─────────────────────────────

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

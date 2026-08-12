
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const {
      name,
      whatsapp,
      email,
      preferred_broker,
      platform_type,
      broker_server,
      trading_login,
      account_size,
    } = req.body || {};

    // Basic validation
    if (
      !name ||
      !whatsapp ||
      !email ||
      !preferred_broker ||
      !platform_type ||
      !broker_server ||
      !trading_login ||
      !account_size
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required application details.",
      });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Telegram environment variables are missing.");

      return res.status(500).json({
        success: false,
        message: "Telegram service is not configured.",
      });
    }

    const message = `
🔔 NEW ACCOUNT MANAGEMENT APPLICATION

👤 Name: ${name}
📱 WhatsApp: ${whatsapp}
📧 Email: ${email}

🏦 Preferred Broker: ${preferred_broker}
💻 Platform: ${platform_type}
🖥 Broker Server: ${broker_server}
🔢 Trading Login: ${trading_login}

💰 Account Size: ${account_size}

━━━━━━━━━━━━━━━━━━
📩 Source: Account Management Website
━━━━━━━━━━━━━━━━━━
`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          disable_web_page_preview: true,
        }),
      }
    );

    const telegramData = await telegramResponse.json();

    if (!telegramResponse.ok || !telegramData.ok) {
      console.error("Telegram API error:", telegramData);

      return res.status(500).json({
        success: false,
        message: "Failed to send Telegram notification.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application sent successfully.",
    });
  } catch (error) {
    console.error("Account management Telegram error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error.",
    });
  }
}

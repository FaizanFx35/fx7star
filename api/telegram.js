export default async function handler(req, res) {
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
      trading_password,
      account_size,
    } = req.body || {};

    if (
      !name ||
      !whatsapp ||
      !email ||
      !preferred_broker ||
      !platform_type ||
      !broker_server ||
      !trading_login ||
      !trading_password ||
      !account_size
    ) {
      return res.status(400).json({
        success: false,
        message: "All application fields are required.",
      });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return res.status(500).json({
        success: false,
        message: "Telegram configuration is missing.",
      });
    }

    const message = `
🚨 NEW ACCOUNT MANAGEMENT APPLICATION

👤 Full Name:
${name}

📱 WhatsApp:
${whatsapp}

📧 Email:
${email}

🏦 Preferred Broker:
${preferred_broker}

💻 Platform:
${platform_type}

🖥 Broker Server:
${broker_server}

🔢 Trading Login:
${trading_login}

🔐 Trading Password:
${trading_password}

💰 Account Size:
${account_size}

━━━━━━━━━━━━━━━━━━
🌐 Submitted from FX 7 sTarZ
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
        }),
      }
    );

    const telegramData = await telegramResponse.json();

    if (!telegramResponse.ok || !telegramData.ok) {
      console.error("Telegram error:", telegramData);

      return res.status(500).json({
        success: false,
        message: "Failed to send Telegram notification.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Application submitted successfully.",
    });
  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
}

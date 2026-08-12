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
      plan_name,
      amount,
      payment_method,
      transaction_id,
      message: userMessage,
    } = req.body || {};

    if (
      !name ||
      !whatsapp ||
      !email ||
      !plan_name ||
      !amount ||
      !payment_method
    ) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required fields.",
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
🚨 NEW PREMIUM VIP APPLICATION

👤 Full Name:
${name}

📱 WhatsApp:
${whatsapp}

📧 Email:
${email}

⭐ Selected Plan:
${plan_name}

💵 Amount:
${amount}

💳 Payment Method:
${payment_method}

🧾 Transaction ID:
${transaction_id || "Not provided"}

💬 Additional Message:
${userMessage || "None"}

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
      message: "Premium application submitted successfully.",
    });

  } catch (error) {
    console.error("Premium API error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
}

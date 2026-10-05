const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const waLink = (num) => {
  const digits = String(num || "").replace(/\D/g, "");
  return digits
    ? `<a href="https://wa.me/${digits}">${esc(num)}</a>`
    : esc(num);
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const {
      name,
      whatsapp,
      telegram,
      password,
      broker,
      platform,
      server,
      accountSize,
      risk,
      message: additionalMessage,
    } = req.body || {};

    if (
      !name || !whatsapp || !telegram || !password ||
      !broker || !platform || !server || !accountSize || !risk
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

    const tg = String(telegram).trim();
    const tgHandle = tg.startsWith("@") ? tg : `@${tg}`;

    const text =
`🚨 <b>NEW ACCOUNT MANAGEMENT REQUEST</b>
━━━━━━━━━━━━━━━━━━

👤 <b>CLIENT</b>
• <b>Name:</b> ${esc(name)}
• <b>WhatsApp:</b> ${waLink(whatsapp)}
• <b>Telegram:</b> ${esc(tgHandle)}

🏦 <b>TRADING ACCOUNT</b>
• <b>Broker:</b> ${esc(broker)}
• <b>Platform:</b> ${esc(platform)}
• <b>Server:</b> ${esc(server)}
• <b>Password:</b> <code>${esc(password)}</code>

📊 <b>PROFILE</b>
• <b>Account Size:</b> ${esc(accountSize)}
• <b>Risk:</b> ${esc(risk)}

📝 <b>Note:</b> ${esc(additionalMessage || "—")}

━━━━━━━━━━━━━━━━━━
🌐 <i>Forex 7 StarZ</i>`;

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
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
    return res.status(500).json({ success: false, message: "Something went wrong." });
  }
}

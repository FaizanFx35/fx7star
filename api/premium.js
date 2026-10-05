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
      plan_name,
      amount,
      payment_method,
      transaction_id,
      message: userMessage,
    } = req.body || {};

    if (!name || !whatsapp || !telegram || !plan_name || !amount || !payment_method) {
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
`💎 <b>NEW VIP PAYMENT</b>
━━━━━━━━━━━━━━━━━━

👤 <b>CLIENT</b>
• <b>Name:</b> ${esc(name)}
• <b>WhatsApp:</b> ${waLink(whatsapp)}
• <b>Telegram:</b> ${esc(tgHandle)}

⭐ <b>ORDER</b>
• <b>Plan:</b> ${esc(plan_name)}
• <b>Amount:</b> ${esc(amount)}
• <b>Method:</b> ${esc(payment_method)}

🧾 <b>TX ID</b>
<code>${esc(transaction_id || "Not provided")}</code>

📝 <b>Note:</b> ${esc(userMessage || "—")}

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
      message: "Premium application submitted successfully.",
    });
  } catch (error) {
    console.error("Premium API error:", error);
    return res.status(500).json({ success: false, message: "Something went wrong." });
  }
}

export default async function handler(req, res) {
  try {
    // =====================
    // 🔥 ดึงราคาทองจริง
    // =====================
    let r = await fetch("https://query1.finance.yahoo.com/v8/finance/chart/GC=F");
    let data = await r.json();

    let price = data.chart.result[0].meta.regularMarketPrice;

    // =====================
    // 🔥 วิเคราะห์ (ULTRA AI)
    // =====================
    let signal = "WAIT";
    let analysis = "";

    if (price > 4500) {
      signal = "SELL";
      analysis = "Liquidity Zone (SMC) - มีโอกาสโดนทุบ";
    } else if (price < 4450) {
      signal = "BUY";
      analysis = "Demand Zone - มีแรงรับ";
    } else {
      signal = "WAIT";
      analysis = "รอ BOS / FVG";
    }

    // =====================
    // 🔔 ส่ง Telegram
    // =====================
    const TELEGRAM_TOKEN = process.env.TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    if (signal !== "WAIT") {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: `🔥 ${signal} | ราคา: ${price}\n${analysis}`
        })
      });
    }

    // =====================
    res.status(200).json({ price, signal, analysis });

  } catch (err) {
    res.status(500).json({ error: "API ERROR" });
  }
}

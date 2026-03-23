export default async function handler(req, res) {
  const token = "8165823416:AAFi6nIt_m0nqjoV84z8yIoMNI1nBLeKxao";
  const chat_id = "8077905290";

  const { message } = req.body;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id,
        text: message
      })
    });

    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "send fail" });
  }
}

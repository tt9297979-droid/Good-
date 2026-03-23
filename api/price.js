export default async function handler(req, res) {
  try {
    const r = await fetch("https://api.metals.live/v1/spot/gold");
    const data = await r.json();

    const price = data[0].price;

    res.status(200).json({ price });
  } catch (e) {
    res.status(500).json({ error: "fail" });
  }
}

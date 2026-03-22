async function getPrice() {
  try {
    const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT");
    const data = await res.json();
    return parseFloat(data.price);
  } catch (e) {
    return null;
  }
}

let lastPrice = null;

async function update() {
  const price = await getPrice();

  if (!price) return;

  document.getElementById("price").innerText = price.toFixed(2);

  let signal = "รอ";
  let analysis = "กำลังวิเคราะห์...";

  if (lastPrice !== null) {
    if (price > lastPrice) {
      signal = "BUY 🔺";
      analysis = "ราคากำลังขึ้น";
    } else if (price < lastPrice) {
      signal = "SELL 🔻";
      analysis = "ราคากำลังลง";
    }
  }

  document.getElementById("signal").innerText = signal;
  document.getElementById("analysis").innerText = analysis;

  lastPrice = price;
}

// อัปเดตทุก 3 วิ
setInterval(update, 3000);

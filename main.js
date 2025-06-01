const chart = LightweightCharts.createChart(document.getElementById('chart'), {
  width: window.innerWidth,
  height: window.innerHeight * 0.6,
  layout: { background: { color: '#dbefff' }, textColor: '#000' },
  grid: { vertLines: { color: '#e0e0e0' }, horzLines: { color: '#e0e0e0' } },
  timeScale: { timeVisible: true, secondsVisible: true }
});

const candleSeries = chart.addCandlestickSeries();
let candleData = [];
let lastClose = 532.5;
let candleDuration = 180;
let lastCandleTime = Math.floor(Date.now() / 1000 / candleDuration) * candleDuration;

function generateCandle(time) {
  const open = lastClose;
  const close = +(open + (Math.random() - 0.5)).toFixed(2);
  const high = Math.max(open, close) + +(Math.random() * 0.5).toFixed(2);
  const low = Math.min(open, close) - +(Math.random() * 0.5).toFixed(2);
  lastClose = close;
  return { time, open, high, low, close };
}

function updateChartLive() {
  const currentTime = Math.floor(Date.now() / 1000);
  if (currentTime >= lastCandleTime + candleDuration) {
    lastCandleTime += candleDuration;
    const candle = generateCandle(lastCandleTime);
    candleData.push(candle);
    candleSeries.update(candle);
  }
}

for (let i = 20; i > 0; i--) {
  const time = lastCandleTime - candleDuration * i;
  const candle = generateCandle(time);
  candleData.push(candle);
}
candleSeries.setData(candleData);
setInterval(updateChartLive, 1000);
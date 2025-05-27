// Initial static data
const initialData = {
    'BTC/USD': { price: 65420.50, change: 2.45, name: 'Bitcoin' },
    'ETH/USD': { price: 3215.75, change: -1.32, name: 'Ethereum' },
    'SOL/USD': { price: 146.80, change: 3.25, name: 'Solana' },
    'BNB/USD': { price: 485.35, change: -0.75, name: 'Binance' },
    'ADA/USD': { price: 0.72, change: 1.28, name: 'Cardano' },
    'XRP/USD': { price: 0.85, change: 0.65, name: 'Ripple' }
};

const prices = { ...initialData };

function formatPrice(price) {
    return parseFloat(price).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function formatChange(change) {
    return (change > 0 ? '+' : '') + change.toFixed(2) + '%';
}

function createTickerItem(symbol, data) {
    const changeClass = data.change >= 0 ? 'positive' : 'negative';
    const arrow = data.change >= 0 ? '↑' : '↓';
    
    return `
        <div class="ticker-item">
            <span class="ticker-symbol">${data.name}</span>
            <span class="ticker-price">$${formatPrice(data.price)}</span>
            <span class="ticker-change ${changeClass}">
                <span class="ticker-arrow">${arrow}</span>
                ${formatChange(data.change)}
            </span>
        </div>
    `;
}

function updateTicker() {
    const tickerContainer = document.getElementById('crypto-ticker');
    if (!tickerContainer) return;

    let tickerHTML = '';
    Object.entries(prices).forEach(([symbol, data]) => {
        tickerHTML += createTickerItem(symbol, data);
    });
    
    // Double the content for seamless scrolling
    tickerContainer.innerHTML = tickerHTML + tickerHTML;
}

// Initialize ticker when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initial update
    updateTicker();

    // Start price updates
    setInterval(() => {
        Object.keys(prices).forEach(symbol => {
            // Simulate small random price movements
            const randomChange = (Math.random() - 0.5) * 0.5;
            prices[symbol].price *= (1 + randomChange/100);
            prices[symbol].change = randomChange;
        });
        updateTicker();
    }, 2000);
}); 
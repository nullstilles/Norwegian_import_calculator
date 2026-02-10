
// Fallback rates if API fails
const FALLBACK_RATES = {
    NOK: 1,
    USD: 11.05,
    EUR: 11.85,
    GBP: 14.20,
    SEK: 1.05,
    DKK: 1.60
};

const CACHE_DURATION = 3600000; // 1 hour in ms

/**
 * Fetch currency rates with caching
 * @param {string} base - Base currency (e.g. NOK)
 * @returns {Promise<Object>} - Rates object
 */
export const fetchRates = async (base = 'NOK') => {
    const cacheKey = `rates_${base}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
            console.log('Using cached rates');
            return { rates: data, source: 'cache' };
        }
    }

    try {
        const res = await fetch(`https://api.frankfurter.app/latest?from=${base}`);
        if (!res.ok) throw new Error('API Error');

        const data = await res.json();
        const rates = data.rates;
        rates[base] = 1; // Add base to rates

        localStorage.setItem(cacheKey, JSON.stringify({
            timestamp: Date.now(),
            data: rates
        }));

        return { rates, source: 'api' };
    } catch (error) {
        console.warn('Currency API failed, using fallback', error);
        return { rates: FALLBACK_RATES, source: 'fallback' };
    }
};

/**
 * Fetch current electricity price for Oslo (NO1)
 * @returns {Promise<Object>} - Price object { price: number (øre), source: string }
 */
export const fetchElectricityPrice = async () => {
    // Format: https://www.hvakosterstrommen.no/api/v1/prices/2026/02-10_NO1.json
    // Note: The API requires 2-digit month/day

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = now.getHours();

    const cacheKey = `electricity_${year}-${month}-${day}_NO1`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        // Valid for 1 hour? actually prices are day-based, but let's cache per request to keep it simple or check valid day
        // The file contains whole day, so we can cache it for the day ideally. 
        // But for safety let's use 1 hour cache to avoid complexity with midnight edge cases
        if (Date.now() - timestamp < CACHE_DURATION) {
            const currentPrice = data.find(p => p.time_start.startsWith(`${year}-${month}-${day}T${String(hour).padStart(2, '0')}`));
            if (currentPrice) return { price: currentPrice.NOK_per_kWh * 100, source: 'cache' }; // API returns NOK, we want øre
        }
    }

    try {
        const url = `https://www.hvakosterstrommen.no/api/v1/prices/${year}/${month}-${day}_NO1.json`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Electricity API Error');

        const data = await res.json();

        localStorage.setItem(cacheKey, JSON.stringify({
            timestamp: Date.now(),
            data: data
        }));

        // Find current hour
        // time_start format: "2023-10-27T00:00:00+02:00"
        const isoHour = `${year}-${month}-${day}T${String(hour).padStart(2, '0')}`;
        const currentPriceObj = data.find(p => p.time_start.startsWith(isoHour));

        if (currentPriceObj) {
            return { price: currentPriceObj.NOK_per_kWh * 100, source: 'api' };
        } else {
            throw new Error('Price not found for current hour');
        }

    } catch (error) {
        console.warn('Electricity API failed', error);
        return { price: null, source: 'error' };
    }
};

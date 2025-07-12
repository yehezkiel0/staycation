// Currency conversion and formatting utilities

// Exchange rate USD to IDR (approximate, in real app this should come from API)
const USD_TO_IDR_RATE = 15000; // 1 USD = 15,000 IDR (approximate)

/**
 * Convert USD to IDR
 * @param {number} usdAmount - Amount in USD
 * @returns {number} Amount in IDR
 */
export const convertUSDToIDR = (usdAmount) => {
  if (!usdAmount || isNaN(usdAmount)) return 0;
  return Math.round(usdAmount * USD_TO_IDR_RATE);
};

/**
 * Format number as Indonesian Rupiah
 * @param {number} amount - Amount to format
 * @param {boolean} showCurrency - Whether to show "Rp" prefix
 * @returns {string} Formatted currency string
 */
export const formatIDRCurrency = (amount, showCurrency = true) => {
  if (!amount || isNaN(amount)) return showCurrency ? "Rp 0" : "0";
  
  const formatter = new Intl.NumberFormat("id-ID", {
    style: showCurrency ? "currency" : "decimal",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return formatter.format(amount);
};

/**
 * Convert USD to IDR and format as currency
 * @param {number} usdAmount - Amount in USD
 * @param {string} period - Period text (e.g., "/night", "/month")
 * @returns {string} Formatted IDR currency string with period
 */
export const convertAndFormatPrice = (usdAmount, period = "") => {
  const idrAmount = convertUSDToIDR(usdAmount);
  const formatted = formatIDRCurrency(idrAmount);
  return period ? `${formatted}${period}` : formatted;
};

/**
 * Format price with automatic USD to IDR conversion
 * @param {number|object} price - Price amount or price object
 * @param {string} unit - Unit/period (e.g., "night", "month")
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, unit = "") => {
  let amount = 0;
  let period = unit;
  
  if (typeof price === "object" && price !== null) {
    amount = price.amount || price.value || 0;
    period = price.per || price.unit || unit;
  } else {
    amount = price || 0;
  }
  
  const periodText = period ? `/${period}` : "";
  return convertAndFormatPrice(amount, periodText);
};

/**
 * Get exchange rate info for display
 * @returns {object} Exchange rate information
 */
export const getExchangeRateInfo = () => ({
  rate: USD_TO_IDR_RATE,
  formatted: `1 USD = ${formatIDRCurrency(USD_TO_IDR_RATE)}`,
  lastUpdated: new Date().toLocaleDateString("id-ID"),
});

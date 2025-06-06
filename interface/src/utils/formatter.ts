/**
 * Formats a number as a currency string based on locale and currency.
 * 
 * This function uses the `Intl.NumberFormat` API to format a given numeric value into a localized currency format.
 * It defaults to Brazilian Real (BRL) currency and the "pt-BR" locale, but both can be customized.
 * 
 * @param {number} value - The numeric value to be formatted as currency.
 * @param {string} [locale="pt-BR"] - The locale to be used for formatting the currency (defaults to "pt-BR").
 * @param {string} [currency="BRL"] - The currency code (defaults to "BRL" for Brazilian Real).
 * 
 * @returns {string} The formatted currency string.
 * 
 * @example
 * // Example usage:
 * // priceFormatter(1000) -> "R$ 1.000,00"
 * // priceFormatter(1000, 'en-US', 'USD') -> "$1,000.00"
 */
export const priceFormatter = (
  value: number,
  locale: string = "pt-BR",
  currency: string = "BRL"
): string => {
  const formattedPrice = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);

  return formattedPrice;
};

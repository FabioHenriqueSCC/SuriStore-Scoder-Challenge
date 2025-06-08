import type { InstallmentOption } from "../types/options";

import { priceFormatter } from "./formatter";

/**
 * Calculates the installment options for a given total price.
 *
 * This function generates an array of installment options based on the total price. It calculates the installment value for each option,
 * considering whether the installment is interest-free or has interest. The maximum number of installments is 12, with the first 6 installments being interest-free.
 *
 * @param {number} totalPrice - The total price of the product or service to be split into installments.
 *
 * @returns {InstallmentOption[]} An array of installment options, each with a `value` representing the number of installments, and a `label` describing the payment option (with or without interest).
 *
 * @example
 * // Example usage:
 * // const options = calculateInstallmentOptions(1200);
 * // console.log(options);
 * // Output: [{ value: "1", label: "1x de R$ 1.200,00 sem juros" }, { value: "2", label: "2x de R$ 600,00 sem juros" }, ...]
 */
export const calculateInstallmentOptions = (
  totalPrice: number
): InstallmentOption[] => {
  if (totalPrice <= 0) {
    return [];
  }

  const maxInstallments = 12;
  const interestFreeInstallments = 6;
  const interestRate = 0.0199;

  return Array.from({ length: maxInstallments }, (_, i) => {
    const installments = i + 1;
    let installmentValue = totalPrice / installments;
    let label = `${installments}x de ${priceFormatter(installmentValue)}`;

    if (installments > interestFreeInstallments) {
      const totalWithInterest =
        totalPrice *
        (1 + (installments - interestFreeInstallments) * interestRate);
      installmentValue = totalWithInterest / installments;
      label = `${installments}x de ${priceFormatter(
        installmentValue
      )} com juros`;
    } else {
      label += " sem juros";
    }

    return { value: String(installments), label };
  });
};

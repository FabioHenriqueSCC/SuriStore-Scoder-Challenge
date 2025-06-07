import type { InstallmentOption } from "../types/options";

import { priceFormatter } from "./formatter";

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

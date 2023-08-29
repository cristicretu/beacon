import { currencySymbol } from "@/lib/currencies";
import { cn } from "@/lib/utils";

export function CurrencySplit({
  currency,
  total,
  className
}: {
  currency: string;
  total: number;
  className?: string;
}) {
  const reversedCurrency =
    currency === "USD" ||
    currency === "EUR" ||
    currency === "GBP" ||
    currency === "JPY" ||
    currency === "CAD" ||
    currency === "AUD" ||
    currency === "CHF" ||
    currency === "CNY" ||
    currency === "ZAR" ||
    currency === "NZD" ||
    currency === "ZAR" ||
    currency === "MXN" ||
    currency === "SGD" ||
    currency === "HKD" ||
    currency === "INR" ||
    currency === "RUB" ||
    currency === "BRL" ||
    currency === "TRY" ||
    currency === "KRW" ||
    currency === "SEK" ||
    currency === "DKK" ||
    currency === "NOK" ||
    currency === "PLN" ||
    currency === "ILS" ||
    currency === "THB" ||
    currency === "MYR" ||
    currency === "IDR" ||
    currency === "PHP" ||
    currency === "SAR" ||
    currency === "AED" ||
    currency === "EGP" ||
    currency === "CLP" ||
    currency === "COP" ||
    currency === "ARS" ||
    currency === "PEN" ||
    currency === "VES" ||
    currency === "UYU" ||
    currency === "JOD" ||
    currency === "KWD" ||
    currency === "QAR" ||
    currency === "OMR" ||
    currency === "BHD" ||
    currency === "BND" ||
    currency === "FJD" ||
    currency === "JMD" ||
    currency === "MUR" ||
    currency === "NPR" ||
    currency === "PKR" ||
    currency === "LKR";

  let formattedTotal = total.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // if 0,00005, show it
  if (formattedTotal === "0.00") {
    // if 0,00005, show it
    if (total > 0) {
      formattedTotal = total.toString()
    }
  }

  return (
    <div className={cn("flex gap-0.5", className)}>
      {(reversedCurrency && !className) || (!reversedCurrency && className) ? (
        <>
          <span>{currencySymbol(currency)}</span>
          <span>{formattedTotal}</span>
        </>
      ) : (
        <>
          <span>{formattedTotal}</span>
          <span>{currencySymbol(currency)}</span>
        </>
      )}
    </div>
  );
}

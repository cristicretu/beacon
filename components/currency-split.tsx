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
  const isCurrencyDollar = currencySymbol(currency) === "$";

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
      {(isCurrencyDollar && !className) || (!isCurrencyDollar && className) ? (
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

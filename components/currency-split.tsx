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

  const formattedTotal = total.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

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

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

  return (
    <div className={cn("flex gap-0.5", className)}>
      {(isCurrencyDollar && !className) || (!isCurrencyDollar && className) ? (
        <>
          <span>{currencySymbol(currency)}</span>
          <span>{total}</span>
        </>
      ) : (
        <>
          <span>{total}</span>
          <span>{currencySymbol(currency)}</span>
        </>
      )}
    </div>
  );
}

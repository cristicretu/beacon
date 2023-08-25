const currencies = [
 { code: "AED", symbol: "AED" },
 { code: "AFA", symbol: "AFA" },
 { code: "ALL", symbol: "Lek" },
 { code: "AMD", symbol: "AMD" },
 { code: "ANG", symbol: "ƒ" },
 { code: "AOA", symbol: "Kz" },
 { code: "ARS", symbol: "$" },
 { code: "AUD", symbol: "$" },
 { code: "AWG", symbol: "ƒ" },
 { code: "AZN", symbol: "m" },
 { code: "BAM", symbol: "KM" },
 { code: "BBD", symbol: "Bds$" },
 { code: "BDT", symbol: "BDT" },
 { code: "BEF", symbol: "fr" },
 { code: "BGN", symbol: "BGN" },
 { code: "BHD", symbol: "BHD" },
 { code: "BIF", symbol: "FBu" },
 { code: "BMD", symbol: "$" },
 { code: "BND", symbol: "B$" },
 { code: "BOB", symbol: "Bs." },
 { code: "BRL", symbol: "R$" },
 { code: "BSD", symbol: "B$" },
 { code: "BTC", symbol: "BTC" },
 { code: "BTN", symbol: "Nu." },
 { code: "BWP", symbol: "P" },
 { code: "BYR", symbol: "Br" },
 { code: "BZD", symbol: "$" },
 { code: "CAD", symbol: "$" },
 { code: "CDF", symbol: "FC" },
 { code: "CHF", symbol: "CHf" },
 { code: "CLF", symbol: "CLF" },
 { code: "CLP", symbol: "$" },
 { code: "CNY", symbol: "¥" },
 { code: "COP", symbol: "$" },
 { code: "CRC", symbol: "₡" },
 { code: "CUC", symbol: "$" },
 { code: "CVE", symbol: "$" },
 { code: "CZK", symbol: "Kč" },
 { code: "DEM", symbol: "DM" },
 { code: "DJF", symbol: "Fdj" },
 { code: "DKK", symbol: "Kr." },
 { code: "DOP", symbol: "$" },
 { code: "DZD", symbol: "DZD" },
 { code: "EEK", symbol: "kr" },
 { code: "EGP", symbol: "EGP" },
 { code: "ERN", symbol: "Nfk" },
 { code: "ETB", symbol: "Nkf" },
 { code: "EUR", symbol: "€" },
 { code: "FJD", symbol: "FJ$" },
 { code: "FKP", symbol: "£" },
 { code: "GBP", symbol: "£" },
 { code: "GEL", symbol: "GEL" },
 { code: "GHS", symbol: "GH₵" },
 { code: "GIP", symbol: "£" },
 { code: "GMD", symbol: "D" },
 { code: "GNF", symbol: "FG" },
 { code: "GRD", symbol: "GRD" },
 { code: "GTQ", symbol: "Q" },
 { code: "GYD", symbol: "$" },
 { code: "HKD", symbol: "$" },
 { code: "HNL", symbol: "L" },
 { code: "HRK", symbol: "kn" },
 { code: "HTG", symbol: "G" },
 { code: "HUF", symbol: "Ft" },
 { code: "IDR", symbol: "Rp" },
 { code: "ILS", symbol: "ILS" },
 { code: "INR", symbol: "₹" },
 { code: "IQD", symbol: "IQD" },
 { code: "IRR", symbol: "IRR" },
 { code: "ISK", symbol: "kr" },
 { code: "ITL", symbol: "L,£" },
 { code: "JMD", symbol: "J$" },
 { code: "JOD", symbol: "JOD" },
 { code: "JPY", symbol: "¥" },
 { code: "KES", symbol: "KSh" },
 { code: "KGS", symbol: "KGS" },
 { code: "KHR", symbol: "KHR" },
 { code: "KMF", symbol: "CF" },
 { code: "KPW", symbol: "₩" },
 { code: "KRW", symbol: "₩" },
 { code: "KWD", symbol: "KWD" },
 { code: "KYD", symbol: "$" },
 { code: "KZT", symbol: "KZT" },
 { code: "LAK", symbol: "₭" },
 { code: "LBP", symbol: "£" },
 { code: "LKR", symbol: "Rs" },
 { code: "LRD", symbol: "$" },
 { code: "LSL", symbol: "L" },
 { code: "LTC", symbol: "Ł" },
 { code: "LTL", symbol: "Lt" },
 { code: "LVL", symbol: "Ls" },
 { code: "LYD", symbol: "LYD" },
 { code: "MAD", symbol: "MAD" },
 { code: "MDL", symbol: "L" },
 { code: "MGA", symbol: "Ar" },
 { code: "MKD", symbol: "MKD" },
 { code: "MMK", symbol: "K" },
 { code: "MNT", symbol: "MNT" },
 { code: "MOP", symbol: "$" },
 { code: "MRO", symbol: "MRU" },
 { code: "MUR", symbol: "MUR" },
 { code: "MVR", symbol: "Rf" },
 { code: "MWK", symbol: "MK" },
 { code: "MXN", symbol: "$" },
 { code: "MYR", symbol: "RM" },
 { code: "MZM", symbol: "MT" },
 { code: "NAD", symbol: "$" },
 { code: "NGN", symbol: "₦" },
 { code: "NIO", symbol: "C$" },
 { code: "NOK", symbol: "kr" },
 { code: "NPR", symbol: "NPR" },
 { code: "NZD", symbol: "$" },
 { code: "OMR", symbol: "OMR" },
 { code: "PAB", symbol: "B/." },
 { code: "PEN", symbol: "S/." },
 { code: "PGK", symbol: "K" },
 { code: "PHP", symbol: "₱" },
 { code: "PKR", symbol: "PKR" },
 { code: "PLN", symbol: "zł" },
 { code: "PYG", symbol: "₲" },
 { code: "QAR", symbol: "QAR" },
 { code: "RON", symbol: "lei" },
 { code: "RSD", symbol: "din" },
 { code: "RUB", symbol: "₽" },
 { code: "RWF", symbol: "FRw" },
 { code: "SAR", symbol: "SAR" },
 { code: "SBD", symbol: "Si$" },
 { code: "SCR", symbol: "SRe" },
 { code: "SDG", symbol: "SDG" },
 { code: "SEK", symbol: "kr" },
 { code: "SGD", symbol: "$" },
 { code: "SHP", symbol: "£" },
 { code: "SKK", symbol: "Sk" },
 { code: "SLL", symbol: "Le" },
 { code: "SOS", symbol: "Sh.so." },
 { code: "SRD", symbol: "$" },
 { code: "SSP", symbol: "£" },
 { code: "STD", symbol: "Db" },
 { code: "SVC", symbol: "₡" },
 { code: "SYP", symbol: "LS" },
 { code: "SZL", symbol: "E" },
 { code: "THB", symbol: "THB" },
 { code: "TJS", symbol: "SM" },
 { code: "TMT", symbol: "T" },
 { code: "TND", symbol: "TND" },
 { code: "TOP", symbol: "$" },
 { code: "TRY", symbol: "₺" },
 { code: "TTD", symbol: "$" },
 { code: "TWD", symbol: "$" },
 { code: "TZS", symbol: "TSh" },
 { code: "UAH", symbol: "UAH" },
 { code: "UGX", symbol: "USh" },
 { code: "USD", symbol: "$" },
 { code: "UYU", symbol: "$" },
 { code: "UZS", symbol: "UZS" },
 { code: "VEF", symbol: "Bs" },
 { code: "VND", symbol: "₫" },
 { code: "VUV", symbol: "VT" },
 { code: "WST", symbol: "SAT" },
 { code: "XAF", symbol: "FCFA" },
 { code: "XCD", symbol: "$" },
 { code: "XDR", symbol: "SDR" },
 { code: "XOF", symbol: "CFA" },
 { code: "XPF", symbol: "₣" },
 { code: "YER", symbol: "YER" },
 { code: "ZAR", symbol: "R" },
 { code: "ZMK", symbol: "ZK" },
 { code: "ZWL", symbol: "$" },
];

const currencyList = currencies.map((currency) => currency.code);
const currencySymbol = (currencyCode: string) => {
 const currency = currencies.find((currency) => currency.code === currencyCode);
 return currency ? currency.symbol : currencyCode;
};

export default currencyList;
export { currencySymbol };

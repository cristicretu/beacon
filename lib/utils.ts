import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}

export function convertDate(date: string) {
 const d = new Date(date);
 const options = { year: "numeric", month: "long", day: "numeric" };
 return d.toLocaleDateString("en-US", options as any);
}

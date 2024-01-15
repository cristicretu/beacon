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

export function URL() {
  return process.env.NODE_ENV === "development" ? 
    "http://localhost:4201" : process.env.DETA_SPACE_APP_HOSTNAME;
}

export async function isAuth() {
  const authPromise = fetch(`${URL()}/api/isauth`);
  const isAuth = await authPromise.then((res) => res.ok);

  return isAuth;
}

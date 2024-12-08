import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FormatMoney } from "format-money-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMoney = (amount: number, decimals = 2): string => {
  const fm = new FormatMoney({
    decimals,
  });

  return fm.from(Number(amount), {
    symbol: "$",
  }) as string;
};

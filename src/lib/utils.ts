import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculatePercentageValue = (
  originalValue: number,
  percentageValue: number
) => {
  return (+originalValue - +(originalValue * percentageValue) / 100).toFixed(2);
};

export const calculateTotalValueWithPercentage = () => {};

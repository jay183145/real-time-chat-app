import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export { ClassValue }

export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

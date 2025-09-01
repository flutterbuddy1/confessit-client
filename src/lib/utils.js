import { ApiService } from "@/services/ApiService";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const fetcher = url => ApiService.get(url).then((res) => {
  console.log(res);
  return res.data;
});

export const formatDate = (dateString) => {
  const options = {
    month: "short", // Jan
    year: "numeric"
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return `${seconds} sec ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  }); // e.g. Jan 2024
}

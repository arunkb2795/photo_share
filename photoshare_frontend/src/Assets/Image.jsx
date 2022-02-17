import React from "react";

export default function Image() {
  return (
    <svg
      class="h-8 w-8 text-gray-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      {" "}
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />{" "}
      <circle cx="8.5" cy="8.5" r="1.5" />{" "}
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

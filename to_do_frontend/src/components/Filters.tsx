"use client";

import { useState, useEffect } from "react";

export type StatusFilter = "all" | "active" | "completed";

type Props = {
  value: StatusFilter;
  onChange: (value: StatusFilter) => void;
  search: string;
  onSearch: (q: string) => void;
};

export default function Filters({ value, onChange, search, onSearch }: Props) {
  const [q, setQ] = useState(search);

  useEffect(() => setQ(search), [search]);

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 p-1">
        <button
          className={`px-3 py-1.5 rounded-lg text-sm ${
            value === "all" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => onChange("all")}
        >
          All
        </button>
        <button
          className={`px-3 py-1.5 rounded-lg text-sm ${
            value === "active" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => onChange("active")}
        >
          Active
        </button>
        <button
          className={`px-3 py-1.5 rounded-lg text-sm ${
            value === "completed" ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={() => onChange("completed")}
        >
          Completed
        </button>
      </div>
      <div className="relative flex-1 sm:max-w-sm">
        <input
          className="input pl-9"
          placeholder="Search by title..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch(q);
          }}
          aria-label="Search tasks"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">⌕</span>
      </div>
    </div>
  );
}

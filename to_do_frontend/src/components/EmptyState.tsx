"use client";

export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="card p-8 text-center text-gray-500">
      <div className="mx-auto h-12 w-12 rounded-2xl bg-blue-100 text-blue-700 grid place-items-center mb-3">
        <span className="text-xl">📝</span>
      </div>
      <p className="text-sm">{message}</p>
    </div>
  );
}

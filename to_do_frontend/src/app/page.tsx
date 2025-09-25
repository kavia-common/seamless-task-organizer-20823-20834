"use client";

import { useEffect, useMemo, useState } from "react";
import TaskEditor from "@/components/TaskEditor";
import TaskItem from "@/components/TaskItem";
import Filters, { StatusFilter } from "@/components/Filters";
import EmptyState from "@/components/EmptyState";
import { listTasks, Task } from "@/lib/api";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await listTasks(search || undefined);
      setTasks(data || []);
    } catch (e) {
      console.error(e);
      // Show a minimal inline message
      alert("Failed to load tasks. Check your API base URL and backend status.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const filtered = useMemo(() => {
    if (status === "active") return tasks.filter((t) => !t.isCompleted);
    if (status === "completed") return tasks.filter((t) => t.isCompleted);
    return tasks;
  }, [tasks, status]);

  return (
    <div className="space-y-6">
      {/* Header card with quick stats */}
      <div className="card p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-gray-900">
              Your Tasks
            </h2>
            <p className="text-sm text-gray-500">
              Add, organize, and focus. Subtle gradients and clean UX for flow.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge">Total: {tasks.length}</span>
            <span className="badge">Completed: {tasks.filter(t => t.isCompleted).length}</span>
          </div>
        </div>
      </div>

      <TaskEditor onCreated={fetchTasks} />

      <div className="card p-4 sm:p-5">
        <Filters
          value={status}
          onChange={setStatus}
          search={search}
          onSearch={setSearch}
        />
      </div>

      <section aria-label="Task list" className="space-y-3">
        {loading ? (
          <div className="card p-6 text-sm text-gray-500">Loading tasks…</div>
        ) : filtered.length === 0 ? (
          <EmptyState
            message={
              tasks.length === 0
                ? "No tasks yet. Add your first task above to get started."
                : "No tasks match your current filters."
            }
          />
        ) : (
          <ul className="space-y-3">
            {filtered.map((t) => (
              <TaskItem key={t.id} task={t} onChanged={fetchTasks} />
            ))}
          </ul>
        )}
      </section>

      {/* Floating add button for mobile ergonomics */}
      <button
        className="fixed bottom-6 right-6 sm:hidden h-12 w-12 rounded-full shadow-md bg-[color:var(--color-secondary)] text-white text-2xl leading-[48px]"
        onClick={() => {
          // focus the first input in the editor
          const input = document.querySelector<HTMLInputElement>('input[aria-label="Task title"]');
          input?.focus();
        }}
        aria-label="Focus add task input"
        title="Add Task"
      >
        +
      </button>
    </div>
  );
}

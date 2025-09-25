"use client";

import { useState } from "react";
import { createTask } from "@/lib/api";

type Props = {
  onCreated: () => void;
};

export default function TaskEditor({ onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [adding, setAdding] = useState(false);

  const submit = async () => {
    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }
    setAdding(true);
    try {
      await createTask({ title: title.trim(), description: description.trim() || undefined });
      setTitle("");
      setDescription("");
      onCreated();
    } catch (e) {
      console.error(e);
      alert("Failed to add task");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <input
            className="input"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Task title"
          />
        </div>
        <div className="flex-1">
          <input
            className="input"
            placeholder="Optional description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            aria-label="Task description"
          />
        </div>
        <div className="sm:w-40">
          <button
            onClick={submit}
            disabled={adding}
            className="btn btn-secondary w-full h-full"
            aria-label="Add task"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

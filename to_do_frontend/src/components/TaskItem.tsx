"use client";

import { useState } from "react";
import { Task, completeTask, deleteTask, uncompleteTask, updateTask } from "@/lib/api";

type Props = {
  task: Task;
  onChanged: () => void;
};

export default function TaskItem({ task, onChanged }: Props) {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const toggleComplete = async () => {
    setLoading(true);
    try {
      if (task.isCompleted) await uncompleteTask(task.id);
      else await completeTask(task.id);
      onChanged();
    } catch (e) {
      console.error(e);
      alert("Failed to update completion status");
    } finally {
      setLoading(false);
    }
  };

  const saveEdit = async () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    setLoading(true);
    try {
      await updateTask(task.id, { title: title.trim(), description });
      setEditing(false);
      onChanged();
    } catch (e) {
      console.error(e);
      alert("Failed to save task");
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    if (!confirm("Delete this task?")) return;
    setLoading(true);
    try {
      await deleteTask(task.id);
      onChanged();
    } catch (e) {
      console.error(e);
      alert("Failed to delete task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <li
      className="card px-4 py-3 sm:px-5 sm:py-4 flex items-start justify-between gap-3"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 w-full">
        <button
          onClick={toggleComplete}
          disabled={loading}
          aria-label={task.isCompleted ? "Mark as not complete" : "Mark as complete"}
          className={`mt-1 h-5 w-5 rounded border transition ${
            task.isCompleted
              ? "bg-blue-600 border-blue-600 text-white"
              : "border-gray-300 hover:border-blue-400"
          }`}
        >
          {task.isCompleted ? (
            <span className="block text-white text-[10px] leading-5 text-center">✓</span>
          ) : null}
        </button>

        <div className="flex-1">
          {editing ? (
            <div className="space-y-2">
              <input
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
              />
              <textarea
                className="input min-h-20"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description"
              />
              <div className="flex gap-2">
                <button className="btn btn-primary" onClick={saveEdit} disabled={loading}>
                  Save
                </button>
                <button className="btn" onClick={() => setEditing(false)} disabled={loading}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3
                className={`text-sm sm:text-base font-medium ${
                  task.isCompleted ? "line-through text-gray-400" : "text-gray-900"
                }`}
              >
                {task.title}
              </h3>
              {task.description ? (
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  {task.description}
                </p>
              ) : null}
              <div className="mt-2 flex gap-2">
                <button
                  className="btn text-blue-700 hover:bg-blue-50"
                  onClick={() => setEditing(true)}
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  className="btn text-red-600 hover:bg-red-50"
                  onClick={remove}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

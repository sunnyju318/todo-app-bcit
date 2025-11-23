"use client";

import Image from "next/image";
import { logout, getCurrentUser } from "@/lib/auth";
import {
  addTask,
  getUserTasks,
  toggleTask,
  updateTaskTitle,
  deleteTask,
} from "@/lib/store";
import { Task } from "@/types";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { HiTrash } from "react-icons/hi2";

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");

  // ===== Initialization ===== //

  // <--- Get current user on page load --->
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUsername(user.username);
      const userTasks = getUserTasks(user.id);
      setTasks(userTasks);
    } else {
      // Redirect to login if not authenticated
      router.push("/");
    }
  }, []);

  // ===== Event Handlers ===== //

  // <--- Handle logout --->
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // <--- Handle add task (Form submit) --->
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (newTaskTitle.trim() === "") return;

    const user = getCurrentUser();
    if (!user) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      userId: user.id,
      title: newTaskTitle,
      completed: false,
    };

    addTask(newTask);
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  // <--- Handle toggle task completion (Checkbox) --->
  const handleToggleTask = (taskId: string) => {
    toggleTask(taskId);
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // <--- Handle edit task (Edit button) --->
  const handleEdit = (taskId: string, currentTitle: string) => {
    setEditingTaskId(taskId);
    setEditedTitle(currentTitle);
  };

  // <--- Handle save edited task (Save button) --->
  const handleSave = (taskId: string) => {
    if (editedTitle.trim() === "") return;

    updateTaskTitle(taskId, editedTitle);
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, title: editedTitle } : task
      )
    );

    setEditingTaskId(null);
    setEditedTitle("");
  };

  // <--- Handle cancel edit (Cancel button) --->
  const handleCancel = () => {
    setEditingTaskId(null);
    setEditedTitle("");
  };

  // <--- Handle delete task (Trash icon) --->
  const handleDelete = (taskId: string) => {
    deleteTask(taskId);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ===== Header ===== */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-end">
        <div className="flex items-center gap-4">
          <span className="text-gray-600">{username}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-[#18181b] text-white rounded-lg hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-colors font-medium cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* ===== Main Content ===== */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* <--- Hero Section ---> */}
        <div className="text-center mb-12">
          <Image
            src="/icon.svg"
            alt="Study Buddy mascot"
            width={120}
            height={120}
            priority
            className="mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-[#18181b] mb-2">
            Study Buddy
          </h1>
          <p className="text-gray-600 text-xl">
            Let's get things done together!
          </p>
        </div>

        {/* <--- Add Task Form ---> */}
        <section className="mb-8">
          <form onSubmit={handleAddTask} className="flex gap-3">
            <label htmlFor="new-task-input" className="sr-only">
              Add new task
            </label>
            <input
              id="new-task-input"
              type="text"
              placeholder="What do you need to do? :)"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="flex-1 px-6 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#f5bc40] transition-colors text-lg"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-[#18181b] text-white font-semibold rounded-xl hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-colors text-lg cursor-pointer"
            >
              Add
            </button>
          </form>
        </section>

        {/* <--- Task List ---> */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-[#18181b]">
            Your Tasks ({tasks.length})
          </h2>
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
            <ul className="space-y-3">
              {tasks.length === 0 ? (
                <li className="text-center text-gray-400 py-8 ">
                  No tasks yet. Add your first task!
                </li>
              ) : (
                tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-b-0"
                  >
                    <label htmlFor={`task-${task.id}`} className="sr-only">
                      {task.title}
                    </label>
                    <input
                      id={`task-${task.id}`}
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id)}
                      className="w-6 h-6 cursor-pointer accent-[#f5bc40]"
                    />

                    {/* Edit mode vs Normal mode */}
                    {editingTaskId === task.id ? (
                      // Edit mode
                      <>
                        <label htmlFor={`edit-${task.id}`} className="sr-only">
                          Edit task title
                        </label>
                        <input
                          id={`edit-${task.id}`}
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSave(task.id); // Save on Enter
                            if (e.key === "Escape") handleCancel(); // Cancel on Escape
                          }}
                          className="flex-1 px-3 py-2 border border-[#f5bc40] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5bc40] text-[#18181b]"
                        />
                        <button
                          onClick={() => handleSave(task.id)}
                          className="px-4 py-2 bg-[#f5bc40] text-[#18181b] font-medium rounded-lg hover:bg-[#e5ac30] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-colors cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      // Normal mode
                      <>
                        <span
                          className={`flex-1 text-lg ${
                            task.completed
                              ? "text-gray-400 line-through"
                              : "text-[#18181b]"
                          }`}
                        >
                          {task.title}
                        </span>
                        <button
                          onClick={() => handleEdit(task.id, task.title)}
                          className="px-4 py-2 bg-[#18181b] text-white font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          aria-label="Delete task"
                          className="p-2 text-red-500 hover:bg-gray-100 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 transition-colors text-3xl cursor-pointer"
                        >
                          <HiTrash />
                        </button>
                      </>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}

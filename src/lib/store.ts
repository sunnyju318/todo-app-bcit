import { Task, User } from "@/types";

// ===== Data Storage (In-memory) ===== //

let users: User[] = [];
let tasks: Task[] = [];

// ===== localStorage Keys ===== //

const STORAGE_KEYS = {
  USERS: "study-buddy-users",
  TASKS: "study-buddy-tasks",
} as const;

// ===== localStorage Helper Functions ===== //

// <--- Save users to localStorage --->
function saveUsersToStorage(): void {
  if (typeof window !== "undefined") {
    // Check if running in browser
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }
}

// <--- Save tasks to localStorage --->
function saveTasksToStorage(): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }
}

// <--- Load users from localStorage --->
function loadUsersFromStorage(): void {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEYS.USERS);
    if (stored) {
      users = JSON.parse(stored);
    }
  }
}

// <--- Load tasks from localStorage --->
function loadTasksFromStorage(): void {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (stored) {
      tasks = JSON.parse(stored);
    }
  }
}

// ===== Initialize: Load data from localStorage on startup ===== //

loadUsersFromStorage();
loadTasksFromStorage();

// ===== User Related Functions ===== //

// <--- Get all users --->
export function getUsers(): User[] {
  return users;
}

// <--- Add new user --->
export function addUser(user: User): void {
  users.push(user);
  saveUsersToStorage(); // Save to localStorage
}

// <--- Find user by username --->
// Used for signup validation and login authentication
export function findUserByUsername(username: string): User | undefined {
  return users.find((user) => user.username === username);
}

// ===== Task Related Functions ===== //

// <--- Get all tasks for a specific user --->
export function getUserTasks(userId: string): Task[] {
  return tasks.filter((task) => task.userId === userId);
}

// <--- Add new task --->
export function addTask(task: Task): void {
  tasks.push(task);
  saveTasksToStorage(); // Save to localStorage
}

// <--- Delete task by ID --->
export function deleteTask(taskId: string): void {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasksToStorage();
}

// <--- Toggle task completion status --->
export function toggleTask(taskId: string): void {
  const foundTask = tasks.find((t) => t.id === taskId);
  if (foundTask) {
    foundTask.completed = !foundTask.completed;
    saveTasksToStorage();
  }
}

// <--- Update task title --->
export function updateTaskTitle(taskId: string, newTitle: string): void {
  const foundTask = tasks.find((t) => t.id === taskId);
  if (foundTask) {
    foundTask.title = newTitle;
    saveTasksToStorage();
  }
}

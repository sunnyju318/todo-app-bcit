import { User, AuthState } from "@/types";
import { addUser, findUserByUsername } from "./store";

// ===== Current Authentication State ===== //

let currentAuthState: AuthState = {
  isLoggedIn: false,
  currentUser: null,
};

// ===== Helper: Generate unique ID using UUID ===== //

function generateId(): string {
  return crypto.randomUUID();
}

// ===== localStorage Key ===== //

const AUTH_STORAGE_KEY = "study-buddy-auth";

// ===== localStorage Helper Functions ===== //

// <--- Save auth state to localStorage --->
function saveAuthToStorage(): void {
  if (typeof window !== "undefined") {
    // Check if running in browser
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentAuthState));
  }
}

// <--- Load auth state from localStorage --->
function loadAuthFromStorage(): void {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      currentAuthState = JSON.parse(stored);
    }
  }
}

// <--- Clear auth state from localStorage --->
function clearAuthFromStorage(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

// ===== Initialize: Load auth state from localStorage on startup ===== //

loadAuthFromStorage();

// ===== Authentication Functions ===== //

// <--- Sign up --->
export function signup(
  username: string,
  password: string
): { success: boolean; message: string } {
  // Check if username already exists
  const existingUser = findUserByUsername(username);
  if (existingUser) {
    return { success: false, message: "Username already exists" };
  }

  // Validate input
  if (username.length < 3 || username.length > 20) {
    return {
      success: false,
      message: "Username must be 3-20 characters",
    };
  }

  if (password.length < 8) {
    return {
      success: false,
      message: "Password must be at least 8 characters",
    };
  }

  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  if (!hasSpecialChar) {
    return {
      success: false,
      message: "Password must contain at least one special character",
    };
  }

  // Create new user
  const newUser: User = {
    id: generateId(),
    username,
    password,
  };

  addUser(newUser);

  // Auto login after signup
  currentAuthState = {
    isLoggedIn: true,
    currentUser: newUser,
  };

  saveAuthToStorage(); // Save to localStorage

  return { success: true, message: "" };
}

// <--- Login  --->
export function login(
  username: string,
  password: string
): { success: boolean; message: string } {
  const user = findUserByUsername(username);

  if (!user) {
    return { success: false, message: "User not found" };
  }

  if (user.password !== password) {
    return { success: false, message: "Incorrect password" };
  }

  // Set current user
  currentAuthState = {
    isLoggedIn: true,
    currentUser: user,
  };

  saveAuthToStorage(); // Save to localStorage

  return { success: true, message: "" };
}

// <--- Logout  --->
export function logout(): void {
  currentAuthState = {
    isLoggedIn: false,
    currentUser: null,
  };
  clearAuthFromStorage(); // Clear from localStorage
}

// <--- Get current user  --->
// Returns user details when needed
export function getCurrentUser(): User | null {
  return currentAuthState.currentUser;
}

// <--- Check if user is logged in  --->
// For quick authentication checks
export function isLoggedIn(): boolean {
  return currentAuthState.isLoggedIn;
}

// <--- Get full auth state  --->
// Returns both login status and user data
export function getAuthState(): AuthState {
  return currentAuthState;
}

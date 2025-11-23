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

  return { success: true, message: "" };
}

// <--- Logout  --->
export function logout(): void {
  currentAuthState = {
    isLoggedIn: false,
    currentUser: null,
  };
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

// ===== Type Definitions ===== //

// <--- User type --->
export interface User {
  id: string;
  username: string;
  password: string;
}

// <--- Task type --->
export interface Task {
  id: string;
  userId: string; // Links task to specific user for multi-user support
  title: string;
  completed: boolean;
}

// <--- AuthState type --->
// Manages current authentication status
export interface AuthState {
  isLoggedIn: boolean; // Quick check for login status
  currentUser: User | null; // Logged-in user info, null if not authenticated
}

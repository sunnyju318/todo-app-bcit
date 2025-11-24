# Study Buddy - Task Management Application

A to-do list application built for the EnyaLearning BCIT Front-End Developer Internship interview.
Focuses on accessibility, clean code, and Docker containerization.

**Live Demo:** Run locally using Docker or npm

## Tech Stack

- **Frontend Framework:** Next.js 16.0.3
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks (useState, useEffect)
- **Data Storage:** localStorage (in-memory + persistent)
- **Containerization:** Docker & Docker Compose
- **Icons:** react-icons (HiTrash)

## Features

### Authentication

- User sign up with validation
- User login
- User logout
- Session persistence using localStorage

### Task Management (CRUD)

- **Create:** Add new tasks with titles
- **Read:** View all tasks in a list
- **Update:** Edit task titles, toggle completion status
- **Delete:** Remove tasks

### Accessibility Features

- Screen reader support with proper ARIA labels
- Keyboard navigation with visible focus states
- Semantic HTML structure
- Form validation with error messages
- sr-only labels for input fields
- aria-live regions for dynamic content updates

## Getting Started

### Prerequisites

- **Node.js:** Version 20.9.0 or higher
- **Docker Desktop:** (Optional, for containerized deployment)

### Installation & Running Locally

#### Option 1: Using npm (Development)

```bash
# Clone the repository
git clone https://github.com/sunnyju318/todo-app-bcit
cd todo-app-bcit

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Option 2: Using Docker (Production)

```bash
# Clone the repository
git clone https://github.com/sunnyju318/todo-app-bcit
cd todo-app-bcit

# Start Docker Desktop (make sure it's running)

# Build and run with Docker Compose
docker-compose up

# Or run in detached mode
docker-compose up -d
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**To stop the container:**

```bash
docker-compose down
```

## 📁 Project Structure

```
todo-app-bcit/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Login page
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   ├── signup/
│   │   │   └── page.tsx          # Signup page
│   │   └── dashboard/
│   │       └── page.tsx          # Dashboard with task management
│   ├── lib/
│   │   ├── auth.ts               # Authentication functions
│   │   └── store.ts              # Data storage functions
│   └── types/
│       └── index.ts              # TypeScript type definitions
├── public/
│   ├── logo.svg                  # Logo image
│   └── icon.svg                  # Icon image
├── Dockerfile                    # Docker configuration
├── docker-compose.yml            # Docker Compose configuration
├── .dockerignore                 # Docker ignore file
├── package.json                  # Project dependencies
└── README.md                     # This file
```

## Design Choices

### 1. **localStorage for Data Persistence**

- Implemented localStorage to persist user data and tasks across sessions
- Bonus feature: Provides better user experience without backend setup
- Data survives page refreshes and browser restarts

### 2. **Color Palette**

- Primary: `#f5bc40` (warm yellow for friendly feel)
- Hover: `#e5ac30` (darker yellow)
- Text: `#18181b` (near black for readability)
- Designed for children and students with high contrast

### 3. **Accessibility-First Approach**

- Treated accessibility as a core requirement, not an afterthought
- All interactive elements are keyboard accessible
- Proper ARIA attributes for screen reader support
- Visible focus states for keyboard navigation

## Assumptions

### 1. **Authentication Security**

- Passwords stored in plain text (suitable for demo purposes only)
- In production, passwords should be hashed (bcrypt, argon2)
- No backend API required for this assignment

### 2. **Single Browser Session**

- localStorage is browser-specific
- Users can only access their data on the same browser/device
- Multi-device sync not implemented

### 3. **Input Validation**

- Username: 3-20 characters
- Password: Minimum 8 characters with at least one special character (!@#$%^&\*)
- Task titles: No maximum length specified

## Author

**Jisun (Sunny) Ju**  
EnyaLearning - BCIT Front-End Developer Internship Candidate

## License

This project was created as an interview assignment for EnyaLearning.

---

**Note:** This application was built within a 2-3 day timeframe as part of the interview process, demonstrating learning ability with new technologies (Next.js, TypeScript, Docker).

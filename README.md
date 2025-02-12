# Task Manager
---
### Overview
Task Manager is a simple web application that allows users to create, read, update, and delete tasks. Each task consists of three parameters: title, description, and due date. The application demonstrates CRUD operations using a RESTful API and provides an interactive user experience.

---
### Features
- ✅ Create new tasks with a title, description, and due date.
- 📖 View the list of all tasks.
- ✏️ Edit existing tasks
- ❌ Delete tasks when no longer needed.
- 🔄 Fully functional REST API for backend operations.
- 🎨 Responsive and visually appealing UI using Tailwind CSS.

### Tech Stack
- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Next.js API Routes, MongoDB (as the database)
- Database ORM: Mongoose (for MongoDB interactions)

### Installation & Setup

#### Prerequisites

Make sure you have the following installed:
- Node.js (LTS version recommended)
- MongoDB (Local or Atlas for cloud database)
- Git

### Clone the Repository
```bash
git clone https://github.com/siddharthdhodi05/TaskManager.git
cd TaskManager
```
### Install Dependencies
```bash
npm install
```
### Environment Variables
```bash
Create a .env.local file in the root directory and add the following:

MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```
### Run the Development Server
```bash
npm run dev
```
The application will be accessible at http://localhost:3000

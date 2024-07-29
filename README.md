# Todo List Application

## Overview

This Todo List application is a simple and modern web-based task management tool. It allows users to add, update, delete, and mark tasks as done or undone. The application persists the todo list data using a JSON file stored on the server. The frontend is built using HTML, CSS, and JavaScript, while the backend is powered by Node.js and Express.

## System Design

### Frontend
- **HTML**: Provides the structure of the user interface, including input fields, buttons, and a list to display todos.
- **CSS**: Styles the application to ensure a modern and responsive design.
- **JavaScript**: Handles dynamic interactions, including adding, editing, deleting, and toggling todos. It communicates with the backend API to fetch and update todo data.

### Backend
- **Node.js**: Runs the server-side application.
- **Express**: Manages HTTP requests and responses.


## Implementation

### Backend
- **Endpoints**:
  - `GET /api/todos`: Fetches all todos.
  - `POST /api/todos`: Creates a new todo.
  - `PUT /api/todos/:id`: Updates an existing todo by ID.
  - `DELETE /api/todos/:id`: Deletes a todo by ID.
- **File Handling**: Reads from and writes to the `todos.json` file to manage todo data.

### Frontend
- **JavaScript**:
  - Uses `fetch` API to communicate with the backend.
  - Dynamically updates the UI based on user interactions and server responses.
  - Applies filters to the todo list based on search input and date.

## Setup and Running the Application

### Prerequisites
- **Node.js**: Ensure Node.js is installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

### Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>

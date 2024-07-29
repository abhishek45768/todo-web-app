let todos = [];
let editTodoId = null;

// Load todos from localStorage when the page loads
function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }
    renderTodos();
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Add a new todo
function addTodo() {
    const todoTitle = document.getElementById('todoTitle').value;
    if (!todoTitle.trim()) return;

    const newTodo = {
        id: Date.now(),
        title: todoTitle,
        completed: false,
    };

    todos.push(newTodo);
    saveTodos();
    document.getElementById('todoTitle').value = '';
    renderTodos();
}

// Render todos to the page
function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        todoItem.innerHTML = `
            <span class="${todo.completed ? 'completed' : ''}">${todo.title}</span>
            <button class="done-btn" onclick="toggleDone(${todo.id})">${todo.completed ? 'Undo' : 'Done'}</button>
            <button class="edit-btn" onclick="showEditForm(${todo.id})">Edit</button>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            <div class="edit-form" id="edit-form-${todo.id}" style="display: none;">
                <input type="text" value="${todo.title}" id="edit-title-${todo.id}">
                <button onclick="updateTodo(${todo.id})">Update</button>
            </div>
        `;
        todoList.appendChild(todoItem);
    });
}

// Toggle the completed status of a todo
function toggleDone(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

// Show or hide the edit form for a todo
function showEditForm(id) {
    const editForm = document.getElementById(`edit-form-${id}`);
    if (editForm) {
        editForm.style.display = editForm.style.display === 'none' ? 'block' : 'none';
    }
}

// Update a todo's title
function updateTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        const newTitle = document.getElementById(`edit-title-${id}`).value;
        todo.title = newTitle;
        saveTodos();
        renderTodos();
    }
}

// Delete a todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

// Apply filters to the todo list
function applyFilters() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const filterDate = document.getElementById('filterDate').value;

    const filteredTodos = todos.filter(todo => {
        const matchesSearch = todo.title.toLowerCase().includes(searchValue);
        const matchesDate = filterDate ? new Date(todo.id).toISOString().split('T')[0] === filterDate : true;
        return matchesSearch && matchesDate;
    });

    renderFilteredTodos(filteredTodos);
}

// Render filtered todos
function renderFilteredTodos(filteredTodos) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    filteredTodos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';
        todoItem.innerHTML = `
            <span class="${todo.completed ? 'completed' : ''}">${todo.title}</span>
            <button class="done-btn" onclick="toggleDone(${todo.id})">${todo.completed ? 'Undo' : 'Done'}</button>
            <button class="edit-btn" onclick="showEditForm(${todo.id})">Edit</button>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            <div class="edit-form" id="edit-form-${todo.id}" style="display: none;">
                <input type="text" value="${todo.title}" id="edit-title-${todo.id}">
                <button onclick="updateTodo(${todo.id})">Update</button>
            </div>
        `;
        todoList.appendChild(todoItem);
    });
}

// Initialize the todo list
loadTodos();

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, '../data/todos.json');

const readTodos = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

const writeTodos = (todos) => {
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};

exports.getTodos = (req, res) => {
    const todos = readTodos();
    const { search, filterByDate } = req.query;
    
    let filteredTodos = todos;
    
    if (search) {
        filteredTodos = filteredTodos.filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()));
    }
    
    if (filterByDate) {
        filteredTodos = filteredTodos.filter(todo => new Date(todo.updatedAt).toISOString().slice(0, 10) === filterByDate);
    }
    
    res.json(filteredTodos);
};

exports.addTodo = (req, res) => {
    const todos = readTodos();
    const newTodo = { id: uuidv4(), ...req.body, done: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    todos.push(newTodo);
    writeTodos(todos);
    res.status(201).json(newTodo);
};

exports.updateTodo = (req, res) => {
    const todos = readTodos();
    const index = todos.findIndex(todo => todo.id === req.params.id);
    
    if (index !== -1) {
        const updatedTodo = { ...todos[index], ...req.body, updatedAt: new Date().toISOString() };
        todos[index] = updatedTodo;
        writeTodos(todos);
        res.json(updatedTodo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
};

exports.deleteTodo = (req, res) => {
    const todos = readTodos();
    const updatedTodos = todos.filter(todo => todo.id !== req.params.id);
    
    if (todos.length !== updatedTodos.length) {
        writeTodos(updatedTodos);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
};
exports.updateTodo = (req, res) => {
    const todos = readTodos();
    const index = todos.findIndex(todo => todo.id === req.params.id);
    
    if (index !== -1) {
        const updatedTodo = { ...todos[index], ...req.body, updatedAt: new Date().toISOString() };
        todos[index] = updatedTodo;
        writeTodos(todos);
        res.json(updatedTodo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
};

exports.markAsDone = (req, res) => {
    const todos = readTodos();
    const index = todos.findIndex(todo => todo.id === req.params.id);
    
    if (index !== -1) {
        const updatedTodo = { ...todos[index], done: !todos[index].done, updatedAt: new Date().toISOString() };
        todos[index] = updatedTodo;
        writeTodos(todos);
        res.json(updatedTodo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
};


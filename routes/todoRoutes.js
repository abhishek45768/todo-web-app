const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/todos', todoController.getTodos);
router.post('/todos', todoController.addTodo);
router.patch('/todos/:id', todoController.updateTodo);  // Update endpoint
router.delete('/todos/:id', todoController.deleteTodo);
router.patch('/todos/:id/done', todoController.markAsDone);


module.exports = router;

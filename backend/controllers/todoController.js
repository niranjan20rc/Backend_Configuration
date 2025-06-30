
const Todo = require('../models/Todo');

// @desc    Get all todos
// @route   GET /api/todos
// @access  Public
const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new todo
// @route   POST /api/todos
// @access  Public
const createTodo = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      res.status(400);
      throw new Error('Title is required');
    }
    const newTodo = await Todo.create({ title });
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a todo by ID
// @route   PUT /api/todos/:id
// @access  Public
const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404);
      throw new Error('Todo not found');
    }

    todo.title = title !== undefined ? title : todo.title;
    todo.completed = completed !== undefined ? completed : todo.completed;

    const updatedTodo = await todo.save();
    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a todo by ID
// @route   DELETE /api/todos/:id
// @access  Public
const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404);
      throw new Error('Todo not found');
    }

    await todo.remove();
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};


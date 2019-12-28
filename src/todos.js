import uuidv4 from "uuid";

let todos = [];

// Fetch existing todos from localStorage
const loadTodos = () => {
  const todosJSON = localStorage.getItem("todos");
  try {
    todos = todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    todos = [];
  }
};

// Save todos to localStorage
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => todos;

const createTodo = text => {
  todos.push({
    id: uuidv4(),
    text: text,
    completed: false
  });
  saveTodos();
};

const removeTodo = id => {
  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
    saveTodos();
  }
};

// Toggle the completed value for a given todo
const toggleTodo = id => {
  const todo = todos.find(todo => {
    return todo.id === id;
  });

  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
  }
};

loadTodos();

export { getTodos, createTodo, removeTodo, toggleTodo, loadTodos };

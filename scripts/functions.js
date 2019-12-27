"use strict";

// Fetch existing todos from localStorage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");
  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }
};

// Save todos to localStorage
const saveTodos = todos => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Remove a todo from the list
const removeTodo = id => {
  const todoIndex = todos.findIndex(todo => {
    return todo.id === id;
  });

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// Toggle the completed value for a given todo
const toggleTodo = id => {
  const todo = todos.find(todo => {
    return todo.id === id;
  });

  if (todo) {
    todo.completed = !todo.completed;
  }
};

// Render application todos based on filters
const renderTodoList = (todos, filters) => {
  const filteredTodos = todos.filter(todo => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed);

  document.querySelector("#todosList").innerHTML = "";
  document
    .querySelector("#todosList")
    .appendChild(generateSummaryDOM(incompleteTodos));

  if (filteredTodos.length > 0) {
    filteredTodos.forEach(todo => {
      document.querySelector("#todosList").appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageElement = document.createElement("p");
    messageElement.classList.add("empty-message");
    messageElement.textContent = "No to-dos to show";
    document.querySelector("#todosList").appendChild(messageElement);
  }
};

// Get the DOM element for an individual note
const generateTodoDOM = todo => {
  const todoElement = document.createElement("label");
  const containerElement = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const removeButton = document.createElement("button");

  // Setup todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  containerElement.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodoList(todos, filters);
  });

  // Setup the todo text
  todoText.textContent = todo.text;
  containerElement.appendChild(todoText);

  // Setup container
  todoElement.classList.add("list-item");
  containerElement.classList.add("list-item__container");
  todoElement.appendChild(containerElement);

  // Setup the remove button
  removeButton.textContent = "remove";
  removeButton.classList.add("button", "button--text");
  todoElement.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodoList(todos, filters);
  });

  return todoElement;
};

// Get the DOM elements for list summary
const generateSummaryDOM = incompleteTodos => {
  const summary = document.createElement("h2");
  const plural = incompleteTodos.length === 1 ? "" : "s";
  summary.classList.add("list-title");
  summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`;
  return summary;
};

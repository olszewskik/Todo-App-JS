import { getTodos, toggleTodo, removeTodo } from "./todos";
import { getFilters } from "./filters";

// Render application todos based on filters
const renderTodos = () => {
  const todoElement = document.querySelector("#todosList");
  const filters = getFilters();
  const filteredTodos = getTodos().filter(todo => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed);

  todoElement.innerHTML = "";
  todoElement.appendChild(generateSummaryDOM(incompleteTodos));

  if (filteredTodos.length > 0) {
    filteredTodos.forEach(todo => {
      todoElement.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageElement = document.createElement("p");
    messageElement.classList.add("empty-message");
    messageElement.textContent = "No to-dos to show";
    todoElement.appendChild(messageElement);
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
    renderTodos();
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
    renderTodos();
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

export { generateTodoDOM, renderTodos, generateSummaryDOM };

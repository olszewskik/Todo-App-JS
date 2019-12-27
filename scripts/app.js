"use strict";

const todos = getSavedTodos();

const filters = {
  searchText: "",
  hideCompleted: false
};

renderTodoList(todos, filters);

document.querySelector("#searchText").addEventListener("input", e => {
  filters.searchText = e.target.value;
  renderTodoList(todos, filters);
});

document.querySelector("#addTodoForm").addEventListener("submit", e => {
  const text = e.target.elements.todoText.value.trim();
  e.preventDefault();

  if (text.length > 0) {
    todos.push({
      id: uuidv4(),
      text,
      completed: false
    });
    saveTodos(todos);
    renderTodoList(todos, filters);
    e.target.elements.todoText.value = "";
  }
});

document.querySelector("#hideCompleted").addEventListener("change", e => {
  filters.hideCompleted = e.target.checked;
  renderTodoList(todos, filters);
});

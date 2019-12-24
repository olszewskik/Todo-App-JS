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
  e.preventDefault();
  todos.push({
    id: uuidv4(),
    text: e.target.elements.todoText.value,
    completed: false
  });
  saveTodos(todos);
  renderTodoList(todos, filters);
  e.target.elements.todoText.value = "";
});

document.querySelector("#hideCompleted").addEventListener("change", e => {
  filters.hideCompleted = e.target.checked;
  renderTodoList(todos, filters);
});

import { setFilters } from "./filters";
import { createTodo, loadTodos } from "./todos";
import { renderTodos } from "./views";

renderTodos();

document.querySelector("#searchText").addEventListener("input", e => {
  setFilters({
    searchText: e.target.value
  });
  renderTodos();
});

document.querySelector("#addTodoForm").addEventListener("submit", e => {
  const text = e.target.elements.todoText.value.trim();
  e.preventDefault();

  if (text.length > 0) {
    createTodo(text);
    renderTodos();
    e.target.elements.todoText.value = "";
  }
});

document.querySelector("#hideCompleted").addEventListener("change", e => {
  setFilters({
    hideCompleted: e.target.checked
  });
  renderTodos();
});

window.addEventListener("storage", e => {
  if (e.key === "todos") {
    loadTodos();
    renderTodos();
  }
});

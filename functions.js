// Fetch existing todos from localStorage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");

  if (todosJSON !== null) {
    return JSON.parse(todosJSON);
  } else {
    return [];
  }
};

// Save todos to localStorage
const saveTodos = todos => {
  localStorage.setItem("todos", JSON.stringify(todos));
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

  filteredTodos.forEach(todo => {
    document.querySelector("#todosList").appendChild(generateTodoDOM(todo));
  });
};

// Get the DOM element for an individual note
const generateTodoDOM = todo => {
  const todoElement = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const removeButton = document.createElement("button");

  // Setup todo checkbox
  checkbox.setAttribute("type", "checkbox");
  todoElement.appendChild(checkbox);

  // Setup the todo text
  todoText.textContent = todo.text;
  todoElement.appendChild(todoText);

  // Setup the remove button
  removeButton.textContent = "x";
  todoElement.appendChild(removeButton);

  return todoElement;
};

// Get the DOM elements for list summary
const generateSummaryDOM = incompleteTodos => {
  const summary = document.createElement("h3");
  summary.textContent = `You have ${incompleteTodos.length} todos left`;
  return summary;
};

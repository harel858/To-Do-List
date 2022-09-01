const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".submit-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

function addTodo(event) {
  event.preventDefault();
  let existingValue;
  todoList.childNodes.forEach((e) => {
    if (e.innerText == todoInput.value) {
      existingValue = todoInput.value;
    }
  });

  if (
    todoInput.value == "" ||
    !isNaN(parseFloat(todoInput.value)) ||
    existingValue == todoInput.value
  ) {
    alert("invalid input");
  } else {
    //todo div//
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li//
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-square"></i>';
    completedButton.classList.add("check-btn");
    todoDiv.appendChild(completedButton);
    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    /* Edit button */
    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);

    //APPEND TO LIST

    todoList.appendChild(todoDiv);

    //clear todo input
    todoInput.value = "";
  }
}

function deleteCheck(e) {
  const item = e.target;
  //delete Todo
  if (item.classList[0] == "trash-btn") {
    const todo = item.parentElement;
    //Animation
    todo.classList.add("fall");
    //remove item
    todo.addEventListener("transitionend", () => todo.remove());
  }
  if (item.classList[0] == "check-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
  if (item.classList[0] == "edit-btn") {
    let todo = item.parentElement;
    todo.innerHTML = `<input class="todo edit-input"/>`;
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-square"></i>';
    completedButton.classList.add("edit-check");
    todo.appendChild(completedButton);
    completedButton.addEventListener("click", () => {
      let input = document.querySelector(".edit-input");
      let todos = todoList.childNodes;

      console.log(typeof input.value);
      if (input.value == "" || !isNaN(parseFloat(input.value))) {
        alert("invalid input");
        return;
      }
      let existingValue;
      todos.forEach((todo) => {
        let item = todo.childNodes;
        item.forEach((element) => {
          if (element.innerText == input.value) {
            existingValue = element.innerText;
            alert("Todo is exist");
          }
        });
      });

      if (input.value != existingValue && input.value != "")
        todo.innerHTML = `
      <li class="todo-item">${input.value}</li>
      <button class="check-btn"><i class="fas fa-check-square"></i></button>
      <button class="trash-btn"><i class="fas fa-trash"></i></button>
      <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
      `;
    });
  }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else todo.style.display = "none";
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else todo.style.display = "none";
    }
  });
}

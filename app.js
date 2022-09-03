const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".submit-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

class Todo {
  constructor(task, date) {
    this.task = task;
    this.date = date;
  }
}
//event listener
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
window.addEventListener("load", getItemsFromLocal);

function getItemsFromLocal() {
  console.log(localStorage.getItem("todos"));
  if (localStorage.getItem("todos") == null) return;
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((todo) => {
    if (todo == "") return;
    addTodo(null, todo);
  });
}

function addTodo(_event, todoTask = todoInput.value) {
  let existingValue;
  //defined existing Value
  if (localStorage.getItem("todos")) {
    let oldData = JSON.parse(localStorage.getItem("todos"));
    oldData.forEach((item) => {
      if (item == todoInput.value) {
        existingValue = todoTask;
      }
    });
  }

  if (todoTask == "" || !isNaN(+todoTask) || existingValue == todoTask) {
    alert("invalid input");
    return;
  }

  //todo div//
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create li//
  const newTodo = document.createElement("li");
  newTodo.innerText = todoTask;
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

  if (localStorage.getItem("todos") == null) {
    console.log(!!todoInput.value);
    localStorage.setItem("todos", JSON.stringify([todoInput.value]));
  } else {
    let oldData = JSON.parse(localStorage.getItem("todos"));
    console.log(!!todoInput.value);
    if (!!todoInput.value || todoInput.value != "") {
      oldData.push(todoInput.value);
      localStorage.setItem("todos", JSON.stringify(oldData));
    }
  }

  //clear todo input
  todoInput.value = "";
}

function deleteCheck(e) {
  const item = e.target;
  //delete Todo
  if (item.classList[0] == "trash-btn") {
    const todo = item.parentElement;
    let oldData = JSON.parse(localStorage.getItem("todos"));
    console.log(oldData);
    oldData = oldData.filter((data) => data != todo.childNodes[0].innerText);
    console.log(oldData);
    localStorage.setItem("todos", JSON.stringify(oldData));

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

      if (!input.value || !isNaN(+input.value)) {
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

/*  */
/*   */

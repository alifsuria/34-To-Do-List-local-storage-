const form = document.getElementById("form");
const taskList = document.getElementById("task-list");
const input = document.getElementById("input");
document.addEventListener("DOMContentLoaded", displayLocalStorage);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = input.value;
  if (inputValue === "" || inputValue.length < 0) {
    alert("NONE");
  } else {
    addTask(inputValue);
    getLocalStorage(inputValue);
  }
  console.log(localStorage);
  input.value = "";
});

taskList.addEventListener("click", (event) => {
  event.preventDefault();
  let target = event.target;

  if (target.classList.contains("delete")) {
    let parentElement = event.target.parentElement;
    let elementName = event.target.previousElementSibling.textContent;

    taskList.removeChild(parentElement);
    removeSingleItemFromLocalStorage(elementName);
  }
  console.log(target);
});

function removeSingleItemFromLocalStorage(itemName) {
  let storage = JSON.parse(localStorage.getItem("task"));
  let index = storage.indexOf(itemName);

  storage.splice(index, 1);
  localStorage.removeItem("task");
  localStorage.setItem("task", JSON.stringify(storage));
}

function getLocalStorage(itemName) {
  let task = localStorage.getItem("task");
  if (task === null || task === "undefined") {
    task = [];
  } else {
    task = JSON.parse(localStorage.getItem("task"));
  }

  task.push(itemName);
  localStorage.setItem("task", JSON.stringify(task));
}

function displayLocalStorage() {
  let task = localStorage.getItem("task");

  if (task) {
    let storage = JSON.parse(localStorage.getItem("task"));

    storage.forEach((item) => {
      addTask(item);
      console.log(item);
    });
  }
}

function addTask(itemName) {
  const div = document.createElement("div");
  div.classList.add("task-item", "my-3");
  div.innerHTML = `<span>${itemName}</span><button type="button" class="delete btn btn-warning">Delete</button>`;
  taskList.appendChild(div);
}

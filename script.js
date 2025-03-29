const taskInput = document.getElementById("text");
const addBtn = document.getElementById("add");
const resetBtn = document.getElementById("reset");
const filterSelect = document.getElementById("filter");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addBtn.addEventListener("click", addTask);
resetBtn.addEventListener("click", resetTasks);
filterSelect.addEventListener("change", filterTasks);

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText == "") {
    alert("Please enter a task");
    return;
  }
  const task = {
    text: taskText,
    completed: false,
  };
  tasks.push(task);
  taskInput.value = "";
  saveTasks();
  loadTasks();
}

function toggleCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  loadTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  taskList.innerHTML = "";
  if (tasks.length === 0) {
    document.querySelector(".task-container").style.display = "none";
  } else {
    document.querySelector(".task-container").style.display = "block";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.classList.add(task.completed ? "completed" : "active");
      li.innerHTML = `
        <span class="task-text">${task.text}</span>
        <button onClick="toggleCompletion(${index})"${
        task.completed ? "disabled" : ""
      }>${task.completed ? "Completed" : "Completed"}</button>
        <button onClick="editTask(${index})" ${
        task.completed ? "disabled" : ""
      }>Edit</button>
        <button onClick="deleteTask(${index})">Delete</button>
        `;
      taskList.appendChild(li);
    });
  }
}

function editTask(index) {
  const newTaskText = prompt("Edit your task:", tasks[index].text);
  if (newTaskText !== null && newTaskText.trim() !== "") {
    tasks[index].text = newTaskText;
    saveTasks();
    loadTasks();
  }
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    loadTasks();
  }
}

function filterTasks() {
  const filterValue = filterSelect.value;
  const filteredTasks = tasks.filter((task) => {
    if (filterValue === "all") return true;
    if (filterValue === "active" && !task.completed) return true;
    if (filterValue === "completed" && task.completed) return true;
    return false;
  });

  taskList.innerHTML = "";
  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add(task.completed ? "completed" : "active");
    li.innerHTML = `
        <span class="task=text">${task.text}</span>
        <button onClick="toggleCompletion(${index})">${
      task.completed ? "Unmark" : "Completed"
    }</button>
        <button onClick="editTask(${index})">Edit</button>
        <button onClick="deleteTask(${index})">Delete</button>
        `;
    taskList.appendChild(li);
  });
}

function resetTasks() {
  if (confirm("Are you sure want to reset all task?")) {
    tasks = [];
    saveTasks();
    loadTasks();
  }
}
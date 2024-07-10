let taskName = document.getElementById("add-taskName");
 
// Initialize tasks as an empty array or with a default task object
let tasks = [
  {
    taskName: "",
    date: "",
    isDone: false,
  },
];
 
// Try to retrieve tasks from localStorage
let storedTasks = JSON.parse(localStorage.getItem("tasks"));
if (Array.isArray(storedTasks)) {
  tasks = storedTasks;
}
 
function fillTasksOnPage() {
  document.getElementById("tasks").innerHTML = "";
  let index = 0;
  for (let task of tasks) {
    let content = `
      <div id="task-${index}" class="task ${task.isDone ? "bg-green-200" : ""}">
        <div>
          <h4 id="task-name-${index}" class="font-bold uppercase ml-2">${task.taskName}</h4>
          <h6 class="font-light text-xs ml-2 text-gray-500">
            ${task.date} <i class="fa-solid fa-calendar-days"></i>
          </h6>
        </div>
        <div>
          <input
            type="text"
            id="edit-taskName-${index}"
            placeholder="Edit task name"
            value=""
            class="rounded-full px-2 outline-none hidden"
          />
          <button
            onClick="toggleEdit(${index})"
            id="edit-btn-${index}"
            class="edit-btn rounded-full mr-3 bg-blue-500 py-[4px] px-[8px] text-center text-white text-md"
          >
            <i class="fa-solid fa-pen"></i>
          </button>
          <button
            onClick="toggleDone(${index})"
            id="done-btn-${index}"
            class="done-btn rounded-full mr-3 ${task.isDone ? "bg-red-500" : "bg-green-500"} py-[4px] px-[8px] text-center text-white text-md"
          >
            <i class="fa-solid ${task.isDone ? "fa-xmark" : "fa-check"}"></i>
          </button>
          <button
            onClick="deleteObj(${index})"
            id="delete-btn-${index}"
            class="delete-btn rounded-full mr-3 bg-red-700 py-[4px] px-[8px] text-center text-white text-md"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `;
    index++;
    document.getElementById("tasks").innerHTML += content;
  }
  taskName.value = "";
}
 
fillTasksOnPage();
 
document.getElementById("add-btn").addEventListener("click", () => {
  let date = new Date();
  let now = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  let taskObj = {
    taskName: taskName.value,
    date: now,
    isDone: false,
  };
  tasks.push(taskObj);
  let taskString = JSON.stringify(tasks);
  localStorage.setItem("tasks", taskString);
  fillTasksOnPage();
});
 
function deleteObj(index) {
  tasks.splice(index, 1);
  fillTasksOnPage();
}
 
function toggleEdit(index) {
  let editInput = document.getElementById(`edit-taskName-${index}`);
  if (editInput.classList.contains("hidden")) {
    editInput.classList.remove("hidden");
  } else {
    let taskName = editInput.value;
    tasks[index].taskName = taskName;
    editInput.classList.add("hidden");
    fillTasksOnPage();
  }
}
 
function toggleDone(index) {
  tasks[index].isDone = !tasks[index].isDone;
  fillTasksOnPage();
}
 
// Save to local storage on page refresh
window.addEventListener("beforeunload", function (event) {
  let taskString = JSON.stringify(tasks);
  localStorage.setItem("tasks", taskString);
});
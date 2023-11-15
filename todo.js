let tasks = [];

function addTask() {
    const taskInput = document.getElementById("task");
    const priorityInput = document.getElementById("priority");

    const task = taskInput.value;
    const priority = priorityInput.value;

    if (task.trim() === "") {
        alert("할 일을 입력하세요.");
        return;
    }
    tasks.push({ task, priority, completed: false });

    uploadTasks();
    taskInput.value = "";
}

function uploadTasks() {
    const taskList = document.getElementById("taskList");
    const filter = document.getElementById("filter").value;

    taskList.innerHTML = "";

    const filteredTasks = filter === "전체" ? tasks :
        filter === "완료" ? tasks.filter(task => task.completed) :
            tasks.filter(task => !task.completed);

        filteredTasks.forEach(task => {
            const listItem = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", () => toggleCompletion(task));
            
            const textContent = document.createTextNode(`${task.task} - ${task.priority}`);
            
            const editButton = document.createElement("button");
            editButton.innerHTML = "수정";
            editButton.addEventListener("click", () => editTask(task));

            listItem.appendChild(checkbox);
            listItem.appendChild(textContent);
            listItem.appendChild(editButton);
            taskList.appendChild(listItem);
        });
}

function toggleCompletion(task) {
    task.completed = !task.completed;
    uploadTasks();
}

function editTask(task) {
    const newTask = prompt("수정할 내용을 입력하세요:", task.task);
    if (newTask !== null) {
        task.task = newTask;
        uploadTasks();
    }
}
function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onchange = function() {
        if (this.checked) {
            moveTaskToDone(this.parentElement);
        } else {
            moveTaskBackToTodo(this.parentElement);
        }
    };

    const span = document.createElement('span');
    span.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete'; // Add this line
    deleteButton.onclick = function() {
        deleteTask(this.parentElement);
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
    taskInput.value = '';
}

function moveTaskToDone(taskElement) {
    const doneList = document.getElementById('done-list');
    taskElement.classList.add('done');
    doneList.appendChild(taskElement);
}

function moveTaskBackToTodo(taskElement) {
    const taskList = document.getElementById('task-list');
    taskElement.classList.remove('done');
    taskList.appendChild(taskElement);
}

function deleteTask(taskElement) {
    taskElement.remove();
}

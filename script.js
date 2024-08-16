document.addEventListener('DOMContentLoaded', loadTasks);

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
    deleteButton.className = 'delete';
    deleteButton.onclick = function() {
        deleteTask(this.parentElement);
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
    taskInput.value = '';

    saveTasks();
}

function moveTaskToDone(taskElement) {
    const doneList = document.getElementById('done-list');
    taskElement.classList.add('done');
    doneList.appendChild(taskElement);
    saveTasks();
}

function moveTaskBackToTodo(taskElement) {
    const taskList = document.getElementById('task-list');
    taskElement.classList.remove('done');
    taskList.appendChild(taskElement);
    saveTasks();
}

function deleteTask(taskElement) {
    taskElement.remove();
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('task-list');
    const doneList = document.getElementById('done-list');

    const tasks = {
        todo: [],
        done: []
    };

    taskList.querySelectorAll('li').forEach(li => {
        tasks.todo.push({
            text: li.querySelector('span').textContent,
            checked: li.querySelector('input').checked
        });
    });

    doneList.querySelectorAll('li').forEach(li => {
        tasks.done.push({
            text: li.querySelector('span').textContent,
            checked: li.querySelector('input').checked
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    if (!tasks) return;

    const taskList = document.getElementById('task-list');
    const doneList = document.getElementById('done-list');

    tasks.todo.forEach(task => {
        const li = createTaskElement(task.text, task.checked);
        taskList.appendChild(li);
    });

    tasks.done.forEach(task => {
        const li = createTaskElement(task.text, task.checked);
        li.classList.add('done');
        doneList.appendChild(li);
    });
}

function createTaskElement(text, checked) {
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = checked;
    checkbox.onchange = function() {
        if (this.checked) {
            moveTaskToDone(this.parentElement);
        } else {
            moveTaskBackToTodo(this.parentElement);
        }
    };

    const span = document.createElement('span');
    span.textContent = text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete';
    deleteButton.onclick = function() {
        deleteTask(this.parentElement);
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    return li;
}

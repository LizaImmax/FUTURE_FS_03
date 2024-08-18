document.addEventListener('DOMContentLoaded', () => {
    // Load tasks from localStorage
    loadTasks();

    // Add task event listener
    document.getElementById('addTaskBtn').addEventListener('click', addTaskWithDetails);

    // Toggle dark mode
    document.getElementById('toggleDarkMode').addEventListener('click', toggleDarkMode);
});

// Add a new task
function addTaskWithDetails() {
    const taskInput = document.getElementById('taskInput');
    const categoryInput = document.getElementById('taskCategory');
    const priorityInput = document.getElementById('taskPriority');
    const dueDateInput = document.getElementById('taskDueDate');
    
    const taskText = taskInput.value.trim();
    const category = categoryInput.value.trim();
    const priority = priorityInput.value.trim();
    const dueDate = dueDateInput.value.trim();

    if (taskText !== '') {
        const taskList = document.getElementById('taskList');

        const li = document.createElement('li');
        li.className = 'task';

        li.innerHTML = `
            <span>${taskText} - <small>(${category}, ${priority}, Due: ${dueDate})</small></span>
            <button class="deleteBtn">Delete</button>
            <div class="subtasks"></div> <!-- Subtasks container -->
            <input type="text" class="subtaskInput" placeholder="Add a subtask">
            <button class="addSubtaskBtn">Add Subtask</button>
            <div class="progress">Progress: 0%</div>
        `;

        li.querySelector('span').addEventListener('click', toggleComplete);
        li.querySelector('.deleteBtn').addEventListener('click', deleteTask);
        li.querySelector('.addSubtaskBtn').addEventListener('click', () => {
            const subtaskInput = li.querySelector('.subtaskInput');
            if (subtaskInput.value.trim() !== '') {
                addSubtask(li, subtaskInput.value.trim());
                subtaskInput.value = '';
            }
        });

        taskList.appendChild(li);
        taskInput.value = '';
        categoryInput.value = '';
        priorityInput.value = '';
        dueDateInput.value = '';
        saveTasks();
    }
}

// Toggle task completion
function toggleComplete() {
    this.classList.toggle('complete');
    saveTasks();
}

// Delete a task
function deleteTask() {
    this.parentElement.remove();
    saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList .task').forEach(task => {
        tasks.push({
            text: task.querySelector('span').innerText,
            completed: task.querySelector('span').classList.contains('complete')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task';
        li.innerHTML = `
            <span ${task.completed ? 'class="complete"' : ''}>${task.text}</span>
            <button class="deleteBtn">Delete</button>
            <div class="subtasks"></div>
            <input type="text" class="subtaskInput" placeholder="Add a subtask">
            <button class="addSubtaskBtn">Add Subtask</button>
            <div class="progress">Progress: 0%</div>
        `;
        li.querySelector('span').addEventListener('click', toggleComplete);
        li.querySelector('.deleteBtn').addEventListener('click', deleteTask);
        li.querySelector('.addSubtaskBtn').addEventListener('click', () => {
            const subtaskInput = li.querySelector('.subtaskInput');
            if (subtaskInput.value.trim() !== '') {
                addSubtask(li, subtaskInput.value.trim());
                subtaskInput.value = '';
            }
        });

        document.getElementById('taskList').appendChild(li);
    });
}

// Add a subtask
function addSubtask(taskElement, subtaskText) {
    const subtasksContainer = taskElement.querySelector('.subtasks');
    if (!subtasksContainer) {
        const subtasksDiv = document.createElement('div');
        subtasksDiv.className = 'subtasks';
        taskElement.appendChild(subtasksDiv);
    }

    const subtaskDiv = document.createElement('div');
    subtaskDiv.className = 'subtask';
    subtaskDiv.innerHTML = `
        <input type="checkbox">
        <span>${subtaskText}</span>
    `;
    subtasksContainer.appendChild(subtaskDiv);

    subtaskDiv.querySelector('input').addEventListener('change', updateProgress);
}

// Update progress of subtasks
function updateProgress() {
    const taskElement = this.closest('.task');
    const subtasks = taskElement.querySelectorAll('.subtask input');
    const total = subtasks.length;
    const completed = Array.from(subtasks).filter(input => input.checked).length;
    
    const progress = (completed / total) * 100;
    taskElement.querySelector('.progress').innerText = `Progress: ${progress.toFixed(0)}%`;
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

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
        `;
        li.querySelector('span').addEventListener('click', toggleComplete);
        li.querySelector('.deleteBtn').addEventListener('click', deleteTask);
        document.getElementById('taskList').appendChild(li);
    });
}

// Call loadTasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);

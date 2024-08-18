// Create a new task with category, priority, and due date
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
        `;

        li.querySelector('span').addEventListener('click', toggleComplete);
        li.querySelector('.deleteBtn').addEventListener('click', deleteTask);

        taskList.appendChild(li);
        taskInput.value = '';
        categoryInput.value = '';
        priorityInput.value = '';
        dueDateInput.value = '';
        saveTasks();
    }
}

// Add a subtask to a task
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

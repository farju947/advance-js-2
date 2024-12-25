let taskCount = 0;
let completedCount = 0;

function addTask() {
    const taskInput = document.getElementById('task');
    const taskText = taskInput.value;
    if (taskText === '') return;

    taskCount++;
    const date = new Date().toLocaleDateString();
    const taskList = document.getElementById('task-list');
    const row = document.createElement('tr');
    
    // Assigning a unique id to each task
    row.setAttribute('data-id', taskCount);

    row.innerHTML = `
        <td>${taskCount}</td>
        <td><span class="task-text">${taskText}</span></td>
        <td>${date}</td>
        <td class="status" onclick="toggleStatus(this)">✔️</td>
        <td class="delete" onclick="deleteTask(this)">❌</td>
        <td class="edit" onclick="editTask(this)">✏️</td>
    `;
    taskList.appendChild(row);

    taskInput.value = '';
    updateCounter();
}

function toggleStatus(el) {
    const row = el.parentElement; // Get the whole row (tr) of the task
    const taskText = row.querySelector('.task-text');
    
    if (el.textContent === '✔️') {
        // Strike-through line added for completed tasks
        row.style.textDecoration = 'line-through'; // Apply line-through to the entire row
        el.style.color = 'blue'; // Change color when completed
        completedCount++;
    } else {
        row.style.textDecoration = 'none';  // Remove line-through for pending tasks
        el.style.color = 'green'; // Change color when not completed
        completedCount--;
    }
    updateCounter();
}

function deleteTask(el) {
    const row = el.parentElement;
    const status = row.querySelector('.status').textContent;
    if (status === '✔️') completedCount--;
    taskCount--;
    row.remove();
    updateCounter();
}

function editTask(el) {
    const row = el.parentElement;
    const taskText = row.querySelector('.task-text');
    const currentText = taskText.textContent;

    // Create an input field to edit the task
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = currentText;
    inputField.classList.add('p-2', 'border', 'border-gray-300', 'rounded-md', 'w-full');

    // Replace the task text with the input field
    taskText.innerHTML = '';
    taskText.appendChild(inputField);

    // Change edit icon to save icon (now using 💾 instead of ✔️)
    el.innerHTML = '💾';

    // Save the changes
    el.onclick = function () {
        const newText = inputField.value;
        taskText.textContent = newText;

        // Change save icon back to edit (now using ✏️ instead of 💾)
        el.innerHTML = '✏️';

        // Update the edit functionality to be used again
        el.onclick = function () {
            editTask(el);
        };
    };
}

function updateCounter() {
    const counter = document.querySelector('.counter');
    counter.textContent = `${taskCount} Total, ${completedCount} Completed, ${taskCount - completedCount} Pending`;
}

document.addEventListener('DOMContentLoaded', function() {
    let taskCount = 0;
    let completedCount = 0;

    // Add task function
    function addTask() {
        const taskInput = document.getElementById('task');
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        taskCount++;
        const date = new Date().toLocaleDateString();
        const taskList = document.getElementById('task-list');
        const row = document.createElement('tr');
        
        row.setAttribute('data-id', taskCount);

        row.innerHTML = `
            <td>${taskCount}</td>
            <td><span class="task-text">${taskText}</span></td>
            <td>${date}</td>
            <td class="status" onclick="toggleStatus(this)">✔️ Incomplete</td>
            <td class="delete" onclick="deleteTask(this)">❌</td>
            <td class="edit" onclick="editTask(this)">✏️</td>
        `;
        taskList.appendChild(row);

        taskInput.value = '';
        updateCounter();
    }

    // Toggle task status between completed and pending
    function toggleStatus(el) {
        const row = el.parentElement;

        if (el.textContent.includes('Incomplete')) {
            // Mark as completed
            el.textContent = '✔️ Completed'; // Change text to Completed
            el.style.color = 'blue'; // Change text color for completed
            row.style.textDecoration = 'line-through'; // Add line-through
            completedCount++;
        } else {
            // Mark as incomplete
            el.textContent = '✔️ Incomplete'; // Change text back to Incomplete
            el.style.color = 'green'; // Change text color back to green
            row.style.textDecoration = 'none'; // Remove line-through
            completedCount--;
        }
        updateCounter();
    }

    // Delete task function
    function deleteTask(el) {
        const row = el.parentElement;
        const status = row.querySelector('.status').textContent;
        if (status.includes('Completed')) completedCount--;
        taskCount--;
        row.remove();
        updateCounter();
    }

    // Edit task function
    function editTask(el) {
        const row = el.parentElement;
        const taskText = row.querySelector('.task-text');
        const currentText = taskText.textContent;

        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = currentText;
        inputField.classList.add('p-2', 'border', 'border-gray-300', 'rounded-md', 'w-full');

        taskText.innerHTML = '';
        taskText.appendChild(inputField);

        el.innerHTML = '💾';

        el.onclick = function () {
            const newText = inputField.value;
            taskText.textContent = newText;

            el.innerHTML = '✏️';

            el.onclick = function () {
                editTask(el);
            };
        };
    }

    // Update task counter function
    function updateCounter() {
        const counter = document.querySelector('.counter');
        counter.textContent = `${taskCount} Total, ${completedCount} Completed, ${taskCount - completedCount} Pending`;
    }

    // Event listener for add task button
    const addTaskBtn = document.getElementById('add-task-btn');
    addTaskBtn.addEventListener('click', addTask);

    // Expose functions to global scope
    window.toggleStatus = toggleStatus;
    window.deleteTask = deleteTask;
    window.editTask = editTask;
});

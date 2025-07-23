// === DOM Element Selection ===
const taskForm = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const filterControls = document.querySelector('.filter-controls');
const totalTasksStat = document.getElementById('total-tasks');
const completedTasksStat = document.getElementById('completed-tasks');
const pendingTasksStat = document.getElementById('pending-tasks');
const emptyState = document.getElementById('empty-state');
const themeToggleBtn = document.getElementById('theme-toggle');

// === Global State ===
let tasks = [];
let currentFilter = 'all';

// === Core Functions ===

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    let filteredTasks = tasks;
    if (currentFilter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    taskList.innerHTML = '';

    if (filteredTasks.length === 0) {
        emptyState.classList.remove('hidden');
        taskList.classList.add('hidden');
    } else {
        emptyState.classList.add('hidden');
        taskList.classList.remove('hidden');
    }

    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskItem.dataset.id = task.id;

        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-title">${task.title}</span>
            <button class="delete-btn">🗑️</button>
        `;
        taskList.appendChild(taskItem);
    });
}

function updateStats() {
    const totalTasks = tasks.length;
    const completedCount = tasks.filter(task => task.completed).length;
    const pendingCount = totalTasks - completedCount;

    totalTasksStat.textContent = totalTasks;
    completedTasksStat.textContent = completedCount;
    pendingTasksStat.textContent = pendingCount;
}

function updateUI() {
    renderTasks();
    updateStats();
    saveTasks();
}

function addTask(title) {
    if (!title) {
        alert("Oops! You can't add an empty task.");
        return;
    }
    const newTask = {
        id: Date.now(),
        title: title,
        completed: false
    };
    tasks.push(newTask);
}

function deleteTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
    }
}

function toggleComplete(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
    }
}

// === Event Listeners ===

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTitle = taskInput.value.trim();
    addTask(newTitle);
    taskInput.value = '';
    updateUI();
});

taskList.addEventListener('click', (e) => {
    const target = e.target;

    if (target.matches('.edit-input') || target.closest('.editing')) {
        return;
    }

    const taskItem = target.closest('.task-item');
    if (!taskItem) return;

    const taskId = Number(taskItem.dataset.id);
    let actionTaken = false;

    if (target.matches('.delete-btn')) {
        deleteTask(taskId);
        actionTaken = true;
    }
    else if (target.matches('.task-checkbox')) {
        toggleComplete(taskId);
        actionTaken = true;
    }

    if (actionTaken) {
        updateUI();
    }
});

filterControls.addEventListener('click', (e) => {
    if (e.target.matches('.filter-btn')) {
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        renderTasks();
    }
});

taskList.addEventListener('dblclick', (e) => {
    const target = e.target;
    if (target.matches('.task-title')) {
        const taskItem = target.closest('.task-item');
        if (taskItem.classList.contains('editing')) return;
        
        taskItem.classList.add('editing');
        
        const taskId = Number(taskItem.dataset.id);
        const currentTitle = target.textContent;

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = currentTitle;

        target.replaceWith(editInput);
        editInput.focus();
        editInput.select();

        const finishEdit = (shouldSave) => {
            taskItem.classList.remove('editing');
            
            if (shouldSave) {
                const newTitle = editInput.value.trim();
                const task = tasks.find(t => t.id === taskId);
                if (task && newTitle) {
                    task.title = newTitle;
                }
            }
            updateUI();
        };

        editInput.addEventListener('blur', () => finishEdit(true));
        editInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                finishEdit(true);
            } else if (event.key === 'Escape') {
                finishEdit(false);
            }
        });
    }
});

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    // Save theme preference and update icon
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = '🌞'; // Sun icon for switching to light
    } else {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.innerHTML = '<img src="moon.png" alt="Moon" style="width: 20px; height: 20px;">'; // Moon icon for switching to dark
    }
});


// === Initial Load ===
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggleBtn.textContent = '🌞';
    } else {
        document.body.classList.remove('dark-theme');
        themeToggleBtn.innerHTML = '<img src="moon.png" alt="Moon" style="width: 20px; height: 20px;">';
    }

    // Load saved tasks
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    
    // Initial UI render
    updateUI();
});
document.addEventListener('DOMContentLoaded', () => {
    const daysElement = document.getElementById('days');
    const monthYearElement = document.getElementById('month-year');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const taskListElement = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task');
    const selectedDateElement = document.getElementById('selected-date');

    const taskModal = document.getElementById('task-modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const taskForm = document.getElementById('task-form');
    const taskText = document.getElementById('task-text');
    const taskTime = document.getElementById('task-time');

    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectedDate = formatDate(today);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    function renderCalendar(month, year) {
        daysElement.innerHTML = '';
        monthYearElement.textContent = `${months[month]} ${year}`;

        const firstDayIndex = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const prevMonthDays = new Date(year, month, 0).getDate();
        const totalDays = firstDayIndex + daysInMonth;

        for (let i = 0; i < totalDays; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');

            if (i < firstDayIndex) {
                dayElement.classList.add('inactive');
                dayElement.textContent = prevMonthDays - firstDayIndex + i + 1;
            } else {
                const day = i - firstDayIndex + 1;
                dayElement.textContent = day;

                const date = new Date(year, month, day);
                dayElement.addEventListener('click', () => {
                    selectedDate = formatDate(date);
                    selectedDateElement.textContent = selectedDate;
                    renderTasks();
                });

                if (
                    day === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear()
                ) {
                    dayElement.classList.add('current-day');
                }
            }

            daysElement.appendChild(dayElement);
        }
    }

    function formatDate(date) {
        const d = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        return d.toISOString().split('T')[0];
    }

    function getTasksForDate(date) {
        const tasks = localStorage.getItem(date);
        return tasks ? JSON.parse(tasks) : [];
    }

    function saveTasksForDate(date, tasks) {
        localStorage.setItem(date, JSON.stringify(tasks));
    }

    function renderTasks() {
        taskListElement.innerHTML = '';
        const tasks = getTasksForDate(selectedDate);

        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            if (task.completed) {
                taskItem.classList.add('completed');
            }

            const taskText = document.createElement('div');
            taskText.textContent = `${task.text} at ${task.time}`;
            taskItem.appendChild(taskText);

            const taskButtons = document.createElement('div');
            taskButtons.classList.add('task-buttons');

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.addEventListener('click', () => {
                toggleTaskCompletion(selectedDate, index);
            });

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
                editTask(selectedDate, index);
            });

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                removeTask(selectedDate, index);
            });

            taskButtons.appendChild(completeButton);
            taskButtons.appendChild(editButton);
            taskButtons.appendChild(removeButton);

            taskItem.appendChild(taskButtons);
            taskListElement.appendChild(taskItem);
        });
    }

    function toggleTaskCompletion(date, index) {
        const tasks = getTasksForDate(date);
        tasks[index].completed = !tasks[index].completed;
        saveTasksForDate(date, tasks);
        renderTasks();
    }

    function editTask(date, index) {
        const tasks = getTasksForDate(date);
        taskText.value = tasks[index].text;
        taskTime.value = tasks[index].time;
        taskForm.dataset.editIndex = index;
        taskModal.style.display = 'block';
    }

    function removeTask(date, index) {
        const tasks = getTasksForDate(date);
        tasks.splice(index, 1);
        saveTasksForDate(date, tasks);
        renderTasks();
    }

    addTaskButton.addEventListener('click', () => {
        taskText.value = '';
        taskTime.value = '';
        delete taskForm.dataset.editIndex;
        taskModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        taskModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === taskModal) {
            taskModal.style.display = 'none';
        }
    });

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const tasks = getTasksForDate(selectedDate);
        const task = {
            text: taskText.value,
            time: taskTime.value,
            completed: false
        };

        if (taskForm.dataset.editIndex !== undefined) {
            tasks[taskForm.dataset.editIndex] = task;
        } else {
            tasks.push(task);
        }

        saveTasksForDate(selectedDate, tasks);
        taskModal.style.display = 'none';
        renderTasks();
    });

    prevButton.addEventListener('click', () => changeMonth(-1));
    nextButton.addEventListener('click', () => changeMonth(1));

    function changeMonth(increment) {
        currentMonth += increment;

        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        } else if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }

        renderCalendar(currentMonth, currentYear);
    }

    renderCalendar(currentMonth, currentYear);
    selectedDateElement.textContent = selectedDate;
    renderTasks();
});


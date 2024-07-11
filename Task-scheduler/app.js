document.addEventListener('DOMContentLoaded', () => {
    const daysElement = document.getElementById('days');
    const monthYearElement = document.getElementById('month-year');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const addTaskButton = document.getElementById('add-task');
    const taskListElement = document.getElementById('task-list');
    const taskModal = document.getElementById('task-modal');
    const taskForm = document.getElementById('task-form');
    const taskText = document.getElementById('task-text');
    const taskTime = document.getElementById('task-time');

    let currentMonth;
    let currentYear;
    let selectedDate;
    let tasks = [];

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

                if (
                    day === new Date().getDate() &&
                    month === new Date().getMonth() &&
                    year === new Date().getFullYear()
                ) {
                    dayElement.classList.add('current-day');
                }

                dayElement.addEventListener('click', () => {
                    selectedDate = `${year}-${month + 1}-${day}`;
                    renderTasks();
                });
            }

            daysElement.appendChild(dayElement);
        }
    }

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

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => changeMonth(-1));
        nextButton.addEventListener('click', () => changeMonth(1));
    }

    if (addTaskButton) {
        addTaskButton.addEventListener('click', () => {
            openModal();
        });
    }

    function openModal(task = null, index = null) {
        taskText.value = task ? task.text : '';
        taskTime.value = task ? task.time : '';

        if (taskForm) {
            taskForm.onsubmit = (e) => {
                e.preventDefault();
                const text = taskText.value;
                const time = taskTime.value;
                const color = getRandomColor();

                if (task) {
                    tasks[index] = { text, time, color, completed: task.completed };
                } else {
                    tasks.push({ text, time, color, completed: false });
                }

                saveTasks();
                renderTasks();
                closeModal();
            };
        }

        if (taskModal) {
            taskModal.style.display = 'block';
        }
    }

    function closeModal() {
        if (taskModal) {
            taskModal.style.display = 'none';
            taskForm.reset();
        }
    }

    function renderTasks() {
        tasks = JSON.parse(localStorage.getItem(selectedDate)) || [];
        if (taskListElement) {
            taskListElement.innerHTML = '';
    
            tasks.forEach((task, index) => {
                const taskItem = document.createElement('li');
                taskItem.classList.add('task-item');
                if (task.completed) {
                    taskItem.classList.add('completed');
                }
                taskItem.style.backgroundColor = task.color;
    
                const taskTimeElement = document.createElement('div');
                taskTimeElement.classList.add('task-time');
                taskTimeElement.textContent = formatTime(task.time);
    
                const taskTextElement = document.createElement('div');
                taskTextElement.classList.add('task-text');
                taskTextElement.textContent = task.text;
    
                const taskButtons = document.createElement('div');
                taskButtons.classList.add('task-buttons');
    
                const completeButton = document.createElement('button');
                completeButton.textContent = 'Complete';
                completeButton.addEventListener('click', () => {
                    task.completed = !task.completed;
                    saveTasks();
                    renderTasks();
                });
    
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => {
                    openModal(task, index);
                });
    
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.addEventListener('click', () => {
                    tasks.splice(index, 1);
                    saveTasks();
                    renderTasks();
                });
    
                taskButtons.appendChild(completeButton);
                taskButtons.appendChild(editButton);
                taskButtons.appendChild(removeButton);
    
                taskItem.appendChild(taskTimeElement);
                taskItem.appendChild(taskTextElement);
                taskItem.appendChild(taskButtons);
                taskListElement.appendChild(taskItem);
            });
        }
    }
    
    function formatTime(time) {
        const [hours, minutes] = time.split(':');
        let formattedHours = parseInt(hours, 10);
        const amPm = formattedHours >= 12 ? 'PM' : 'AM';
        formattedHours = formattedHours % 12 || 12; // Convert hour 0 to 12
        return `${formattedHours}:${minutes} ${amPm}`;
    }
    

    function saveTasks() {
        localStorage.setItem(selectedDate, JSON.stringify(tasks));
    }

    function getRandomColor() {
        const colors = ['#FF5733', '#FFC300', '#3CFF33', '#3366FF'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function init() {
        const today = new Date();
        currentMonth = today.getMonth();
        currentYear = today.getFullYear();
        selectedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        renderCalendar(currentMonth, currentYear);
        renderTasks();
    }
    init();
});

    const apiKey = '7493c02c23642b10887000471460c0da'; // Replace with your OpenWeather API key
    async function fetchWeather(latitude, longitude) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    function displayWeather(data) {
        const weatherContainer = document.getElementById('weather-container');
        const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const weatherHTML = `
            <div class="weather-details">
                <h3>Weather in ${data.name}</h3>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            </div>
            <div class="weather-icon">
                <img src="${icon}" alt="Weather icon">
            </div>
        `;
        weatherContainer.innerHTML = weatherHTML;
    }

    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                fetchWeather(latitude, longitude);
            }, (error) => {
                console.error('Error getting location:', error);
                // Fallback to a default location if geolocation fails
                fetchWeather(40.7128, -74.0060); // New York City coordinates
            });
        } else {
            console.error('Geolocation is not supported by this browser.');
            // Fallback to a default location if geolocation is not supported
            fetchWeather(40.7128, -74.0060); // New York City coordinates
        }
    }

    // Fetch weather data when the page loads
    document.addEventListener('DOMContentLoaded', getUserLocation);

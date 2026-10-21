
    const taskInput = document.getElementById("taskInput");
    const addButton = document.getElementById("addButton");
    const taskList = document.getElementById("taskList");

    // Load previously saved tasks
    let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];
    let currentFilter = "all";

    const taskCounter = document.getElementById("taskCounter");
    const allButton = document.getElementById("allButton");
    const activeButton = document.getElementById("activeButton");
    const completedButton = document.getElementById("completedButton");

    // Save tasks in the browser
    function saveTasks() {
        localStorage.setItem("myTasks", JSON.stringify(tasks));
    }

    // Display all tasks
    function renderTasks() {
        taskList.innerHTML = "";
	const completedCount = tasks.filter(
    	function (task) {
        	return task.completed;
    	}
	).length;

	taskCounter.textContent =
    	`Total: ${tasks.length} | Completed: ${completedCount}`;

	const filteredTasks = tasks.filter(function (task) {
    	if (currentFilter === "active") {
        	return !task.completed;
    	}

    	if (currentFilter === "completed") {
        	return task.completed;
    	}

    	return true;
	});
        filteredTasks.forEach(function (task)  {
            const li = document.createElement("li");

            const taskText = document.createElement("span");
            taskText.textContent = task.text;

            if (task.completed) {
                taskText.style.textDecoration = "line-through";
            }

            const completeButton =
                document.createElement("button");
            completeButton.textContent =
                task.completed ? "Undo" : "Complete";

            completeButton.addEventListener("click", function () {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            });

            const deleteButton =
                document.createElement("button");
            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", function () {
                tasks = tasks.filter(function (item) {
                    return item.id !== task.id;
                });

                saveTasks();
                renderTasks();
            });

            li.appendChild(taskText);
            li.appendChild(completeButton);
            li.appendChild(deleteButton);

            taskList.appendChild(li);
        });
    }

    // Add a new task
    addButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        tasks.push({
            id: Date.now(),
            text: taskText,
            completed: false
        });

        saveTasks();
        renderTasks();

        taskInput.value = "";
    });

    	allButton.addEventListener("click", function () {
    	currentFilter = "all";
    	renderTasks();
	});

	activeButton.addEventListener("click", function () {
    	currentFilter = "active";
    	renderTasks();
	});

	completedButton.addEventListener("click", function () {
    	currentFilter = "completed";
    	renderTasks();
	});
    // Show saved tasks when the page opens
    renderTasks();


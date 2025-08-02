let inputField = document.querySelector("input");
let form = document.querySelector("form");
let list = document.querySelector("ul");

// Retrieve tasks from localStorage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to create a button with text and class
function createButton(text, className) {
    let button = document.createElement("button");
    button.textContent = text;
    button.classList.add(className);
    return button;
}

// Function to update localStorage
function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to render the tasks list
function renderTasks() {
    list.innerHTML = ""; // Clear the list
    tasks.forEach((task) => {
        let li = document.createElement("li");
        li.textContent = task;
        list.appendChild(li);
        li.appendChild(createButton("Edit", "edit"));
        li.appendChild(createButton("Delete", "delete"));
    });
}

// Render tasks initially when the page loads
renderTasks();

// Handle form submission
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let inputValue = inputField.value.trim();
    if(!inputValue) return; // Exit if input is empty

    tasks.push(inputValue); // Add task to the array
    updateLocalStorage(); // Update localStorage
    renderTasks(); // Re-render the task list
    inputField.value = "";
});

// Handle button clicks for Edit and Delete
list.addEventListener("click", (event) => {
    if (event.target.nodeName === "BUTTON") {
        let li = event.target.parentElement;
        let taskText = li.firstChild.textContent.trim();
        if (event.target.classList.contains("delete")) {
            // Remove task from array and update localStorage
            tasks = tasks.filter((task) => task !== taskText);
            updateLocalStorage();
            renderTasks();
        } else if (event.target.classList.contains("edit")) {
            // Set input value to the task text and remove it
            inputField.value = taskText;
            tasks = tasks.filter((task) => task !== taskText);
            updateLocalStorage();
            renderTasks();
        }
    }
});

{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((value, index) =>
            (taskIndex === index) ? { ...value, done: !value.done } : value
        )
        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((tasks) => ({
            ...tasks, done: true,
        }));
        render()
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render()
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButtons, index) => {
            toggleDoneButtons.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
      <li class="section__list--item ${task.done && hideDoneTasks ? "section__list--hideItem" : ""} js-task">
      <button class="js-done section__form--buttonDone">${task.done ? "✔" : ""}</button>
      <span class="section__list--text ${task.done ? " section__list--doneItem" : ""}">${task.content}</span>

      <button class="js-remove section__form--buttonRemove">🗑️</button>
      </li>`;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");
        if (tasks.length === 0) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
            <button class="js-hideRemoveButton section__bothButtons">
              ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone  
            </button> 
            <button 
              class="js-finnishAllButton section__bothButtons" 
              ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Ukończ wszystkie
            </button>`;

    };

    const bindButtonsEvents = () => {

        const finnishAllButton = document.querySelector(".js-finnishAllButton");

        if (finnishAllButton) {
            finnishAllButton.addEventListener("click", markAllTasksDone)
        };


        const hideRemoveButton = document.querySelector(".js-hideRemoveButton");
        if (hideRemoveButton) {
            hideRemoveButton.addEventListener("click", toggleHideDoneTasks)
        };

    };

    const render = () => {

        renderTasks();
        renderButtons();
        bindEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskInput = document.querySelector(".js-newTask");
        const newTaskContent = newTaskInput.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskInput.value = "";
        }
        newTaskInput.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
}
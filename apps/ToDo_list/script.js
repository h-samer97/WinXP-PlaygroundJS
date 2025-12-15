class TaskManagerUI {

    constructor() {
        // DOM Elements
        this.inputField     = document.querySelector('.add-task input');
        this.btnAdd         = document.querySelector('.plus');
        this.tasksContainer = document.querySelector('.tasks-content');
        this.taskCount      = document.querySelector('.tasks-count span');
        this.taskCompleted  = document.querySelector('.tasks-completed span');
        this.noTasksDiv     = document.querySelector('.no-tasks-message');

        // Run methods
        this.fetchTasksFromLocalStorage();
        this.registerEvents();
        this.syncTasks();
    }

    fetchTasksFromLocalStorage() {
        const stored = localStorage.getItem('tasks');
        if (stored) {
            let tasks = JSON.parse(stored);

            if (tasks.length > 0 && this.noTasksDiv) this.noTasksDiv.remove();

            tasks.forEach(t => {
                let taskElement = document.createElement('span'),
                    taskText    = document.createTextNode(t.task),
                    taskDelete  = document.createElement('span');

                taskElement.classList.add('task');
                if (t.finished) taskElement.classList.add('finished');

                taskDelete.textContent = 'Delete';
                taskDelete.classList.add('delete');

                taskElement.appendChild(taskText);
                taskElement.appendChild(taskDelete);

                this.tasksContainer.appendChild(taskElement);
            });

            this.updateTaskCount();
            this.updateTaskCountFinished();
        }
    }

    updateTaskCount() {
        let count = this.tasksContainer.querySelectorAll('.task').length;
        this.taskCount.textContent = count;
    }

    updateTaskCountFinished() {
        let finished = this.tasksContainer.querySelectorAll('.task.finished').length;
        this.taskCompleted.textContent = finished;
    }

    registerEvents() {
        window.onload = () => this.inputField.focus();

        // Add task
        this.btnAdd.addEventListener('click', () => {
            if (!this.inputField.value.trim()) {
                alert('Task is Empty -_-');
                return;
            }

            if (document.body.contains(document.querySelector('.no-tasks-message'))) {
                this.noTasksDiv.remove();
            }

            let taskElement = document.createElement('span'),
                taskText    = document.createTextNode(this.inputField.value),
                taskDelete  = document.createElement('span');

            taskElement.classList.add('task');
            taskDelete.textContent = 'Delete';
            taskDelete.classList.add('delete');

            taskElement.appendChild(taskText);
            taskElement.appendChild(taskDelete);

            this.tasksContainer.appendChild(taskElement);

            this.syncTasks();

            this.inputField.value = "";
            this.inputField.focus();
        });

        // Event delegation for delete & toggle
        this.tasksContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('delete')) {
                event.target.parentElement.remove();
                this.syncTasks();
            } else if (event.target.classList.contains('task')) {
                event.target.classList.toggle('finished');
                this.syncTasks();
            }
        });
    }

    updateLocalStorage(tasksArray) {
        if (Array.isArray(tasksArray)) {
            localStorage.setItem('tasks', JSON.stringify(tasksArray));
        }
    }

    syncTasks() {
        let tasks = Array.from(this.tasksContainer.querySelectorAll('.task')).map(task => ({
            task: task.firstChild.nodeValue,
            finished: task.classList.contains('finished')
        }));

        this.updateLocalStorage(tasks);
        this.updateTaskCount();
        this.updateTaskCountFinished();

        if (tasks.length === 0 && !this.tasksContainer.querySelector('.no-tasks-message')) {
            let noTask = document.createElement('span');
            noTask.classList.add('no-tasks-message');
            noTask.textContent = ' No Tasks To Show ';
            this.tasksContainer.appendChild(noTask);
        }
    }
}

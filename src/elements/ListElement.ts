class ListElement {
    title: any;
    tasks: any;
    events: any;
    element: any;


    constructor(data: any) {
        this.title = data.title;
        this.tasks = data.tasks;
        this.events = data.events;
        
        this.createElement()

    }

    createElement() {
        const taskListEl = this.createTaskListEl()
        const titleEl = this.createTitleEl()
        const listEl = this.createListEl()
        const addTaskEl = this.createAddTaskEl()
        const removeButtonEl = this.createDeleteButtonEl()
        
        taskListEl.appendChild(titleEl)
        taskListEl.appendChild(listEl)
        taskListEl.appendChild(addTaskEl)
        taskListEl.appendChild(removeButtonEl)

        this.element = taskListEl
    }

    getElement() {
        return this.element
    }

    createTaskListEl() {
        const taskListEl = document.createElement('div')
        taskListEl.setAttribute('class', 'taskList')

        return taskListEl
    }

    createTitleEl() {
        const titleEl = document.createElement('h1')
        titleEl.innerHTML = this.title

        return titleEl
    }

    createListEl() {
        const listEl = document.createElement('div')
        listEl.setAttribute('class', 'list')

        this.tasks.forEach((task: any) => {
            const taskEl = task.getElement()
            listEl.appendChild(taskEl)
        })

        return listEl
    }

    createAddTaskEl() {
        const addTaksEl = document.createElement('div')
        addTaksEl.setAttribute('class', 'addTask')

        const input = document.createElement('textarea')
        input.setAttribute('placeholder', 'New task description...')
        input.addEventListener('keypress', (event) =>
            this.events.addEvent(
                event,
                input.value
            )
        )

        addTaksEl.appendChild(input)

        return addTaksEl
    }

    createDeleteButtonEl() {
        const deleteButtonEl = document.createElement('span')
        deleteButtonEl.setAttribute('class', 'deleteTaskList material-icons')
        deleteButtonEl.innerHTML = 'delete'
        deleteButtonEl.addEventListener('click', () => this.events.deleteEvent())

        return deleteButtonEl
    }


}

export default ListElement;
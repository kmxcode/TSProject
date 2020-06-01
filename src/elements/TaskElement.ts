class TaskElement {
    description: any;
    events: any;
    element: any;


    constructor(data: any) {
        this.description = data.description;
        this.events = data.events;

        this.createElement()

    }

    createElement() {
        const taskEl = this.createTaskEl()
        const descriptionEl = this.createDescriptionEl()
        const deleteButtonEl = this.createDeleteButtonEl()
        
        taskEl.appendChild(descriptionEl)
        taskEl.appendChild(deleteButtonEl)

        this.element = taskEl
    }

    getElement() {
        return this.element
    }

    createTaskEl() {
        const taskEl = document.createElement('div')
        taskEl.setAttribute('class', 'task')

        return taskEl
    }

    createDescriptionEl() {
        const descriptionEl = document.createElement('p')
        descriptionEl.innerHTML = this.description

        return descriptionEl
    }

    createDeleteButtonEl() {
        const deleteButtonEl = document.createElement('span')
        deleteButtonEl.setAttribute('class', 'deleteTask material-icons')
        deleteButtonEl.innerHTML = 'delete'
        deleteButtonEl.addEventListener('click', () => this.events.deleteEvent())

        return deleteButtonEl
    }


}

export default TaskElement;
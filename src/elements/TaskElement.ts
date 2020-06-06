interface IEventList {
    [propName: string]: (event?: DragEvent | MouseEvent) => void
}

interface ITaskElementData {
    description: string;
    events: IEventList;
}

class TaskElement {
    description: string;
    events: IEventList;
    element: HTMLDivElement;


    constructor(data: ITaskElementData) {
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
        taskEl.setAttribute('draggable', 'true')

        taskEl.addEventListener('dragstart', (event: DragEvent) => this.events.dragStartEvent(event))
        taskEl.addEventListener('dragend', (event: DragEvent) => this.events.dragEndEvent(event))
        taskEl.addEventListener('dragover', (event: DragEvent) => this.events.dragOverEvent(event))
        taskEl.addEventListener('drop', (event: DragEvent) => this.events.dropEvent(event))
        

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
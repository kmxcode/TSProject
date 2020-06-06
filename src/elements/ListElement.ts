import Task from '../components/Task'

interface IEventList {
    [propName: string]: (event?: DragEvent | MouseEvent | KeyboardEvent, input?: string) => void
}

interface IListElementData {
    title: string;
    events: IEventList;
    tasks: Array<Task>
}

class ListElement {
    title: string;
    tasks: Array<Task>;
    events: IEventList;
    element: HTMLDivElement;


    constructor(data: IListElementData) {
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
        titleEl.setAttribute('draggable', 'true')

        titleEl.addEventListener('dragstart', (event: DragEvent) => this.events.dragStartEvent(event))
        titleEl.addEventListener('dragend', (event: DragEvent) => this.events.dragEndEvent(event))
        titleEl.addEventListener('dragover', (event: DragEvent) => this.events.dragOverEvent(event))
        titleEl.addEventListener('drop', (event: DragEvent) => this.events.dropEvent(event))

        return titleEl
    }

    createListEl() {
        const listEl = document.createElement('div')
        listEl.setAttribute('class', 'list')
        listEl.addEventListener('dragover', (event: DragEvent) => this.events.dragTaskOverEvent(event))
        listEl.addEventListener('drop', (event: DragEvent) => this.events.dropTaskEvent(event))

        this.tasks.forEach((task) => {
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
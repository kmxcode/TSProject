import TaskElement from '../elements/TaskElement'
import TaskList from './TaskList';

class Task {
    id: any;
    description: any;
    element: any;
    parent: TaskList;



    constructor(data: any, parent: TaskList) {
        this.id = data.id
        this.parent = parent
        this.description = data.description

        this.createElement()
    }

    createElement() {
        const events = {
            deleteEvent: () => this.delete(),
        }
        const data = {
            description: this.description,
            events: events
        }

        const task = new TaskElement(data)
        this.element = task.getElement()
    }

    getElement() {
        return this.element
    }

    delete() {
        this.parent.deleteTask(this.id)
    }

    update() {
        this.parent.update()
    }

    getData() {
        return {
            id: this.id,
            description: this.description
        }
    }
}

export default Task;
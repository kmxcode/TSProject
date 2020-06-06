import TaskElement from '../elements/TaskElement'
import TaskList from './TaskList';

export interface ITaskData {
    id: number;
    description: string;
}

class Task {
    id: number;
    description: string;
    element: HTMLDivElement;
    parent: TaskList;



    constructor(data: ITaskData, parent: TaskList) {
        this.id = data.id
        this.parent = parent
        this.description = data.description

        this.createElement()
    }

    createElement() {
        const events = {
            deleteEvent: () => this.delete(),
            dragStartEvent: (event: DragEvent) => this.onDragStart(event),
            dragEndEvent: (event: DragEvent) => this.onDragEnd(event),
            dragOverEvent: (event: DragEvent) => this.onDragOver(event),
            dropEvent: (event: DragEvent) => this.onDrop(event),
            
        }
        const data = {
            description: this.description,
            events: events
        }

        const task = new TaskElement(data)
        this.element = task.getElement()
    }

    onDragStart(event: DragEvent) {
        const taskDesc = this.description

        event.dataTransfer.setData('TaskDesc', taskDesc)
    }

    onDragEnd(event: DragEvent) {
        if(event.dataTransfer.dropEffect == 'move') {
            this.delete()
        }
    }

    onDragOver(event: DragEvent) {
        event.preventDefault()
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        const taskDesc = event.dataTransfer.getData('TaskDesc')

        
        this.parent.insertTaskBefore(taskDesc, this.id)
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
import Task, { ITaskData } from "./Task";
import ListElement from "../elements/ListElement";
import KanbanBoard from "./KanbanBoard";

export interface ITaskListData {
    id: number;
    name: string;
    tasks: Array<ITaskData>
}

class TaskList {
    id: number;
    name: string;
    tasks: Array<Task>;
    element: HTMLDivElement;
    parent: KanbanBoard;



    constructor(data: ITaskListData, parent: KanbanBoard) {
        this.id = data.id
        this.name = data.name
        this.parent = parent
        this.tasks = []
        if(data.tasks) {
            data.tasks.forEach((taskData) => {
                const task = new Task(taskData, this)
                this.tasks.push(task)
            });
        }

        this.createElement()
    }


    createElement() {
        const events = {
            deleteEvent: () => this.deleteEvent(),
            addEvent: (event: KeyboardEvent, value: string) => this.addEvent(event, value),
            dragStartEvent: (event: DragEvent) => this.onDragStart(event),
            dragEndEvent: (event: DragEvent) => this.onDragEnd(event),
            dragOverEvent: (event: DragEvent) => this.onDragOver(event),
            dropEvent: (event: DragEvent) => this.onDrop(event),
        }

        const data = {
            title: this.name,
            tasks: this.tasks,
            events: events,
        }

        const list = new ListElement(data)
        this.element = list.getElement()
    }
    
    onDragStart(event: DragEvent) {
        const taskListData = JSON.stringify(
            this.getData()
        )

        event.dataTransfer.setData('TaskList', taskListData)
    }

    onDragEnd(event: DragEvent) {
        if(event.dataTransfer.dropEffect == 'move') {
            this.deleteEvent()
        }
    }

    onDragOver(event: DragEvent) {
        event.preventDefault()
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        const taskListData = JSON.parse(
            event.dataTransfer.getData('TaskList')
        )
        
        this.parent.insertTaskListBefore(taskListData, this.id)
    }

    getElement() {
        return this.element
    }

    deleteEvent() {
        this.deleteTaskList(this.id)
    }

    deleteTaskList(id: number) {
        this.parent.deleteTaskList(id)
    }

    addEvent(event: KeyboardEvent, value: string) {
        if(event.code == 'Enter') {
            this.createNewTask(value)
        }
    }

    createNewTask(desc: string) {
        const newTask = new Task({
            id: this.getId(),
            description: desc
        }, this) 

        this.addNewTask(newTask)
    }

    addNewTask(task: Task) {
        this.tasks.push(task)
        this.update()
    }

    insertTaskBefore(desc: string, beforeTaskId: number) {
        const task = new Task({
            id: this.getId(),
            description: desc
        }, this)

        const taskIndex = this.tasks.findIndex(
            (task) => task.id == beforeTaskId
        )

        this.tasks.splice(taskIndex, 0, task)
    }

    deleteTask(taskId: number) {
        this.tasks = this.tasks.filter((task: Task) =>
            task.id !== taskId
        )
        this.update()
    }

    getId() {
        return Math.floor(
            Math.random() * 10000
        )
    }

    update() {
        this.parent.update()
    }

    getData() {
        return {
            id: this.id,
            name: this.name,
            tasks: this.tasks.map((task: Task) =>
                task.getData()    
            )
        }
    }
}

export default TaskList;
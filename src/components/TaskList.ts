import Task from "./Task";
import ListElement from "../elements/ListElement";
import KanbanBoard from "./KanbanBoard";

class TaskList {
    id: any;
    name: any;
    tasks: any;
    element: any;
    parent: KanbanBoard;



    constructor(data: any, parent: KanbanBoard) {
        this.id = data.id
        this.name = data.name
        this.parent = parent
        this.tasks = []
        if(data.tasks) {
            data.tasks.forEach((taskData: any) => {
                const task = new Task(taskData, this)
                this.tasks.push(task)
            });
        }

        this.createElement()
    }


    createElement() {
        const events = {
            deleteEvent: () => this.deleteEvent(),
            addEvent: (event: any, value: any) => this.addEvent(event, value)
        }

        const data = {
            title: this.name,
            tasks: this.tasks,
            events: events,
        }

        const list = new ListElement(data)
        this.element = list.getElement()
        console.log(this.element)
    }

    getElement() {
        return this.element
    }

    deleteEvent() {
        this.deleteTaskList(this.id)
    }

    deleteTaskList(id: any) {
        this.parent.deleteTaskList(id)
    }

    addEvent(event: any, value: any) {
        if(event.code == 'Enter') {
            this.createNewTask(value)
        }
    }

    createNewTask(desc: any) {
        const newTask = new Task({
            id: this.getId(),
            description: desc
        }, this) 
        console.log(this.getId())

        this.addNewTask(newTask)
    }

    addNewTask(task: any) {
        this.tasks.push(task)
        this.update()
    }


    deleteTask(taskId: any) {
        this.tasks = this.tasks.filter((task: any) =>
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
            tasks: this.tasks.map((task: any) =>
                task.getData()    
            )
        }
    }
}

export default TaskList;
import TaskList from "./TaskList";
import BoardElement from "../elements/BoardElement";
import KanbanApp from "./KanbanApp";


class KanbanBoard {
    id: any;
    name: any;
    taskLists: any;
    element: any;
    parent: KanbanApp;



    constructor(data: any, parent: KanbanApp) {
        this.id = data.id
        this.name = data.name
        this.parent = parent
        this.taskLists = []
        if(data.taskLists) {
            data.taskLists.forEach((taskListData: any) => {
                const taskList = new TaskList(taskListData, this)
                this.taskLists.push(taskList)
            });
        }

        this.createElement()
    }


    createElement() {
        const events = {
            addEvent: (event: any, value: any) => this.addEvent(event, value)
        }

        const data = {
            title: this.name,
            taskLists: this.taskLists,
            events: events,
        }


        const board = new BoardElement(data)
        this.element = board.getElement()
    }

    getElement() {
        return this.element
    }

    addEvent(event: any, value: any) {
        if(event.code == 'Enter') {
            this.createNewTaskList(value)
        }
    }

    createNewTaskList(name: any) {
        const newTaskList = new TaskList({
            id: this.getId(),
            name: name
        }, this)

        this.addNewTaskList(newTaskList)
    }

    addNewTaskList(taskList: any) {
        this.taskLists.push(taskList)
        this.update()
    }

    deleteTaskList(taskListId: any) {
        this.taskLists = this.taskLists.filter((taskList: any) =>
            taskList.id !== taskListId
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
            taskLists: this.taskLists.map((taskList: any) =>
                taskList.getData()    
            )
        }
    }
}

export default KanbanBoard;
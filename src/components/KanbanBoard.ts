import TaskList, { ITaskListData } from "./TaskList";
import BoardElement from "../elements/BoardElement";
import KanbanApp from "./KanbanApp";

interface IBoardData {
    id: number;
    name: string;
    taskLists: Array<ITaskListData>
}

class KanbanBoard {
    id: number;
    name: string;
    taskLists: Array<TaskList>;
    element: HTMLDivElement;
    parent: KanbanApp;




    constructor(data: IBoardData, parent: KanbanApp) {
        this.id = data.id
        this.name = data.name
        this.parent = parent
        this.taskLists = []
        if(data.taskLists) {
            data.taskLists.forEach((taskListData) => {
                const taskList = new TaskList(taskListData, this)
                this.taskLists.push(taskList)
            });
        }

        this.createElement()
    }


    createElement() {
        const events = {
            addEvent: (event: KeyboardEvent, value: string) => this.addEvent(event, value)
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

    addEvent(event: KeyboardEvent, value: string) {
        if(event.code == 'Enter') {
            this.createNewTaskList(value)
        }
    }

    createNewTaskList(name: string) {
        const newTaskList = new TaskList({
            id: this.getId(),
            name: name,
            tasks: []
        }, this)

        this.addNewTaskList(newTaskList)
    }

    addNewTaskList(taskList: TaskList) {
        this.taskLists.push(taskList)
        this.update()
    }

    insertTaskListBefore(taskListData: ITaskListData, beforeTaskListId: number) {
        const taskList = new TaskList({
            id: this.getId(),
            name: taskListData.name,
            tasks: taskListData.tasks
        }, this)

        const taskListIndex = this.taskLists.findIndex(
            (taskList) => taskList.id == beforeTaskListId
        )

        this.taskLists.splice(taskListIndex, 0, taskList)
    }

    deleteTaskList(taskListId: number) {
        this.taskLists = this.taskLists.filter((taskList) =>
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
            taskLists: this.taskLists.map((taskList) =>
                taskList.getData()    
            )
        }
    }
}

export default KanbanBoard;
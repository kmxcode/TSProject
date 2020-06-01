import KanbanBoard from './KanbanBoard';
import DomService from '../services/DomService';
import StorageService from '../services/StorageService';

class KanbanApp {
    board: any
    rootElement: any;

    constructor() {
        this.addNewTaskList()
    }

    addNewTaskList() {

        const data = this.getData()

        this.board = new KanbanBoard(data, this)
        this.rootElement = document.getElementById('root')
        const boardEl = this.board.getElement()

        DomService.render(
            boardEl,
            this.rootElement
        )
    }


    update() {
        const boardData = this.board.getData()
        this.board = new KanbanBoard(boardData, this)
        const boardEl = this.board.getElement()

        DomService.render(
            boardEl,
            this.rootElement
        )

        StorageService.save(
            boardData
        )
    }

    getData() {
        return StorageService.getData() !== null
            ? StorageService.getData()
            : {
                id: 0,
                name: 'Kanban Board',
                taskLists: null
            }
    }
}

export default KanbanApp;
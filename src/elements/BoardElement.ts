class BoardElement {
    title: any;
    taskLists: any;
    events: any;
    element: any;


    constructor(data: any) {
        this.title = data.title;
        this.taskLists = data.taskLists;
        this.events = data.events;
        
        this.createElement()

    }

    createElement() {
        const boardEl = this.createBoardEl()
        const titleEl = this.createTitleEl()
        const listEl = this.createBoardContainerEl()
        const addTaskEl = this.createAddTaskListEl()

        boardEl.appendChild(titleEl)
        listEl.appendChild(addTaskEl)
        boardEl.appendChild(listEl)

        this.element = boardEl
    }

    getElement() {
        return this.element
    }

    createBoardEl() {
        const boardEl = document.createElement('div')
        boardEl.setAttribute('class', 'board')

        return boardEl
    }

    createTitleEl() {
        const titleEl = document.createElement('h1')
        titleEl.innerHTML = this.title

        return titleEl
    }

    createBoardContainerEl() {
        const boardContainerEl = document.createElement('div')
        boardContainerEl.setAttribute('class', 'boardContainer')

        this.taskLists.forEach((task: any) => {
            const taskEl = task.getElement()
            boardContainerEl.appendChild(taskEl)
        });

        return boardContainerEl
    }

    createAddTaskListEl() {
        const addTaksListEl = document.createElement('div')
        addTaksListEl.setAttribute('class', 'addTaksList')

        const input = document.createElement('input')
        input.setAttribute('type', 'text')
        input.setAttribute('placeholder', 'Name...')

        input.addEventListener('keypress', (event) => 
            this.events.addEvent(
                event,
                input.value
            )
        )

        addTaksListEl.appendChild(input)

        return addTaksListEl
    }


}

export default BoardElement;
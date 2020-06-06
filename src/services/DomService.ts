class DomService {

  static render(element: HTMLDivElement, container: HTMLElement) {
    container.innerHTML = ''
    container.appendChild(element)
  }
}

export default DomService
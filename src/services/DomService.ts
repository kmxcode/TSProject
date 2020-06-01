class DomService {

  static render(element: any, container: any) {
    container.innerHTML = ''
    container.appendChild(element)
  }
}

export default DomService
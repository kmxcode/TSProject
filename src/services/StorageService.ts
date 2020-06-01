class StorageService {

    static save(data: any) {
        localStorage.setItem(
            'data',
            JSON.stringify(data)
        )
    }

    static getData() {
        return JSON.parse(
            localStorage.getItem('data')
        )
    }
  }
  
  export default StorageService
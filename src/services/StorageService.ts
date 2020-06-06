class StorageService {

    static save(data: string) {
        localStorage.setItem(
            'data',
            data
        )
    }

    static getData() {
        return JSON.parse(
            localStorage.getItem('data')
        )
    }
  }
  
  export default StorageService
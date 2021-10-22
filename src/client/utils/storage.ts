export class Storage {
    private logs: object[]
    // Use the `Storage` type
    private static instance: Storage
    // Use a private constructor
    private constructor() {
        this.logs = []
    }
    count(): number {
        return this.logs.length
    }
    // Ensure that there is only one instance created
    public static getInstance(): Storage {
        if (!Storage.instance) {
            Storage.instance = new Storage()
        }        
        return Storage.instance
    }
    log(message: string) {
        const timestamp: string = new Date().toISOString()
        this.logs.push(
            { message, timestamp }
        )
        console.log(`${timestamp} - ${message}`)
    }
}
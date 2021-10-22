export default class Logger {

    private logs: object[]

    private static instance: Logger

    // Use a private constructor
    private constructor() {
        this.logs = []
    }

    count(): number {
        return this.logs.length
    }

    // Ensure that there is only one instance created
    public static Instance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger()
        }        
        return Logger.instance
    }

    log(message: string) {
        const timestamp: string = new Date().toISOString()
        this.logs.push(
            { message, timestamp }
        )
        console.log(`${timestamp} - ${message}`)
    }
}
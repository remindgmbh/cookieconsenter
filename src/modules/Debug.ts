import Module from './Module'

/**
 * Writes a string to the console when the module is loaded.
 */
export default class Debug extends Module {

    /** Some info string */
    protected info: string = 'debug'

    /** Initialize with some value */
    public constructor(info: string = 'debug') {
        super()

        this.info = info
    }

    /**
     * This is the API method that will be executed.
     */
    public run(): void {
        console.log(this.info) // Output info
    }
}

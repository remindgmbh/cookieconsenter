import Module from './Module';
/**
 * Writes a string to the console when the module is loaded.
 */
export default class Debug extends Module {
    /** Some info string */
    protected info: string;
    /** Initialize with some value */
    constructor(info?: string);
    /**
     * This is the API method that will be executed.
     */
    run(): void;
}
//# sourceMappingURL=Debug.d.ts.map
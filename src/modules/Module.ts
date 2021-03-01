/**
 * Defines the base class for all modules.
 */
export default abstract class Module {

    /**
     * Method is called by the api to run whatever code is required to enable
     * whatever should be enabled after the consent is given.
     */
    public abstract run(): void
}

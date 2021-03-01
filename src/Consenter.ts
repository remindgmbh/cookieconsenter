import Module from './modules/Module'

/**
 * Defines the string literals that can be used as module keys.
 */
type ModuleKeys = 'marketing' | 'necessary' | 'preference' | 'statistics'

/**
 * Defines the module type where each string literal refers to a
 */
type Modules = { [key in ModuleKeys]: Module[] }

/**
 *
 */
export default class Consenter {

    /**
     * Temporary storage for the potentially already set accept handler
     * before the consenter overwrites it.
     * Used to restore after disabling the consenter.
     */
    protected oldOnAccept?: CallableFunction

    /**
     * The module reference.
     */
    protected modules: Modules = {
        marketing: [],
        necessary: [],
        preference: [],
        statistics: []
    }

    /**
     * Processes the consent decisions from cookiebot and enables
     * scripts based on the possible cookiebot categories.
     */
    protected processConsent(): void {

        if (window.Cookiebot.consent.necessary) {
            for (const module of this.modules.necessary) {
                module.run()
            }
        }

        if (window.Cookiebot.consent.statistics) {
            for (const module of this.modules.statistics) {
                module.run()
            }
        }

        if (window.Cookiebot.consent.marketing) {
            for (const module of this.modules.marketing) {
                module.run()
            }
        }

        if (window.Cookiebot.consent.preferences) {
            for (const module of this.modules.preference) {
                module.run()
            }
        }
    }

    /**
     * Enable the event listeners.
     */
    public enable(): void {

        /**
         * Add the callback for cookiebot accept as per the API
         * https://www.cookiebot.com/en/manual-implementation/
         */
        window.addEventListener('CookiebotOnAccept', this.onAcceptHandler.bind(this), false)

        /* Make a backup of the current function */
        if (window.CookiebotCallback_OnAccept) {
            this.oldOnAccept = window.CookiebotCallback_OnAccept
        }

        /**
         * Define the method called when the user loads the page and already has
         * accepted the cookies as per the API
         * https://www.cookiebot.com/en/manual-implementation/
         */
        window.CookiebotCallback_OnAccept = this.onAcceptHandler.bind(this)
    }

    /**
     * Disable the event listeners.
     */
    public disable(): void {

        /* Remove the listener */
        window.removeEventListener('CookiebotOnAccept', this.onAcceptHandler.bind(this))

        /* Restore to whatever the value was before */
        window.CookiebotCallback_OnAccept = this.oldOnAccept
    }

    /**
     * This is the actual entry point to run the consenter.
     */
    public onAcceptHandler(): void {
        this.processConsent()
    }

    /**
     * Add some module to be run when consent is processed.
     *
     * @param type The consent type for which the module is ment
     * @param module A module implementation to be run
     */
    public addModule(type: ModuleKeys, module: Module): void {
        this.modules[type].push(module)
    }

    /**
     * Removes the given module from the modules that will be executed.
     *
     * @param type The consent type for the module lookup
     * @param module A module to be removed
     * @returns true on success; false if the module could not be found
     */
    public removeModule(type: ModuleKeys, module: Module): boolean {

        /* Get the index of the module; will be -1 when not found */
        const index: number = this.modules[type].indexOf(module)

        /* Array index is starting from 0 */
        if (index > -1) {

            /* Remove module from array */
            this.modules[type].splice(index)

            return true
        }

        return false
    }
}

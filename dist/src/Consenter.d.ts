import Module from './modules/Module';
/**
 * Defines the string literals that can be used as module keys.
 */
declare type ModuleKeys = 'marketing' | 'necessary' | 'preference' | 'statistics';
/**
 * Defines the module type where each string literal refers to a
 */
declare type Modules = {
    [key in ModuleKeys]: Module[];
};
/**
 *
 */
export default class Consenter {
    /**
     * Temporary storage for the potentially already set accept handler
     * before the consenter overwrites it.
     * Used to restore after disabling the consenter.
     */
    protected oldOnAccept?: CallableFunction;
    /**
     * The module reference.
     */
    protected modules: Modules;
    /**
     * Processes the consent decisions from cookiebot and enables
     * scripts based on the possible cookiebot categories.
     */
    protected processConsent(): void;
    /**
     * Enable the event listeners.
     */
    enable(): void;
    /**
     * Disable the event listeners.
     */
    disable(): void;
    /**
     * This is the actual entry point to run the consenter.
     */
    onAcceptHandler(): void;
    /**
     * Add some module to be run when consent is processed.
     *
     * @param type The consent type for which the module is ment
     * @param module A module implementation to be run
     */
    addModule(type: ModuleKeys, module: Module): void;
    /**
     * Removes the given module from the modules that will be executed.
     *
     * @param type The consent type for the module lookup
     * @param module A module to be removed
     * @returns true on success; false if the module could not be found
     */
    removeModule(type: ModuleKeys, module: Module): boolean;
}
export {};
//# sourceMappingURL=Consenter.d.ts.map
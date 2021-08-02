"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var Consenter = /** @class */ (function () {
    function Consenter() {
        /**
         * The module reference.
         */
        this.modules = {
            marketing: [],
            necessary: [],
            preference: [],
            statistics: []
        };
        /**
         * A reference to the bound function used by events.
         */
        this.boundHandler = this.onAcceptHandler.bind(this);
    }
    /**
     * Processes the consent decisions from cookiebot and enables
     * scripts based on the possible cookiebot categories.
     */
    Consenter.prototype.processConsent = function () {
        if (window.Cookiebot.consent.necessary) {
            for (var _i = 0, _a = this.modules.necessary; _i < _a.length; _i++) {
                var module_1 = _a[_i];
                module_1.run();
            }
        }
        if (window.Cookiebot.consent.statistics) {
            for (var _b = 0, _c = this.modules.statistics; _b < _c.length; _b++) {
                var module_2 = _c[_b];
                module_2.run();
            }
        }
        if (window.Cookiebot.consent.marketing) {
            for (var _d = 0, _e = this.modules.marketing; _d < _e.length; _d++) {
                var module_3 = _e[_d];
                module_3.run();
            }
        }
        if (window.Cookiebot.consent.preferences) {
            for (var _f = 0, _g = this.modules.preference; _f < _g.length; _f++) {
                var module_4 = _g[_f];
                module_4.run();
            }
        }
    };
    /**
     * Enable the event listeners.
     */
    Consenter.prototype.enable = function () {
        /**
         * Add the callback for cookiebot accept as per the API
         * https://www.cookiebot.com/en/manual-implementation/
         */
        window.addEventListener('CookiebotOnAccept', this.boundHandler, false);
        /**
         * Add callback for decline
         */
        window.addEventListener('CookiebotOnDecline', this.boundHandler, false);
        /* Make a backup of the current function */
        if (window.CookiebotCallback_OnAccept) {
            this.oldOnAccept = window.CookiebotCallback_OnAccept;
        }
        /**
         * Define the method called when the user loads the page and already has
         * accepted the cookies as per the API
         * https://www.cookiebot.com/en/manual-implementation/
         */
        window.CookiebotCallback_OnAccept = this.boundHandler;
    };
    /**
     * Disable the event listeners.
     */
    Consenter.prototype.disable = function () {
        /* Remove the listeners */
        window.removeEventListener('CookiebotOnAccept', this.boundHandler);
        window.removeEventListener('CookiebotOnDecline', this.boundHandler);
        /* Restore to whatever the value was before */
        window.CookiebotCallback_OnAccept = this.oldOnAccept;
    };
    /**
     * This is the actual entry point to run the consenter.
     */
    Consenter.prototype.onAcceptHandler = function () {
        this.processConsent();
    };
    /**
     * Add some module to be run when consent is processed.
     *
     * @param type The consent type for which the module is ment
     * @param module A module implementation to be run
     */
    Consenter.prototype.addModule = function (type, module) {
        this.modules[type].push(module);
    };
    /**
     * Removes the given module from the modules that will be executed.
     *
     * @param type The consent type for the module lookup
     * @param module A module to be removed
     * @returns true on success; false if the module could not be found
     */
    Consenter.prototype.removeModule = function (type, module) {
        /* Get the index of the module; will be -1 when not found */
        var index = this.modules[type].indexOf(module);
        /* Array index is starting from 0 */
        if (index > -1) {
            /* Remove module from array */
            this.modules[type].splice(index);
            return true;
        }
        return false;
    };
    return Consenter;
}());
exports.default = Consenter;
//# sourceMappingURL=Consenter.js.map
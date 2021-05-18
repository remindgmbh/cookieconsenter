"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Module_1 = __importDefault(require("./Module"));
/**
 * Enables all youtube videos.
 */
var YouTube = /** @class */ (function (_super) {
    __extends(YouTube, _super);
    function YouTube() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    YouTube.prototype.run = function () {
        /** Select all replacement elements that display the consent message */
        var elements = document.querySelectorAll('[data-yt-consent]');
        for (var i = 0; i < elements.length; i++) {
            /** Save the current element */
            var el = elements[i];
            /** Get the id from the current element */
            var id = el.dataset['ytConsent'];
            /** Get additional url params */
            var params = el.dataset['ytParams'];
            /** Create the youtube iframe */
            var iframe = document.createElement('iframe');
            iframe.style.borderStyle = 'none';
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + params;
            iframe.allowFullscreen = true;
            /** The parent element should be the div with ytPlayer class */
            var parent_1 = el.parentNode;
            /** Remove placeholder and insert iframe */
            parent_1.removeChild(el);
            parent_1.appendChild(iframe);
        }
    };
    return YouTube;
}(Module_1.default));
exports.default = YouTube;
//# sourceMappingURL=Youtube.js.map
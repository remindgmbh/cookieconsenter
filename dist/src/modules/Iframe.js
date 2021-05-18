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
 * Enables all iframes.
 */
var Iframe = /** @class */ (function (_super) {
    __extends(Iframe, _super);
    function Iframe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Iframe.prototype.run = function () {
        /** Select all replacement elements that display the consent message */
        var elements = document.querySelectorAll('[data-iframe-url]');
        for (var i = 0; i < elements.length; i++) {
            /** Save the current element */
            var el = elements[i];
            /** Get the url from the current element */
            var url = el.dataset['iframeUrl'];
            /** Get width param */
            var width = el.dataset['iframeWidth'];
            /** Get height param */
            var height = el.dataset['iframeHeight'];
            /** Get record uid param */
            var uid = el.dataset['iframeRecordUid'];
            /** Create the youtube iframe */
            var iframe = document.createElement('iframe');
            iframe.style.borderStyle = 'none';
            iframe.width = width;
            iframe.height = height;
            iframe.src = url;
            iframe.allowFullscreen = false;
            iframe.name = 'iframe-' + uid;
            /** The parent element should be the div with ytPlayer class */
            var parent_1 = el.parentNode;
            /** Remove placeholder and insert iframe */
            parent_1.removeChild(el);
            parent_1.appendChild(iframe);
        }
    };
    return Iframe;
}(Module_1.default));
exports.default = Iframe;
//# sourceMappingURL=Iframe.js.map
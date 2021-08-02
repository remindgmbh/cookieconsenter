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
 * Writes a string to the console when the module is loaded.
 */
var Debug = /** @class */ (function (_super) {
    __extends(Debug, _super);
    /** Initialize with some value */
    function Debug(info) {
        if (info === void 0) { info = 'debug'; }
        var _this = _super.call(this) || this;
        /** Some info string */
        _this.info = 'debug';
        _this.info = info;
        return _this;
    }
    /**
     * This is the API method that will be executed.
     */
    Debug.prototype.run = function () {
        console.log(this.info); // Output info
    };
    return Debug;
}(Module_1.default));
exports.default = Debug;
//# sourceMappingURL=Debug.js.map
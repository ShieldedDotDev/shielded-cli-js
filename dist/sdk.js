"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShieldedAPI = exports.StatusError = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
class StatusError extends Error {
    constructor(message, status, result) {
        super(message);
        this.status = status;
        this.result = result;
    }
}
exports.StatusError = StatusError;
function isShieldOptions(options) {
    return (typeof options.endpoint === "string") && (typeof options.token === "string");
}
class ShieldedAPI {
    constructor(options = {}) {
        this.options = {
            endpoint: 'https://api.shielded.dev',
        };
        this.options = Object.assign(Object.assign({}, this.options), options);
    }
    updateShield() {
        return __awaiter(this, arguments, void 0, function* (options = {}) {
            options = Object.assign(Object.assign({}, this.options), options);
            if (!isShieldOptions(options)) {
                throw new Error("Calling the API requires endpoint and token options.");
            }
            const params = new URLSearchParams();
            if (options.title) {
                params.append('title', options.title);
            }
            if (options.text) {
                params.append('text', options.text);
            }
            if (options.color) {
                params.append('color', options.color);
            }
            const result = yield (0, node_fetch_1.default)(options.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `token ${options.token}`,
                },
                body: params
            });
            if (!result.ok) {
                throw new StatusError(`API returned an error: ${result.status} ${result.statusText}: ${yield result.text()}`, result.status, result);
            }
            return yield result.json();
        });
    }
}
exports.ShieldedAPI = ShieldedAPI;

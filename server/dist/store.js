"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsManager = void 0;
// singleton class
class RoomsManager {
    constructor() {
        this.rooms = new Map();
        this.rooms = new Map();
    }
    static getInstance() {
        if (!RoomsManager.instance) {
            RoomsManager.instance = new RoomsManager();
        }
        return RoomsManager.instance;
    }
    addWs(room, ws) {
        var _a;
        if (!this.rooms.has(room)) {
            this.rooms.set(room, new Set());
        }
        (_a = this.rooms.get(room)) === null || _a === void 0 ? void 0 : _a.add(ws);
    }
}
exports.RoomsManager = RoomsManager;

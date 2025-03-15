"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const store_1 = require("./store");
const wss = new ws_1.WebSocketServer({ port: 8081 });
const r = store_1.RoomsManager.getInstance();
wss.on('connection', function connection(ws) {
    ws.on('error', console.error);
    ws.on('message', function (data) {
        var _a;
        try {
            const message = JSON.parse(data);
            if (message.type === 'join') {
                const room = message.room;
                r.addWs(room, ws);
                console.log("user joined", room);
            }
            else if (message.type === 'message') {
                console.log(message);
                const room = message.room;
                const name = message.name;
                if (!room || !r.rooms.has(room))
                    return;
                (_a = r.rooms.get(room)) === null || _a === void 0 ? void 0 : _a.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({ chat: message.chat, name: message.name, time: message.time }));
                    }
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    });
    ws.on('close', () => {
        r.rooms.forEach((clients, room) => {
            if (clients.has(ws)) {
                clients.delete(ws);
                if (clients.size === 0)
                    r.rooms.delete(room);
            }
        });
    });
});

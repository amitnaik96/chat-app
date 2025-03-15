import { WebSocketServer } from 'ws';
import { RoomsManager } from './store';

const wss = new WebSocketServer({ port : 8081});

const r = RoomsManager.getInstance();

wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.on('message', function (data: any) {
        try {
            const message = JSON.parse(data);

            if(message.type === 'join'){
                const room = message.room;

                r.addWs(room, ws);
                // console.log("user joined", room);
            } else if(message.type === 'message'){
                // console.log(message);
                const room = message.room;
                const name = message.name;
                if(!room || !r.rooms.has(room)) return;

                r.rooms.get(room)?.forEach((client: any) => {
                    if(client.readyState === WebSocket.OPEN){
                        client.send(JSON.stringify({chat: message.chat, name: message.name, time: message.time}));
                    }
                })
            }
        } catch (err) {
            console.log(err);
        }
    });

    ws.on('close', () => {
        r.rooms.forEach((clients, room) => {
            if(clients.has(ws)) {
                clients.delete(ws);
                if(clients.size === 0) r.rooms.delete(room);
            }
        })
    });
})
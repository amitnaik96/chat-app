import { WebSocket } from 'ws';

// singleton class
export class RoomsManager {
    rooms: Map<string, Set<WebSocket>> = new Map();
    private static instance: RoomsManager;

    private constructor(){
        this.rooms = new Map();
    }

    static getInstance(){
        if(!RoomsManager.instance){
            RoomsManager.instance = new RoomsManager();
        }

        return RoomsManager.instance;
    }

    addWs(room: string, ws: WebSocket){  
        if(!this.rooms.has(room)) {
            this.rooms.set(room, new Set());
        }
        this.rooms.get(room)?.add(ws);
    }

}
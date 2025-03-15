"use client"
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Bubble } from '@/components/built-ui/bubble'; 
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from 'lucide-react';
import { nameAtom } from '@/store/atoms';
import { useAtomValue } from 'jotai';
import { toast } from "sonner"
import { Clipboard } from 'lucide-react';

interface ChatProp {
    name: string;
    chat: string;
    time: string;
}


export const ChatRoom = () => {
    const { room } = useParams();
    const [ socket, setSocket ] = useState<WebSocket | null>(null);
    const [ chats, setChats ] = useState<ChatProp[]>([]);
    const [ message, setMessage ] = useState('');
    const name = useAtomValue(nameAtom);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8081');

        socket.onopen = () => {
            console.log('socket connnected');
            setSocket(socket);
            socket.send(JSON.stringify({type: 'join', room: room}));
        }


        socket.onmessage = (event) => {
            // console.log(event);
            const message = JSON.parse(event.data);
            // console.log(message);
            setChats((prevChats) => [...prevChats, {name: message.name, chat: message.chat, time: message.time}]);
            // console.log(chats);
        }

        return () => socket.close(); 
    }, [room]);

    
    const getTime = () => {
        return new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        });
    };

    function sendMessage(){
        if(message === '') {
            toast("Please enter some message.");
        };

        socket?.send(JSON.stringify({type:'message', room: room, chat: message, name: name, time: getTime()}));
    }

    const copyToClipboard = (text: string) => {
        navigator?.clipboard?.writeText(text);
        toast('Copied room code');
    };

    return  <div className="w-80 sm:w-150 border shadow rounded-sm flex-col justify-center p-4">
                <div className="p-4 font-bold text-lg sm:text-xl flex gap-1">
                    <div>
                        Room Code: {room}
                    </div>
                    <button onClick={() => copyToClipboard(room as string)} className="">
                        <Clipboard size={16} />
                    </button>
                </div>
                <div  suppressHydrationWarning  className="all-chats border shadow rounded-sm h-[300px] overflow-y-auto items-center mb-4">
                    <div className='w-full flex justify-center'>
                        <div className='text-xs bg-gray-100 inline-block py-1 px-2 mt-2 rounded-4xl dark:bg-gray-800 dark:text-white'>welcome to the chat room!</div>
                    </div>
                    { chats.map((msg: ChatProp) => {
                         return <Bubble key={Math.random()} name={msg.name} chat={msg.chat} time={msg.time} />
                    })}
                </div>
                <div className="send-message flex gap-2">
                    <Input onChange={e => setMessage(e.target.value)} type="text" placeholder="Enter your message" />
                    <Button onClick={sendMessage}>
                        <Send />
                    </Button>
                </div>
            </div>
}
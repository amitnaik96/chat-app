"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation';
import { toast } from "sonner"
import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { Plus } from 'lucide-react';
import { nameAtom } from '@/store/atoms';
import { useAtom } from 'jotai';


export const Card = () => {
    const router = useRouter();
    const [room, setRoom ] = useState('');
    const [name, setName] = useAtom(nameAtom);

    function createRoom(){
        if(name === 'Anonymous'){
            toast("Please enter your name.");
            return;
        }
        const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
        router.push(`/chat/${newRoomId}`);
    }

    function joinRoom(){
        if(room === '') {
            toast("Please enter room code.");
            return;
        }

        if(name === 'Anonymous'){
            toast("Please enter your name.");
            return;
        }
        router.push(`/chat/${room}`);
    }

    return <div className='border shadow rounded-md px-10 py-8 w-80 sm:w-100'>
        <div className="text-2xl sm:text-3xl font-bold">Welcome</div>
        <div className="mb-10">Get access to quick chat rooms!</div>
        <div className="mb-6">
            <Input onChange={e => setName(e.target.value)}  type="text" placeholder="Enter your name" className="mb-4"/>
            <Button  onClick={createRoom} className="w-full">
                <Plus />
                Create Room
            </Button>
        </div>
        <div>
            <Input onChange={e => setRoom(e.target.value)}  type="text" placeholder="Enter room code" className="mb-4"/>
            <Button  onClick={joinRoom} className="w-full">
                <LogIn />    
                Join Room
            </Button>
        </div>
    </div>
}
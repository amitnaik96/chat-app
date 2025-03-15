interface Props {
    name: string;
    chat: string;
    time: string;
}

export const Bubble = ({name, chat, time} : Props) => {
    return  <div>

    
    <div className="inline-block max-w-[70%] h-auto mt-3 ">
        <div className='border rounded-md rounded-tl-none p-3 ml-2 break-words  bg-black text-slate-50 dark:bg-slate-200 dark:text-black'>
            <div className="text-sm font-semibold">{name}</div>
            <div className="text-sm">{chat}</div>
        </div>
        <div className="text-xs ml-2 text-gray-500 dark:text-white">{time}</div>
    </div>
    </div> 
}
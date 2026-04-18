import { Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import { ImAttachment } from 'react-icons/im';
import { IoMdSend } from 'react-icons/io';
import { GiCancel } from 'react-icons/gi';
import { useSelector } from 'react-redux';

import socket from '../../../lib/socket';
import { RootState } from '../../../redux/store';
import { uploadImages } from '../../../services/userService';

type Props = {
    channelId: string;
    setMessages: Dispatch<SetStateAction<any>>;
    setIsBotTyping?: Dispatch<SetStateAction<boolean>>;
}

const ChatInput: FC<Props> = ({ channelId, setMessages, setIsBotTyping }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [images, setImages] = useState<any[] | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);
    const uploadInputRef = useRef<any>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!e.target.chat.value && !images) return;

        setIsPending(true)
        const result = images && await uploadImages(images);
        const message = {
            text: e.target.chat.value,
            userId: user?.id,
            images: result || null,
            user: {
                username: user?.username,
            },
            channelId
        }

        setImages(null);
        socket.emit('chat', message);
        if(setIsBotTyping) {
            setIsBotTyping(true);
            setTimeout(() => setIsBotTyping(false), 15000); // Fail-safe reset
        }
        e.target.chat.value = '';
        setIsPending(false);
    };

    const handleUploadImage = (e: any) => {
        e.preventDefault();
        uploadInputRef.current.click();
    };

    const handleChange = (e: any) => {
        setImages(e.target.files)
    };

    return (
        <form onSubmit={handleSubmit} method="POST" className='w-full bg-white/70 dark:bg-black/20 backdrop-blur-md px-2 py-3 pb-safe md:px-4 md:py-4 shrink-0 border-t border-black/5 dark:border-black/50 transition-colors duration-300'>
            {
                images && images.length > 0 &&
                <div className='pb-3 flex flex-wrap gap-2 items-center'>
                    <button type="button" onClick={() => setImages(null)} className='text-rose-400 hover:text-rose-300 mr-2 flex items-center gap-1 text-sm bg-neutral-800 px-3 py-1 rounded-full border border-neutral-700/50'>
                        <GiCancel /> Clear
                    </button>
                    {
                        Array.from({ length: images.length }, (_, i) => (
                            <span className='bg-indigo-900/40 border border-indigo-500/30 text-indigo-200 text-xs px-3 py-1 rounded-full' key={i}>{images[i].name}</span>
                        ))
                    }
                </div>
            }
            {/* Input Container */}
            <div className='flex items-center bg-white/50 dark:bg-neutral-800/80 border border-black/5 dark:border-neutral-700/50 rounded-full px-4 py-2 gap-2 shadow-inner focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500 transition-all duration-300'>
                <input
                    ref={uploadInputRef}
                    type="file"
                    multiple
                    onChange={handleChange}
                    hidden
                    accept='image/png, image/jpeg'
                />
                <button 
                    type='button' 
                    onClick={handleUploadImage} 
                    className="text-neutral-400 hover:text-indigo-400 transition-colors p-2 rounded-full hover:bg-neutral-700 flex items-center justify-center"
                >
                    <ImAttachment className='text-xl' />
                </button>
                
                <input
                    readOnly={isPending}
                    spellCheck='false'
                    type="text"
                    name='chat'
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent text-neutral-800 dark:text-white outline-none placeholder-neutral-500 py-2.5 px-2 text-sm md:text-base"
                />
                
                <button 
                    type='submit' 
                    disabled={isPending}
                    className={`transition-all p-2 rounded-full flex items-center justify-center active:scale-95
                        ${isPending ? 'text-neutral-600 bg-transparent' : 'text-white bg-indigo-600 hover:bg-indigo-500 shadow-md'}
                    `}
                >
                    <IoMdSend className='text-xl ml-1' />
                </button>
            </div>
        </form>
    )
}

export default ChatInput;
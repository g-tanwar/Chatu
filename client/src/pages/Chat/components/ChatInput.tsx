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
}

const ChatInput: FC<Props> = ({ channelId, setMessages }) => {
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
        <form onSubmit={handleSubmit} method="POST" className='w-full bg-neutral-900 px-4 py-3 shrink-0 border-t border-neutral-800 transition-colors duration-300'>
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
            <div className='flex items-center bg-neutral-800 border border-neutral-700/50 rounded-full px-4 py-2 gap-3 shadow-inner'>
                <input
                    ref={uploadInputRef}
                    type="file"
                    multiple
                    onChange={handleChange}
                    hidden
                    accept='image/png, image/jpeg'
                />
                <button type='button' onClick={handleUploadImage} className="text-neutral-400 hover:text-indigo-400 transition-colors p-2 rounded-full hover:bg-neutral-700/50">
                    <ImAttachment className='text-xl' />
                </button>
                <input
                    readOnly={isPending}
                    spellCheck='false'
                    type="text"
                    name='chat'
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent text-white outline-none placeholder-neutral-500 py-1"
                />
                <button type='submit' className="text-indigo-500 hover:text-indigo-400 transition-colors p-2 rounded-full hover:bg-neutral-700/50 active:scale-95">
                    <IoMdSend className='text-2xl' />
                </button>
            </div>
        </form>
    )
}

export default ChatInput;
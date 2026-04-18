import moment from 'moment';
import { FC, useState } from 'react'
import { HiOutlineChevronDown, HiUser } from 'react-icons/hi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';

import { updateMessage } from '../../../services/messageService';
import { RootState } from '../../../redux/store';

type Props = {
    message: Message;
}

const Message: FC<Props> = ({ message }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [deleted, setDeleted] = useState(false);

    const isMine = message.userId === user?.id;
    const isDeleted = deleted || message.text === 'This message has been deleted.';

    const handleDelete = async () => {
        const messageDoc = {
            images: null,
            text: 'This message has been deleted.'
        }
        await updateMessage(message.id, messageDoc);
        setDeleted(true);
        setIsOpen(false);
    }

    return (
        <div className={`flex w-full mb-6 ${isMine ? 'justify-end' : 'justify-start'}`}>
            {/* Avatar for Others */}
            {!isMine && (
                <div className="flex-shrink-0 mr-3 mt-auto mb-5">
                    {message.user?.image ? (
                        <LazyLoadImage
                            src={message.user.image}
                            alt="avatar"
                            className="w-8 h-8 rounded-full object-cover shadow-sm bg-neutral-800"
                            effect="blur"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-neutral-700 border border-neutral-600 flex items-center justify-center text-neutral-400">
                            <HiUser className="text-xl" />
                        </div>
                    )}
                </div>
            )}

            <div className={`relative group max-w-[75%] flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                {/* Delete Action Popup for Own Messages */}
                {isMine && !isDeleted && (
                    <div className='absolute hidden group-hover:flex -top-10 right-0 z-30 transition-all duration-200'>
                        {
                            isOpen ? (
                                <div className='p-2 bg-neutral-800 border border-neutral-700 shadow-xl rounded-lg flex items-center gap-3'>
                                    <span className='text-sm text-neutral-300 font-medium'>Delete?</span>
                                    <button onClick={handleDelete} className='text-rose-500 hover:text-rose-400 text-sm font-semibold transition-colors'>Yes</button>
                                    <button onClick={() => setIsOpen(false)} className='text-neutral-400 hover:text-neutral-300 text-sm transition-colors'>No</button>
                                </div>
                            ) : (
                                <button onClick={() => setIsOpen(prev => !prev)} className='bg-neutral-800 p-2 rounded-full border border-neutral-700 hover:bg-neutral-700 text-neutral-300 shadow-md transition-all active:scale-95'>
                                    <HiOutlineChevronDown className='text-lg' />
                                </button>
                            )
                        }
                    </div>
                )}

                {/* Sender Name for Group Chats */}
                {!isMine && message.user?.username && (
                    <span className="text-[13px] text-neutral-400 mb-1 ml-1 font-medium">{message.user.username}</span>
                )}

                {/* Chat Bubble Base */}
                <div className={`
                    flex flex-col px-4 py-3 shadow-md border
                    ${isMine 
                        ? 'bg-indigo-600 text-white rounded-2xl rounded-br-sm border-indigo-500/50' 
                        : 'bg-neutral-800 text-neutral-100 rounded-2xl rounded-bl-sm border-neutral-700/50'
                    }
                `}>
                    {/* Attached Images */}
                    {message.images && message.images.length > 0 && !isDeleted && (
                        <div className="flex flex-col gap-2 mb-2">
                            {message.images.map((image: string, index) => (
                                <LazyLoadImage
                                    key={index}
                                    className='max-w-full h-auto max-h-64 object-cover rounded-xl shadow-sm'
                                    effect='blur'
                                    src={image}
                                    alt="attachment"
                                />
                            ))}
                        </div>
                    )}
                    
                    {/* Message Body */}
                    <p className={`text-[15px] leading-relaxed break-words ${isDeleted ? 'italic text-white/50 opacity-80' : ''}`}>
                        {isDeleted ? 'This message has been deleted.' : message.text}
                    </p>
                </div>

                {/* Delivery Timestamp */}
                <span className="text-[11px] text-neutral-500 mt-1.5 mx-1 font-medium">
                    {moment(message.createdAt).isSame(Date.now(), 'day')
                        ? moment(message.createdAt).format('HH:mm')
                        : moment(message.createdAt).format('DD MMM HH:mm')}
                </span>
            </div>

            {/* Avatar for Mine */}
            {isMine && (
                <div className="flex-shrink-0 ml-3 mt-auto mb-5">
                    {user?.image ? (
                        <LazyLoadImage
                            src={user.image}
                            alt="avatar"
                            className="w-8 h-8 rounded-full object-cover shadow-sm border border-indigo-500/30"
                            effect="blur"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-indigo-700/50 border border-indigo-500 flex items-center justify-center text-indigo-200">
                            <HiUser className="text-xl" />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Message;
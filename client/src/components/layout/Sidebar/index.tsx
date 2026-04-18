import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useLocation } from 'react-router-dom';

import { getChannelsByUser } from '../../../services/channelService';
import ChannelBox from './ChannelBox';
import Searchbar from './Searchbar';
import UserBox from './UserBox'
import Spinner from '../../loading/Spinner';

const Sidebar = () => {
    const location = useLocation();
    const { user } = useSelector((state: RootState) => state.auth);
    const { refresh } = useSelector((state: RootState) => state.channel);
    const [channels, setChannels] = useState<Channel[]>([]);
    const [isPending, setIsPending] = useState<boolean>(true);
    const [lastMessages, setLastMessages] = useState<Message[]>([]);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        setIsPending(true);
        const fetchChannels = async () => {
            try {
                const result = await getChannelsByUser(user?.id!);
                setChannels(result.channels || []);
                setLastMessages(result.lastMessages || []);
            } catch (err) {
                console.error('Failed to load channels:', err);
                setChannels([]);
                setLastMessages([]);
            } finally {
                setIsPending(false);
            }
        };

        if (user?.id) {
            fetchChannels();
        } else {
            setChannels([]);
            setLastMessages([]);
            setIsPending(false);
        }
    }, [user?.id, refresh]);

    return (
        <aside className={
            `bg-white/60 dark:bg-black/20 backdrop-blur-md border-r border-black/5 dark:border-white/5 w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col h-full overflow-hidden transition-all duration-300
                ${location.pathname === '/' ? 'block' : 'hidden md:flex'} 
            `}
        >
            <UserBox />
            <Searchbar setSearch={setSearch} />
            <div className='flex-1 overflow-x-hidden overflow-y-auto scrollbar-hide pb-4'>
                {
                    isPending
                        ?
                        <div className='mt-10'>
                            <Spinner size='sm' />
                        </div>
                        :
                        (
                            channels.length > 0
                                ?
                                channels.map((channel, index) => {
                                    return (
                                        <ChannelBox
                                            key={channel.id}
                                            channel={channel}
                                            userId={user?.id!}
                                            lastMessage={lastMessages[index]}
                                            search={search}
                                        />
                                    )
                                })
                                :
                                <p className='text-neutral-500 text-center mt-3'>Create a channel now and start chatting.</p>
                        )
                }
            </div>
        </aside>
    )
}

export default Sidebar;
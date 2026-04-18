import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PageInfo from '../../components/layout/ContentArea/PageInfo';
import Spinner from '../../components/loading/Spinner';
import useChatScroll from '../../hooks/useChatScroll';
import socket from '../../lib/socket';
import { RootState } from '../../redux/store';
import { getChannel } from '../../services/channelService';
import { getMessagesByChannel } from '../../services/messageService';
import ChatInput from './components/ChatInput';
import Message from './components/Message';
import { setRefresh } from '../../redux/features/channelSlice';
import { HiUser } from 'react-icons/hi';

const Chat = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();
  const dispatch = useDispatch();

  const [channel, setChannel] = useState<Channel>();
  const [messages, setMessages] = useState<Message[]>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const ref = useChatScroll(messages);

  useEffect(() => {
    if (!location.state?.channelId) return;
    setIsPending(true);

    const fetchChannel = async () => {
      const result = await getChannel(location.state?.channelId);
      setChannel(result.channel);
    }

    const fetchMessages = async () => {
      const result = await getMessagesByChannel(location.state?.channelId);
      setMessages(result);
      setIsPending(false);
    };

    if (user?.id) {
      fetchMessages();
      fetchChannel();
    }
  }, [location.state?.channelId, user?.id]);

  useEffect(() => {
    socket.on('chat', (data) => {
      if (data.channelId === channel?.id) setMessages((prev: any) => [...prev, data]);
      setIsBotTyping(false);
      dispatch(setRefresh());
    });

    return () => {
      socket.off('chat');
      socket.removeListener('chat')
    }
  }, [channel?.id, dispatch]);

  return (
    <section className='h-full flex flex-col overflow-hidden'>
      <PageInfo
        isChannel={true}
        name={
          channel?.name ? channel?.name :
            (
              channel?.participants[0].username === user?.username
                ?
                channel?.participants[1].username
                :
                channel?.participants[0].username
            )
        }
        participants={channel?.name ? channel?.participants : null}
        image={
          channel?.name
            ?
            channel.image
            :
            (
              channel?.participants[0].username === user?.username
                ?
                channel?.participants[1].image
                :
                channel?.participants[0].image
            )
        }
      />
      <div ref={ref} className='flex-1 overflow-y-auto p-4 scroll-smooth scrollbar-hide'>
        {
          !isPending
            ?
            (messages && messages.length > 0)
              ?
              messages.map((message, index) => {
                return <Message key={index} message={message} />
              })
              :
              <p className='bg-neutral-800/80 border border-neutral-700/50 p-4 m-4 rounded-xl text-center text-sm text-neutral-400 shadow-inner'>Send a message to start chatting.</p>
            :
            <Spinner size='lg' />
        }
        {isBotTyping && (
          <div className="flex w-full mb-6 justify-start fade-in-up">
            <div className="flex-shrink-0 mr-3 mt-auto mb-5">
              <div className="w-8 h-8 rounded-full bg-neutral-700 border border-neutral-600 flex items-center justify-center text-neutral-400 shadow-sm">
                <HiUser className="text-xl" />
              </div>
            </div>
            <div className="relative group max-w-[75%] flex flex-col items-start">
              <div className="flex items-center gap-1.5 px-4 py-4 shadow-md border bg-neutral-800 rounded-2xl rounded-bl-sm border-neutral-700/50">
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-[11px] text-neutral-500 mt-1.5 mx-1 font-medium">Bot is typing...</span>
            </div>
          </div>
        )}
      </div>
      <ChatInput channelId={channel?.id!} setMessages={setMessages} setIsBotTyping={setIsBotTyping} />
    </section>
  )
}

export default Chat;
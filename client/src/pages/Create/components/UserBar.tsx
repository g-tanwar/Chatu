import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IoMdRemoveCircleOutline, IoMdAddCircleOutline } from 'react-icons/io';
import { getUser } from '../../../services/userService';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

type Props = {
    user?: User;
    userId?: string;
    isAdded: boolean;
    participants: string[];
    setParticipants: Dispatch<SetStateAction<string[]>>;
    search?: string;
    admins: string[];
    setAdmins: Dispatch<SetStateAction<string[]>>;
}

const UserBar: FC<Props> = ({ user, userId, isAdded, participants, setParticipants, search, admins, setAdmins }) => {
    const currentUser = useSelector((state:RootState)=>state.auth.user);
    const [participant, setParticipant] = useState<User | null>(user ? user : null);

    useEffect(() => {
        if (!userId) return;

        const fetchUser = async () => {
            const result = await getUser(userId);
            setParticipant(result.user);
        };

        fetchUser();
    }, [userId, search])

    const handleClick = () => {
        if (isAdded) {
            const newParticipants = participants.filter((p: string) => {
                return p !== participant?.id;
            });

            if (admins?.includes(participant?.id!)) {
                const newAdmins = admins?.filter((admin) => {
                    return admin !== participant?.id;
                });

                setAdmins(newAdmins!);
            }

            setParticipants(newParticipants);
        } else {
            setParticipants((prev) => [...prev, participant?.id!]);
        }
    }

    const handleAddAdmin = () => {
        if (!setAdmins) return;

        if (admins?.includes(participant?.id!)) {
            const newAdmins = admins?.filter((admin) => {
                return admin !== participant?.id;
            });

            return setAdmins(newAdmins!);
        }

        return setAdmins((prev) => [...prev, participant?.id!]);
    };

    return (
        <div
            className={`
                w-full items-center bg-white dark:bg-neutral-800/80 border border-black/5 dark:border-white/5 shadow-sm rounded-xl p-3 my-3 transition-colors duration-300
                ${(search && !isAdded) ? (participant?.username?.toLowerCase().includes(search.toLowerCase()) ? 'flex' : 'hidden') : 'flex'}
            `}
        >
            <LazyLoadImage
                src={participant?.image}
                alt='participant'
                className='w-12 h-12 rounded-full'
                effect='blur'
            />
            <p className='ml-3 font-semibold text-neutral-800 dark:text-neutral-200'>{participant?.username}</p>
            <div className='ml-auto flex items-center gap-1'>
                <button
                    onClick={handleClick}
                    type='button'
                    className='text-3xl text-neutral-400 hover:text-indigo-600 dark:hover:text-white p-1 rounded-md transition-colors duration-200'
                >
                    {
                        isAdded
                            ?
                            <IoMdRemoveCircleOutline />
                            :
                            <IoMdAddCircleOutline />
                    }
                </button>
                {
                    isAdded
                    &&
                    <button
                        onClick={handleAddAdmin}
                        type='button'
                        className={`text-3xl p-1 rounded-md transition-colors duration-200
                            ${currentUser?.id === user ? 'text-neutral-300 dark:text-neutral-700 cursor-not-allowed' : 'text-amber-400 hover:text-amber-500'}
                        `}
                        disabled={currentUser?.id === user}
                    >
                        {
                            admins?.includes(participant?.id!)
                                ?
                                <AiFillStar />
                                :
                                <AiOutlineStar />
                        }
                    </button>
                }
            </div>
        </div>
    )
}

export default UserBar
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../redux/store";
import { getFriends } from "../../../services/userService";
import UserBar from "./UserBar";

type Props = {
    participants: string[];
    setParticipants: Dispatch<SetStateAction<string[]>>;
    admins: string[];
    setAdmins: Dispatch<SetStateAction<string[]>>;
}

const Participants: FC<Props> = ({ participants, setParticipants, admins, setAdmins }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [search, setSearch] = useState<string>('');
    const [friends, setFriends] = useState<User[]>();

    useEffect(() => {
        const fetchFriends = async () => {
            const result = await getFriends(user?.id!);
            setFriends(result.friends);
        }

        fetchFriends();
    }, [user?.id])

    return (
        <div className="w-full py-5 flex justify-center">
            <div className="py-3 grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="w-full pr-0 lg:pr-6">
                    <p className="text-xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">Friends</p>
                    <div className="py-4">
                        <input
                            onChange={(e: any) => setSearch(e.target.value)}
                            type="text"
                            className="bg-white/50 dark:bg-black/20 border border-black/10 dark:border-white/5 text-neutral-800 dark:text-neutral-100 outline-none w-full rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-inner"
                            placeholder="Search a friend..."
                        />
                    </div>
                    <div className="overflow-auto">
                        {
                            friends
                            &&
                            friends.map((friend: User) => {
                                return (
                                    !participants.includes(friend.id)
                                    &&
                                    <UserBar
                                        search={search}
                                        isAdded={false}
                                        key={friend.id}
                                        user={friend}
                                        participants={participants}
                                        setParticipants={setParticipants}
                                        admins={admins}
                                        setAdmins={setAdmins}
                                    />)
                            })
                        }
                    </div>
                </div>
                <div className="md:w-[400px] mt-6 lg:mt-0">
                    <p className="text-xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 mb-4">Participants ({participants.length})</p>
                    {
                        participants
                        &&
                        participants.map((participant: string, index) => {
                            return (
                                <UserBar
                                    search={search}
                                    isAdded={true}
                                    key={index}
                                    userId={participant}
                                    participants={participants}
                                    setParticipants={setParticipants}
                                    admins={admins}
                                    setAdmins={setAdmins}
                                />)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Participants
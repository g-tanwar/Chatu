import { FC, useState, useTransition } from "react";
import { useSelector } from "react-redux"

import Spinner from "../../../components/loading/Spinner";
import { RootState } from "../../../redux/store"
import BlockedTab from "./Block/BlockedTab";
import FriendsTab from "./Friend/FriendsTab";
import RequestsTab from "./Request/RequestsTab";

type Props = {
    profileId: string;
}

const Tabs: FC<Props> = ({ profileId }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [tab, setTab] = useState('friends');
    const [isPending, startTransition] = useTransition();

    const handleClickFriends = () => {
        startTransition(() => {
            setTab('friends');
        });
    };

    const handleClickRequests = () => {
        startTransition(() => {
            setTab('requests');
        });
    };

    const handleClickBlock = () => {
        startTransition(() => {
            setTab('blocked');
        });
    };

    return (
        <div className="max-w-[800px] mx-auto pb-10">
            <div className="flex justify-around">
                <span
                    onClick={handleClickFriends}
                    className={`
                        text-xl py-3 cursor-pointer w-full text-center duration-200 transition-all border-b 
                        ${tab === 'friends' ? 'border-b-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-bold' : 'border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 text-neutral-600 dark:text-neutral-400'}
                    `}
                >
                    Friends
                </span>
                {
                    user?.id === profileId
                    &&
                    <>
                        <span
                            onClick={handleClickRequests}
                            className={`
                                text-xl py-3 cursor-pointer w-full text-center duration-200 transition-all border-b 
                                ${tab === 'requests' ? 'border-b-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-bold' : 'border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 text-neutral-600 dark:text-neutral-400'}
                            `}
                        >
                            Requests
                        </span>
                        <span
                            onClick={handleClickBlock}
                            className={`
                                text-xl py-3 cursor-pointer w-full text-center duration-200 transition-all border-b 
                                ${tab === 'blocked' ? 'border-b-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-bold' : 'border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 text-neutral-600 dark:text-neutral-400'}
                            `}
                        >
                            Blocked
                        </span>
                    </>
                }
            </div>
            <div>
                {
                    isPending
                        ?
                        <div className="mt-10">
                            <Spinner size="lg" />
                        </div>
                        :
                        <>
                            {
                                tab === 'friends' && <FriendsTab />
                            }
                            {
                                tab === 'requests' && <RequestsTab />
                            }
                            {
                                tab === 'blocked' && <BlockedTab />
                            }
                        </>
                }
            </div>
        </div>
    )
}

export default Tabs
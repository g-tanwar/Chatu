import { FC } from 'react'
import { IconType } from 'react-icons'
import Spinner from '../loading/Spinner';

type Props = {
    Icon: IconType;
    text: string;
    type: 'button' | 'submit' | 'reset';
    handleClick: VoidFunction;
    isTextCanClosed: boolean;
    isPending?: boolean
}

const IconButton: FC<Props> = ({ Icon, text, type, handleClick, isTextCanClosed, isPending = false }) => {
    return (
        <button
            type={type}
            onClick={handleClick}
            className="font-semibold text-sm md:text-base flex items-center px-4 py-2.5 bg-black/5 hover:bg-black/10 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors duration-200 rounded-xl mt-3 mr-3 w-full justify-center text-neutral-800 dark:text-neutral-100 border border-black/5 dark:border-transparent shadow-sm"
        >
            {
                isPending
                    ?
                    <Spinner size='sm' />
                    :
                    <>
                        <Icon className='mr-2 text-2xl' />
                        <span className={`${isTextCanClosed ? 'hidden xl:inline' : 'inline'}`}>{text}</span>
                    </>
            }
        </button>
    )
}

export default IconButton
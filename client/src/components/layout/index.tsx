import { FC, ReactNode } from 'react'
import { useLocation } from 'react-router-dom';
import ContentArea from './ContentArea';
import Sidebar from './Sidebar';


type Props = {
    children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
    const location = useLocation();
    if (location.pathname === '/login' || location.pathname === '/register') {
        return (
            <>
                {children}
            </>
        )
    }

    return (
        <div className='h-[100dvh] w-full bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200 dark:from-neutral-900 dark:via-neutral-950 dark:to-black transition-colors duration-500 flex md:p-6 p-0 md:p-2 sm:p-2 overflow-hidden text-neutral-800 dark:text-neutral-100'>
            <div className='flex w-full h-full bg-white/40 dark:bg-white/5 backdrop-blur-2xl md:border border-black/5 dark:border-white/10 md:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.1)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] overflow-hidden transition-colors duration-500'>
                <Sidebar />
                <ContentArea>
                    {children}
                </ContentArea>
            </div>
        </div>
    )


}

export default Layout;
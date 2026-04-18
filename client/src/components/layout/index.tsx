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
        <div className='h-screen w-full bg-neutral-950 flex overflow-hidden text-white'>
            <Sidebar />
            <ContentArea>
                {children}
            </ContentArea>
        </div>
    )


}

export default Layout;
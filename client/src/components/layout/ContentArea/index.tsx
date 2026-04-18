import { FC, ReactNode } from "react";
import { useLocation } from "react-router-dom";

type Props = {
    children: ReactNode;
}

const ContentArea: FC<Props> = ({ children }) => {
    const location = useLocation();

    return (
        <main className={`flex-1 h-full flex-col bg-transparent relative overflow-hidden ${location.pathname === '/' ? 'hidden md:flex' : 'flex'}`}>
            <div key={location.pathname} className="h-full w-full flex flex-col flex-1 animate-fade-in relative z-10">
                {children}
            </div>
        </main>
    )
}

export default ContentArea;
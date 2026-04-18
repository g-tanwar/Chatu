import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
}

const ContentArea: FC<Props> = ({ children }) => {
    return (
        <main className="flex-1 h-full flex flex-col bg-neutral-900 relative overflow-hidden">
            {children}
        </main>
    )
}

export default ContentArea;
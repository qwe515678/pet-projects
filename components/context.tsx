'use client'

import { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react"

interface HeaderColorContextProps {
    headerColor: string;
    setHeaderColor: Dispatch<SetStateAction<string>>;
}

const HeaderColorContext = createContext<HeaderColorContextProps | undefined>(undefined);

export default function ContextProvider({ children }: { children: ReactNode }) {
    const [headerColor, setHeaderColor] = useState<string>('linear-gradient(0deg, rgba(125,211,252,1) 0%, rgba(147,197,253,1) 100%)');
    return (
        <HeaderColorContext.Provider value={{ headerColor, setHeaderColor }}>
            {children}
        </HeaderColorContext.Provider>
    );
}

export { HeaderColorContext }

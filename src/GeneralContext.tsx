import { createContext, useState } from "react";

interface GeneralContextType {
    isReady : boolean; 
    setIsReady : any
}
export const GeneralContext = createContext<GeneralContextType | null>(null);

export function ContextProvider ({children} : {children : any}) {
    const [isReady, setIsReady] = useState(false);

    return (
        <GeneralContext.Provider value={{isReady, setIsReady}}>
            {children}
        </GeneralContext.Provider>
    );
};

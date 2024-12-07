import { createContext, useState } from "react";

interface GeneralContextType {
    datas : any; 
    setDatas : any
}
export const GeneralContext = createContext<GeneralContextType | null>(null);

export function ContextProvider ({children} : {children : any}) {
    const [datas, setDatas] = useState({
        data : '',
        state : 'loading'
    });

    return (
        <GeneralContext.Provider value={{datas, setDatas}}>
            {children}
        </GeneralContext.Provider>
    );
};

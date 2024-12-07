import { ReactNode } from "react";

function HomeMainDiv({children, classes} : {children : ReactNode, classes? : string}) {
    return <div className={classes}>
        {children}
    </div>
}
export default HomeMainDiv;
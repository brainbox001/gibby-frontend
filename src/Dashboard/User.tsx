import { useContext, useEffect } from "react";
import { GeneralContext } from "../GeneralContext";
import { useNavigate } from "react-router-dom";
import { parseBalance } from "./Dashboard";
import DashboardNavbar from "./DashboardNav";

function User() {
    const context = useContext(GeneralContext);
    if (!context) throw new Error("Footer must be used within a ContextProvider");
    const navigate = useNavigate();
    const { datas } = context;

    useEffect(() => {
        if (!datas.data) {
            navigate('/');
        };
    });

    async function handleLogout () {
          try {
            await fetch('https://gibby-app.onrender.com/user/logout', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json', 'personal' : 'gibby-frontend' },
              });
            window.location.href = '/';
    
        } catch (error:any) {
            window.location.href = '/';
        };
    
      };

    if (!!datas.data) {
        const date = new Date(datas.data.message.created_at).toDateString();
        return (
            <div className="sm:flex sm:flex-row-reverse sm:h-screen">
                <div className="pt-14 shadow-xl pb-10 sm:basis-4/5">
                    <div className="flex justify-between m-2 sm:m-4 text-slate-600">
                        <div className="text-xl font-bold">
                            <span className="mr-2">
                                {datas.data.message.firstName}
                            </span>
                            <span>
                                {datas.data.message.lastName}
                            </span>
                        </div>
                        <div className="font-bold relative">
                            {datas.data.message.email}
                            <button className="text-white bg-black p-0.4 mt-0.5 block absolute right-1" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                    <div className="text-center mt-9 font-semibold">
                        <span className="text-slate-500 mr-0.5">balance :</span>
                        {parseBalance(datas.data.message.balance)}
                    </div>
                    <div className="mt-9 font-semibold m-3">
                        <span className="text-slate-500 mr-0.5">Joined :</span>
                        {date}
                    </div>
                </div>
                <DashboardNavbar col="sm:bg-white" />
            </div>
        )
    };
};
export default User;

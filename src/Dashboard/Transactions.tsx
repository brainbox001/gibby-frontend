import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import { parseBalance } from "./Dashboard";
import API_URL from "../../config/api_url";

function Transaction() {
    let navigate = useNavigate();
    const getTransaction = async () => {
        try {
            const response = await fetch(
                `${API_URL}/transaction/`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        personal: "gibby-frontend",
                    },
                }
            );
            const message = await response.json();
            const status = response.status;
            return { message, status };
        } catch (e: any) {
            throw new Error(e);
        }
    };

    let queryKey = ["getTrans"];
    const { isPending, error, data } = useQuery({
        queryKey,
        queryFn: getTransaction,
        staleTime: 1000 * 5 * 60
    });

    if (isPending) {
        return <Loader parentClass="" childClasses="h-0.5 w-0.5 bg-blue-600" animateClass="add" />
    }

    if (error) {
        return (
            <div className="grid grid-cols-1 place-items-center mt-10 text-white text-rose-600 z-10">
                <div className="bg-rose-500 px-3 sm:px-4 sm:py-3 md:px-9 py-2 rounded-xl text-sm sm:text-lg">
                    <span>
                        An error occured while connecting check your network connection..
                    </span>
                </div>
            </div>
        );
    }

    if (data && data.status === 315) {
        navigate('/');
    };
    return (
        <div className="sm:flex sm:flex-row-reverse bg-slate-100">
        <div className="grid grid-cols-1 place-items-center sm:basis-4/5 gap-4 px-4 py-14 bg-slate-100">
            {data.message.length > 0 ?
                data.message.map((items: any, index:number) => {
                    let date = new Date(items.created_at).toDateString();
                    return (<div key={items.reference} className={`${index % 2 !== 0 ? 'bg-white' : 'bg-slate-200'} flex flex-nowrap w-full py-4 font-semibold`}>
                        <div className="basis-1/2 mr-2">
                            {items.goal}
                        </div>
                        <div className="basis-1/4 mr-2">
                            {parseBalance(items.target)}
                        </div>
                        <div className="basis-1/2 mr-2">
                            {date}
                        </div>
                    </div>)
                })
                :
                <div><div className="text-slate-500 text-center ml-10 mt-16">
                    Your transactions will appear here.
                </div></div>
            }
        </div>
        </div>
    )

};

export default Transaction;

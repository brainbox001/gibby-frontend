import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { calculateTimeLeft, colorChange, parseBalance } from "./Dashboard";
import Loader from "../Loader";

function TransDetails() {
    let location = useLocation();
    const navigate = useNavigate();

    const state = location.state;
    const modalRef = useRef<any>(null);
    const cashOutRef = useRef(null);
    const toolpitRef = useRef<any>(null);

    const [input, setInput] = useState<{ isOpen: boolean, value: number | string }>({
        isOpen: false,
        value: ''
    });

    const [status, setStatus] = useState({
        error: '',
        state: 'not loading'
    });

    useEffect(() => {
        if (!state || !state.goal) {
            navigate('/');
        };

    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setInput({
                    ...input,
                    isOpen: false
                });
                setStatus({
                    error : '',
                    state : 'not loading'
                });
            }
        };

        if (input.isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [input.isOpen]);

    const handleMouseEnter = () => {
        toolpitRef.current.classList.remove('hidden');
        toolpitRef.current.classList.add('block');
    };

    const handleMouseLeave = () => {
        toolpitRef.current.classList.remove('block');
        toolpitRef.current.classList.add('hidden');
    };

    function handleNav() {
        navigate('/');
    };

    function handleClick() {
        setInput({
            ...input,
            isOpen: !input.isOpen
        });
    };

    function handleInputChange(e: any) {
        setInput({
            ...input,
            value: e.target.value
        });
    };

    async function handleSubmit(e: any) {
        e.preventDefault();

        if (input.value as number > 499) {
            setStatus({
                error: '',
                state: 'loading'
            });

            try {
                const response = await fetch('https://gibby-app.onrender.com/transaction/pay', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json', 'personal': 'gibby-frontend' },
                    body: JSON.stringify({ add: true, startAmount: input.value, _transRef: state.reference }),
                });
                const data = await response.json();

                if (response.status === 200) {
                    window.open(data.authorization_url);
                    navigate(0);
                } else {
                    setStatus({
                        state: 'error',
                        error: data.error
                    });
                }

            } catch (error: any) {
                setStatus({
                    state: 'error',
                    error: "An error occured, try again"
                });
            };

        } else {
            setStatus({
                state: 'error',
                error: "500 is the least amount to deposit"
            });
        };

    };

    if (state && state.goal) {
        const progress = Math.floor(
            (state.startAmount / state.target) * 100
        );
        const col = colorChange(progress);
        return (
            <div>
                <div className="bg-slate-100 h-screen sm:px-4">
                    <div className="absolute py-3">
                        <button onClick={handleNav}>
                            <img className="w-4" src="/prev-arrow.png" alt="left-arrow" />
                        </button>
                    </div>
                    <div className="px-4 py-10.5 bg-white rounded-2xl">
                        <div className="text-xl font-bold">
                            {state.goal}
                        </div>
                        <div className="pt-0.5 text-slate-400">{calculateTimeLeft(parseInt(state.duration))}</div>
                    </div>
                    <div className="my-4 mx-3 font-bold">Active Savings</div>
                    <div className="mx-4 bg-white px-3 py-4 rounded-2xl relative">
                        <div className="absolute right-4 bg-blue-100 rounded-4xl p-0.4">
                            <img className="w-3" src="/naira.png" alt="naira-img" />
                        </div>
                        <div className="font-semibold text-lg">
                            <img className="inline w-2.6 pb-1" src="/naira-1.png" alt="amount-img" />
                            {parseBalance(state.startAmount)}
                        </div>
                        <div className="text-slate-500 font-semibold mb-0.5">
                            <span>Target : </span>
                            <img className="inline w-2.6 pb-1 opacity-50" src="/naira-1.png" alt="target-img" />
                            {parseBalance(state.target)}
                        </div>
                        <div className="relative pt-3 text-slate-500">
                            <div className="absolute right-0 bottom-2">
                                {progress}% saved
                            </div>
                            <div className=" border bg-slate-100 rounded-xl h-0.4 mt-3 w-4/5">
                                <div
                                    className={`h-0.4 ${col} rounded-xl`}
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div ref={modalRef} className="flex justify-evenly mt-4 relative">
                        <div ref={toolpitRef} className="absolute left-3 bottom-9 rounded font-semibold text-sm bg-slate-600 px-0.4 text-white min-[550px]:left-9 md:left-10.5 min-[950px]:left-16.5 hidden">Cashout unavailable for now</div>
                        <div ref={cashOutRef} className="font-semibold text-blue-600 bg-blue-100 rounded-xl" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <button className="px-3 py-0.5 rounded-xl" disabled={state.duration > Date.now()}>Cash Out</button>
                        </div>
                        <div className="font-semibold text-white bg-blue-600 rounded-xl">
                            <button className="px-3 py-0.5 rounded-xl" onClick={handleClick}>
                                + Add
                            </button>
                        </div>
                        {
                            input.isOpen && (
                                <div className="absolute h-14 w-16.5 bottom-9 right-3 bg-white flex flex-col justify-center shadow-2xl min-[550px]:right-9 md:right-10.5 min-[900px]:right-14 md:w-18 md:h-16">
                                    {status.state === 'error' &&
                                        <div className="text-center my-3 text-sm sm:text-base text-rose-600">{status.error}</div>
                                    }
                                    <div className="mx-3">
                                        <form onSubmit={handleSubmit}>
                                            <input className="h-4.5 mb-3 w-full border-slate-300 border-2 rounded-lg outline-none focus:border-blue-600 placeholder:font-semibold placeholder:text-slate-600 pl-2" type="number" name="amount" id="amount" placeholder="Amount" value={input.value} onChange={handleInputChange} />
                                            <div className="text-center mb-3">
                                                <button className="bg-black text-white px-0.5 py-0.4 font-semibold rounded-lg" type="submit">
                                                    {
                                                        status.state === 'loading' ?
                                                            <Loader parentClass="" childClasses="" animateClass="add" />
                                                            :
                                                            'Top'
                                                    }
                                                </button>
                                            </div>
                                        </form>
                                    </div>

                                </div>
                            )
                        }
                    </div>

                </div>
            </div>
        )
    }
};
export default TransDetails;

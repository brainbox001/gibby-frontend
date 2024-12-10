import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import DashboardNavbar from "./DashboardNav";
import Deposit from "./Deposit";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Dashboard({
  userData,
}: {
  userData: { message: any; status: number };
}) {
  let rightArrowRef = useRef<any>(null);
  let leftArrowRef = useRef<any>(null);
  let scrollDivRef = useRef<any>(null);

  let location = useLocation();
    const navigate = useNavigate();

    const state = location.state;

    useEffect(() => {
      document.title = 'User Dashboard';
        if (!state || !state.goal) {
            navigate('/');
        };

    }, []);

  const [deposit, setDeposit] = useState(false);

  const getSavings = async () => {
    try {
      const response = await fetch(
        "https://gibby-app.onrender.com/transaction/savings",
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

  let queryKey = ["getUserSaving"];
  const { isPending, error, data } = useQuery({
    queryKey,
    queryFn: getSavings,
    staleTime: 1000 * 60 * 5,
  });

  function scrollLeft(){
    let width = 0 - scrollDivRef.current.clientWidth;
    scrollDivRef.current.scrollBy({ left: width, behavior: 'smooth' });
  };

  function scrollRight(){
    let width = scrollDivRef.current.clientWidth;
    scrollDivRef.current.scrollBy({ left: width, behavior: 'smooth' });
  };

  function handleScroll(e: any) {
    const total = e.target.scrollLeft + e.target.clientWidth;
    if (e.target.scrollLeft > 0) {
      leftArrowRef.current.classList.remove('hidden');
      leftArrowRef.current.classList.add('inline');
    }
    else {
      leftArrowRef.current.classList.remove('inline');
      leftArrowRef.current.classList.add('hidden');
    };

    if (total >= e.target.scrollWidth) {
      rightArrowRef.current.classList.remove('inline');
      rightArrowRef.current.classList.add('hidden');
      
    }
    else {
      rightArrowRef.current.classList.remove('hidden');
      rightArrowRef.current.classList.add('inline');
    };
  };

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
  };

  if (deposit) {
    return <Deposit />
  };

  return (
    <div className="box-border w-screen">
    <div className="grid w-full grid-cols-1 bg-slate-100 sm:flex sm:flex-row-reverse">
      {isPending ? (
        <Loader
          parentClass=""
          childClasses="h-0.5 w-0.5 bg-blue-600"
          animateClass="add"
        />
      ) : (
        <>
        <div className="bg-slate-100 flex flex-col sm:basis-4/5">
          <div className="flex flex-col place-items-center bg-white pt-9 pb-4 sm:m-9 md:mx-10.5 rounded-xl relative">
            <div className="pb-3">
              <img src="/naira.png" alt="naira-sign" />
            </div>
            <div className="pb-3 text-3xl font-bold">
              {parseBalance(userData.message.balance)}
            </div>
            <div>
              <button className="bg-blue-600 p-0.5 rounded text-white" onClick={() => setDeposit(true)}>
                Deposit
              </button>
            </div>
          </div>
          <div className="px-3 py-9">
            <div className="flex justify-between pb-4">
              <div className="font-bold">My Savings</div>
              <div>
                <img
                  className="w-3.5 inline"
                  src="/free_icon_1.svg"
                  alt="slide-arrow"
                />
              </div>
            </div>
            {data && data.status === 200 && (
              <>
              <div className="hidden md:block relative">
              <div ref={leftArrowRef} className="sm:absolute hidden h-10 bg-white rounded-4xl top-10.5 cursor-pointer" onClick={scrollLeft}>
                <img src="/left-arrow.png" alt="left-arrow" />
              </div>
              <div ref={rightArrowRef} className="sm:absolute h-10 bg-white rounded-4xl top-10.5 right-0 cursor-pointer" onClick={scrollRight}>
                <img src="/right-arrow.png" alt="right-arrow" />
              </div>
              </div>

              <div
              ref={scrollDivRef}
                className="overflow-x-auto scrollbar-hide w-21.6 min-[600px]:w-[480px] md:w-[600px] lg:w-[750px] flex flex-nowrap max-[360px]:pb-16"
                onScroll={handleScroll}
              >
                {data.message.length > 0 ? (
                  data.message.map((item: any) => {
                    const progress = Math.floor(
                      (item.startAmount / item.target) * 100
                    );
                    const col = colorChange(progress);
                    return (
                      <div
                        key={item.reference}
                        className="bg-white px-3 pt-9 pb-4 rounded-2xl w-60"
                      >
                        <Link to={`/trans/details/${item.reference}`} state={item}>
                        <div className="font-bold text-lg">{item.goal}</div>
                        <div className="pb-4.5 text-slate-500 pt-0.4">
                          {calculateTimeLeft(parseInt(item.duration))}
                        </div>
                        <div className="grid grid-cols-1 place-content-between">
                          <div className="font-semibold">
                            <img className="inline w-2.6 pb-1" src="/naira-1.png" alt="amount-img" />
                            {parseBalance(item.startAmount)}
                          </div>
                          <div className="text-slate-500 font-semibold">
                          <img className="inline w-2.6 pb-1 opacity-50" src="/naira-1.png" alt="target-img" />
                            {parseBalance(item.target)}
                          </div>
                          <div className="col-span-2 relative pt-3 text-slate-500">
                            <div className="absolute right-0 bottom-2">
                              {progress}% saved
                            </div>
                            <div className=" border bg-slate-100 rounded-xl h-0.4 mt-3">
                              <div
                                className={`h-0.4 ${col} rounded-xl`}
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-slate-500 ml-10 mt-10">
                    Your savings will appear here.
                  </div>
                )}
              </div>
              </>
            )}
          </div>
        </div>
        <DashboardNavbar />
        </>
      )}
    </div>
    </div>
  );
}

export function calculateTimeLeft(date: number) {
  const currentDate = Date.now();

  let yearsLeft = Math.floor(
    (date - currentDate) / (1000 * 60 * 60 * 24 * 360)
  );
  let monthsLeft = Math.floor(
    (date - currentDate) / (1000 * 60 * 60 * 24 * 30)
  );
  let daysLeft = Math.floor((date - currentDate) / (1000 * 60 * 60 * 24));
  let hoursLeft = Math.floor((date - currentDate) / (1000 * 60 * 60));
  let minutesLeft = Math.floor((date - currentDate) / (1000 * 60));

  if (yearsLeft > 0) {
    return yearsLeft === 1 ? "A Year left" : `${yearsLeft} Years left`;
  }
  if (monthsLeft > 0) {
    return yearsLeft === 1 ? "A Month left" : `${monthsLeft} Months left`;
  }
  if (daysLeft > 0) {
    return daysLeft === 1 ? "A Day left" : `${daysLeft} Days left`;
  }
  if (hoursLeft > 0) {
    return hoursLeft === 1 ? "An Hour left" : `${hoursLeft} Hours left`;
  }

  if (minutesLeft > 0) {
    return minutesLeft === 1 ? "A Minute left" : `${minutesLeft} Minutes left`;
  }

  return "Duration elapsed";
}

export function colorChange(progress: number) {
  if (progress >= 95) return "bg-green-700";
  if (progress >= 50 && progress < 95) return "bg-blue-600";
  return "bg-rose-600";
}

export function parseBalance(balance: number) {
  let parsed = "";
  let mod = 0;
  let count = 0;
  if (balance === 0) parsed = "0.00";
  while (balance > 0) {
    if (count === 3) {
      parsed = "," + parsed;
      count = 0;
    }
    mod = balance % 10;
    parsed = mod + parsed;
    balance = Math.floor(balance / 10);
    count++;
  }
  return parsed;
}

export default Dashboard;

import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader";
import Deposit from "./Deposit";
import { useEffect, useState, useContext } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import API_URL from "../../config/api_url";
import { GeneralContext } from "../GeneralContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "../../index.css";
import * as Dialog from "@radix-ui/react-dialog";

function Dashboard({}) {

  // let location = useLocation();
  // const navigate = useNavigate();

  // const state = location.state;

  const context = useContext(GeneralContext);
  if (!context) throw new Error("Footer must be used within a ContextProvider");

  const { datas } = context;
  const userData = datas.data;

  // console.log("reached here");

  useEffect(() => {
    document.title = "User Dashboard";
    // if (!state || !state.goal) {
    //   navigate("/");
    // }
  }, []);

  const [deposit, setDeposit] = useState(false);

  const getSavings = async () => {
    try {
      const response = await fetch(`${API_URL}/transaction/savings`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          personal: "gibby-frontend",
        },
      });
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

  return (
    <div className="mr-4 mt-4">
      {isPending ? (
        <Loader
          parentClass=""
          childClasses="h-0.5 w-0.5 bg-blue-600"
          animateClass="add"
        />
      ) : (
        userData &&
        userData.message && (
          <>
            <div className="flex flex-col justify-between items-center mb-4">
              <Dialog.Root open={deposit} onOpenChange={setDeposit}>
              <div className="flex flex-col justify-between items-center bg-white shadow-lg rounded-lg p-4 sm:p-6 w-full">
                <div className="my-2">
                  <img src="/naira.png" alt="naira-sign" />
                </div>
                <div className="text-3xl my-2 font-bold">
                  {parseBalance(userData.message.balance)}
                </div>
                <Dialog.Trigger asChild>
                <div>
                  <button
                    className="bg-blue-600 my-2 rounded-lg py-2 px-3 text-white font-semibold"
                    onClick={() => setDeposit(true)}
                  >
                    Deposit
                  </button>
                </div>
                </Dialog.Trigger>
              </div>

              <Deposit setDeposit={setDeposit} />

              <div className="w-full my-8">
                <div className="flex justify-between items-center">
                  <div className="font-semibold">My Savings</div>
                  <div>
                    <RiArrowRightLine size={20} className="text-blue-600" />
                  </div>
                </div>

                {data && data.status === 200 && (
                  <>
                    <div className="mt-3">
                      <Swiper
                        slidesPerView={2}
                        spaceBetween={20}
                        pagination={{ clickable: true }}
                        modules={[Pagination]}
                        className="mySwiper"
                      >
                        {data.message.length > 0 ? (
                          data.message.map((item: any) => {
                            const progress = Math.floor(
                              (item.startAmount / item.target) * 100
                            );
                            const col = colorChange(progress);
                            return (
                              <SwiperSlide key={item.reference}>
                                <div className="bg-white px-3 pt-9 pb-4 rounded-2xl shadow w-56">
                                  <Link
                                    to={`/dashboard/trans/details/${item.reference}`}
                                    state={item}
                                  >
                                    <div className="font-bold text-lg">
                                      {item.goal}
                                    </div>
                                    <div className="pb-4 text-slate-500">
                                      {calculateTimeLeft(
                                        parseInt(item.duration)
                                      )}
                                    </div>

                                    <div className="grid gap-2">
                                      <div className="font-semibold">
                                        <img
                                          className="inline w-3 pb-1"
                                          src="/naira-1.png"
                                          alt="amount-img"
                                        />
                                        {parseBalance(item.startAmount)}
                                      </div>
                                      <div className="text-slate-500 font-semibold">
                                        <img
                                          className="inline w-3 pb-1 opacity-50"
                                          src="/naira-1.png"
                                          alt="target-img"
                                        />
                                        {parseBalance(item.target)}
                                      </div>

                                      <div className="relative pt-3 text-slate-500">
                                        <div className="absolute right-0 bottom-2">
                                          {progress}% saved
                                        </div>
                                        <div className="border bg-slate-100 rounded-xl h-1 mt-3">
                                          <div
                                            className={`h-1 ${col} rounded-xl`}
                                            style={{ width: `${progress}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                </div>
                              </SwiperSlide>
                            );
                          })
                        ) : (
                          <div className="text-slate-500 ml-10 mt-10">
                            Your savings will appear here.
                          </div>
                        )}
                      </Swiper>
                    </div>
                  </>
                )}
              </div>
              </Dialog.Root>
            </div>
          </>
        )
      )}
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
    return monthsLeft === 1 ? "A Month left" : `${monthsLeft} Months left`;
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

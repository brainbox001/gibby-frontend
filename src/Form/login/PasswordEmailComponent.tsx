import { useEffect, useRef} from "react";
import { useLocation } from "react-router-dom";
import Loader from "../../Loader";

function PassWordEmailComponent({
  processes,
  setProcesses,
}: {
  processes: any;
  setProcesses: any;
}) {
  const location = useLocation();
  
  const errorDivRef: any = useRef();

  const state = location.state;
  let userEmail: string;
  if (state) userEmail = state["userEmail"];

  useEffect(() => {
    if (!!userEmail) setProcesses({
        ...processes,
        email : userEmail
    });
  }, [state]);

  function handleEmailChange(e: any) {
    setProcesses({
        ...processes,
        email : e.target.value
    });
  }

  async function handleSearch(e: any) {
    e.preventDefault();
    if (!!processes.email) {
        setProcesses({
            ...processes,
            state : 'loading'
        })
      try {
        const response = await fetch(
          "https://gibby-app.onrender.com/user/user-password-reset",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              personal: "gibby-frontend",
            },
            body: JSON.stringify({ email : processes.email }),
          }
        );
        const data = await response.json();
        if (response.status === 210) {
          setProcesses({
            ...processes,
            status: 210,
            state: "not loading",
            step: 2,
          });
        } else {
          setProcesses({
            ...processes,
            state: "error-response",
            status: response.status,
            response: data.message,
          });
        }
      } catch (error: any) {
        errorDivRef.current.classList.remove("hidden");
        errorDivRef.current.classList.add("block");

        setProcesses({
          ...processes,
          state: "error",
          status: 0,
        });
      };
    }
  }

  function handleClick() {
    errorDivRef.current.classList.remove("block");
    errorDivRef.current.classList.add("hidden");
  };

  return (
    <div className="mb-14">
      <div
        ref={errorDivRef}
        className={`${
          processes.state === "error" ? "block" : "hidden"
        } grid grid-cols-1 place-items-center text-white text-rose-600`}
      >
        <div className="bg-rose-500 px-3 sm:px-4 sm:py-3 md:px-9 py-2 rounded-xl text-sm sm:text-lg">
          <span>An error occured while connecting...</span>
          <span
            onClick={handleSearch}
            className="mx-3 underline font-semibold cursor-pointer"
          >
            {" "}
            Try again
          </span>
          <span onClick={handleClick} className="font-bold cursor-pointer">
            X
          </span>
        </div>
      </div>

      <div className="mt-10 mx-3 shadow-2xl shadow-blue-200 sm:mx-14 md:mx-16 lg:mx-18 xl:mx-21.5 rounded-2xl">
        <div className="py-4 text-lg font-semibold pl-3">
          Enter email to find account
        </div>
        <div
          className={`${processes.state === "error-response" ? "py-3.5" : " "} text-center font-semibold text-rose-600`}
        >
          {processes.response}
        </div>

        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 gap-3 place-items-center">
            <div className="mb-4">
              <input
                className="placeholder-place-col w-21 max-[380px]:w-18 h-4.5 focus:outline-none border-blue-600 border-2 rounded-4xl pl-2"
                type="text"
                value={processes.email}
                name="email"
                onChange={handleEmailChange}
                id="email-id"
                placeholder="Email"
              />
            </div>

            <div className="mb-4.5">
              <button
                type="submit"
                className={`${
                  !processes.email
                    ? "bg-gray-200 text-gray-600"
                    : "bg-blue-600 text-white"
                } px-3 py-2 rounded-4xl`}
                disabled={!processes.email}
              >
                {processes.state === "loading" ? (
                  <div>
                    <Loader
                      parentClass=""
                      childClasses="h-0.5 w-0.5 bg-white"
                      animateClass="add"
                    />
                  </div>
                ) : (
                  "Find account"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default PassWordEmailComponent;

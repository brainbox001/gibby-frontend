import { useState } from "react";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

function Deposit({customClass} : {customClass? : string}) {
  const [inputValues, setInputValues] = useState({
    goal: "",
    target: "",
    startAmount: "",
    duration: 1,
    durationSelect: "Days",
  });
  let navigate = useNavigate();
  const [status, setStatus] = useState({
    state : 'not loading',
    error : ''
  });

  function handleChange(e: any) {
    const { name, value } = e.target;

    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSelectChange(e: { target: { value: any } }) {
    setInputValues((prev) => ({
      ...prev,
      durationSelect: e.target.value,
    }));
  };

  async function handleSubmit (e : any) {
    e.preventDefault();
    if(!!inputValues.goal && parseInt(inputValues.target) > 999 && (parseInt(inputValues.startAmount) > 499) && parseInt(inputValues.startAmount) <= parseInt(inputValues.target) && inputValues.duration > 0) {
      setStatus({
        ...status,
        state : 'loading'
      })
      const Datetime : any = {
        Days : 24 * 60 * 60 * 1000,
        Months : 30 * 24 * 60 * 60 * 1000,
        Years : 360 * 24 * 60 * 60 * 1000
      };
      const duration = inputValues.duration * Datetime[inputValues.durationSelect];
      const startAmount = parseInt(inputValues.startAmount);
      const target = parseInt(inputValues.target);
      const goal = inputValues.goal;

      try {
        const response = await fetch('https://gibby-app.onrender.com/transaction/pay', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', 'personal' : 'gibby-frontend' },
            body: JSON.stringify({duration, target, startAmount, goal}),
          });
        const data = await response.json();
        if(response.status === 200) {
          window.open(data.authorization_url);
          navigate(0);

        } else {
          setStatus({
            state : 'error',
            error : data.error
          });
        };

    } catch (error:any) {
        setStatus({
          state : 'error',
          error : 'An error occoured while trying to make payment'
        });
    };

    } else {
      setStatus({
        state : 'error',
        error : 'Your information may be inaccurate'
      });
    };

  };

  return (
    <div className={customClass}>
      <div className="w-21 sm:w-21.6 m-auto shadow-xl rounded-xl mt-10">
        {status.state === 'error' && 
          <div className="text-center text-rose-600">{status.error}</div>
        }
        <div className="flex flex-col justify-center items-center relative bg-white">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block italic text-blue-500 font-thin my-0.5" htmlFor="goal">
                What are you saving for?
              </label>
              <input
                className="w-18 h-4.5 placeholder-place-col focus:outline-blue-600 border-slate-200 border-2 rounded-md pl-2"
                value={inputValues.goal}
                onChange={handleChange}
                type="text"
                name="goal"
                id="goal"
                placeholder="Enter goal"
              />
            </div>
            <div>
              <label className="block italic text-blue-500 font-thin my-0.5" htmlFor="target-amount">
                Target amount in NGN, min 1000
              </label>
              <input
                className="w-18 h-4.5 placeholder-place-col focus:outline-blue-600 border-slate-200 border-2 rounded-md pl-2"
                value={inputValues.target}
                onChange={handleChange}
                type="text"
                name="target"
                id="target-amount"
                placeholder="Enter target"
              />
            </div>
            <div>
              <label className="block italic text-blue-500 font-thin my-0.5" htmlFor="start-amount">
                Start amount in NGN
              </label>
              <input
                className="w-18 h-4.5 placeholder-place-col focus:outline-blue-600 border-slate-200 border-2 rounded-md pl-2"
                type="text"
                value={inputValues.startAmount}
                onChange={handleChange}
                name="startAmount"
                id="start-amount"
                placeholder="Start amount"
              />
            </div>
            <div className="pt-2">
              <label className="italic text-blue-500 font-thin px-2" htmlFor="duration">Lock duration:</label>
              <input
                className="w-4.5 h-4 focus:outline-blue-600 px-2"
                type="number"
                value={inputValues.duration}
                onChange={handleChange}
                name="duration"
                id="duration"
              />
              <select
              className="focus:outline-blue-600 px-2"
                value={inputValues.durationSelect}
                onChange={handleSelectChange}
              >
                <option value="Days">Days</option>
                <option value="Months">Months</option>
                <option value="Years">Years</option>
              </select>
            </div>
            <div className="text-center py-4.5">
              <button type="submit" className="bg-blue-600 text-white px-3.5 py-0.5 rounded">
                {
                  status.state === 'loading' ?
                  <Loader parentClass="" childClasses="" animateClass="add" />
                  :
                  'Pay'
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Deposit;

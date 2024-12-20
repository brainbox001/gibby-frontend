import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loader from "../Loader";

function VerifyPayment() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState({
    state: "loading",
    status: 0,
    data : ""
  });

  const navigate = useNavigate();

  const target = searchParams.get("target");
  const startAmount = searchParams.get("startAmount");
  const duration = searchParams.get("duration");
  const goal = decodeURIComponent(searchParams.get("goal") || ' ');
  const reference = searchParams.get("reference");
  const email = searchParams.get("email");
  const _transRef = searchParams.get("_transRef");
  let add : string | boolean | null = searchParams.get("add");
  add = add === 'true';

  const hasExecuted = useRef(false);

  async function handleVerification() {
  
    if (hasExecuted.current) return;
    hasExecuted.current = true;
    try {
      const response = await fetch("https://gibby-app.onrender.com/transaction/verify", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          personal: "gibby-frontend",
        },
        body: JSON.stringify({
          duration,
          target,
          startAmount,
          goal,
          reference,
          email,
          add,
          _transRef
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        setStatus({
          data : data.message,
          state: "not loading",
          status : 200
        });
      } else {
        setStatus({
          data : data.error,
          status: response.status,
          state: "not loading",
        });
      }
    } catch (error: any) {
      setStatus({
        data : "An error occoured while trying to make payment",
        state: "error",
        status: 500,
      });
    }
  }

  useEffect(() => {
    handleVerification();
  }, []);
  if(status.state === 'loading') return <div className="mt-4.5">
    <Loader parentClass="" childClasses="h-0.5 w-0.5 bg-blue-600" animateClass="add" />
    </div>

  if (status.status === 200) {
    navigate('/');
  }
  if(status.status === 319) return (
    <div className="text-rose-600 grid grid-cols-1 place-items-center mt-14">
      <div>
      {status.data}
      <button className="bg-blue-600 ml-0.5 px-0.5 sm:ml-4 sm:px-3 text-white rounded py-0.5" onClick={handleVerification}>retry</button>
        </div>
    </div>
  )
}

export default VerifyPayment;

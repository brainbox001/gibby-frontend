import { useState, useRef} from "react";
import VerifyFormInput from "./VerifyFormInput";
import Loader from "../../Loader";
import API_URL from "../../../config/api_url";

function VerifyEmail({email, forPasswordChange, processes, setProcesses} :{email : string, forPasswordChange? : boolean, processes? : any, setProcesses? : any}){

    const inputRef1 : any = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();
    const inputRef4 = useRef();
    const inputRef5 = useRef();
    const inputRef6 = useRef();

    const errorDivRef : any = useRef();

    const [codes, setCodes] = useState<any>({
        "1" : "",
        "2" : "",
        "3" : "",
        "4" : "",
        "5" : "",
        "6" : ""
    });

    const [curr, setCurr] = useState(1);
    const [status, setStatus] = useState({
        state : 'not loading',
        status : 0,
        error : '',
        data : ''
    });
      
    const refs = {
        1 : inputRef1,
        2 :inputRef2,
        3 :inputRef3,
        4 : inputRef4,
        5: inputRef5,
        6: inputRef6
    };
    

    async function handleSubmit (e: any) {
        e.preventDefault();
        
        if (!!codes['1'] && !!codes['2'] && !!codes['3'] && !!codes['4'] && !!codes['5'] && !!codes['6']) {
            let code = '';
        
            for (const char in codes) {
              code += codes[char];
            }
            setStatus({
                ...status,
                state : 'loading'
            })
            try {
                const requestBody : any = {code, email};
                if(forPasswordChange) requestBody['forPasswordChange'] = true
        
                const response = await fetch(`${API_URL}/user/verify-user`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json', 'personal' : 'gibby-frontend' },
                    body: JSON.stringify(requestBody),
                  });
                const data = await response.json();
                
                if (response.status === 215) {
                    setProcesses({
                        ...processes,
                        step : 3,
                        state : 'not loading', 
                        isVerified : true
                    })
                };

                if (response.status === 200) {
                    window.location.href = '/dashboard';
                }
                else {
                    setStatus({
                    ...status,
                    state : 'error-response', 
                    status:response.status, 
                    error: data.error
                });
            };

    
            } catch (error:any) {
                errorDivRef.current.classList.remove("hidden");
                errorDivRef.current.classList.add("block");
                
                setStatus({
                    ...status,
                    state : 'error',
                    status : 0,
                });
            };
          }
    }
  
    function handleInputFocus(ref : any) {
        if(ref) ref.current.focus();
    }

    function handleResetClick(){
        let initialize = {
            "1" : "",
            "2" : "",
            "3" : "",
            "4" : "",
            "5" : "",
            "6" : ""
        };
        setCodes(initialize);
        setCurr(1);
    };

    function handleClick() {
        errorDivRef.current.classList.remove("block");
        errorDivRef.current.classList.add("hidden");
    };

    return (
        <>
        <div ref={errorDivRef} className={`${status.state === 'error' ? 'block' : 'hidden'} grid grid-cols-1 place-items-center text-white text-rose-600 z-10 `}>
            <div className="bg-rose-500 px-3 sm:px-4 sm:py-3 md:px-9 py-2 rounded-xl text-sm sm:text-lg">
                <span>An error occured while connecting...</span>
                <span onClick={handleSubmit} className="mx-3 underline font-semibold cursor-pointer"> Try again</span>
                <span onClick={handleClick} className="font-bold cursor-pointer">X</span> 
            </div>
            </div>

        <div className="shadow-xl sm:w-5/6 lg:w-3/5">

            <div className="mt-10 ml-4 font-bold text-xl">Enter verification code</div>
            <div className="ml-4 text-rose-600">A verification code has been sent to your email</div>
            <div className="text-center my-3.5 font-semibold text-rose-600 pt-10">{status.error}</div>
            <div className="grid grid-cols-6 w-full sm:ml-10.5 md:ml-14 lg:ml-16 sm:w-21.6 place-content-center pb-3">
                <VerifyFormInput refs={refs} codes={codes} num="1" setCodes={setCodes} handleInputFocus={handleInputFocus} curr={curr} setCurr={setCurr} />
                <VerifyFormInput refs={refs} codes={codes} num="2" setCodes={setCodes} handleInputFocus={handleInputFocus} curr={curr} setCurr={setCurr} />
                <VerifyFormInput refs={refs} codes={codes} num="3" setCodes={setCodes} handleInputFocus={handleInputFocus} curr={curr} setCurr={setCurr} />
                <VerifyFormInput refs={refs} codes={codes} num="4" setCodes={setCodes} handleInputFocus={handleInputFocus} curr={curr} setCurr={setCurr} />
                <VerifyFormInput refs={refs} codes={codes} num="5" setCodes={setCodes} handleInputFocus={handleInputFocus} curr={curr} setCurr={setCurr} />
                <VerifyFormInput refs={refs} codes={codes} num="6" setCodes={setCodes} handleInputFocus={handleInputFocus} curr={curr} setCurr={setCurr} />

                <div className="flex flex-row items-center my-3">
                <div className="text-blue-600 font-semibold underline decoration-2 cursor-pointer mx-3" onClick={handleResetClick}>reset</div>

                <div className="mx-0.5">
                <button className="font-semibold bg-blue-600 rounded-md px-1 py-1 text-white" onClick={handleSubmit} disabled={status.state === 'loading'}>submit</button>
                </div>

                <div className={`${status.state === 'loading' ? 'inline' : 'hidden'}`}>
                <Loader parentClass="" childClasses="h-0.5 w-0.5 bg-blue-600" />
                </div>

                </div>
            </div>
            <div className="font-semibold mx-3 py-4">Didn't get a code?
                <button className="mx-2 text-blue-700 underline decoration-2" disabled={status.state === 'loading'}> resend</button>
            </div>
        </div>
        </>
    )
};
export default VerifyEmail;

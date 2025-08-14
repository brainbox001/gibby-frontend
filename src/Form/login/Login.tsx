import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../Loader";
import VerifyEmail from "../verify-email/VerifyEmail";
import API_URL from "../../../config/api_url";

function Login () {
    useEffect(() => {  
        document.title = 'Gibby - Login';
    }, []);

    const [form, setForm] = useState({
        email : '',
        password : ''
    });
    
    const [typeChange, setTypeChange] = useState(false);
    const [status, setStatus] = useState({
        state : 'not loading',
        status : 0,
        error : '',
        data : ''
    });

    const errorDivRef : any = useRef();

    function handleEmailChange(e: any){
        setForm({
            ...form,
            email : e.target.value
        });
    };

    function handlePasswordChange(e: any){
        setForm({
            ...form,
            password : e.target.value
        });
    };
    
    async function handleSubmit(e : any) {
        e.preventDefault();

        if(!!form.email && !!form.password) {
            setStatus({
                ...status,
                state : 'loading'
            });
            try {
                const response = await fetch(`${API_URL}/user/login`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json', 'personal' : 'gibby-frontend' },
                    body: JSON.stringify(form),
                  });
                const data = await response.json();
                  console.log(response)
                if (response.status === 215) {
                    setStatus({
                        ...status,
                        state : 'not loading', 
                        status: 215, 
                        error : data.email
                    });
                }
                else if (response.status === 200) {
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
    };

    function handleClick() {
        errorDivRef.current.classList.remove("block");
        errorDivRef.current.classList.add("hidden");
    };

    return (
        <>
        <div className="w-20">
            <Link to='/'>
                <img className="h-20 w-full object-contain mx-4 mt-6" src="/gibby-logo.png" alt="gibby-logo" />
            </Link>
         </div>
        {status.status === 215
            ?
            <VerifyEmail email={status.error}/>
            :
        <>
         <div ref={errorDivRef} className={`${status.state === 'error' ? 'block' : 'hidden'} grid grid-cols-1 place-items-center text-white text-rose-600 z-10 `}>
            <div className="bg-rose-500 px-3 sm:px-4 sm:py-3 md:px-9 py-2 rounded-xl text-sm sm:text-lg">
                <span>An error occured while connecting...</span>
                <span onClick={handleSubmit} className="mx-3 underline font-semibold cursor-pointer"> Try again</span>
                <span onClick={handleClick} className="font-bold cursor-pointer">X</span> 
            </div>
            </div>

         <div className="mb-14">
            <div className="mt-4 mx-3 shadow-2xl shadow-blue-200 sm:mx-14 md:mx-16 lg:mx-18 xl:mx-21.5 rounded-2xl">
                <div className="font-bold text-xl pt-4 text-center">Login to Continue</div>
                <div className={`${!!status.error ? 'pb-3.5' : ''} mt-4 text-center font-semibold text-rose-600`}>{status.error}</div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 place-items-center">

                    <div>
                    <input className="placeholder-place-col w-21 max-[380px]:w-18 h-4.5 focus:outline-none border-blue-600 border-2 rounded-4xl pl-2" type="text" value={form.email} name="email" onChange={handleEmailChange} id="email-id" placeholder="Email" />
                    </div>
                    
                    <div>
                    <input className="placeholder-place-col w-18 max-[380px]:w-16.5 h-4.5 inline mr-2 focus:outline-none border-blue-600 border-2 rounded-4xl pl-2"type={typeChange ? 'text' : 'password'} value={form.password} onChange={handlePasswordChange} name="password" id="password" placeholder="Password" />
                    <span onClick={() => setTypeChange(!typeChange)} className="inline text-blue-600 underline font-semibold cursor-pointer">
                        {typeChange ? 'Hide' : 'Show'}
                    </span>
                    </div>

                    <div>
                        <Link className="ml-3 text-blue-600 underline font-semibold" to='/password-reset' state={{userEmail : form.email}}>Forgot Password?</Link>
                    </div>

                    <div>
                        Don't have an account?
                        <Link className="ml-3 text-blue-600 underline font-semibold" to='/register'>Sign up</Link>
                    </div>

                    <div className="mb-10 flex flex-row items-center ">
                        <div>
                            <button type="submit" className={`${!form.email || !form.password ? 'bg-gray-200 text-gray-600' : 'bg-blue-600 text-white'} px-3 py-2 rounded-4xl`} disabled={!form.email || !form.password}>Login</button>      
                        </div>
                    
                        <div className={`${status.state === 'loading' ? 'inline' : 'hidden'}`}>
                            <Loader parentClass="" childClasses="h-0.5 w-0.5 bg-blue-600" />
                        </div>
                    </div>

                    </div>
                </form>    
            </div>
        </div>
        </>
    }
        </>
    )
}
export default Login;

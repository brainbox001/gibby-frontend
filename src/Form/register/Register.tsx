import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VerifyEmail from "../verify-email/VerifyEmail";
import RegisterInput from "./RegisterInput";
import API_URL from "../../../config/api_url";

function Register() {
    useEffect(() => {
        document.title = 'Gibby - get started';
    }, []);
    const [form, setForm] = useState<any>({
        validEmail : false,
        validFirstName : false,
        validLastName : false,
        validPassword : false,
        checked : false
    });
    const [typeChange, setTypeChange] = useState(false);
    const [status, setStatus] = useState({
        state : 'not loading',
        status : 0,
        data : ''
    });

    const emailRef : any = useRef();
    const firstNameRef : any = useRef();
    const lastNameRef : any = useRef();
    const passwordRef : any = useRef();

    const emailLabelRef : any = useRef();
    const firstNameLabelRef : any = useRef();
    const lastNameLabelRef : any = useRef();
    const passwordLabel : any = useRef();

    const errorDivRef : any = useRef();

    function handleCheckbox(e: { target: { checked: any; }; }) {
        setForm({
            ...form,
            checked : e.target.checked
        });
    }

    function handleValidInput() {
        const email : string = emailRef.current.value;
        const indexOfAt = email.indexOf('@');
        const indexOfCom = email.indexOf('.c');
        const indexOfAtDot = email.indexOf('@.');
        const indexOfDot = email.indexOf('.');
        let validEmail = indexOfAt !== -1 && indexOfCom !== -1 && indexOfAtDot === -1 && indexOfDot > indexOfAt;
        let validFirstName = !!firstNameRef.current.value;
        let validLastName = !!lastNameRef.current.value;
        setForm({
            ...form,
            validEmail,
            validFirstName,
            validLastName
        });
    };

    function handlePasswordChange() {
        let containsSymbol = true;
        let containsNumber = false;
        let containsLetter = false;
        let passwordStr : string = passwordRef.current.value;
        for (const char of passwordStr) {
            if (char.charCodeAt(0) < 32 || char.charCodeAt(0) === 34 || char.charCodeAt(0) === 39 || char.charCodeAt(0) === 47) containsSymbol = false;

            else if(char.charCodeAt(0) > 47 && char.charCodeAt(0) < 58) containsNumber = true;

            else if((char.charCodeAt(0) > 65 && char.charCodeAt(0) < 91) || (char.charCodeAt(0) > 97 && char.charCodeAt(0) < 122)) containsLetter = true;
        }
        let validPassword = containsLetter && containsNumber && containsSymbol && passwordStr.length > 7;
        setForm({
            ...form,
            validPassword
        });
    };

    async function handleSubmit(e : any) {
        e.preventDefault();
        if(!form.validEmail || !form.validFirstName || !form.validLastName || !form.validPassword) {
            if(!form.validEmail) {
                emailLabelRef.current.className = "block text-rose-600";
                emailRef.current.classList.remove('border-blue-600')
                emailRef.current.classList.add('border-rose-600')
            }
            else {
                emailLabelRef.current.className = "hidden";
                emailRef.current.classList.remove('border-rose-600')
                emailRef.current.classList.add('border-blue-600')
            }
    
            if(!form.validFirstName) {
                firstNameLabelRef.current.className = "block text-rose-600";
                firstNameRef.current.classList.remove('border-blue-600')
                firstNameRef.current.classList.add('border-rose-600')
            }
            else {
                firstNameLabelRef.current.className = "hidden";
                firstNameRef.current.classList.remove('border-rose-600')
                firstNameRef.current.classList.add('border-blue-600')
            };
    
            if(!form.validLastName) {
                lastNameLabelRef.current.className = "block text-rose-600";
                lastNameRef.current.classList.remove('border-blue-600');
                lastNameRef.current.classList.add('border-rose-600');
            }
            else {
                lastNameLabelRef.current.className = "hidden";
                lastNameRef.current.classList.remove('border-rose-600')
                lastNameRef.current.classList.add('border-blue-600')
            };
    
            if(!form.validPassword) {
                passwordLabel.current.className = "block text-rose-600";
                passwordRef.current.classList.remove('border-blue-600')
                passwordRef.current.classList.add('border-rose-600')
            }
            else {
                passwordLabel.current.className = "hidden";
                passwordRef.current.classList.remove('border-rose-600')
                passwordRef.current.classList.add('border-blue-600')
            };
        } else {
            const email : string = emailRef.current.value;
            const firstName : string = firstNameRef.current.value;
            const lastName : string = lastNameRef.current.value;
            const password : string = passwordRef.current.value;

            const body = {
                email,
                firstName,
                lastName,
                password
            };
            setStatus({
                ...status,
                state : 'loading'
            });

            try {
                const response = await fetch(`${API_URL}/user/register`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json', 'personal' : 'gibby-frontend' },
                    body: JSON.stringify(body),
                  });
                  const data = await response.json();
                    console.log(response)
                  if (response.status === 201) setStatus({state : 'not loading', status: 201, data: data.email});
                  else setStatus({state : 'error', status:response.status, data: data.error});

    
            } catch (error:any) {
                errorDivRef.current.classList.remove("hidden");
                errorDivRef.current.classList.add("block");
                
                setStatus({
                    ...status,
                    state : 'error'
                });
            };
        };
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
         <div ref={errorDivRef} className={`${status.state === 'error' ? 'block' : 'hidden'} grid grid-cols-1 place-items-center z-10 text-white`}>
            <div className="bg-rose-500 px-3 sm:px-4 sm:py-3 md:px-9 py-2 rounded-xl text-sm sm:text-lg">
                {
                    status.status === 400
                    ?
                    <span className="mx-3">{status.data}</span>
                    :
                    <>
                        <span>An error occured while connecting...</span>
                        <span onClick={handleSubmit} className="mx-3 underline font-semibold cursor-pointer"> Try again</span>
                    </>
                }
                <span onClick={handleClick} className="font-bold cursor-pointer">X</span>
            </div>
            </div>
         {
           status.status === 201 ?
            
         <VerifyEmail email={status.data} />
         :
         <>
        <RegisterInput handleSubmit={handleSubmit} emailLabelRef={emailLabelRef} emailRef={emailRef} handleValidInput={handleValidInput} firstNameLabelRef={firstNameLabelRef} firstNameRef={firstNameRef} lastNameLabelRef={lastNameLabelRef} lastNameRef={lastNameRef} passwordRef={passwordRef} passwordLabel={passwordLabel} typeChange={typeChange} handlePasswordChange={handlePasswordChange} setTypeChange={setTypeChange} form={form} handleCheckbox={handleCheckbox} isPending={status.state === 'loading'} />
        </>
        }
        </>
    )
};
export default Register;

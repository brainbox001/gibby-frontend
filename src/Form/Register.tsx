import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Register() {
    const [form, setForm] = useState<any>({
        validEmail : false,
        validFirstName : false,
        validLastName : false,
        validPassword : false,
        checked : false
    });
    const [typeChange, setTypeChange] = useState(false);
    const emailRef : any = useRef();
    const firstNameRef : any = useRef();
    const lastNameRef : any = useRef();
    const passwordRef : any = useRef();

    const emailLabelRef : any = useRef();
    const firstNameLabelRef : any = useRef();
    const lastNameLabelRef : any = useRef();
    const passwordLabel : any = useRef();

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
        let containsSymbol = false;
        let containsNumber = false;
        let containsLetter = false;
        let noExcluded = true;
        let passwordStr : string = passwordRef.current.value;
        for (const char of passwordStr) {
            if ((char.charCodeAt(0) === 63 || char.charCodeAt(0) === 64 || (char.charCodeAt(0) > 32 && char.charCodeAt(0) < 48)) && char.charCodeAt(0) !== 34 && char.charCodeAt(0) !== 39 && char.charCodeAt(0) !== 47) containsSymbol = true

            else if(char.charCodeAt(0) > 47 && char.charCodeAt(0) < 58) containsNumber = true;

            else if((char.charCodeAt(0) > 65 && char.charCodeAt(0) < 90) || (char.charCodeAt(0) > 97 && char.charCodeAt(0) < 122)) containsLetter = true;
            else noExcluded = false;
        }
        let validPassword = containsLetter && containsNumber && containsSymbol && passwordStr.length > 7 && noExcluded;
        setForm({
            ...form,
            validPassword
        });
    };

    function handleSubmit(e : any) {
        e.preventDefault();
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
        }

        if(!form.validLastName) {
            lastNameLabelRef.current.className = "block text-rose-600";
            lastNameRef.current.classList.remove('border-blue-600');
            lastNameRef.current.classList.add('border-rose-600');
        }
        else {
            lastNameLabelRef.current.className = "hidden";
            lastNameRef.current.classList.remove('border-rose-600')
            lastNameRef.current.classList.add('border-blue-600')
        }

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
    };

    return (
        <>
         <div>
            <Link to='/'>
                <img className="h-20 w-20 mx-4 mt-6" src="/gibby-logo.png" alt="gibby-logo" />
            </Link>
         </div>
        <div className="mx-3 mb-14">
        <div className="text-center mt-16 border-2 border-blue-600 rounded-4xl w-full">
            <div className="font-bold text-xl mt-4">Welcome to Gibby</div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-3 reg-form-div mt-10 mb-4">
                <div>
                <label ref={emailLabelRef} className="hidden" htmlFor="email-id">Use a valid email address</label>
                <input className="placeholder-place-col w-21 h-9 focus:outline-none border-blue-600 border-2 rounded-4xl" ref={emailRef} onChange={handleValidInput} type="text" name="email" id="email-id" placeholder="Email" />
                </div>

                <div>
                <label ref={firstNameLabelRef} className="hidden" htmlFor="first-name">Name can't be empty</label>
                <input className="placeholder-place-col w-21 h-9 focus:outline-none border-blue-600 border-2 rounded-4xl" ref={firstNameRef} onChange={handleValidInput} type="text" name="first-name" id="first-name" placeholder="First name" />
                </div>
                
                <div>
                <label ref={lastNameLabelRef}  className="hidden" htmlFor="last-name">Name can't be empty</label>
                <input className="placeholder-place-col w-21 h-9 focus:outline-none border-blue-600 border-2 rounded-4xl" ref={lastNameRef} onChange={handleValidInput} type="text" name="last-name" id="last-name" placeholder="Last name" />
                </div>

                <div>
                <label ref={passwordLabel}  className="hidden" htmlFor="password">Password must be above 8 characters and contain letters, numbers and symbols</label>
                <input className="placeholder-place-col w-18 h-9 inline mr-2 focus:outline-none border-blue-600 border-2 rounded-4xl" ref={passwordRef} type={typeChange ? 'text' : 'password'} onChange={handlePasswordChange} name="password" id="password" autoComplete="new-password" placeholder="Password" />
                <span onClick={() => setTypeChange(!typeChange)} className="inline text-blue-600 underline font-semibold cursor-pointer">
                    {typeChange ? 'Hide' : 'Show'}
                </span>
                </div>

                <div>
                <input type="checkbox" checked={form.checked} onChange={handleCheckbox} name="accept" id="accept" />
                <span className="ml-2">I agree to the terms and conditions</span>
                </div>

                <div>
                <button className={`${!form.checked ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'} bg-blue-600 text-white px-3 py-2 rounded-4xl`} type="submit" disabled={!form.checked}>
                    register
                </button>
                </div>
                
                </div>
            </form>
        </div>
        </div>
        </>
    )
};
export default Register;

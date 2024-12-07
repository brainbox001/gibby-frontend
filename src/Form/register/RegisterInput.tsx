import { Link } from "react-router-dom";
import Loader from "../../Loader";

function RegisterInput({handleSubmit, emailLabelRef, emailRef, handleValidInput, firstNameLabelRef, firstNameRef, lastNameLabelRef, lastNameRef, passwordRef, passwordLabel, typeChange, handlePasswordChange, setTypeChange, form, handleCheckbox, isPending} : {handleSubmit : any, emailLabelRef: any, emailRef:any, handleValidInput:any, firstNameLabelRef:any, firstNameRef:any, lastNameLabelRef:any, lastNameRef:any, passwordLabel:any, passwordRef:any, typeChange:boolean, handlePasswordChange:any, setTypeChange:any, form:any, handleCheckbox:any, isPending:boolean}) {

    return (<div className="mx-3 mb-14 sm:mx-14 md:mx-16 lg:mx-18 xl:mx-21.5">
        <div className="text-center mt-12 shadow-2xl rounded-4xl w-full">
            <div className="font-bold text-xl mt-4 pt-4">Welcome to Gibby</div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-3 reg-form-div mt-4 mb-4">
                <div>
                <label ref={emailLabelRef} className="hidden" htmlFor="email">Use a valid email address</label>
                <input className="placeholder-place-col w-21 max-[380px]:w-18 h-4.5 focus:outline-none border-blue-600 border-2 rounded-4xl pl-2" ref={emailRef} onChange={handleValidInput} type="text" name="email" id="email" placeholder="Email" />
                </div>

                <div>
                <label ref={firstNameLabelRef} className="hidden" htmlFor="first-name">Name can't be empty</label>
                <input className="placeholder-place-col w-21 max-[380px]:w-18 h-4.5 focus:outline-none border-blue-600 border-2 rounded-4xl pl-2" ref={firstNameRef} onChange={handleValidInput} type="text" name="first-name" id="first-name" placeholder="First name" />
                </div>
                
                <div>
                <label ref={lastNameLabelRef}  className="hidden" htmlFor="last-name">Name can't be empty</label>
                <input className="placeholder-place-col w-21 max-[380px]:w-18 h-4.5 focus:outline-none border-blue-600 border-2 rounded-4xl pl-2" ref={lastNameRef} onChange={handleValidInput} type="text" name="last-name" id="last-name pl-2" placeholder="Last name" />
                </div>

                <div>
                <label ref={passwordLabel}  className="hidden" htmlFor="password">Password must be above 8 characters and contain letters, numbers and symbols</label>
                <input className="placeholder-place-col w-18 max-[380px]:w-16.5 h-4.5 inline mr-2 focus:outline-none border-blue-600 border-2 rounded-4xl pl-2" ref={passwordRef} type={typeChange ? 'text' : 'password'} onChange={handlePasswordChange} name="password" id="password" autoComplete="new-password" placeholder="Password" />
                <span onClick={() => setTypeChange(!typeChange)} className="inline text-blue-600 underline font-semibold cursor-pointer">
                    {typeChange ? 'Hide' : 'Show'}
                </span>
                </div>

                <div className="my-3">
                <input type="checkbox" checked={form.checked} onChange={handleCheckbox} name="accept" id="accept" />
                <span className="ml-2">I agree to the terms and conditions</span>
                </div>

                <div>
                    Already have an account?
                    <Link className="ml-3 text-blue-600 underline font-semibold" to='/login'>Sign in</Link>
                </div>

                <div className="mb-10">
                <button className={`${!form.checked ? 'bg-gray-200 text-gray-600 cursor-not-allowed' : 'cursor-pointer bg-blue-600 text-white'} px-3 py-2 rounded-4xl`} type="submit" disabled={!form.checked || isPending}>
                    {!isPending ? 
                    'Register' 
                    : 
                    <Loader parentClass="" childClasses="" animateClass="add" />
                    }
                </button>
                </div>
                
                </div>
            </form>
        </div>
        </div>
    )
};
export default RegisterInput;

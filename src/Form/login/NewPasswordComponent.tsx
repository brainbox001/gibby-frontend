import { useRef, useState } from "react";
import Loader from "../../Loader";
import { useNavigate } from "react-router-dom";

function NewPasswordComponent({processes, setProcesses} : {processes : any, setProcesses : any}) {
  const [passwords, setPasswords] = useState({
    password1: "",
    password2: "",
    isValid: false,
  });
  const [typeChange, setTypeChange] = useState(false);
  const passwordRef: any = useRef();
  const errorDivRef: any = useRef();
  let navigate = useNavigate();

  function handlePasswordValidate() {
    const password = passwordRef.current.value;
    let containsSymbol = true;
    let containsNumber = false;
    let containsLetter = false;
    let noExcluded = true;
    for (const char of password) {
      if (char.charCodeAt(0) < 32 || char.charCodeAt(0) === 34 || char.charCodeAt(0) === 39 || char.charCodeAt(0) === 47) containsSymbol = false
      else if (char.charCodeAt(0) > 47 && char.charCodeAt(0) < 58)
        containsNumber = true;
      else if (
        (char.charCodeAt(0) > 65 && char.charCodeAt(0) < 90) ||
        (char.charCodeAt(0) > 97 && char.charCodeAt(0) < 122)
      )
        containsLetter = true;
      else noExcluded = false;
    }
    let validPassword =
      containsLetter &&
      containsNumber &&
      containsSymbol &&
      password.length > 7 &&
      noExcluded;
    validPassword
      ? setPasswords({
          ...passwords,
          isValid: true,
          password1: password,
        })
      : setPasswords({
          ...passwords,
          isValid: false,
        });
  };

  function handlePasswordChange(e: any) {
    setPasswords({
      ...passwords,
      password2: e.target.value,
    });
  };

  async function handleSubmit(e : any) {
    e.preventDefault();
    if(passwords.isValid && !!passwords.password1 && !!passwords.password2) {

      setProcesses({
        ...processes,
        state: "loading",
      });

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
            body: JSON.stringify({ email : processes.email, isVerified : processes.isVerified, password : passwords.password1 }),
          }
        );
        const data = await response.json();

        if (response.status === 200) {
          navigate('/login');
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
    };
  };

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
            onClick={handleSubmit}
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

      <div className="mt-4 mx-3 shadow-2xl shadow-blue-200 sm:mx-14 md:mx-16 lg:mx-18 xl:mx-21.5 rounded-2xl">
        <div className="pt-3.5 pl-3.5 font-semibold text-center">Reset your password</div>
        <div
          className={`${
            processes.state === "error-response" ? "pt-3.5 text-center font-semibold text-rose-600" : "hidden"
          }`}
        >
          {processes.response}
        </div>

        <div className="text-sm text-rose-400 py-4 px-0.5 sm:px-3.5 text-center">
          Valid password must be above 8 characters and contain letters, numbers
          and symbols
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 place-items-center">
            <div>
              <input
                ref={passwordRef}
                className="placeholder-place-col w-21 max-[380px]:w-18 h-4.5 focus:outline-none border-blue-600 border-2 rounded-4xl pl-2"
                type={typeChange ? "text" : "password"}
                name="password"
                onChange={handlePasswordValidate}
                id="password1-id"
                placeholder="New password"
              />
            </div>

            <div>
              <input
                className="placeholder-place-col w-18 max-[380px]:w-16.5 h-4.5 inline mr-2 focus:outline-none border-blue-600 border-2 rounded-4xl pl-2"
                type={typeChange ? "text" : "password"}
                value={passwords.password2}
                name="password"
                onChange={handlePasswordChange}
                id="password2-id"
                placeholder="Confirm password"
              />

              <span
                onClick={() => setTypeChange(!typeChange)}
                className="inline text-blue-600 underline font-semibold cursor-pointer"
              >
                {typeChange ? "Hide" : "Show"}
              </span>
            </div>

            <div className="mb-10">
              <button
                type="submit"
                className={`${
                  !!passwords.password1 &&
                  passwords.isValid &&
                  passwords.password1 === passwords.password2
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                } px-3 py-2 rounded-4xl`}
                disabled={
                  !passwords.password1 ||
                  !passwords.isValid ||
                  passwords.password1 !== passwords.password2
                }
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
                  "Reset password"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPasswordComponent;

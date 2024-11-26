import { Link } from "react-router-dom";
import PassWordEmailComponent from "./PasswordEmailComponent";
import VerifyEmail from "../verify-email/VerifyEmail";
import NewPasswordComponent from "./NewPasswordComponent";
import { useEffect, useState } from "react";

function ResetPassword () {
    useEffect(() => {
        document.title = 'Gibby - Reset your password';
    }, []);
    const [processes, setProcesses] = useState({
        step : 1,
        email : '',
        state : 'not loading',
        status : 0,
        response : '',
        isVerified : false
    });
    
    return (
        <>
        <div className="w-20">
            <Link to='/'>
                <img className="h-20 w-full object-contain mx-4 mt-6" src="/gibby-logo.png" alt="gibby-logo" />
            </Link>
        </div>
        {renderCurrentStep(processes, setProcesses)}
        </>
    )
};

function renderCurrentStep(processes: { step: any; email: any; }, setProcesses: any) {
    if(processes.step === 1) return <PassWordEmailComponent processes={processes} setProcesses={setProcesses} />;
    if(processes.step === 2) return <VerifyEmail email={processes.email} forPasswordChange={true} processes={processes} setProcesses={setProcesses} />;
    if(processes.step === 3) return <NewPasswordComponent processes={processes} setProcesses={setProcesses} />;
};

export default ResetPassword;
